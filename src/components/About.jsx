import React from 'react';
import { FaUser, FaMapMarkerAlt, FaGraduationCap, FaAward, FaLanguage } from 'react-icons/fa';
import '../styles/About.css';

const About = () => {
  const infoItems = [
    {
      icon: <FaUser />,
      label: 'Name',
      value: 'Chinnapattu S Hari Krishna'
    },
    {
      icon: <FaMapMarkerAlt />,
      label: 'Location',
      value: 'Andhra Pradesh, India'
    },
    {
      icon: <FaGraduationCap />,
      label: 'Education',
      value: 'B.Tech CSE, VIT-AP'
    },
    {
      icon: <FaAward />,
      label: 'CGPA',
      value: '8.12'
    },
    {
      icon: <FaLanguage />,
      label: 'Languages',
      value: 'English, Telugu, Tamil'
    }
  ];

  return (
    <section id="about" className="about">
      <div className="about-bg-decoration"></div>
      <div className="about-container">
        <div className="about-header">
          <h2 className="about-title">About Me</h2>
          <p className="about-subtitle">
            Passionate developer building innovative solutions with code
          </p>
        </div>

        <div className="about-content">
          <div className="about-text-card">
            <article className="about-article">
              <h3 className="section-heading">Professional Background</h3>
              <p className="about-intro">
                I'm a Computer Science student at Vellore Institute of Technology with a strong passion 
                for creating innovative technological solutions. My journey in tech has been driven by 
                curiosity and a desire to solve real-world problems through code.
              </p>
              
              <h3 className="section-heading">Full-Stack Development Expertise</h3>
              <p>
                With expertise in full-stack development using the MERN stack (MongoDB, Express, React, Node.js), 
                I've built multiple web applications from concept to deployment. My technical skills span across 
                Java, Python, JavaScript, and modern web technologies, enabling me to tackle diverse challenges 
                in software development.
              </p>
              
              <h3 className="section-heading">AI & Machine Learning Focus</h3>
              <p>
                Beyond web development, I'm deeply interested in Artificial Intelligence and Machine Learning. 
                I've worked on projects involving:
              </p>
              <ul className="ai-focus-list">
                <li><strong>Computer Vision:</strong> Oil spill detection using deep learning models</li>
                <li><strong>Natural Language Processing:</strong> Text analysis and language understanding</li>
                <li><strong>Large Language Models:</strong> Working with LLMs through prompt engineering and IBM WatsonX</li>
                <li><strong>IoT Development:</strong> Safety systems using Raspberry Pi and embedded systems</li>
              </ul>

              <h3 className="section-heading">Leadership & Impact</h3>
              <p>
                In addition to technical work, I've demonstrated leadership as a Content Team Lead at V Ideas, 
                where I led a 10-member team and increased Instagram engagement by 35% through data-driven 
                strategies. I'm always eager to collaborate on innovative projects and contribute to meaningful 
                technological advancements.
              </p>
            </article>
          </div>

          <div className="about-info-card">
            <div className="info-card-glow"></div>
            <h3 className="info-card-title">Quick Info</h3>
            <div className="info-items-wrapper">
              {infoItems.map((item, index) => (
                <div 
                  key={index} 
                  className="info-item"
                  style={{ '--animation-order': index }}
                >
                  <div className="info-icon">
                    {item.icon}
                  </div>
                  <div className="info-content">
                    <span className="info-label">{item.label}</span>
                    <span className="info-value">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
