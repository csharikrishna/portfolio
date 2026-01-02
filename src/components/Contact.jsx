import React, { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaWhatsapp,
  FaPaperPlane,
  FaSpinner // Added a spinner icon for loading state
} from 'react-icons/fa';
import '../styles/Contact.css';

const Contact = () => {
  const form = useRef();

  // State Management
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Environment Variables

  const EMAILJS_SERVICE_ID = import.meta.env.REACT_APP_EMAILJS_SERVICE_ID;
  const EMAILJS_TEMPLATE_ID = import.meta.env.REACT_APP_EMAILJS_TEMPLATE_ID;
  const EMAILJS_PUBLIC_KEY = import.meta.env.REACT_APP_EMAILJS_PUBLIC_KEY;

  // Cleanup timer on unmount
  useEffect(() => {
    let timer;
    if (status.type === 'success') {
      timer = setTimeout(() => {
        setStatus({ type: '', message: '' });
      }, 5000); // Auto-dismiss success message after 5 seconds
    }
    return () => clearTimeout(timer);
  }, [status.type]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error message when user starts typing again
    if (status.type === 'error') {
      setStatus({ type: '', message: '' });
    }
  };

  const validateForm = () => {
    if (!formData.user_name.trim()) {
      setStatus({ type: 'error', message: 'Please enter your name.' });
      return false;
    }
    if (!formData.user_email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.user_email)) {
      setStatus({ type: 'error', message: 'Please enter a valid email address.' });
      return false;
    }
    if (!formData.subject.trim()) {
      setStatus({ type: 'error', message: 'Please enter a subject.' });
      return false;
    }
    if (!formData.message.trim()) {
      setStatus({ type: 'error', message: 'Please enter your message.' });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if env vars exist before attempting
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      setStatus({
        type: 'error',
        message: 'Email service is not configured correctly. Please contact via phone.'
      });
      console.error('Missing EmailJS environment variables');
      return;
    }

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        form.current,
        EMAILJS_PUBLIC_KEY
      );

      // Success Logic
      setStatus({
        type: 'success',
        message: 'Message sent successfully! I will get back to you soon.'
      });

      // Clear Form
      setFormData({
        user_name: '',
        user_email: '',
        subject: '',
        message: ''
      });

    } catch (error) {
      console.error('Email send failed:', error);
      setStatus({
        type: 'error',
        message: 'Failed to send message. Please try again or use WhatsApp.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: <FaEnvelope />,
      title: 'Email',
      value: 'csharikrishna1806@gmail.com',
      link: 'mailto:csharikrishna1806@gmail.com',
      color: '#ef4444'
    },
    {
      icon: <FaPhone />,
      title: 'Phone',
      value: '+91 9398345393',
      link: 'tel:+919398345393',
      color: '#10b981'
    },
    {
      icon: <FaWhatsapp />,
      title: 'WhatsApp',
      value: 'Message me',
      link: 'https://wa.me/919398345393',
      color: '#25d366'
    },
    {
      icon: <FaMapMarkerAlt />,
      title: 'Location',
      value: 'Andhra Pradesh, India',
      link: null,
      color: '#3b82f6'
    }
  ];

  const socialLinks = [
    {
      name: 'GitHub',
      icon: <FaGithub />,
      url: 'https://github.com/csharikrishna',
      color: '#ffffff' // Consider changing to #333 for light mode visibility if needed
    },
    {
      name: 'LinkedIn',
      icon: <FaLinkedin />,
      url: 'https://www.linkedin.com/in/cs-harikrishna/',
      color: '#0077b5'
    },
    {
      name: 'Twitter',
      icon: <FaTwitter />,
      url: 'https://x.com/harikrishnacs__',
      color: '#1da1f2'
    },
    {
      name: 'Instagram',
      icon: <FaInstagram />,
      url: 'https://www.instagram.com/harikrishnacs__/',
      color: '#e4405f'
    }
  ];

  return (
    <section id="contact" className="contact">
      <div className="contact-container">
        <div className="contact-header">
          <h2 className="contact-title">Get in Touch</h2>
          <p className="contact-subtitle">
            Let's discuss new projects, creative ideas, or opportunities to collaborate
          </p>
        </div>

        <div className="contact-content">
          {/* Contact Info Card */}
          <div className="contact-info-card">
            <div className="contact-info-header">
              <h3>Let's Connect</h3>
              <p>
                I'm always open to discussing new projects, creative ideas, or opportunities to
                be part of your vision. Feel free to reach out!
              </p>
            </div>

            <div className="contact-methods">
              {contactMethods.map((method, index) => (
                <div key={index} className="contact-method" style={{ '--method-color': method.color }}>
                  <div className="contact-method-icon">
                    {method.icon}
                  </div>
                  <div className="contact-method-content">
                    <h4>{method.title}</h4>
                    {method.link ? (
                      <a
                        href={method.link}
                        target={method.link.startsWith('http') ? '_blank' : undefined}
                        rel={method.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                      >
                        {method.value}
                      </a>
                    ) : (
                      <p>{method.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="contact-divider"></div>

            <div className="contact-social">
              <h4>Follow Me</h4>
              <div className="contact-social-links">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    className="contact-social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    title={social.name}
                    style={{ '--social-color': social.color }}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form Card */}
          <div className="contact-form-card">
            <form ref={form} onSubmit={handleSubmit} className="contact-form" noValidate>
              <div className="form-group">
                <label htmlFor="user_name">
                  Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="user_name"
                  name="user_name"
                  value={formData.user_name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  disabled={isSubmitting}
                  className={!formData.user_name && status.type === 'error' ? 'input-error' : ''}
                />
              </div>

              <div className="form-group">
                <label htmlFor="user_email">
                  Email <span className="required">*</span>
                </label>
                <input
                  type="email"
                  id="user_email"
                  name="user_email"
                  value={formData.user_email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  disabled={isSubmitting}
                  className={!formData.user_email && status.type === 'error' ? 'input-error' : ''}
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">
                  Subject <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What's this about?"
                  disabled={isSubmitting}
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">
                  Message <span className="required">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me more about your project or idea..."
                  rows="6"
                  disabled={isSubmitting}
                ></textarea>
              </div>

              {/* Status Message Area with Accessibility Support */}
              {status.message && (
                <div
                  className={`form-status ${status.type}`}
                  role="alert"
                  aria-live="polite"
                >
                  <div className="status-icon">
                    {status.type === 'success' ? '✓' : '✕'}
                  </div>
                  <p>{status.message}</p>
                </div>
              )}

              <button
                type="submit"
                className={`submit-btn ${isSubmitting ? 'loading' : ''}`}
                disabled={isSubmitting}
              >
                <span className="btn-text">
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </span>
                {isSubmitting ? (
                  <FaSpinner className="btn-icon spinner" />
                ) : (
                  <FaPaperPlane className="btn-icon" />
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;