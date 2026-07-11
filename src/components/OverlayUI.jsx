import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Globe, Terminal, ExternalLink } from 'lucide-react';
import ProjectsView from './ProjectsView';
import ProjectPage from './ProjectPage';
import AboutView from './AboutView';
import ContactView from './ContactView';
import { projectsData } from '../data/projects';

const OverlayUI = ({ currentView, setCurrentView }) => {
  return (
    <div className="w-full h-full text-white pointer-events-none overlay-container">

      {/* Header / Nav */}
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="header-container pointer-events-auto"
      >
        <div
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}
          onClick={() => setCurrentView('home')}
        >
          <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'var(--accent-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem' }}>
            TS
          </div>
          <h1 style={{ fontSize: '1.25rem', margin: 0, fontWeight: 600, letterSpacing: '0.05em' }}>Tanmay sarve</h1>
        </div>
        <nav className="nav-container">
          <button onClick={() => setCurrentView('home')} className="nav-link" style={{ background: 'none', border: 'none', padding: 0 }}>Home</button>
          <button onClick={() => setCurrentView('about')} className="nav-link" style={{ background: 'none', border: 'none', padding: 0 }}>About</button>
          <button onClick={() => setCurrentView('projects')} className="nav-link" style={{ background: 'none', border: 'none', padding: 0 }}>Projects</button>
          <button onClick={() => setCurrentView('contact')} className="nav-link" style={{ background: 'none', border: 'none', padding: 0 }}>Contact</button>
        </nav>
      </motion.header>

      {/* Main Content Area */}
      <AnimatePresence mode="wait">
        {currentView === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="hero-section pointer-events-auto"
          >
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '6px 16px', borderRadius: '100px', backgroundColor: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.2)', marginBottom: '1.5rem' }}>
                <span style={{ display: 'block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--accent-color)' }}></span>
                <span style={{ fontSize: '0.85rem', fontWeight: 500, letterSpacing: '0.05em', color: 'var(--text-secondary)' }}>AVAILABLE FOR WORK</span>
              </div>

              <h1 className="hero-title">
                Building digital <br />
                <span className="text-gradient">experiences that matter.</span>
              </h1>

              <p className="hero-subtitle">
                I am a full-stack developer specializing in building exceptional digital experiences. Currently, I'm focused on building accessible, human-centered products.
              </p>

              <div className="hero-buttons">
                <button onClick={() => setCurrentView('projects')} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  View Projects <ExternalLink size={18} />
                </button>
                <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  Contact Me
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {currentView === 'projects' && (
          <ProjectsView key="projects" setCurrentView={setCurrentView} />
        )}

        {currentView === 'about' && (
          <AboutView key="about" setCurrentView={setCurrentView} />
        )}

        {currentView === 'contact' && (
          <ContactView key="contact" setCurrentView={setCurrentView} />
        )}

        {(currentView === 'omega-project' || currentView === 'adshub-project' || currentView === 'job-application-portal') && (
          <ProjectPage
            key={currentView}
            setCurrentView={setCurrentView}
            project={projectsData[currentView]}
          />
        )}
      </AnimatePresence>

      {/* Footer / Socials & Mini Skills */}
      {currentView === 'home' && (
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="footer-container pointer-events-auto"
        >
          <div className="footer-socials">
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Connect</p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href="https://www.linkedin.com/in/tanmay-sarve-29a384391/" className="social-icon"><Globe size={20} /></a>
              <a href="mailto:sarvetanmay276@gmail.com" className="social-icon"><Mail size={20} /></a>
            </div>
          </div>

          <div className="footer-stack">
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Core Stack</p>
            <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-secondary)' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>Node.js/Express.js</span>/
              <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>React</span>/
              <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>MongoDB</span>/
            </div>
          </div>
        </motion.footer>
      )}

    </div>
  );
};

export default OverlayUI;
