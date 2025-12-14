import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; {currentYear} Chinnapattu S Hari Krishna. All rights reserved.</p>
        <p>Built with React</p>
      </div>
    </footer>
  );
};

export default Footer;
