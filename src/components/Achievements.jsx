import React from 'react';
import { FaTrophy, FaCertificate, FaAward } from 'react-icons/fa';
import '../styles/Achievements.css';

const Achievements = () => {
  const achievements = [
    {
      icon: <FaTrophy />,
      title: 'FrameX-WebHack Winner',
      organization: 'VTAPP 2024, VIT-AP University',
      description: 'Secured 1st prize in FrameX-WebHack by building a standout web solution under time constraints, competing against numerous talented developers.',
      year: '2024'
    },
    {
      icon: <FaAward />,
      title: 'Real Venture Certification',
      organization: 'Wadhwani Foundation',
      description: 'Recognized by a global jury and certified as a Real Venture for entrepreneurial potential and innovative thinking in technology.',
      year: '2024'
    },
    {
      icon: <FaCertificate />,
      title: 'Content Team Lead Success',
      organization: 'V Ideas',
      description: 'Led a 10-member content team to achieve 35% increase in Instagram engagement through data-driven strategies and editorial excellence.',
      year: '2023-2024'
    }
  ];

  return (
    <section id="achievements" className="achievements">
      <div className="container">
        <h2 className="section-title">Achievements & Recognition</h2>
        <div className="achievements-grid">
          {achievements.map((achievement, index) => (
            <div key={index} className="achievement-card">
              <div className="achievement-icon">{achievement.icon}</div>
              <div className="achievement-content">
                <span className="achievement-year">{achievement.year}</span>
                <h3 className="achievement-title">{achievement.title}</h3>
                <p className="achievement-org">{achievement.organization}</p>
                <p className="achievement-description">{achievement.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
