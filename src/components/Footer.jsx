import React, { useState, useEffect } from 'react';
import { 
  FaGithub, 
  FaLinkedin, 
  FaXTwitter,
  FaInstagram,
  FaEnvelope,
  FaWhatsapp,
  FaPhone,
  FaHeart,
  FaArrowUp,
  FaCode
} from 'react-icons/fa6';
import '../styles/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Handle scroll visibility and progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollY / windowHeight) * 100;

      setShowScrollTop(scrollY > 300);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const socialLinks = [
    {
      name: 'GitHub',
      icon: <FaGithub />,
      url: 'https://github.com/csharikrishna',
      ariaLabel: 'Visit my GitHub profile',
      color: '#ffffff'
    },
    {
      name: 'LinkedIn',
      icon: <FaLinkedin />,
      url: 'https://www.linkedin.com/in/cs-harikrishna/',
      ariaLabel: 'Connect with me on LinkedIn',
      color: '#0077b5'
    },
    {
      name: 'X (Twitter)',
      icon: <FaXTwitter />,
      url: 'https://x.com/harikrishnacs__',
      ariaLabel: 'Follow me on X (Twitter)',
      color: '#000000'
    },
    {
      name: 'Instagram',
      icon: <FaInstagram />,
      url: 'https://www.instagram.com/harikrishnacs__/',
      ariaLabel: 'Follow me on Instagram',
      color: '#e4405f'
    },
    {
      name: 'WhatsApp',
      icon: <FaWhatsapp />,
      url: 'https://wa.me/919398345393',
      ariaLabel: 'Message me on WhatsApp',
      color: '#25d366'
    },
    {
      name: 'Phone',
      icon: <FaPhone />,
      url: 'tel:+919398345393',
      ariaLabel: 'Call me',
      color: '#10b981'
    },
    {
      name: 'Email',
      icon: <FaEnvelope />,
      url: 'mailto:csharikrishna1806@gmail.com',
      ariaLabel: 'Send me an email',
      color: '#ef4444'
    }
  ];

  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <footer className="footer">
      {/* Animated Background */}
      <div className="footer-bg-decoration" aria-hidden="true">
        <div className="footer-grid-pattern"></div>
        <div className="footer-blob footer-blob-1"></div>
        <div className="footer-blob footer-blob-2"></div>
      </div>

      <div className="footer-container">
        {/* Main Content */}
        <div className="footer-content">
          {/* Brand Section */}
          <div className="footer-brand">
            <h3 className="footer-logo">
              <span className="logo-text">HK</span>
              <span className="logo-pulse" aria-hidden="true"></span>
            </h3>
            <p className="footer-tagline">
              Crafting digital experiences with passion and precision
            </p>
            <div className="footer-stats">
              <div className="stat-item">
                <FaCode aria-hidden="true" />
                <span>Full-Stack Developer</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="footer-heading">Quick Links</h4>
            <nav className="footer-links" aria-label="Footer navigation">
              {quickLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="footer-link"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector(link.href)?.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start'
                    });
                  }}
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Social Links */}
          <div className="footer-section">
            <h4 className="footer-heading">Let's Connect</h4>
            <div className="social-links">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  className="social-link"
                  target={social.url.startsWith('http') ? '_blank' : undefined}
                  rel={social.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={social.ariaLabel}
                  title={social.name}
                  style={{ '--social-color': social.color }}
                >
                  <span className="social-icon">{social.icon}</span>
                  <span className="social-tooltip">{social.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="footer-divider"></div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            <span className="copyright-symbol">©</span> {currentYear} Chinnapattu S Hari Krishna. All rights reserved.
          </p>
          
          <a 
            href="https://creativecommons.org/licenses/by-sa/4.0/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="license-btn"
          >
            <span className="license-icon">📜</span>
            <span className="license-text">CC BY-SA 4.0</span>
          </a>
          
          <p className="footer-built">
            Built with <FaHeart className="heart-icon" aria-hidden="true" /> using React
          </p>
        </div>

        {/* Dublin Core Metadata */}
        <div style={{ display: 'none' }}>
          <meta name="DCTERMS.creator" content="Chinnapattu S Hari Krishna" />
          <meta name="DCTERMS.date" content={new Date().toISOString().split('T')[0]} />
          <meta name="DCTERMS.rights" content={`© ${currentYear} Chinnapattu S Hari Krishna`} />
          <meta name="DCTERMS.identifier" content="https://csharikrishna.vercel.app" />
          <meta name="DCTERMS.language" content="en" />
        </div>

        {/* Scroll to Top Button with Progress */}
        <button
          className={`scroll-to-top ${showScrollTop ? 'visible' : ''}`}
          onClick={scrollToTop}
          aria-label="Scroll to top"
          title="Back to top"
        >
          <svg className="progress-ring" width="56" height="56">
            <circle
              className="progress-ring-circle"
              stroke="currentColor"
              strokeWidth="2"
              fill="transparent"
              r="26"
              cx="28"
              cy="28"
              style={{
                strokeDasharray: `${2 * Math.PI * 26}`,
                strokeDashoffset: `${2 * Math.PI * 26 * (1 - scrollProgress / 100)}`
              }}
            />
          </svg>
          <FaArrowUp className="scroll-icon" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
