import React from 'react';
import Header from './components/Header';
import ScrollProgress from './components/ui/ScrollProgress';
import SectionReveal from './components/ui/SectionReveal';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Education from './components/Education';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './styles/App.css';

function App() {
  // Set base path for GitHub Pages deployment
  React.useEffect(() => {
    // This ensures smooth scrolling works correctly
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  return (
    <div className="App">
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <SectionReveal><About /></SectionReveal>
        <SectionReveal><Skills /></SectionReveal>
        <SectionReveal><Experience /></SectionReveal>
        <SectionReveal><Projects /></SectionReveal>
        <SectionReveal><Education /></SectionReveal>
        <SectionReveal><Achievements /></SectionReveal>
        <SectionReveal><Contact /></SectionReveal>
      </main>
      <Footer />
    </div>
  );
}

export default App;
