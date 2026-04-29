import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, X, Globe, Terminal } from 'lucide-react';

const ContactView = ({ setCurrentView }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="contact-view pointer-events-auto"
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
          maxWidth: '500px',
          background: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(20px)',
          borderRadius: '24px',
          border: '1px solid rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.2)',
          color: '#111827',
          position: 'relative'
        }}
      >
        <button
          onClick={() => setCurrentView('home')}
          style={{
            position: 'absolute',
            top: '1.5rem',
            right: '1.5rem',
            background: 'rgba(0,0,0,0.05)',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#4b5563'
          }}
        >
          <X size={18} />
        </button>

        <div style={{ padding: '2.5rem' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem', fontFamily: 'var(--font-display)' }}>
            Get in touch.
          </h2>
          <p style={{ color: '#4b5563', marginBottom: '2rem', lineHeight: '1.6' }}>
            Looking to collaborate on a project or just want to say hi? Drop a message below and I'll get back to you soon.
          </p>

          <form style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }} onSubmit={(e) => e.preventDefault()}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem', color: '#374151' }}>Name</label>
              <input
                type="text"
                placeholder="Tanmay sarve"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: '1px solid rgba(0,0,0,0.1)',
                  background: 'rgba(255,255,255,0.8)',
                  outline: 'none',
                  color: '#111827'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem', color: '#374151' }}>Email</label>
              <input
                type="email"
                placeholder="john@example.com"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: '1px solid rgba(0,0,0,0.1)',
                  background: 'rgba(255,255,255,0.8)',
                  outline: 'none',
                  color: '#111827'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem', color: '#374151' }}>Message</label>
              <textarea
                placeholder="How can I help you?"
                rows="4"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: '1px solid rgba(0,0,0,0.1)',
                  background: 'rgba(255,255,255,0.8)',
                  outline: 'none',
                  color: '#111827',
                  resize: 'vertical'
                }}
              ></textarea>
            </div>

            <button
              type="submit"
              style={{
                background: '#111827',
                color: 'white',
                border: 'none',
                padding: '14px',
                borderRadius: '8px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                cursor: 'pointer',
                marginTop: '0.5rem',
                transition: 'transform 0.2s ease, background 0.2s ease'
              }}
              onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.background = '#000000'; }}
              onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.background = '#111827'; }}
            >
              Send Message <Send size={16} />
            </button>
          </form>

          <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(0,0,0,0.1)', display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
            <a href="#" style={{ color: '#4b5563', transition: 'color 0.2s ease' }} onMouseOver={(e) => e.currentTarget.style.color = '#111827'} onMouseOut={(e) => e.currentTarget.style.color = '#4b5563'}>
              <Terminal size={20} />
            </a>
            <a href="#" style={{ color: '#4b5563', transition: 'color 0.2s ease' }} onMouseOver={(e) => e.currentTarget.style.color = '#111827'} onMouseOut={(e) => e.currentTarget.style.color = '#4b5563'}>
              <Globe size={20} />
            </a>
            <a href="#" style={{ color: '#4b5563', transition: 'color 0.2s ease' }} onMouseOver={(e) => e.currentTarget.style.color = '#111827'} onMouseOut={(e) => e.currentTarget.style.color = '#4b5563'}>
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactView;
