import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { projectsData } from '../data/projects';

const ProjectsView = ({ setCurrentView }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="projects-view pointer-events-auto"
      style={{ padding: '2rem 0', flex: 1, display: 'flex', flexDirection: 'column' }}
    >
      <h2 style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>Featured <span className="text-gradient">Projects</span></h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', fontSize: '1.1rem' }}>A selection of my recent work.</p>

      <div className="projects-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
        
        {Object.values(projectsData).map((project) => (
          <motion.div 
            key={project.id}
            whileHover={{ y: -10 }}
            className="project-card"
            onClick={() => setCurrentView(project.id)}
            style={{ 
              background: 'var(--surface-color)', 
              border: '1px solid var(--border-color)', 
              borderRadius: '12px', 
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'border-color 0.3s ease'
            }}
          >
            <div style={{ height: '200px', width: '100%', background: '#111', position: 'relative', overflow: 'hidden' }}>
              <img 
                src={project.image} 
                alt={project.title} 
                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8, transition: 'transform 0.5s ease' }} 
                className="project-img"
              />
            </div>
            <div style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                {project.tags.slice(0, 3).map(tag => (
                  <span key={tag} className="tech-tag">{tag}</span>
                ))}
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{project.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {project.subtitle}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', color: 'var(--accent-color)', fontSize: '0.9rem', fontWeight: 500, gap: '0.25rem' }}>
                View Details <ArrowRight size={16} />
              </div>
            </div>
          </motion.div>
        ))}

      </div>
    </motion.div>
  );
};

export default ProjectsView;
