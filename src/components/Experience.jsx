import React from 'react';
import '../styles/Experience.css';

const Experience = () => {
  const experiences = [
    {
      role: 'Content Team Lead',
      organization: 'V Ideas',
      period: '2023 - 2024',
      description: 'Led a 10-member content team, implementing editorial calendars and data-driven strategies that boosted Instagram engagement by 35% and expanded cross-platform reach.',
      achievements: [
        'Managed a team of 10 content creators',
        'Increased Instagram engagement by 35%',
        'Implemented data-driven content strategies',
        'Expanded cross-platform digital presence'
      ]
    }
  ];

  const certifications = [
    {
      name: 'MERN Full Stack Certification Program',
      issuer: 'Ethnus',
      description: 'Comprehensive full-stack development certification covering MongoDB, Express, React, and Node.js'
    },
    {
      name: 'Generative AI Using IBM WatsonX',
      issuer: 'IBM',
      description: 'Advanced certification in Generative AI technologies and IBM WatsonX platform'
    },
    {
      name: 'MongoDB Associate Database Administrator',
      issuer: 'MongoDB',
      description: 'Professional certification in MongoDB database administration and management'
    }
  ];

  return (
    <section id="experience" className="experience">
      <div className="container">
        <h2 className="section-title">Experience & Certifications</h2>
        
        <div className="experience-content">
          <div className="experience-section">
            <h3 className="subsection-title">Professional Experience</h3>
            {experiences.map((exp, index) => (
              <div key={index} className="experience-card">
                <div className="experience-header">
                  <div>
                    <h4 className="experience-role">{exp.role}</h4>
                    <p className="experience-org">{exp.organization}</p>
                  </div>
                  <span className="experience-period">{exp.period}</span>
                </div>
                <p className="experience-description">{exp.description}</p>
                <ul className="experience-achievements">
                  {exp.achievements.map((achievement, idx) => (
                    <li key={idx}>{achievement}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="certifications-section">
            <h3 className="subsection-title">Certifications</h3>
            {certifications.map((cert, index) => (
              <div key={index} className="certification-card">
                <h4 className="certification-name">{cert.name}</h4>
                <p className="certification-issuer">{cert.issuer}</p>
                <p className="certification-description">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
