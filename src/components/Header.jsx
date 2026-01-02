import React, { useState, useEffect, useRef } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import '../styles/Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isFastScroll, setIsFastScroll] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  
  const lastScrollY = useRef(0);
  const scrollVelocity = useRef(0);
  const ticking = useRef(false);

  // Scroll detection with velocity tracking
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      scrollVelocity.current = Math.abs(currentScrollY - lastScrollY.current);
      
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          setIsScrolled(currentScrollY > 50);
          
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

  // FIXED: Lock body scroll WITHOUT position fixed - prevents scroll jump
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '0px'; // Prevent layout shift
    } else {
      document.body.style.overflow = originalStyle;
      document.body.style.paddingRight = '';
    }
    
    return () => {
      document.body.style.overflow = originalStyle;
      document.body.style.paddingRight = '';
    };
  }, [isMobileMenuOpen]);

  // Active section detection using Intersection Observer
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    navItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  // FIXED: Clean scroll to section - no delays needed
  const scrollToSection = (sectionId) => {
    // Close menu first
    setIsMobileMenuOpen(false);
    
    // Scroll to section
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
  };

  const handleLogoKeyPress = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      scrollToSection('home');
    }
  };

  const handleNavKeyPress = (e, sectionId) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      scrollToSection(sectionId);
    }
  };

  // Close menu on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen]);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <>
      <header 
        className={`header ${isScrolled ? 'scrolled' : ''} ${isFastScroll ? 'fast-scroll' : ''}`}
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
            <h2>HK</h2>
          </div>

          <nav className="nav" role="navigation" aria-label="Main navigation">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                onKeyDown={(e) => handleNavKeyPress(e, item.id)}
                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                aria-label={`Navigate to ${item.label}`}
                aria-current={activeSection === item.id ? 'page' : undefined}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button
            className={`mobile-menu-toggle ${isMobileMenuOpen ? 'open' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close mobile menu' : 'Open mobile menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMobileMenuOpen ? <FaTimes aria-hidden="true" /> : <FaBars aria-hidden="true" />}
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
        className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        <nav className="mobile-nav" role="navigation" aria-label="Mobile navigation">
          {navItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              onKeyDown={(e) => handleNavKeyPress(e, item.id)}
              className={`mobile-nav-link ${activeSection === item.id ? 'active' : ''}`}
              style={{ '--animation-order': index }}
              aria-label={`Navigate to ${item.label}`}
              aria-current={activeSection === item.id ? 'page' : undefined}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Header;
