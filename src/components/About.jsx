import React from 'react';
import '../styles/About.css';

const About = () => {
  return (
    <section id="about" className="about">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              I'm a Computer Science student at Vellore Institute of Technology with a strong passion 
              for creating innovative technological solutions. My journey in tech has been driven by 
              curiosity and a desire to solve real-world problems through code.
            </p>
            <p>
              With expertise in full-stack development using the MERN stack (MongoDB, Express, React, Node.js), 
              I've built multiple web applications from concept to deployment. My technical skills span across 
              Java, Python, JavaScript, and modern web technologies, enabling me to tackle diverse challenges 
              in software development.
            </p>
            <p>
              Beyond web development, I'm deeply interested in Artificial Intelligence and Machine Learning. 
              I've worked on projects involving Deep Learning, Natural Language Processing, and Large Language 
              Models, achieving significant results in areas like oil spill detection using computer vision. 
              I'm also experienced in IoT development, having created safety systems using Raspberry Pi.
            </p>
            <p>
              In addition to technical work, I've demonstrated leadership as a Content Team Lead at V Ideas, 
              where I led a 10-member team and increased Instagram engagement by 35% through data-driven 
              strategies. I'm always eager to collaborate on innovative projects and contribute to meaningful 
              technological advancements.
            </p>
          </div>

          <div className="about-info">
            <div className="info-item">
              <span className="info-label">Name:</span>
              <span className="info-value">Chinnapattu S Hari Krishna</span>
            </div>
            <div className="info-item">
              <span className="info-label">Location:</span>
              <span className="info-value">Andhra Pradesh, India</span>
            </div>
            <div className="info-item">
              <span className="info-label">Education:</span>
              <span className="info-value">B.Tech CSE, VIT-AP</span>
            </div>
            <div className="info-item">
              <span className="info-label">CGPA:</span>
              <span className="info-value">8.12</span>
            </div>
            <div className="info-item">
              <span className="info-label">Languages:</span>
              <span className="info-value">English, Telugu, Tamil</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
