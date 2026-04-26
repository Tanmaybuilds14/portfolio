import React, { Suspense, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Scene from './components/Scene';
import OverlayUI from './components/OverlayUI';

const IntroScreen = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2500); // 2.5 seconds intro
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50, filter: "blur(10px)" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#050505',
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
      }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, letterSpacing: "0px" }}
        animate={{ scale: 1, opacity: 1, letterSpacing: "8px" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <h1 style={{ color: 'white', fontFamily: 'var(--font-display)', fontSize: '3rem', margin: 0 }}>
          SYSTEM <span style={{ color: 'var(--accent-color)' }}>ONLINE</span>
        </h1>
      </motion.div>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "200px" }}
        transition={{ duration: 2, ease: "easeInOut" }}
        style={{ height: '2px', backgroundColor: 'var(--accent-color)', marginTop: '2rem' }}
      />
    </motion.div>
  );
};

function App() {
  const [introFinished, setIntroFinished] = useState(false);

  return (
    <>
      <AnimatePresence>
        {!introFinished && <IntroScreen onComplete={() => setIntroFinished(true)} />}
      </AnimatePresence>
      
      <div className="canvas-container">
        <Suspense fallback={null}>
          <Scene introFinished={introFinished} />
        </Suspense>
      </div>
      
      {introFinished && (
        <div className="ui-container">
          <OverlayUI />
        </div>
      )}
    </>
  );
}

export default App;
