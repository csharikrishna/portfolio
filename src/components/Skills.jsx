import React from 'react';
import '../styles/Skills.css';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Programming Languages',
      skills: ['Java', 'Python', 'JavaScript', 'SQL', 'HTML', 'CSS']
    },
    {
      title: 'Web Development',
      skills: ['React', 'Node.js', 'Express', 'MongoDB', 'REST APIs']
    },
    {
      title: 'Tools & Technologies',
      skills: ['Git', 'GitHub', 'Figma', 'IBM WatsonX AI', 'MongoDB Atlas', 'Linux']
    },
    {
      title: 'AI & Machine Learning',
      skills: ['Large Language Models', 'Deep Learning', 'NLP', 'Prompt Engineering']
    },
    {
      title: 'Soft Skills',
      skills: ['Problem Solving', 'Teamwork', 'Communication', 'Leadership']
    }
  ];

  return (
    <section id="skills" className="skills">
      <div className="container">
        <h2 className="section-title">Skills & Technologies</h2>
        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <div key={index} className="skill-category">
              <h3 className="category-title">{category.title}</h3>
              <div className="skills-list">
                {category.skills.map((skill, skillIndex) => (
                  <span key={skillIndex} className="skill-tag">
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
