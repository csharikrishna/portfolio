import React, { useEffect, useRef, useState } from 'react';
import '../../styles/Cursor.css';

const Cursor = () => {
  const cursorRef = useRef(null);
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Physics state
  const mousePos = useRef({ x: -100, y: -100 });
  const cursorPos = useRef({ x: -100, y: -100 });
  const velocity = useRef({ x: 0, y: 0 });
  const scale = useRef(1);
  const tilt = useRef({ x: 0, y: 0 });

  // Particles
  const particles = useRef([]);
  const particleIdCounter = useRef(0);
  const MAX_PARTICLES = 120;

  // Config
  const speed = 0.15;
  const tiltFactor = 0.8;
  const maxTilt = 20;

  useEffect(() => {
    // Disable on touch / reduced motion
    if (
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    setIsVisible(true);

    const detectHoverState = (target) => {
      const isClickable =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('clickable') ||
        window.getComputedStyle(target).cursor === 'pointer';

      document.body.classList.toggle('hovering', isClickable);
    };

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

    const createShockwave = (x, y) => {
      if (!containerRef.current) return;

      const el = document.createElement('div');
      el.className = 'shockwave';
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
      el.style.transform = 'translate(-50%, -50%)';

      containerRef.current.appendChild(el);

      setTimeout(() => el.remove(), 600);
    };

    const createParticle = (x, y) => {
      if (!containerRef.current) return null;

      const el = document.createElement('div');
      el.className = 'snow-particle';

      const size = Math.random() * 3 + 1;
      el.style.width = `${size}px`;
      el.style.height = `${size}px`;

      containerRef.current.appendChild(el);

      return {
        id: particleIdCounter.current++,
        el,
        x,
        y,
        vx: (Math.random() - 0.5) * 1.5,
        vy: Math.random() * 1.5 + 0.5,
        life: 1,
        decay: Math.random() * 0.02 + 0.01
      };
    };

    let rafId;

    const animate = () => {
      // Movement
      const dx = mousePos.current.x - cursorPos.current.x;
      const dy = mousePos.current.y - cursorPos.current.y;

      const moveX = dx * speed;
      const moveY = dy * speed;

      cursorPos.current.x += moveX;
      cursorPos.current.y += moveY;

      velocity.current = { x: moveX, y: moveY };

      const dist = Math.hypot(dx, dy);
      const isHovering = document.body.classList.contains('hovering');
      const isClicking = document.body.classList.contains('clicking');

      // Scale
      let targetScale = isHovering
        ? 1.8
        : 1 + Math.min(dist / 50, 1) * 0.2;

      if (isClicking) targetScale *= 0.85;
      scale.current += (targetScale - scale.current) * 0.15;

      // Tilt
      const targetTiltX = velocity.current.y * tiltFactor;
      const targetTiltY = -velocity.current.x * tiltFactor;

      tilt.current.x +=
        (Math.max(-maxTilt, Math.min(maxTilt, targetTiltX)) -
          tilt.current.x) *
        0.1;

      tilt.current.y +=
        (Math.max(-maxTilt, Math.min(maxTilt, targetTiltY)) -
          tilt.current.y) *
        0.1;

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

      // Particles
      if (dist > 3 && !isHovering && particles.current.length < MAX_PARTICLES) {
        if (Math.random() < 0.4) {
          const p = createParticle(
            cursorPos.current.x,
            cursorPos.current.y
          );
          if (p) particles.current.push(p);
        }
      }

      for (let i = particles.current.length - 1; i >= 0; i--) {
        const p = particles.current[i];
        p.life -= p.decay;
        p.x += p.vx;
        p.y += p.vy;

        if (p.life <= 0) {
          p.el.remove();
          particles.current.splice(i, 1);
        } else {
          p.el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) translate(-50%, -50%)`;
          p.el.style.opacity = p.life;
        }
      }

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);

      cancelAnimationFrame(rafId);

      document.body.classList.remove('hovering', 'clicking');

      particles.current.forEach(p => p.el.remove());
      particles.current = [];
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="cursor-container" ref={containerRef}>
      <div className="custom-cursor" ref={cursorRef} />
    </div>
  );
};

export default Cursor;
