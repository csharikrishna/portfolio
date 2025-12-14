import React from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import '../styles/Projects.css';

const Projects = () => {
  const projects = [
    {
      title: 'Oil Spill Detection Using Deep Learning',
      description: 'Built a DINOv2-Large SAR image classifier achieving 98.24% accuracy for detecting oil spills in satellite imagery.',
      technologies: ['Deep Learning', 'DINOv2-Large', 'Python', 'Computer Vision', 'SAR Imagery'],
      achievements: [
        '98.24% accuracy with 98.3% precision and 98.2% recall',
        'Less than 2% false-alarm rate across 5-fold cross-validation',
        'Real-time inference system with 5-7 second prediction time',
        'Optimized training using CLAHE, RandAugment, GridShuffle, EMA/SWA'
      ]
    },
    {
      title: 'Full-Stack Quiz Web App',
      description: 'Developed a comprehensive quiz platform using the MERN stack with real-time scoring, timer functionality, and analytics dashboard.',
      technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'REST APIs', 'Local Storage'],
      achievements: [
        'Complete MERN stack implementation with RESTful API',
        'Real-time scoring system with MCQ support',
        'Timer functionality for timed assessments',
        'Analytics dashboard with results visualization',
        'Local storage integration for persistent sessions'
      ]
    },
    {
      title: 'Gas Booking Alert & LPG Leakage Detection',
      description: 'Created an IoT-based safety system using Raspberry Pi Pico for detecting LPG leaks and managing gas refill bookings.',
      technologies: ['Raspberry Pi Pico', 'IoT', 'Python', 'Mobile App Development', 'Sensors'],
      achievements: [
        'Real-time LPG leakage detection and alert system',
        'Automated gas refill booking based on usage patterns',
        'Mobile notification system for safety alerts',
        'Gas usage monitoring and tracking'
      ]
    }
  ];

  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2 className="section-title">Featured Projects</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <div className="project-header">
                <h3 className="project-title">{project.title}</h3>
                <div className="project-links">
                  <a href="https://github.com/csharikrishna" target="_blank" rel="noopener noreferrer" aria-label="View on GitHub">
                    <FaGithub />
                  </a>
                </div>
              </div>
              
              <p className="project-description">{project.description}</p>
              
              <div className="project-tech">
                {project.technologies.map((tech, techIndex) => (
                  <span key={techIndex} className="tech-tag">{tech}</span>
                ))}
              </div>
              
              <ul className="project-achievements">
                {project.achievements.map((achievement, achIndex) => (
                  <li key={achIndex}>{achievement}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
