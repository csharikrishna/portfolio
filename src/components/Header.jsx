import React, { useState, useEffect, useRef, useCallback, useMemo, memo } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import ThemeToggle from './ui/ThemeToggle';
import '../styles/Header.css';

/**
 * Header Component
 * 
 * Provides main navigation with:
 * - Scroll-based visibility (auto-hide on scroll down)
 * - Active section detection via IntersectionObserver
 * - Mobile responsive menu with focus trap
 * - Theme toggle integration
 * - Keyboard accessibility
 */

// Navigation items - defined at module level to prevent recreation
const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' }
];

const Header = memo(() => {

  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState('up');
  const [isFastScroll, setIsFastScroll] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const lastScrollY = useRef(0);
  const scrollVelocity = useRef(0);
  const ticking = useRef(false);
  const observerRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const menuToggleRef = useRef(null);

  // Enhanced scroll detection with direction and velocity
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;
      scrollVelocity.current = Math.abs(delta);

      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          // Update scroll state
          setIsScrolled(currentScrollY > 50);

          // Detect scroll direction
          if (Math.abs(delta) > 5) {
            setScrollDirection(delta > 0 ? 'down' : 'up');
          }

          // Fast scroll detection with adaptive blur
          if (scrollVelocity.current > 30) {
            setIsFastScroll(true);
            const blurIntensity = Math.min(60 + scrollVelocity.current * 0.5, 80);
            document.documentElement.style.setProperty(
              '--blur-intensity-fast',
              `${blurIntensity}px`
            );
          } else {
            setIsFastScroll(false);
          }

          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;

    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '0px';
    } else {
      document.body.style.overflow = originalStyle;
      document.body.style.paddingRight = '';
    }

    return () => {
      document.body.style.overflow = originalStyle;
      document.body.style.paddingRight = '';
    };
  }, [isMobileMenuOpen]);

  // Active section detection with Intersection Observer
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    observerRef.current = new IntersectionObserver(observerCallback, observerOptions);

    // Observe sections for active detection
    const observeSections = () => {
      NAV_ITEMS.forEach((item) => {
        const element = document.getElementById(item.id);
        if (element) {
          observerRef.current.observe(element);
        }
      });
    };

    observeSections();

    const mutationObserver = new MutationObserver((mutations) => {
      if (mutations.some(m => m.type === 'childList' && m.addedNodes.length > 0)) {
        observeSections();
      }
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  // Smooth scroll to section - memoized
  const scrollToSection = useCallback((sectionId) => {
    setIsMobileMenuOpen(false);

    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      setActiveSection(sectionId);
    }
  }, []);

  // Keyboard handlers - memoized
  const handleLogoKeyPress = useCallback((e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      scrollToSection('home');
    }
  }, [scrollToSection]);

  const handleNavKeyPress = useCallback((e, sectionId) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      scrollToSection(sectionId);
    }
  }, [scrollToSection]);


  // Close menu on Escape key and handle focus trap
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
        // Return focus to menu toggle button
        menuToggleRef.current?.focus();
      }
    };

    // Focus first menu item when opened
    const firstMenuItem = mobileMenuRef.current?.querySelector('.mobile-nav-link');
    if (firstMenuItem) {
      firstMenuItem.focus();
    }

    // Trap focus within mobile menu
    const handleTabKey = (e) => {
      if (e.key !== 'Tab') return;

      const focusableElements = mobileMenuRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (!focusableElements || focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('keydown', handleTabKey);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('keydown', handleTabKey);
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={`header ${isScrolled ? 'scrolled' : ''} ${scrollDirection === 'down' ? 'hide' : 'show'} ${isFastScroll ? 'fast-scroll' : ''}`}
        role="banner"
      >
        <div className="header-container">
          <div
            className="logo"
            onClick={() => scrollToSection('home')}
            onKeyDown={handleLogoKeyPress}
            tabIndex={0}
            role="button"
            aria-label="Go to home section"
          >
            <div className="logo-inner">
              <h2>HK</h2>
            </div>
          </div>

          <nav className="nav" role="navigation" aria-label="Main navigation">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                onKeyDown={(e) => handleNavKeyPress(e, item.id)}
                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                aria-label={`Navigate to ${item.label}`}
                aria-current={activeSection === item.id ? 'page' : undefined}
              >
                <span className="nav-link-text">{item.label}</span>
                {activeSection === item.id && <span className="nav-indicator" aria-hidden="true" />}
              </button>
            ))}
          </nav>

          <div className="header-actions">
            <ThemeToggle />
          </div>

          <button
            ref={menuToggleRef}
            className={`mobile-menu-toggle ${isMobileMenuOpen ? 'open' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close mobile menu' : 'Open mobile menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            <span className="toggle-icon">
              {isMobileMenuOpen ? <FaTimes aria-hidden="true" /> : <FaBars aria-hidden="true" />}
            </span>
          </button>
        </div>
      </header>

      <div
        className={`mobile-overlay ${isMobileMenuOpen ? 'active' : ''}`}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden="true"
        role="presentation"
      />

      <div
        id="mobile-navigation"
        ref={mobileMenuRef}
        className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        <nav className="mobile-nav" role="navigation" aria-label="Mobile navigation">
          {NAV_ITEMS.map((item, index) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              onKeyDown={(e) => handleNavKeyPress(e, item.id)}
              className={`mobile-nav-link ${activeSection === item.id ? 'active' : ''}`}
              style={{ '--animation-order': index }}
              aria-label={`Navigate to ${item.label}`}
              aria-current={activeSection === item.id ? 'page' : undefined}
            >
              <span className="mobile-nav-text">{item.label}</span>
              {activeSection === item.id && (
                <span className="mobile-nav-indicator" aria-hidden="true">●</span>
              )}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
});

// Display name for React DevTools
Header.displayName = 'Header';

export default Header;
