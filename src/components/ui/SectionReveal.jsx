import React, { useMemo, memo } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * SectionReveal - Premium Animation Wrapper Component
 * 
 * Provides scroll-triggered reveal animations with accessibility support.
 * Respects user's reduced motion preference.
 * 
 * @param {React.ReactNode} children - Content to animate
 * @param {number} delay - Animation delay in seconds (default: 0)
 * @param {string} direction - Animation direction: 'up', 'down', 'left', 'right' (default: 'up')
 * @param {number} distance - Movement distance in pixels (default: 40)
 * @param {number} duration - Animation duration in seconds (default: 0.8)
 * @param {string} variant - Animation variant: 'fade', 'slide', 'scale', 'blur' (default: 'slide')
 * @param {boolean} once - Trigger animation only once (default: true)
 * @param {string} margin - Viewport margin for triggering animation (default: '-100px')
 * @param {number} stagger - Stagger delay for child elements (default: 0)
 * @param {string} className - Additional CSS classes
 */
const SectionReveal = memo(({
  children,
  delay = 0,
  direction = 'up',
  distance = 40,
  duration = 0.8,
  variant = 'slide',
  once = true,
  margin = '-100px',
  stagger = 0,
  className = ''
}) => {
  // Respect user's motion preferences
  const shouldReduceMotion = useReducedMotion();

  // Easing presets - memoized to prevent recreation
  const easings = useMemo(() => ({
    spring: [0.16, 1, 0.3, 1], // Smooth spring-like
    snappy: [0.4, 0, 0.2, 1],  // Material Design snappy
    smooth: [0.4, 0, 0.6, 1],  // Smooth ease
    bounce: [0.68, -0.55, 0.265, 1.55] // Bounce effect
  }), []);

  // Direction mappings - memoized
  const directions = useMemo(() => ({
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance }
  }), [distance]);

  // Get initial animation state
  const getInitialState = useMemo(() => {
    if (shouldReduceMotion) {
      return { opacity: 0 };
    }

    const variants = {
      fade: {
        opacity: 0
      },
      slide: {
        opacity: 0,
        ...(directions[direction] || directions.up)
      },
      scale: {
        opacity: 0,
        scale: 0.9
      },
      blur: {
        opacity: 0,
        filter: 'blur(10px)',
        ...(directions[direction] || directions.up)
      }
    };

    return variants[variant] || variants.slide;
  }, [shouldReduceMotion, direction, variant, directions]);

  // Get animate state
  const getAnimateState = useMemo(() => {
    if (shouldReduceMotion) {
      return { opacity: 1 };
    }

    const variants = {
      fade: {
        opacity: 1
      },
      slide: {
        opacity: 1,
        x: 0,
        y: 0
      },
      scale: {
        opacity: 1,
        scale: 1
      },
      blur: {
        opacity: 1,
        filter: 'blur(0px)',
        x: 0,
        y: 0
      }
    };

    return variants[variant] || variants.slide;
  }, [shouldReduceMotion, variant]);

  // Container animation for staggered children
  const containerVariants = useMemo(() => stagger > 0 ? {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay
      }
    }
  } : null, [stagger, delay]);

  // Child animation variants
  const itemVariants = useMemo(() => stagger > 0 ? {
    hidden: getInitialState,
    visible: getAnimateState
  } : null, [stagger, getInitialState, getAnimateState]);

  // Transition configuration
  const transitionConfig = useMemo(() => shouldReduceMotion
    ? { duration: 0.3 }
    : {
      duration: duration,
      ease: easings.spring,
      delay: stagger > 0 ? 0 : delay
    }, [shouldReduceMotion, duration, easings.spring, stagger, delay]);

  // Viewport configuration
  const viewportConfig = useMemo(() => ({
    once,
    margin
  }), [once, margin]);

  // Render staggered children
  if (stagger > 0) {
    return (
      <motion.div
        className={className}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        variants={containerVariants}
      >
        {React.Children.map(children, (child, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            transition={transitionConfig}
          >
            {child}
          </motion.div>
        ))}
      </motion.div>
    );
  }

  // Standard single element animation
  return (
    <motion.div
      className={className}
      initial={getInitialState}
      whileInView={getAnimateState}
      viewport={viewportConfig}
      transition={transitionConfig}
    >
      {children}
    </motion.div>
  );
});

// Display name for React DevTools
SectionReveal.displayName = 'SectionReveal';

export default SectionReveal;

