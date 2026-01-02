import React from 'react';
import { 
  FaGithub, 
  FaLinkedin, 
  FaXTwitter,
  FaInstagram,
  FaEnvelope,
  FaWhatsapp,
  FaPhone,
  FaHeart,
  FaArrowUp
} from 'react-icons/fa6';
import '../styles/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

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
      ariaLabel: 'Visit my GitHub profile'
    },
    {
      name: 'LinkedIn',
      icon: <FaLinkedin />,
      url: 'https://www.linkedin.com/in/cs-harikrishna/',
      ariaLabel: 'Connect with me on LinkedIn'
    },
    {
      name: 'X (Twitter)',
      icon: <FaXTwitter />,
      url: 'https://x.com/harikrishnacs__',
      ariaLabel: 'Follow me on X (Twitter)'
    },
    {
      name: 'Instagram',
      icon: <FaInstagram />,
      url: 'https://www.instagram.com/harikrishnacs__/',
      ariaLabel: 'Follow me on Instagram'
    },
    {
      name: 'WhatsApp',
      icon: <FaWhatsapp />,
      url: 'https://wa.me/919398345393',
      ariaLabel: 'Message me on WhatsApp'
    },
    {
      name: 'Phone',
      icon: <FaPhone />,
      url: 'tel:+919398345393',
      ariaLabel: 'Call me'
    },
    {
      name: 'Email',
      icon: <FaEnvelope />,
      url: 'mailto:csharikrishna1806@gmail.com',
      ariaLabel: 'Send me an email'
    }
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand & Social Section */}
        <div className="footer-content">
          <div className="footer-brand">
            <h3 className="footer-logo">HK</h3>
            <p className="footer-tagline">
              Crafting digital experiences with passion and precision
            </p>
          </div>

          {/* Social Links */}
          <div className="footer-social">
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
                >
                  {social.icon}
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
            &copy; {currentYear} Chinnapattu S Hari Krishna. All rights reserved.
          </p>
          <p className="footer-built">
            Built with <FaHeart className="heart-icon" aria-hidden="true" /> using React
          </p>
        </div>

        {/* Scroll to Top Button */}
        <button
          className="scroll-to-top"
          onClick={scrollToTop}
          aria-label="Scroll to top"
          title="Back to top"
        >
          <FaArrowUp />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
