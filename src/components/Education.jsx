import React from 'react';
import { FaGraduationCap, FaAward, FaCalendar } from 'react-icons/fa';
import '../styles/Education.css';

const Education = () => {
  const educationData = [
    {
      degree: 'B.Tech in Computer Science & Engineering',
      institution: 'Vellore Institute of Technology, Andhra Pradesh',
      period: '2022 - Present',
      grade: 'CGPA: 8.12',
      status: 'Pursuing',
      highlights: [
        'Major in Computer Science and Engineering',
        'Focus on AI, Machine Learning, and Full-Stack Development',
        'Winner of FrameX-WebHack at VTAPP 2024'
      ]
    },
    {
      degree: 'Higher Secondary Certificate (HSC) - MPC',
      institution: 'Sri Chaitanya Junior College',
      period: '2020 - 2022',
      grade: 'Score: 8.13',
      status: 'Completed',
      highlights: [
        'Specialized in Mathematics, Physics, and Chemistry',
        'Strong foundation in analytical and problem-solving skills'
      ]
    },
    {
      degree: 'Secondary School Certificate (SSC)',
      institution: 'Sri Chaitanya School',
      period: 'Completed 2020',
      grade: 'Score: 92.3%',
      status: 'Completed',
      highlights: [
        'Excellent performance in core subjects',
        'Strong academic foundation'
      ]
    }
  ];

  return (
    <section id="education" className="education">
      <div className="education-container">
        <div className="education-header">
          <h2 className="education-title">Education</h2>
          <p className="education-subtitle">
            Academic journey and qualifications that shaped my technical expertise
          </p>
        </div>
        
        <div className="education-timeline">
          {educationData.map((edu, index) => (
            <div 
              key={index} 
              className="education-card"
              style={{ '--animation-order': index }}
            >
              <div className="education-icon-wrapper">
                <FaGraduationCap className="education-icon" />
              </div>
              
              <div className="education-content">
                <div className="education-header-row">
                  <div className="education-period">
                    <FaCalendar className="period-icon" />
                    <span>{edu.period}</span>
                  </div>
                  <span className={`education-status ${edu.status.toLowerCase()}`}>
                    {edu.status}
                  </span>
                </div>
                
                <h3 className="education-degree">{edu.degree}</h3>
                <p className="education-institution">{edu.institution}</p>
                
                <div className="education-grade">
                  <FaAward className="grade-icon" />
                  <span>{edu.grade}</span>
                </div>
                
                <ul className="education-highlights">
                  {edu.highlights.map((highlight, idx) => (
                    <li key={idx}>{highlight}</li>
                  ))}
                </ul>
              </div>
              
              <div className="education-connector"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
