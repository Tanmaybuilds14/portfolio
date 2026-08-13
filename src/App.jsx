import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Code2,
  Database,
  Layers3,
  Globe,
  ServerCog,
} from 'lucide-react';
import { projectsData } from './data/projects';

const Scene = lazy(() => import('./components/Scene'));
const projects = Object.values(projectsData);
const SECTION_COUNT = projects.length + 3;

const sectionMeta = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  ...projects.map((project, index) => ({
    id: `work-${index + 1}`,
    label: project.title,
  })),
  { id: 'contact', label: 'Contact' },
];

function StoryPanel({ index, activeIndex, progress, children, className = '' }) {
  const reduceMotion = useReducedMotion();
  const step = 1 / (SECTION_COUNT - 1);
  const center = index * step;

  let input;
  let opacityOutput;
  let yOutput;

  if (index === 0) {
    input = [0, step * 0.3, step * 0.86];
    opacityOutput = [1, 1, 0];
    yOutput = [0, 0, -56];
  } else if (index === SECTION_COUNT - 1) {
    input = [center - step * 0.86, center - step * 0.3, 1];
    opacityOutput = [0, 1, 1];
    yOutput = [56, 0, 0];
  } else {
    input = [center - step * 0.78, center, center + step * 0.78];
    opacityOutput = [0, 1, 0];
    yOutput = [56, 0, -56];
  }

  const opacity = useTransform(progress, input, opacityOutput);
  const y = useTransform(progress, input, reduceMotion ? [0, 0, 0] : yOutput);
  const scale = useTransform(
    progress,
    input,
    reduceMotion ? [1, 1, 1] : index === 0
      ? [1, 1, 0.975]
      : index === SECTION_COUNT - 1
        ? [0.975, 1, 1]
        : [0.975, 1, 0.975],
  );

  const isActive = activeIndex === index;

  return (
    <motion.section
      className={`story-panel ${className}`}
      style={{ opacity, y, scale, pointerEvents: isActive ? 'auto' : 'none' }}
      aria-hidden={!isActive}
      inert={isActive ? undefined : ''}
    >
      {children}
    </motion.section>
  );
}

function Header({ activeIndex, onNavigate }) {
  const navItems = [
    { label: 'Home', index: 0 },
    { label: 'About', index: 1 },
    { label: 'Work', index: 2 },
    { label: 'Contact', index: SECTION_COUNT - 1 },
  ];

  const activeNav = activeIndex >= 2 && activeIndex < SECTION_COUNT - 1
    ? 2
    : activeIndex;

  return (
    <header className="site-header">
      <button className="brand" type="button" onClick={() => onNavigate(0)} aria-label="Go to home">
        <span className="brand-mark">TS</span>
        <span className="brand-name">Tanmay Sarve</span>
      </button>

      <nav className="site-nav" aria-label="Primary navigation">
        {navItems.map((item) => (
          <button
            type="button"
            key={item.label}
            className={`nav-item ${activeNav === item.index ? 'is-active' : ''}`}
            onClick={() => onNavigate(item.index)}
            aria-current={activeNav === item.index ? 'page' : undefined}
          >
            <span>{item.label}</span>
            {activeNav === item.index && (
              <motion.span
                className="nav-indicator"
                layoutId="active-navigation"
                transition={{ type: 'spring', stiffness: 380, damping: 34 }}
              />
            )}
          </button>
        ))}
      </nav>

      <a
        className="header-cta"
        href="https://www.linkedin.com/in/tanmay-sarve-29a384391/"
        target="_blank"
        rel="noreferrer"
      >
        Let's talk <ArrowUpRight size={15} aria-hidden="true" />
      </a>
    </header>
  );
}

function ProgressRail({ activeIndex, progress, onNavigate }) {
  const scaleY = useTransform(progress, [0, 1], [0, 1]);

  return (
    <aside className="progress-rail" aria-label="Portfolio sections">
      <div className="progress-track" aria-hidden="true">
        <motion.span className="progress-fill" style={{ scaleY }} />
      </div>
      <div className="progress-dots">
        {sectionMeta.map((section, index) => (
          <button
            type="button"
            key={section.id}
            className={`progress-dot ${activeIndex === index ? 'is-active' : ''}`}
            onClick={() => onNavigate(index)}
            aria-label={`Go to ${section.label}`}
            aria-current={activeIndex === index ? 'step' : undefined}
          >
            <span className="progress-dot-core" />
            <span className="progress-label">{section.label}</span>
          </button>
        ))}
      </div>
    </aside>
  );
}

function HomePanel({ onNavigate }) {
  return (
    <div className="story-copy home-copy">
      <p className="eyebrow"><span className="status-dot" /> Available for select projects</p>
      <h1>
        Building the systems behind <span className="gradient-text">standout digital products.</span>
      </h1>
      <p className="lede">
        Full-stack developer crafting accessible interfaces, reliable backends, and immersive web experiences.
      </p>
      <div className="hero-actions">
        <button className="button button-primary" type="button" onClick={() => onNavigate(2)}>
          Explore my work <ArrowRight size={17} aria-hidden="true" />
        </button>
        <button className="button button-ghost" type="button" onClick={() => onNavigate(1)}>
          About me
        </button>
      </div>
      <button className="scroll-cue" type="button" onClick={() => onNavigate(1)}>
        <span className="scroll-cue-icon"><ArrowDown size={16} aria-hidden="true" /></span>
        <span><strong>Scroll to explore</strong>One continuous story</span>
      </button>
    </div>
  );
}

function AboutPanel() {
  const capabilities = [
    { icon: Code2, label: 'Accessible React interfaces' },
    { icon: ServerCog, label: 'Node & Express services' },
    { icon: Database, label: 'MongoDB & PostgreSQL' },
    { icon: Layers3, label: 'End-to-end product thinking' },
  ];

  return (
    <div className="story-copy about-copy">
      <p className="section-kicker"><span>01</span> Inside the system</p>
      <h2>Code with structure.<br /><span className="gradient-text">Products with purpose.</span></h2>
      <p className="lede">
        I'm a BCA student focused on backend engineering and the MERN stack. I enjoy turning complex requirements into clean, dependable experiences.
      </p>
      <div className="capability-grid">
        {capabilities.map(({ icon: Icon, label }) => (
          <div className="capability" key={label}>
            <Icon size={17} aria-hidden="true" />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectPanel({ project, projectIndex, panelIndex }) {
  return (
    <div className="story-copy project-copy">
      <p className="section-kicker">
        <span>02.{String(projectIndex + 1).padStart(2, '0')}</span> Selected work
      </p>
      <div className="project-count" aria-hidden="true">
        0{projectIndex + 1}<small>/ 0{projects.length}</small>
      </div>
      <h2>{project.title}</h2>
      <p className="lede">{project.subtitle}</p>
      <div className="tag-row" aria-label="Technologies used">
        {project.tags.slice(0, 4).map((tag) => <span key={tag}>{tag}</span>)}
      </div>
      <div className="project-actions">
        <a className="button button-primary" href={project.liveUrl} target="_blank" rel="noreferrer">
          Visit project <ArrowUpRight size={17} aria-hidden="true" />
        </a>
        <span className="screen-note">Shown live on the 3D display</span>
      </div>
      <div className="project-step" aria-hidden="true">
        {projects.map((item, index) => (
          <span key={item.id} className={index === projectIndex ? 'is-active' : ''} />
        ))}
      </div>
      <span className="sr-only">Portfolio panel {panelIndex + 1}</span>
    </div>
  );
}

function ContactPanel({ onNavigate }) {
  return (
    <div className="story-copy contact-copy">
      <p className="section-kicker"><span>03</span> Start a conversation</p>
      <h2>Have a useful idea?<br /><span className="gradient-text">Let's build it well.</span></h2>
      <p className="lede">
        I'm open to internships, collaborations, and full-stack projects where thoughtful engineering can make a real difference.
      </p>
      <div className="hero-actions">
        <a
          className="button button-primary"
          href="https://www.linkedin.com/in/tanmay-sarve-29a384391/"
          target="_blank"
          rel="noreferrer"
        >
          <Globe size={17} aria-hidden="true" /> Connect on LinkedIn
        </a>
        <button className="button button-ghost" type="button" onClick={() => onNavigate(2)}>
          Revisit work
        </button>
      </div>
      <div className="contact-meta">
        <span>Based in Pimpri, Maharashtra</span>
        <span>Full-stack / Backend</span>
      </div>
    </div>
  );
}

function SceneLoader() {
  return (
    <div className="scene-loader" role="status">
      <span />
      <p>Loading 3D workspace</p>
    </div>
  );
}

function App() {
  const storyRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: storyRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const nextIndex = Math.min(
      SECTION_COUNT - 1,
      Math.max(0, Math.round(latest * (SECTION_COUNT - 1))),
    );
    setActiveIndex((current) => current === nextIndex ? current : nextIndex);
  });

  useEffect(() => {
    document.documentElement.style.setProperty('--section-count', SECTION_COUNT);
  }, []);

  const navigateTo = (index) => {
    if (!storyRef.current) return;
    const rect = storyRef.current.getBoundingClientRect();
    const storyTop = window.scrollY + rect.top;
    const scrollableDistance = storyRef.current.offsetHeight - window.innerHeight;
    const target = storyTop + scrollableDistance * (index / (SECTION_COUNT - 1));

    window.scrollTo({
      top: target,
      behavior: reduceMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <main className="portfolio">
      <div className="scroll-story" ref={storyRef}>
        <div className="sticky-stage">
          <div className="scene-layer" aria-hidden="true">
            <Suspense fallback={<SceneLoader />}>
              <Scene scrollProgress={scrollYProgress} reducedMotion={reduceMotion} />
            </Suspense>
          </div>

          <div className="ambient-glow" aria-hidden="true" />
          <div className="grain" aria-hidden="true" />

          <Header activeIndex={activeIndex} onNavigate={navigateTo} />

          <div className="story-content">
            <StoryPanel index={0} activeIndex={activeIndex} progress={scrollYProgress}>
              <HomePanel onNavigate={navigateTo} />
            </StoryPanel>

            <StoryPanel index={1} activeIndex={activeIndex} progress={scrollYProgress}>
              <AboutPanel />
            </StoryPanel>

            {projects.map((project, projectIndex) => {
              const panelIndex = projectIndex + 2;
              return (
                <StoryPanel
                  index={panelIndex}
                  activeIndex={activeIndex}
                  progress={scrollYProgress}
                  key={project.id}
                >
                  <ProjectPanel
                    project={project}
                    projectIndex={projectIndex}
                    panelIndex={panelIndex}
                  />
                </StoryPanel>
              );
            })}

            <StoryPanel
              index={SECTION_COUNT - 1}
              activeIndex={activeIndex}
              progress={scrollYProgress}
            >
              <ContactPanel onNavigate={navigateTo} />
            </StoryPanel>
          </div>

          <ProgressRail
            activeIndex={activeIndex}
            progress={scrollYProgress}
            onNavigate={navigateTo}
          />

          <div className="stage-index" aria-hidden="true">
            <span>FRAME</span>
            <strong>{String(activeIndex + 1).padStart(2, '0')}</strong>
            <i />
            <span>{String(SECTION_COUNT).padStart(2, '0')}</span>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
