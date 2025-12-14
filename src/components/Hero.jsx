import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import '../styles/Hero.css';

const Hero = () => {
  const scrollToContact = () => {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <p className="hero-greeting">Hello, I'm</p>
          <h1 className="hero-name">Chinnapattu S Hari Krishna</h1>
          <h2 className="hero-title">Computer Science Student & Full-Stack Developer</h2>
          <p className="hero-description">
            Passionate about building impactful solutions with expertise in full-stack development, 
            AI/ML, and deep learning. Currently exploring Generative AI, LLMs, and NLP.
          </p>

          <div className="hero-buttons">
            <button onClick={scrollToContact} className="btn btn-primary">
              Get in Touch
            </button>
            <a 
              href="https://github.com/csharikrishna" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              View Projects
            </a>
          </div>

          <div className="hero-social">
            <a 
              href="https://github.com/csharikrishna" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
            >
              <FaGithub />
            </a>
            <a 
              href="https://linkedin.com/in/cs-harikrishna" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
            >
              <FaLinkedin />
            </a>
            <a 
              href="mailto:csharikrishna1806@gmail.com"
              aria-label="Email"
            >
              <FaEnvelope />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
