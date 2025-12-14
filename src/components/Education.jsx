import React from 'react';
import '../styles/Education.css';

const Education = () => {
  const educationData = [
    {
      degree: 'B.Tech in Computer Science & Engineering',
      institution: 'Vellore Institute of Technology, Andhra Pradesh',
      period: '2022 - Present',
      grade: 'CGPA: 8.12',
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
      highlights: [
        'Specialized in Mathematics, Physics, and Chemistry',
        'Strong foundation in analytical and problem-solving skills'
      ]
    },
    {
      degree: 'Secondary School Certificate (SSC)',
      institution: 'High School',
      period: 'Completed 2020',
      grade: 'Score: 92.3%',
      highlights: [
        'Excellent performance in core subjects',
        'Strong academic foundation'
      ]
    }
  ];

  return (
    <section id="education" className="education">
      <div className="container">
        <h2 className="section-title">Education</h2>
        <div className="education-timeline">
          {educationData.map((edu, index) => (
            <div key={index} className="education-card">
              <div className="education-period">{edu.period}</div>
              <div className="education-content">
                <h3 className="education-degree">{edu.degree}</h3>
                <p className="education-institution">{edu.institution}</p>
                <p className="education-grade">{edu.grade}</p>
                <ul className="education-highlights">
                  {edu.highlights.map((highlight, idx) => (
                    <li key={idx}>{highlight}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
