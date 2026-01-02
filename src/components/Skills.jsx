import React from 'react';
import { FaCode, FaLaptopCode, FaTools, FaBrain, FaUsers } from 'react-icons/fa';
import '../styles/Skills.css';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Programming Languages',
      icon: <FaCode />,
      skills: ['Java', 'Python', 'JavaScript', 'SQL', 'HTML', 'CSS']
    },
    {
      title: 'Web Development',
      icon: <FaLaptopCode />,
      skills: ['React', 'Node.js', 'Express', 'MongoDB', 'REST APIs']
    },
    {
      title: 'Tools & Technologies',
      icon: <FaTools />,
      skills: ['Git', 'GitHub', 'Figma', 'IBM WatsonX AI', 'MongoDB Atlas', 'Linux']
    },
    {
      title: 'AI & Machine Learning',
      icon: <FaBrain />,
      skills: ['Large Language Models', 'Deep Learning', 'NLP', 'Prompt Engineering']
    },
    {
      title: 'Soft Skills',
      icon: <FaUsers />,
      skills: ['Problem Solving', 'Teamwork', 'Communication', 'Leadership']
    }
  ];

  return (
    <section id="skills" className="skills">
      <div className="skills-container">
        <div className="skills-header">
          <h2 className="skills-title">Skills & Technologies</h2>
          <p className="skills-subtitle">
            Technical expertise and tools I work with to build amazing solutions
          </p>
        </div>
        
        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <div 
              key={index} 
              className="skill-category"
              style={{ '--animation-order': index }}
            >
              <div className="category-header">
                <div className="category-icon">
                  {category.icon}
                </div>
                <h3 className="category-title">{category.title}</h3>
              </div>
              
              <div className="skills-list">
                {category.skills.map((skill, skillIndex) => (
                  <span 
                    key={skillIndex} 
                    className="skill-tag"
                    style={{ '--skill-order': skillIndex }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
