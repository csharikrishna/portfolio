import React, { Suspense, useMemo } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import ScrollProgress from './components/ui/ScrollProgress';
import SectionReveal from './components/ui/SectionReveal';
import Cursor from './components/ui/Cursor';
import Loading from './components/ui/Loading';
import ErrorBoundary from './components/ErrorBoundary';
import './styles/App.css';

// Eagerly load Hero for LCP (Largest Contentful Paint)
import Hero from './components/Hero';

// Lazy load other components for performance optimization
const About = React.lazy(() => import('./components/About'));
const Skills = React.lazy(() => import('./components/Skills'));
const Experience = React.lazy(() => import('./components/Experience'));
const Projects = React.lazy(() => import('./components/Projects'));
const Education = React.lazy(() => import('./components/Education'));
const Achievements = React.lazy(() => import('./components/Achievements'));
const FAQ = React.lazy(() => import('./components/FAQ'));
const Contact = React.lazy(() => import('./components/Contact'));
const Footer = React.lazy(() => import('./components/Footer'));

/**
 * Main Application Component
 * 
 * Renders the portfolio website with:
 * - Custom cursor effects (desktop only)
 * - Scroll progress indicator
 * - Page transition animations
 * - Lazy-loaded sections with reveal animations
 * - Error boundary for graceful error handling
 * 
 * @returns {JSX.Element} The complete portfolio application
 */
function App() {
  // Memoize animation config to prevent object recreation on each render
  const pageVariants = useMemo(() => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  }), []);

  const pageTransition = useMemo(() => ({
    duration: 0.6,
    ease: "easeOut"
  }), []);

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
      {/* Skip to main content - keyboard accessibility */}
      <a href="#home" className="skip-to-main">Skip to main content</a>

      <ErrorBoundary>
        <Cursor />
        <ScrollProgress />
        <Header />
        <main>
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
          >
            <Hero />
            <Suspense fallback={<Loading />}>
              <SectionReveal><About /></SectionReveal>
              <SectionReveal><Skills /></SectionReveal>
              <SectionReveal><Experience /></SectionReveal>
              <SectionReveal><Projects /></SectionReveal>
              <SectionReveal><Education /></SectionReveal>
              <SectionReveal><Achievements /></SectionReveal>
              <SectionReveal><FAQ /></SectionReveal>
              <SectionReveal><Contact /></SectionReveal>
            </Suspense>
          </motion.div>
        </main>
        <Suspense fallback={null}>
          <SectionReveal width="100%">
            <Footer />
          </SectionReveal>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
