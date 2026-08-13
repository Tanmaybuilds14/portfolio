import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, X, Minus, Square } from 'lucide-react';

const Typewriter = ({ text, delay = 30, onComplete }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, delay);
      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, delay, text, onComplete]);

  // Basic syntax highlighting for keywords
  const highlightKeywords = (textToHighlight) => {
    const keywords = ['MERN', 'MongoDB', 'Express.js', 'React', 'Node.js', 'LeetCode', 'GeeksforGeeks', 'backend', 'data structures', 'algorithms'];
    let highlighted = textToHighlight;
    
    // We just wrap it in spans. Since it's typing out, doing complex regex replace on partial words might look glitchy, 
    // but React handles dangerouslySetInnerHTML smoothly if we just replace full words.
    // To avoid splitting HTML tags during typing, we only highlight if the word is fully typed.
    // A simpler approach for the typewriter is to just render the string, but let's try a safe keyword match.
    
    // Create a regex to match keywords safely
    const regex = new RegExp(`\\b(${keywords.join('|')})\\b`, 'gi');
    const parts = highlighted.split(regex);
    
    return (
      <>
        {parts.map((part, i) => {
          if (keywords.some(k => k.toLowerCase() === part.toLowerCase())) {
            return <span key={i} style={{ color: 'var(--accent-color)', fontWeight: 'bold' }}>{part}</span>;
          }
          return part;
        })}
      </>
    );
  };

  return <span>{highlightKeywords(currentText)}</span>;
};

const AboutView = ({ setCurrentView }) => {
  const [typingComplete, setTypingComplete] = useState(false);

  const fullText = "Motivated BCA student specializing in backend development with strong foundations in data structures, algorithms, and database management. Proven experience building dynamic web applications using the MERN stack (MongoDB, Express.js, React, Node.js), along with competitive programming practice on platforms like LeetCode and GeeksforGeeks to strengthen problem-solving skills. Adept at writing clean, efficient code, debugging complex issues, and collaborating in team-based academic and project environments. Eager to apply technical skills, analytical thinking, and a continuous learning mindset to contribute to impactful real-world software development projects.";

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
      className="about-view pointer-events-auto"
      style={{ 
        flex: 1, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '2rem'
      }}
    >
      <div 
        style={{ 
          width: '100%', 
          maxWidth: '900px', 
          background: 'rgba(5, 5, 5, 0.85)', 
          backdropFilter: 'blur(16px)',
          borderRadius: '12px',
          border: '1px solid var(--border-color)',
          overflow: 'hidden',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)'
        }}
      >
        {/* Terminal Window Header */}
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.05)', 
          padding: '0.75rem 1rem', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          borderBottom: '1px solid var(--border-color)'
        }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444', cursor: 'pointer' }} onClick={() => setCurrentView('home')} />
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#eab308' }} />
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#22c55e' }} />
          </div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'monospace' }}>
            <Terminal size={14} /> root@system:~
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', color: 'var(--text-secondary)' }}>
            <Minus size={14} />
            <Square size={14} />
            <X size={14} style={{ cursor: 'pointer' }} onClick={() => setCurrentView('home')} />
          </div>
        </div>

        {/* Terminal Body */}
        <div style={{ 
          padding: '2rem', 
          fontFamily: "'Courier New', Courier, monospace", 
          fontSize: '1.1rem',
          lineHeight: '1.8',
          color: '#e2e8f0',
          minHeight: '400px'
        }}>
          <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.75rem' }}>
            <span style={{ color: '#22c55e', fontWeight: 'bold' }}>tanmaysarve@system:~$</span>
            <span style={{ color: '#e2e8f0' }}>cat about_me.txt</span>
          </div>
          
          <div style={{ marginBottom: '2rem' }}>
            <Typewriter text={fullText} delay={20} onComplete={() => setTypingComplete(true)} />
          </div>

          {typingComplete && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ display: 'flex', gap: '0.75rem' }}
            >
              <span style={{ color: '#22c55e', fontWeight: 'bold' }}>tanmaysarve@system:~$</span>
              <motion.span 
                animate={{ opacity: [1, 0, 1] }} 
                transition={{ repeat: Infinity, duration: 1 }}
                style={{ display: 'inline-block', width: '10px', height: '1.2rem', background: 'var(--text-primary)' }}
              />
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default AboutView;
