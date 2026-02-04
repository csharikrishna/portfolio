import React, { useEffect, useRef, useState, useCallback } from 'react';
import '../../styles/Cursor.css';

const Cursor = () => {
  const cursorRef = useRef(null);
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isBatterySaver, setIsBatterySaver] = useState(false);

  // Physics state
  const mousePos = useRef({ x: -100, y: -100 });
  const cursorPos = useRef({ x: -100, y: -100 });
  const velocity = useRef({ x: 0, y: 0 });
  const scale = useRef(1);
  const tilt = useRef({ x: 0, y: 0 });
  const rotation = useRef(0);

  // Particles
  const particles = useRef([]);
  const particleIdCounter = useRef(0);
  const MAX_PARTICLES = 50;
  const MAX_PARTICLES_BATTERY_SAVER = 15;

  // Config
  const SPEED = 0.18;
  const TILT_FACTOR = 0.9;
  const MAX_TILT = 18;
  const ROTATION_FACTOR = 0.08;

  // Detect battery saver mode
  useEffect(() => {
    const checkBatterySaver = () => {
      const prefersReducedData = window.matchMedia('(prefers-reduced-data: reduce)').matches;
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setIsBatterySaver(prefersReducedData || prefersReducedMotion);
    };

    checkBatterySaver();

    const mediaQueries = [
      window.matchMedia('(prefers-reduced-data: reduce)'),
      window.matchMedia('(prefers-reduced-motion: reduce)')
    ];

    mediaQueries.forEach(mq => mq.addEventListener('change', checkBatterySaver));

    return () => {
      mediaQueries.forEach(mq => mq.removeEventListener('change', checkBatterySaver));
    };
  }, []);

  // Create shockwave effect
  const createShockwave = useCallback((x, y) => {
    if (!containerRef.current || isBatterySaver) return;

    const el = document.createElement('div');
    el.className = 'shockwave';
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    
    containerRef.current.appendChild(el);
    
    setTimeout(() => el.remove(), 700);
  }, [isBatterySaver]);

  // Create particle
  const createParticle = useCallback((x, y) => {
    if (!containerRef.current) return null;

    const el = document.createElement('div');
    el.className = 'snow-particle';

    const size = Math.random() * 3 + 1.5;
    el.style.width = `${size}px`;
    el.style.height = `${size}px`;

    // Add color variation
    const hue = 200 + Math.random() * 40;
    el.style.background = `radial-gradient(circle, hsla(${hue}, 100%, 95%, 0.95), hsla(${hue}, 80%, 70%, 0.6))`;

    containerRef.current.appendChild(el);

    return {
      id: particleIdCounter.current++,
      el,
      x,
      y,
      vx: (Math.random() - 0.5) * 2,
      vy: Math.random() * 2 + 0.5,
      life: 1,
      decay: Math.random() * 0.015 + 0.01,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 5
    };
  }, []);

  // Detect hover state
  const detectHoverState = useCallback((target) => {
    const isClickable =
      target.tagName === 'A' ||
      target.tagName === 'BUTTON' ||
      target.tagName === 'INPUT' ||
      target.tagName === 'TEXTAREA' ||
      target.tagName === 'SELECT' ||
      target.closest('a') ||
      target.closest('button') ||
      target.classList.contains('clickable') ||
      window.getComputedStyle(target).cursor === 'pointer';

    const isText = 
      target.tagName === 'INPUT' ||
      target.tagName === 'TEXTAREA' ||
      target.isContentEditable;

    document.body.classList.toggle('hovering', isClickable);
    document.body.classList.toggle('text-hover', isText);
  }, []);

  useEffect(() => {
    // Disable on touch or reduced motion
    if (
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    setIsVisible(true);

    const onMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      if (cursorPos.current.x === -100) {
        cursorPos.current = { ...mousePos.current };
      }

      detectHoverState(e.target);
    };

    const onMouseDown = () => {
      document.body.classList.add('clicking');
      createShockwave(cursorPos.current.x, cursorPos.current.y);
    };

    const onMouseUp = () => {
      document.body.classList.remove('clicking');
    };

    const onMouseLeave = () => {
      document.body.classList.remove('hovering', 'clicking', 'text-hover');
    };

    let rafId;
    const maxParticlesAllowed = isBatterySaver ? MAX_PARTICLES_BATTERY_SAVER : MAX_PARTICLES;

    const animate = () => {
      // Calculate movement
      const dx = mousePos.current.x - cursorPos.current.x;
      const dy = mousePos.current.y - cursorPos.current.y;

      const moveX = dx * SPEED;
      const moveY = dy * SPEED;

      cursorPos.current.x += moveX;
      cursorPos.current.y += moveY;

      velocity.current = { x: moveX, y: moveY };

      const dist = Math.hypot(dx, dy);
      const isHovering = document.body.classList.contains('hovering');
      const isClicking = document.body.classList.contains('clicking');
      const isTextHover = document.body.classList.contains('text-hover');

      // Scale animation
      let targetScale = isTextHover ? 0.4 : isHovering ? 1.9 : 1 + Math.min(dist / 60, 1) * 0.25;
      if (isClicking) targetScale *= 0.82;
      scale.current += (targetScale - scale.current) * 0.18;

      // Tilt animation
      const targetTiltX = velocity.current.y * TILT_FACTOR;
      const targetTiltY = -velocity.current.x * TILT_FACTOR;

      tilt.current.x += (Math.max(-MAX_TILT, Math.min(MAX_TILT, targetTiltX)) - tilt.current.x) * 0.12;
      tilt.current.y += (Math.max(-MAX_TILT, Math.min(MAX_TILT, targetTiltY)) - tilt.current.y) * 0.12;

      // Rotation based on movement
      const targetRotation = Math.atan2(velocity.current.y, velocity.current.x) * (180 / Math.PI);
      const rotationDiff = targetRotation - rotation.current;
      rotation.current += rotationDiff * ROTATION_FACTOR;

      // Update cursor position
      if (cursorRef.current) {
        cursorRef.current.style.transform = `
          translate3d(${cursorPos.current.x}px, ${cursorPos.current.y}px, 0)
          translate(-50%, -50%)
          perspective(1000px)
          rotateX(${tilt.current.x}deg)
          rotateY(${tilt.current.y}deg)
          scale(${scale.current})
        `;
      }

      // Particle system
      if (!isBatterySaver && dist > 4 && !isHovering && particles.current.length < maxParticlesAllowed) {
        const particleChance = 0.35;
        if (Math.random() < particleChance) {
          const p = createParticle(cursorPos.current.x, cursorPos.current.y);
          if (p) particles.current.push(p);
        }
      }

      // Update particles
      for (let i = particles.current.length - 1; i >= 0; i--) {
        const p = particles.current[i];
        p.life -= p.decay;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        p.vy += 0.05; // Gravity effect

        if (p.life <= 0) {
          p.el.remove();
          particles.current.splice(i, 1);
        } else {
          const scale = Math.max(0.3, p.life);
          p.el.style.transform = `
            translate3d(${p.x}px, ${p.y}px, 0) 
            translate(-50%, -50%)
            scale(${scale})
            rotate(${p.rotation}deg)
          `;
          p.el.style.opacity = p.life;
        }
      }

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mouseleave', onMouseLeave);

    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mouseleave', onMouseLeave);

      cancelAnimationFrame(rafId);

      document.body.classList.remove('hovering', 'clicking', 'text-hover');

      particles.current.forEach(p => p.el.remove());
      particles.current = [];
    };
  }, [isBatterySaver, detectHoverState, createShockwave, createParticle]);

  if (!isVisible) return null;

  return (
    <div className="cursor-container" ref={containerRef}>
      <div className="custom-cursor" ref={cursorRef}>
        <div className="cursor-inner" />
      </div>
    </div>
  );
};

export default Cursor;
