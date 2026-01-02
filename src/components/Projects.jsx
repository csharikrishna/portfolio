import React, { useState, useRef, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import '../styles/Projects.css';

const ProjectCard = ({ project, index }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
    rootMargin: '50px'
  });

  const [showAllTech, setShowAllTech] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div 
      ref={ref}
      className={`project-card ${inView ? 'animate-in' : ''}`}
      style={{ '--animation-order': index }}
    >
      <div className="project-header">
        <div className="project-user-info">
          <div className="project-avatar" aria-hidden="true">
            {project.title.charAt(0)}
          </div>
          <div className="project-meta">
            <h3 className="project-title">{project.title}</h3>
            <span className="project-location">{project.category}</span>
          </div>
        </div>
        <div className="project-links">
          {project.github && (
            <a 
              href={project.github} 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label={`View ${project.title} on GitHub`}
            >
              <FaGithub />
            </a>
          )}
          {project.demo && (
            <a 
              href={project.demo} 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label={`View ${project.title} live demo`}
            >
              <FaExternalLinkAlt />
            </a>
          )}
        </div>
      </div>

      <div className="project-content">
        <p className="project-description">{project.description}</p>

        <div className="project-tech" role="list" aria-label="Technologies used">
          {(showAllTech ? project.technologies : project.technologies.slice(0, 3)).map((tech, techIndex) => (
            <span 
              key={techIndex} 
              className="tech-tag" 
              role="listitem"
              title={`Technology: ${tech}`}
            >
              {tech}
            </span>
          ))}
          {!showAllTech && project.technologies.length > 3 && (
            <button 
              className="tech-tag tech-more"
              onClick={() => setShowAllTech(true)}
              aria-label={`Show ${project.technologies.length - 3} more technologies`}
            >
              +{project.technologies.length - 3}
            </button>
          )}
        </div>

        <ul className="project-achievements" aria-label="Project achievements">
          {(showDetails ? project.achievements : project.achievements.slice(0, 2)).map((achievement, achIndex) => (
            <li key={achIndex}>{achievement}</li>
          ))}
        </ul>

        <button 
          className="project-toggle-btn"
          onClick={() => setShowDetails(!showDetails)}
          aria-expanded={showDetails}
          aria-label={showDetails ? 'Show less details' : 'Show more details'}
        >
          {showDetails ? 'Show Less' : 'View Full Details'}
        </button>
      </div>
    </div>
  );
};

const Projects = () => {
  const projects = [
    {
      title: 'Oil Spill Detection Using Deep Learning',
      category: 'Machine Learning',
      description: 'Built a DINOv2-Large SAR image classifier achieving 98.24% accuracy for detecting oil spills in satellite imagery.',
      technologies: ['Deep Learning', 'DINOv2-Large', 'Python', 'Computer Vision', 'SAR Imagery', 'PyTorch'],
      achievements: [
        '98.24% accuracy with 98.3% precision and 98.2% recall',
        'Less than 2% false-alarm rate across 5-fold cross-validation',
        'Real-time inference system with 5-7 second prediction time',
        'Optimized training using CLAHE, RandAugment, GridShuffle, EMA/SWA'
      ],
      github: 'https://github.com/csharikrishna',
      demo: null
    },
    {
      title: 'Full-Stack Quiz Web App',
      category: 'Full-Stack Development',
      description: 'Developed a comprehensive quiz platform using the MERN stack with real-time scoring, timer functionality, and analytics dashboard.',
      technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'REST APIs', 'Local Storage'],
      achievements: [
        'Complete MERN stack implementation with RESTful API',
        'Real-time scoring system with MCQ support',
        'Timer functionality for timed assessments',
        'Analytics dashboard with results visualization',
        'Local storage integration for persistent sessions'
      ],
      github: 'https://github.com/csharikrishna',
      demo: null
    },
    {
      title: 'Gas Booking Alert & LPG Leakage Detection',
      category: 'IoT Development',
      description: 'Created an IoT-based safety system using Raspberry Pi Pico for detecting LPG leaks and managing gas refill bookings.',
      technologies: ['Raspberry Pi Pico', 'IoT', 'Python', 'Mobile App Development', 'Sensors', 'MQTT'],
      achievements: [
        'Real-time LPG leakage detection and alert system',
        'Automated gas refill booking based on usage patterns',
        'Mobile notification system for safety alerts',
        'Gas usage monitoring and tracking'
      ],
      github: 'https://github.com/csharikrishna',
      demo: null
    }
  ];

  const [activeProject, setActiveProject] = useState(0);
  const scrollRef = useRef(null);
  const cardRefs = useRef([]);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const index = Math.round(scrollLeft / clientWidth);
      setActiveProject(index);
    }
  };

  const scrollToProject = (index) => {
    if (index < 0 || index >= projects.length) return;
    
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      const targetScroll = index * scrollContainer.clientWidth;
      scrollContainer.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
      setActiveProject(index);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'BUTTON') return;
      
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        scrollToProject(activeProject - 1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        scrollToProject(activeProject + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeProject]);

  // Touch momentum
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let isScrolling;
    const handleTouchScroll = () => {
      window.clearTimeout(isScrolling);
      isScrolling = setTimeout(() => {
        handleScroll();
      }, 66);
    };

    scrollContainer.addEventListener('scroll', handleTouchScroll);
    return () => scrollContainer.removeEventListener('scroll', handleTouchScroll);
  }, []);

  return (
    <section id="projects" className="projects">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">
            Innovative solutions across Machine Learning, Full-Stack, and IoT domains
          </p>
        </div>

        <div
          className="projects-grid"
          ref={scrollRef}
          onScroll={handleScroll}
          role="region"
          aria-label="Featured projects carousel"
          aria-live="polite"
        >
          {projects.map((project, index) => (
            <ProjectCard 
              key={index} 
              project={project} 
              index={index}
              ref={el => cardRefs.current[index] = el}
            />
          ))}
        </div>

        {/* Dots Navigation */}
        <div className="project-dots" role="tablist" aria-label="Project navigation">
          {projects.map((project, index) => (
            <button
              key={index}
              className={`dot ${activeProject === index ? 'active' : ''}`}
              onClick={() => scrollToProject(index)}
              role="tab"
              aria-selected={activeProject === index}
              aria-label={`View ${project.title}`}
              aria-controls={`project-${index}`}
            />
          ))}
        </div>

        {/* Keyboard hint for desktop */}
        <p className="keyboard-hint" aria-hidden="true">
          Use ← → arrow keys to navigate
        </p>
      </div>
    </section>
  );
};

export default Projects;
