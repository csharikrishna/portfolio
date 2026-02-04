import React, { useState, useEffect, useCallback, useMemo } from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowRight } from "react-icons/fa";
import { motion, useReducedMotion } from "framer-motion";
import Snowfall from "react-snowfall";
import "../styles/Hero.css";

const ROLES = [
  "transform ideas into intelligent systems",
  "build scalable, future-ready solutions",
  "solve complex problems with AI/ML",
  "create seamless user experiences",
];

// SVG Data URIs for custom snowflakes
const SNOWFLAKE1 = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23bae6fd' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cline x1='12' y1='2' x2='12' y2='22'/%3E%3Cline x1='2' y1='12' x2='22' y2='12'/%3E%3Cline x1='4.93' y1='4.93' x2='19.07' y2='19.07'/%3E%3Cline x1='19.07' y1='4.93' x2='4.93' y2='19.07'/%3E%3C/svg%3E`;
const SNOWFLAKE2 = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23e0f2fe' stroke='none'%3E%3Ccircle cx='12' cy='12' r='4'/%3E%3Cpath d='M12 2v4M12 18v4M2 12h4M18 12h4' stroke='%23e0f2fe' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E`;
const SNOWFLAKE3 = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%237dd3fc' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 2v20M2 12h20'/%3E%3Cpath d='m4 4 16 16M4 20 20 4'/%3E%3Ccircle cx='12' cy='12' r='3'/%3E%3C/svg%3E`;

/**
 * Hero Section Component
 * Displays the main landing section with animated typewriter effect,
 * snowfall animation, and social links.
 */
const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [snowflakeImages, setSnowflakeImages] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  const shouldReduceMotion = useReducedMotion();

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Load snowflake images
  useEffect(() => {
    const images = [SNOWFLAKE1, SNOWFLAKE2, SNOWFLAKE3].map((src) => {
      const img = document.createElement("img");
      img.src = src;
      return img;
    });
    setSnowflakeImages(images);
  }, []);

  // Typewriter Effect
  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayedText(ROLES[roleIndex]);
      return;
    }

    const currentRole = ROLES[roleIndex];
    const typeSpeed = isDeleting ? 30 : 60;

    const timer = setTimeout(() => {
      if (!isDeleting && displayedText === currentRole) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayedText === "") {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % ROLES.length);
      } else {
        const nextText = isDeleting
          ? currentRole.substring(0, displayedText.length - 1)
          : currentRole.substring(0, displayedText.length + 1);
        setDisplayedText(nextText);
      }
    }, typeSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, roleIndex, shouldReduceMotion]);

  // Scroll to contact section handler - memoized to prevent re-renders
  const scrollToContact = useCallback(() => {
    const section = document.getElementById("contact");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Animation variants - memoized for performance
  const fadeInUpVariant = useMemo(() => ({
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: { opacity: 1, y: 0 }
  }), [shouldReduceMotion]);

  return (
    <section id="home" className="hero">
      {/* Snowfall Effect */}
      {!shouldReduceMotion && snowflakeImages.length > 0 && (
        <Snowfall
          color="#bae6fd"
          snowflakeCount={isMobile ? 40 : 80}
          radius={[4, 10]}
          speed={[0.5, 2]}
          wind={[-0.5, 1]}
          rotationSpeed={[-0.5, 0.5]}
          images={snowflakeImages}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 0,
          }}
        />
      )}

      {/* Floating decorative blobs */}
      <div className="hero-decoration" aria-hidden="true">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      <div className="hero-container">
        <div className="hero-content">
          <motion.p
            className="hero-greeting"
            initial="hidden"
            animate="visible"
            variants={fadeInUpVariant}
            transition={{ duration: 0.5, delay: 0 }}
          >
            Hello, I&apos;m
          </motion.p>

          <motion.h1
            className="hero-name"
            initial="hidden"
            animate="visible"
            variants={fadeInUpVariant}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Chinnapattu S Hari Krishna
          </motion.h1>

          <motion.h2
            className="hero-title"
            initial="hidden"
            animate="visible"
            variants={fadeInUpVariant}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            Computer Science Student & Full-Stack Developer
          </motion.h2>

          <motion.div
            className="hero-tagline-wrapper"
            initial="hidden"
            animate="visible"
            variants={fadeInUpVariant}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="hero-tagline">
              I <span className="highlight-text">{displayedText}</span>
              {!shouldReduceMotion && <span className="cursor-blink">|</span>}
            </p>
          </motion.div>

          <motion.p
            className="hero-description"
            initial="hidden"
            animate="visible"
            variants={fadeInUpVariant}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            Passionate about building intelligent, scalable solutions using
            full-stack development, AI/ML, and deep learning. Currently exploring
            Generative AI, Large Language Models, and NLP-driven systems.
          </motion.p>

          <motion.div
            className="hero-buttons"
            initial="hidden"
            animate="visible"
            variants={fadeInUpVariant}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <button
              onClick={scrollToContact}
              className="btn btn-primary"
              {...(!shouldReduceMotion && {
                whileHover: { scale: 1.05, y: -2 },
                whileTap: { scale: 0.98 }
              })}
            >
              Get in Touch
              <FaArrowRight className="btn-icon" />
            </button>

            <a
              href="https://github.com/csharikrishna"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              {...(!shouldReduceMotion && {
                whileHover: { scale: 1.05, y: -2 },
                whileTap: { scale: 0.98 }
              })}
            >
              View Projects
            </a>
          </motion.div>

          <motion.div
            className="hero-social"
            initial="hidden"
            animate="visible"
            variants={fadeInUpVariant}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            <a
              href="https://github.com/csharikrishna"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="social-link"
            >
              <FaGithub />
            </a>

            <a
              href="https://linkedin.com/in/cs-harikrishna"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="social-link"
            >
              <FaLinkedin />
            </a>

            <a
              href="mailto:csharikrishna1806@gmail.com"
              aria-label="Email"
              className="social-link"
            >
              <FaEnvelope />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      {!shouldReduceMotion && (
        <motion.div
          className="scroll-indicator"
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 1.2, duration: 1.5, repeat: Infinity }}
        >
          <div className="scroll-wheel"></div>
        </motion.div>
      )}
    </section>
  );
};

export default Hero;
