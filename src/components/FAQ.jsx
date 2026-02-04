import React, { useEffect, useState, useRef } from 'react';
import { FaQuestionCircle, FaChevronDown, FaLightbulb } from 'react-icons/fa';
import '../styles/FAQ.css';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const itemRefs = useRef([]);

  const faqData = [
    {
      question: "What is your tech stack?",
      answer: "I specialize in the MERN stack (MongoDB, Express, React, Node.js) for full-stack web development. Additionally, I work with Python, Java, and JavaScript for various applications.",
      category: "Technical"
    },
    {
      question: "What AI/ML projects have you worked on?",
      answer: "I've built several AI/ML projects including computer vision models for oil spill detection, natural language processing applications for text analysis, and exploration of Large Language Models (LLMs) using IBM WatsonX and prompt engineering techniques.",
      category: "Projects"
    },
    {
      question: "What are your main skills as a developer?",
      answer: "My core skills include full-stack web development, REST API design, database management with MongoDB, frontend development with React, backend development with Node.js/Express, machine learning, deep learning, IoT development, and team leadership.",
      category: "Skills"
    },
    {
      question: "Are you available for freelance work or internships?",
      answer: "Currently focused on my studies at VIT-AP, but I'm open to collaborative projects, internship opportunities, and short-term engagements that align with my technical interests. Feel free to reach out via email or WhatsApp!",
      category: "Availability"
    },
    {
      question: "What certifications do you have?",
      answer: "I hold several professional certifications including Oracle AI Vector Search Certified Professional, MERN Full Stack Certification, MongoDB Associate Database Administrator, Generative AI with IBM WatsonX, and various leadership recognitions from CSI Chapter VIT-AP.",
      category: "Education"
    },
    {
      question: "How do you approach problem-solving?",
      answer: "I follow a systematic approach: understand the problem deeply, break it into smaller components, research best practices, prototype solutions, test thoroughly, and iterate based on feedback. I prioritize clean code, maintainability, and user experience.",
      category: "Methodology"
    },
    {
      question: "What's your experience with web performance optimization?",
      answer: "I optimize web performance through code splitting, lazy loading, image optimization, efficient state management, and monitoring Core Web Vitals. I also implement best practices like critical CSS extraction and asset compression.",
      category: "Technical"
    },
    {
      question: "Do you have experience with deployment and DevOps?",
      answer: "Yes, I have hands-on experience deploying applications on Vercel, GitHub Pages, and cloud platforms. I'm familiar with CI/CD concepts, version control with Git/GitHub, and environment configuration management.",
      category: "Technical"
    }
  ];

  // Filter FAQs based on search
  const filteredFAQs = faqData.filter(item =>
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle accordion toggle
  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e, index) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleAccordion(index);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (index + 1) % filteredFAQs.length;
      itemRefs.current[nextIndex]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = (index - 1 + filteredFAQs.length) % filteredFAQs.length;
      itemRefs.current[prevIndex]?.focus();
    }
  };

  // Add FAQ schema
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqData.map(item => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer
        }
      }))
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <section id="faq" className="faq">
      {/* Background Decoration */}
      <div className="faq-bg-decoration" aria-hidden="true">
        <div className="faq-blob faq-blob-1"></div>
        <div className="faq-blob faq-blob-2"></div>
      </div>

      <div className="faq-container">
        <div className="faq-header">
          <div className="faq-icon-wrapper">
            <FaLightbulb className="faq-main-icon" aria-hidden="true" />
          </div>
          <h2 className="faq-title">Frequently Asked Questions</h2>
          <p className="faq-subtitle">
            Quick answers to common questions about my work and expertise
          </p>
        </div>

        {/* Search Bar */}
        <div className="faq-search-wrapper">
          <input
            type="search"
            className="faq-search"
            placeholder="Search questions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search FAQ questions"
          />
          <span className="search-icon" aria-hidden="true">🔍</span>
        </div>

        {/* FAQ Items */}
        <div className="faq-content" role="list">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((item, index) => (
              <div
                key={index}
                className={`faq-item ${openIndex === index ? 'open' : ''}`}
                style={{ '--animation-order': index }}
                role="listitem"
              >
                <button
                  ref={(el) => (itemRefs.current[index] = el)}
                  className="faq-question"
                  onClick={() => toggleAccordion(index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                  id={`faq-question-${index}`}
                >
                  <FaQuestionCircle className="question-icon" aria-hidden="true" />
                  <span className="question-text">{item.question}</span>
                  <span className="faq-category" aria-label={`Category: ${item.category}`}>
                    {item.category}
                  </span>
                  <FaChevronDown className="chevron-icon" aria-hidden="true" />
                </button>
                <div
                  id={`faq-answer-${index}`}
                  className="faq-answer"
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                  hidden={openIndex !== index}
                >
                  <div className="faq-answer-content">
                    <p>{item.answer}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="faq-no-results">
              <p>No questions found matching "{searchTerm}"</p>
              <button
                className="clear-search-btn"
                onClick={() => setSearchTerm('')}
              >
                Clear search
              </button>
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="faq-cta">
          <div className="faq-cta-icon" aria-hidden="true">💬</div>
          <p className="faq-cta-text">Still have questions?</p>
          <a
            href="#contact"
            className="cta-link"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
              });
            }}
          >
            Get in touch with me
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
