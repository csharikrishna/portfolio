import React, { useState, useRef, useEffect, useCallback } from 'react';
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
  FaSpinner,
  FaCheckCircle,
  FaExclamationCircle
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
  const [fieldErrors, setFieldErrors] = useState({});
  const [charCount, setCharCount] = useState(0);
  const [touchedFields, setTouchedFields] = useState({});

  // Environment Variables
  const EMAILJS_SERVICE_ID = import.meta.env.REACT_APP_EMAILJS_SERVICE_ID;
  const EMAILJS_TEMPLATE_ID = import.meta.env.REACT_APP_EMAILJS_TEMPLATE_ID;
  const EMAILJS_PUBLIC_KEY = import.meta.env.REACT_APP_EMAILJS_PUBLIC_KEY;

  // Auto-dismiss success message
  useEffect(() => {
    let timer;
    if (status.type === 'success') {
      timer = setTimeout(() => {
        setStatus({ type: '', message: '' });
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [status.type]);

  // Field validation
  const validateField = useCallback((name, value) => {
    let error = '';

    switch(name) {
      case 'user_name':
        if (!value.trim()) {
          error = 'Name is required';
        } else if (value.length < 2) {
          error = 'Name must be at least 2 characters';
        } else if (value.length > 50) {
          error = 'Name must be less than 50 characters';
        } else if (!/^[a-zA-Z\s]+$/.test(value)) {
          error = 'Name can only contain letters and spaces';
        }
        break;
      
      case 'user_email':
        if (!value.trim()) {
          error = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Please enter a valid email address';
        }
        break;
      
      case 'subject':
        if (!value.trim()) {
          error = 'Subject is required';
        } else if (value.length < 3) {
          error = 'Subject must be at least 3 characters';
        } else if (value.length > 100) {
          error = 'Subject must be less than 100 characters';
        }
        break;
      
      case 'message':
        if (!value.trim()) {
          error = 'Message is required';
        } else if (value.length < 10) {
          error = 'Message must be at least 10 characters';
        } else if (value.length > 500) {
          error = 'Message must be less than 500 characters';
        }
        break;
      
      default:
        break;
    }

    setFieldErrors(prev => ({
      ...prev,
      [name]: error
    }));

    return error === '';
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Update character count for message field
    if (name === 'message') {
      setCharCount(value.length);
    }

    // Real-time validation if field has been touched
    if (touchedFields[name]) {
      validateField(name, value);
    }

    // Clear global error when user starts typing
    if (status.type === 'error') {
      setStatus({ type: '', message: '' });
    }
  };

  // Handle field blur
  const handleBlur = (e) => {
    const { name, value } = e.target;
    
    setTouchedFields(prev => ({
      ...prev,
      [name]: true
    }));

    validateField(name, value);
  };

  // Form validation
  const validateForm = () => {
    const errors = {};
    let isValid = true;

    Object.keys(formData).forEach(key => {
      if (!validateField(key, formData[key])) {
        isValid = false;
      }
    });

    setTouchedFields({
      user_name: true,
      user_email: true,
      subject: true,
      message: true
    });

    if (!isValid) {
      setStatus({ 
        type: 'error', 
        message: 'Please fix the errors above before submitting.' 
      });
    }

    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check environment variables
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      setStatus({
        type: 'error',
        message: 'Email service is not configured. Please contact me via phone or WhatsApp.'
      });
      console.error('Missing EmailJS environment variables');
      return;
    }

    if (!validateForm()) return;

    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        form.current,
        EMAILJS_PUBLIC_KEY
      );

      setStatus({
        type: 'success',
        message: '✨ Message sent successfully! I\'ll get back to you soon.'
      });

      // Clear form
      setFormData({
        user_name: '',
        user_email: '',
        subject: '',
        message: ''
      });
      setCharCount(0);
      setFieldErrors({});
      setTouchedFields({});

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

  // Ripple effect
  const handleRipple = (e) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';

    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
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
      color: '#333333'
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
      <div className="contact-bg-decoration" aria-hidden="true">
        <div className="contact-blob contact-blob-1"></div>
        <div className="contact-blob contact-blob-2"></div>
      </div>

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
                <div 
                  key={index} 
                  className="contact-method" 
                  style={{ '--method-color': method.color }}
                >
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
                        onClick={handleRipple}
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
                    onClick={handleRipple}
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
                <div className="input-wrapper">
                  <input
                    type="text"
                    id="user_name"
                    name="user_name"
                    value={formData.user_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="John Doe"
                    disabled={isSubmitting}
                    className={fieldErrors.user_name && touchedFields.user_name ? 'input-error' : ''}
                    aria-invalid={!!(fieldErrors.user_name && touchedFields.user_name)}
                    aria-describedby={fieldErrors.user_name ? 'user_name-error' : undefined}
                  />
                  {!fieldErrors.user_name && formData.user_name && touchedFields.user_name && (
                    <span className="input-success-icon" aria-label="Valid">
                      <FaCheckCircle />
                    </span>
                  )}
                </div>
                {fieldErrors.user_name && touchedFields.user_name && (
                  <span className="field-error" id="user_name-error" role="alert">
                    <FaExclamationCircle /> {fieldErrors.user_name}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="user_email">
                  Email <span className="required">*</span>
                </label>
                <div className="input-wrapper">
                  <input
                    type="email"
                    id="user_email"
                    name="user_email"
                    value={formData.user_email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="john.doe@example.com"
                    disabled={isSubmitting}
                    className={fieldErrors.user_email && touchedFields.user_email ? 'input-error' : ''}
                    aria-invalid={!!(fieldErrors.user_email && touchedFields.user_email)}
                    aria-describedby={fieldErrors.user_email ? 'user_email-error' : undefined}
                  />
                  {!fieldErrors.user_email && formData.user_email && touchedFields.user_email && (
                    <span className="input-success-icon" aria-label="Valid">
                      <FaCheckCircle />
                    </span>
                  )}
                </div>
                {fieldErrors.user_email && touchedFields.user_email && (
                  <span className="field-error" id="user_email-error" role="alert">
                    <FaExclamationCircle /> {fieldErrors.user_email}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="subject">
                  Subject <span className="required">*</span>
                </label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Project Discussion"
                    disabled={isSubmitting}
                    className={fieldErrors.subject && touchedFields.subject ? 'input-error' : ''}
                    aria-invalid={!!(fieldErrors.subject && touchedFields.subject)}
                    aria-describedby={fieldErrors.subject ? 'subject-error' : undefined}
                  />
                  {!fieldErrors.subject && formData.subject && touchedFields.subject && (
                    <span className="input-success-icon" aria-label="Valid">
                      <FaCheckCircle />
                    </span>
                  )}
                </div>
                {fieldErrors.subject && touchedFields.subject && (
                  <span className="field-error" id="subject-error" role="alert">
                    <FaExclamationCircle /> {fieldErrors.subject}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="message">
                  Message <span className="required">*</span>
                </label>
                <div className="textarea-wrapper">
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Tell me about your project, timeline, or specific requirements..."
                    rows="6"
                    disabled={isSubmitting}
                    maxLength="500"
                    className={fieldErrors.message && touchedFields.message ? 'input-error' : ''}
                    aria-invalid={!!(fieldErrors.message && touchedFields.message)}
                    aria-describedby={fieldErrors.message ? 'message-error' : 'message-hint'}
                  ></textarea>
                  <span 
                    className={`char-count ${charCount > 450 ? 'char-count-warning' : ''}`}
                    aria-live="polite"
                  >
                    {charCount}/500
                  </span>
                </div>
                {fieldErrors.message && touchedFields.message && (
                  <span className="field-error" id="message-error" role="alert">
                    <FaExclamationCircle /> {fieldErrors.message}
                  </span>
                )}
              </div>

              {/* Status Message */}
              {status.message && (
                <div
                  className={`form-status ${status.type}`}
                  role="alert"
                  aria-live="polite"
                >
                  <div className="status-icon">
                    {status.type === 'success' ? <FaCheckCircle /> : <FaExclamationCircle />}
                  </div>
                  <p>{status.message}</p>
                </div>
              )}

              <button
                type="submit"
                className={`submit-btn ${isSubmitting ? 'loading' : ''}`}
                disabled={isSubmitting}
                onClick={handleRipple}
              >
                <span className="btn-text">
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </span>
                <span className="btn-icon-wrapper">
                  {isSubmitting ? (
                    <FaSpinner className="btn-spinner" />
                  ) : (
                    <FaPaperPlane className="btn-icon" />
                  )}
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
