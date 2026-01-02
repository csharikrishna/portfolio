import React from 'react';
import { FaBriefcase, FaCertificate, FaAward, FaCalendar } from 'react-icons/fa';
import '../styles/Experience.css';

const Experience = () => {
  const experiences = [
    {
      role: 'Content & V-IDEAS Lead',
      organization: 'V Ideas & CSI Chapter, VIT-AP University',
      period: '2023 - June 2025',
      description: 'Led core content and V-IDEAS initiatives at VIT-AP University, managing a 10-member content team and driving community-focused programs that increased digital engagement by 35% and strengthened the CSI chapter\'s presence on campus.',
      achievements: [
        'Managed and mentored a 10-member content team across social and community initiatives',
        'Increased Instagram engagement by 35% through data-driven strategies and editorial calendars',
        'Led V-IDEAS initiatives including innovative tech workshops and community-driven programs',
        'Coordinated with multiple faculty coordinators to execute chapter activities',
        'Received Certificate of Appreciation for impactful leadership at CSI Chapter VIT-AP',
        'Expanded cross-platform digital presence and fostered collaboration within CSI community'
      ]
    }
  ];

  const certifications = [
    {
      name: 'Oracle AI Vector Search Certified Professional',
      issuer: 'Oracle University',
      date: 'July 2025',
      validity: 'Valid until July 2027',
      description: 'Recognized by Oracle Corporation as Oracle Certified Professional in AI Vector Search technologies',
      type: 'Professional Certification'
    },
    {
      name: 'V-IDEAS Lead - Certificate of Appreciation',
      issuer: 'CSI Chapter, VIT-AP University',
      date: 'Sept 2024 - June 2025',
      validity: null,
      description: 'Certificate of Appreciation for successfully completing leadership role at CSI Chapter VIT-AP',
      type: 'Leadership Recognition'
    },
    {
      name: 'MERN Full Stack Certification Program',
      issuer: 'Ethnus',
      date: '2024',
      validity: null,
      description: 'Comprehensive full-stack development certification covering MongoDB, Express, React, and Node.js',
      type: 'Technical Certification'
    },
    {
      name: 'Generative AI Using IBM WatsonX',
      issuer: 'IBM',
      date: '2024',
      validity: null,
      description: 'Advanced certification in Generative AI technologies and IBM WatsonX platform',
      type: 'AI Certification'
    },
    {
      name: 'MongoDB Associate Database Administrator',
      issuer: 'MongoDB',
      date: '2024',
      validity: null,
      description: 'Professional certification in MongoDB database administration and management',
      type: 'Database Certification'
    }
  ];

  return (
    <section id="experience" className="experience">
      <div className="experience-container">
        <div className="experience-header">
          <h2 className="experience-title">Experience & Certifications</h2>
          <p className="experience-subtitle">
            Professional journey and industry-recognized credentials
          </p>
        </div>
        
        {/* Single Column Masonry Layout */}
        <div className="experience-content-single">
          {/* Professional Experience Section */}
          <div className="section-header">
            <FaBriefcase className="section-icon" />
            <h3 className="subsection-title">Professional Experience</h3>
          </div>
          
          {experiences.map((exp, index) => (
            <div 
              key={index} 
              className="experience-card"
              style={{ '--animation-order': index }}
            >
              <div className="experience-header-row">
                <div className="experience-info">
                  <h4 className="experience-role">{exp.role}</h4>
                  <p className="experience-org">{exp.organization}</p>
                </div>
                <div className="experience-period">
                  <FaCalendar className="period-icon" />
                  <span>{exp.period}</span>
                </div>
              </div>
              
              <p className="experience-description">{exp.description}</p>
              
              <ul className="experience-achievements">
                {exp.achievements.map((achievement, idx) => (
                  <li key={idx}>{achievement}</li>
                ))}
              </ul>
            </div>
          ))}

          {/* Certifications Section */}
          <div className="section-header certifications-header">
            <FaCertificate className="section-icon" />
            <h3 className="subsection-title">Certifications</h3>
          </div>
          
          <div className="certifications-grid">
            {certifications.map((cert, index) => (
              <div 
                key={index} 
                className="certification-card"
                style={{ '--animation-order': index }}
              >
                <div className="certification-header">
                  <FaAward className="certification-icon" />
                  <span className="certification-type">{cert.type}</span>
                </div>
                
                <h4 className="certification-name">{cert.name}</h4>
                <p className="certification-issuer">{cert.issuer}</p>
                
                <div className="certification-meta">
                  {cert.date && (
                    <span className="certification-date">
                      <FaCalendar className="meta-icon" />
                      {cert.date}
                    </span>
                  )}
                  {cert.validity && (
                    <span className="certification-validity">
                      {cert.validity}
                    </span>
                  )}
                </div>
                
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
