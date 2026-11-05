import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import StructuredData from './components/StructuredData';
import Home from './pages/Home';
import Work from './pages/Work';
import ProjectDetail from './pages/ProjectDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

const titles = {
  '/': 'Tanmay Sarve — Full-stack developer',
  '/work': 'Work — Tanmay Sarve',
  '/about': 'About — Tanmay Sarve',
  '/contact': 'Contact — Tanmay Sarve',
};

function DocumentTitle() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = titles[pathname] ?? 'Tanmay Sarve — Full-stack developer';
  }, [pathname]);

  return null;
}

export default function App() {
  const location = useLocation();

  return (
    <>
      <StructuredData />
      <div className="ambient" aria-hidden="true" />
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <ScrollToTop />
      <DocumentTitle />
      <div className="app-shell">
        <Nav />
        <main id="main">
          <div className="page-transition" key={location.pathname}>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/work" element={<Work />} />
              <Route path="/work/:slug" element={<ProjectDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
