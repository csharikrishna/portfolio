import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import '../../styles/ThemeToggle.css';

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) {
      return saved === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [ripples, setRipples] = useState([]);
  const toggleRef = useRef(null);
  const rippleIdRef = useRef(0);

  useEffect(() => {
    const root = document.documentElement;

    if (isDarkMode) {
      root.classList.add('dark');
      root.classList.remove('light');
      root.setAttribute('data-theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
      root.setAttribute('data-theme', 'light');
    }

    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    window.dispatchEvent(
      new CustomEvent('themechange', { detail: { theme: isDarkMode ? 'dark' : 'light' } })
    );
  }, [isDarkMode]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e) => {
      const saved = localStorage.getItem('theme');
      if (!saved) {
        setIsDarkMode(e.matches);
      }
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);

  const createRipple = (e) => {
    if (!toggleRef.current) return;

    const rect = toggleRef.current.getBoundingClientRect();
    const clientX = e.clientX || (e.touches?.[0]?.clientX ?? rect.left + rect.width / 2);
    const clientY = e.clientY || (e.touches?.[0]?.clientY ?? rect.top + rect.height / 2);
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const newRipple = { id: rippleIdRef.current++, x, y };
    setRipples((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id));
    }, 600);
  };

  const toggleTheme = useCallback(
    async (e) => {
      if (isTransitioning) return;

      createRipple(e);
      const newMode = !isDarkMode;
      setIsTransitioning(true);

      if (
        !document.startViewTransition ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ) {
        setIsDarkMode(newMode);
        setIsTransitioning(false);
        return;
      }

      try {
        const transition = document.startViewTransition(() => {
          setIsDarkMode(newMode);
        });

        await transition.ready;

        if (toggleRef.current) {
          const { top, left, width, height } = toggleRef.current.getBoundingClientRect();
          const x = left + width / 2;
          const y = top + height / 2;
          const right = window.innerWidth - left;
          const bottom = window.innerHeight - top;
          const maxRadius = Math.hypot(Math.max(left, right), Math.max(top, bottom));

          document.documentElement.animate(
            {
              clipPath: [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${maxRadius}px at ${x}px ${y}px)`,
              ],
            },
            {
              duration: 700,
              easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
              pseudoElement: '::view-transition-new(root)',
            }
          );
        }

        await transition.finished;
      } catch (error) {
        console.warn('View Transition failed:', error);
        setIsDarkMode(newMode);
      } finally {
        setIsTransitioning(false);
      }
    },
    [isDarkMode, isTransitioning]
  );

  useEffect(() => {
    const handleKeyPress = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'L') {
        e.preventDefault();
        if (toggleRef.current) {
          const rect = toggleRef.current.getBoundingClientRect();
          const fakeEvent = {
            clientX: rect.left + rect.width / 2,
            clientY: rect.top + rect.height / 2,
          };
          toggleTheme(fakeEvent);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [toggleTheme]);

  const iconVariants = {
    initial: { scale: 0, rotate: -180, opacity: 0 },
    animate: { 
      scale: 1, 
      rotate: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    },
    exit: { 
      scale: 0, 
      rotate: 180, 
      opacity: 0,
      transition: {
        duration: 0.2
      }
    },
  };

  const glowVariants = {
    pulse: {
      opacity: [0.5, 0.8, 0.5],
      scale: [1, 1.08, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="theme-toggle-wrapper">
      <button
        ref={toggleRef}
        className={`theme-toggle ${isDarkMode ? 'dark' : 'light'} ${
          isTransitioning ? 'transitioning' : ''
        }`}
        onClick={toggleTheme}
        disabled={isTransitioning}
        aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        aria-pressed={isDarkMode}
        title={`${isDarkMode ? 'Light' : 'Dark'} mode (Ctrl+Shift+L)`}
        type="button"
      >
        {/* Animated particles */}
        <div className="particles">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="particle"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 0.8, 0],
                scale: [0, 1, 0],
                x: [0, Math.cos(i * 60 * (Math.PI / 180)) * 30],
                y: [0, Math.sin(i * 60 * (Math.PI / 180)) * 30],
              }}
              transition={{
                duration: 1.2,
                delay: i * 0.08,
                ease: "easeOut"
              }}
            />
          ))}
        </div>

        {/* Ripple effects */}
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="ripple"
            style={{
              left: ripple.x,
              top: ripple.y,
            }}
          />
        ))}

        {/* Main toggle track */}
        <span className="theme-toggle-track">
          <motion.span 
            className="theme-toggle-thumb"
            animate={{
              x: isDarkMode ? '100%' : '0%',
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isDarkMode ? (
                <motion.span
                  key="moon"
                  className="theme-icon moon-icon"
                  variants={iconVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <FaMoon aria-hidden="true" />
                  {/* Moon craters */}
                  <span className="crater crater-1" />
                  <span className="crater crater-2" />
                  <span className="crater crater-3" />
                </motion.span>
              ) : (
                <motion.span
                  key="sun"
                  className="theme-icon sun-icon"
                  variants={iconVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <FaSun aria-hidden="true" />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.span>

          {/* Stars for dark mode */}
          <AnimatePresence>
            {isDarkMode && (
              <>
                {[...Array(3)].map((_, i) => (
                  <motion.span
                    key={`star-${i}`}
                    className="star"
                    style={{
                      left: `${20 + i * 30}%`,
                      top: `${25 + (i % 2) * 35}%`,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: [0.5, 1, 0.5],
                      scale: [0.8, 1, 0.8],
                    }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      delay: i * 0.3,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </>
            )}
          </AnimatePresence>
        </span>

        {/* Animated glow effect */}
        <motion.span 
          className="theme-toggle-glow" 
          variants={glowVariants}
          animate="pulse"
          aria-hidden="true" 
        />

        {/* Border gradient */}
        <span className="border-gradient" />
      </button>
    </div>
  );
};

export default ThemeToggle;
