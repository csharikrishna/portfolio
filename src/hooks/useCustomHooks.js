import { useEffect, useState, useRef } from 'react';

/**
 * Hook to detect if user prefers reduced motion
 * Useful for disabling animations for accessibility
 */
export const useReducedMotionPreference = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return prefersReducedMotion;
};

/**
 * Hook to track window size with debouncing
 * Returns current viewport dimensions
 */
export const useWindowSize = (debounceDelay = 150) => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  const debounceTimer = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);

      debounceTimer.current = setTimeout(() => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }, debounceDelay);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [debounceDelay]);

  return windowSize;
};

/**
 * Hook to detect if device is mobile
 * Uses media query for accurate detection
 */
export const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`);
    setIsMobile(mediaQuery.matches);

    const handler = (e) => setIsMobile(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [breakpoint]);

  return isMobile;
};

/**
 * Hook for scroll position tracking
 * Returns scroll Y position
 */
export const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const updateScrollPosition = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', updateScrollPosition, { passive: true });
    return () => window.removeEventListener('scroll', updateScrollPosition);
  }, []);

  return scrollPosition;
};

/**
 * Hook for scroll velocity detection
 * Useful for triggering animations based on scroll speed
 */
export const useScrollVelocity = () => {
  const [velocity, setVelocity] = useState(0);
  const lastScrollY = useRef(0);
  const scrollVelocityRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      scrollVelocityRef.current = Math.abs(currentScrollY - lastScrollY.current);
      setVelocity(scrollVelocityRef.current);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return velocity;
};

/**
 * Hook to detect if element is in viewport
 * Uses IntersectionObserver for performance
 * 
 * @param {React.RefObject} ref - Reference to the DOM element
 * @param {Object} options - IntersectionObserver options
 * @param {number} options.threshold - Visibility threshold (0-1)
 * @param {string} options.rootMargin - Root margin for the observer
 * @returns {boolean} Whether the element is visible in viewport
 */
export const useIsInViewport = (ref, { threshold = 0.1, rootMargin = '0px' } = {}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold, rootMargin }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref, threshold, rootMargin]);

  return isVisible;
};

/**
 * Hook to detect touch device
 * Useful for disabling hover effects and cursor effects
 */
export const useTouchDevice = () => {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const hasTouch = () => {
      return (
        window.matchMedia('(pointer: coarse)').matches ||
        window.matchMedia('(hover: none)').matches ||
        navigator.maxTouchPoints > 0
      );
    };

    setIsTouch(hasTouch());
  }, []);

  return isTouch;
};

/**
 * Hook for debounced value
 * Useful for input fields and expensive operations
 */
export const useDebouncedValue = (value, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

/**
 * Hook to detect battery saver mode (for performance optimization)
 */
export const useBatterySaverMode = () => {
  const [isBatterySaver, setIsBatterySaver] = useState(false);

  useEffect(() => {
    if ('getBattery' in navigator) {
      navigator.getBattery().then((battery) => {
        const updateBatterySaver = () => {
          setIsBatterySaver(!battery.charging && battery.level < 0.2);
        };

        updateBatterySaver();
        battery.addEventListener('levelchange', updateBatterySaver);
        battery.addEventListener('chargingchange', updateBatterySaver);

        return () => {
          battery.removeEventListener('levelchange', updateBatterySaver);
          battery.removeEventListener('chargingchange', updateBatterySaver);
        };
      });
    }
  }, []);

  return isBatterySaver;
};
