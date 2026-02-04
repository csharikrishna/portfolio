import React from 'react';
import { FaTrophy, FaCertificate, FaAward, FaChartLine } from 'react-icons/fa';
import '../styles/Achievements.css';

const Achievements = () => {
  const achievements = [
    {
      icon: <FaTrophy />,
      title: 'FrameX-WebHack Winner',
      organization: 'VTAPP 2024, VIT-AP University',
      description: 'Secured 1st prize in FrameX-WebHack by building a standout web solution under time constraints, competing against numerous talented developers.',
      year: '2024',
      type: 'Competition Win',
      color: 'gold'
    },
    {
      icon: <FaChartLine />,
      title: 'Wall Street Wiz - First Place',
      organization: 'Bulls & Bears Club, VIT-AP University',
      description: 'Secured 1st place in Wall Street Wiz financial market simulation game, demonstrating strategic investment decisions and market analysis skills in a competitive team environment.',
      year: '2023',
      type: 'Competition Win',
      color: 'blue'
    },
    {
      icon: <FaAward />,
      title: 'Real Venture Certification',
      organization: 'Wadhwani Foundation',
      description: 'Recognized by a global jury and certified as a Real Venture for entrepreneurial potential and innovative thinking in technology.',
      year: '2024',
      type: 'Certification',
      color: 'purple'
    },
    {
      icon: <FaCertificate />,
      title: 'Content Team Lead Success',
      organization: 'V Ideas, VIT-AP University',
      description: 'Led a 10-member content team to achieve 35% increase in Instagram engagement through data-driven strategies and editorial excellence.',
      year: '2023-2024',
      type: 'Leadership',
      color: 'green'
    }
  ];

  return (
    <section id="achievements" className="achievements">
      <div className="achievements-bg-decoration" aria-hidden="true">
        <div className="achievements-blob achievements-blob-1"></div>
        <div className="achievements-blob achievements-blob-2"></div>
      </div>

      <div className="achievements-container">
        <div className="achievements-header">
          <h2 className="achievements-title">Achievements & Recognition</h2>
          <p className="achievements-subtitle">
            Celebrating milestones and accomplishments in technology, finance, and leadership
          </p>
        </div>
        
        <div className="achievements-grid">
          {achievements.map((achievement, index) => (
            <article 
              key={index} 
              className={`achievement-card achievement-${achievement.color}`}
              style={{ '--animation-order': index }}
              tabIndex={0}
            >
              <div className="achievement-glow" aria-hidden="true"></div>
              
              <div className="achievement-header">
                <div className="achievement-icon-container">
                  <div className="achievement-icon-bg" aria-hidden="true"></div>
                  <div className="achievement-icon" aria-hidden="true">
                    {achievement.icon}
                  </div>
                </div>
                <span className="achievement-type">{achievement.type}</span>
              </div>
              
              <div className="achievement-content">
                <div className="achievement-meta">
                  <span className="achievement-year" aria-label={`Year: ${achievement.year}`}>
                    {achievement.year}
                  </span>
                </div>
                
                <h3 className="achievement-title">{achievement.title}</h3>
                
                <p className="achievement-org">
                  <span className="org-icon" aria-hidden="true">●</span>
                  {achievement.organization}
                </p>
                
                <p className="achievement-description">{achievement.description}</p>
              </div>
              
              <div className="achievement-shine" aria-hidden="true"></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
