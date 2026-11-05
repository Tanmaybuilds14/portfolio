import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { ScrollProgress } from '@/components/motion/scroll-progress';
import StructuredData from '@/components/StructuredData';
import { SiteBackdrop } from '@/components/backgrounds/site-backdrop';
import Home from '@/pages/home';
import Work from '@/pages/work';
import ProjectDetail from '@/pages/project-detail';
import About from '@/pages/about';
import Contact from '@/pages/contact';
import NotFound from '@/pages/not-found';

const titles = {
  '/': 'Tanmay Sarve — Full-stack developer',
  '/work': 'Work — Tanmay Sarve',
  '/about': 'About — Tanmay Sarve',
  '/contact': 'Contact — Tanmay Sarve',
};

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

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
      <SiteBackdrop />
      <ScrollProgress />
      <a
        href="#main"
        className="bg-primary text-primary-foreground focus:ring-ring fixed top-3 left-1/2 z-[200] -translate-x-1/2 -translate-y-[160%] rounded-full px-4 py-2 text-sm font-medium transition-transform focus:translate-y-0 focus:ring-[3px] focus:outline-none"
      >
        Skip to content
      </a>
      <ScrollToTop />
      <DocumentTitle />

      <div className="flex min-h-screen flex-col">
        <Nav />
        <main id="main" className="flex-1">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/work" element={<Work />} />
                <Route path="/work/:slug" element={<ProjectDetail />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </>
  );
}
