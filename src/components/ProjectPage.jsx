import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink } from 'lucide-react';

const ProjectPage = ({ setCurrentView, project }) => {
  if (!project) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
      className="project-page-container pointer-events-auto"
      style={{ 
        width: '100%', 
        height: '100%', 
        background: 'rgba(5, 5, 5, 0.85)', 
        backdropFilter: 'blur(16px)',
        borderRadius: '16px',
        border: '1px solid var(--border-color)',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Sticky Header */}
      <div style={{ position: 'sticky', top: 0, background: 'rgba(5, 5, 5, 0.9)', backdropFilter: 'blur(10px)', padding: '1.5rem 2.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10 }}>
        <button 
          onClick={() => setCurrentView('projects')}
          style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '1rem', transition: 'color 0.3s ease' }}
          onMouseOver={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
          onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
        >
          <ArrowLeft size={18} /> Back to Projects
        </button>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
            Live Site <ExternalLink size={16} />
          </a>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '2.5rem', maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
            {project.tags.map(tag => (
              <span key={tag} className="tech-tag">{tag}</span>
            ))}
          </div>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', lineHeight: 1.1 }}>{project.title}</h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '800px' }}>
            {project.subtitle}
          </p>
        </div>

        {/* Main Screenshot */}
        <div style={{ width: '100%', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-color)', marginBottom: '3rem', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
          <img src={project.image} alt={`${project.title} Showcase`} style={{ width: '100%', display: 'block' }} />
        </div>

        {/* Details Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', marginBottom: '4rem' }}>
          <div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Overview</h3>
            {project.overview.map((para, i) => (
              <p key={i} style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1rem' }}>{para}</p>
            ))}
          </div>
          <div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Walkthrough & Features</h3>
            <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.7, paddingLeft: '1.2rem' }}>
              {project.features.map((feature, i) => (
                <li key={i} style={{ marginBottom: '0.75rem' }}><strong>{feature.title}:</strong> {feature.desc}</li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default ProjectPage;
