import { Link } from 'react-router-dom';
import { ArrowDownRight, ArrowRight, ArrowUpRight, MoveRight } from 'lucide-react';
import { featuredProjects, projects } from '../data/projects';
import { site, stats, skillGroups } from '../data/site';
import ProjectVisual from '../components/ProjectVisual';
import Reveal from '../components/Reveal';
import useLocalTime from '../hooks/useLocalTime';
import './Home.css';
import '../components/Visual.css';

const approach = [
  {
    number: '01',
    title: 'Interfaces that stay honest',
    body: 'A UI should never pretend the backend is doing something it is not. I build loading, empty, error and offline states as first-class screens, not afterthoughts.',
  },
  {
    number: '02',
    title: 'Data models before screens',
    body: 'Most of the hard bugs I have fixed were schema bugs wearing a UI costume. I design the entities, the legal transitions and the constraints first.',
  },
  {
    number: '03',
    title: 'Ship, then read the logs',
    body: 'I like small releases and real feedback. Instrument the thing, watch where it hurts, and fix that instead of the imaginary problem.',
  },
];

const stackLine = [
  'TypeScript',
  'React 19',
  'Next.js',
  'Node.js',
  'PostgreSQL',
  'Redis',
  'Prisma',
  'Docker',
];

export default function Home() {
  const time = useLocalTime(site.timeZone);

  return (
    <div className="home">
      {/* ─────────────────────────── Hero ─────────────────────────── */}
      <section className="hero container">
        <div className="hero__grid">
          <div className="hero__main">
            <Reveal>
              <span className="status-pill">
                <span className="status-dot" aria-hidden="true" />
                {site.availability}
              </span>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="hero__title display display--xl">
                I build the parts
                <br />
                of the web that
                <br />
                <span className="serif serif--accent">have to work.</span>
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="hero__lede body-lg">{site.intro}</p>
            </Reveal>

            <Reveal delay={230} className="hero__actions">
              <Link to="/work" className="btn">
                See selected work
                <ArrowRight size={16} />
              </Link>
              <Link to="/contact" className="btn btn--ghost">
                Get in touch
              </Link>
            </Reveal>
          </div>

          <Reveal delay={280} className="hero__aside">
            <div className="hero__card">
              <div className="hero__card-head">
                <span className="mono">Now</span>
                <span className="hero__card-dot" aria-hidden="true" />
              </div>
              <p className="hero__card-title">
                Building <span className="serif">Inkwell</span> — realtime documents on CRDTs.
              </p>
              <p className="hero__card-body">
                A sync service in its own process, Redis fan-out and server-enforced permissions.
              </p>
              <Link to="/work/inkwell" className="link-arrow hero__card-link">
                Read the case study <ArrowUpRight size={14} />
              </Link>
            </div>

            <dl className="hero__meta">
              <div>
                <dt className="mono">Based in</dt>
                <dd>{site.location}</dd>
              </div>
              <div>
                <dt className="mono">Local time</dt>
                <dd>{time}</dd>
              </div>
              <div>
                <dt className="mono">Focus</dt>
                <dd>Backend systems</dd>
              </div>
            </dl>
          </Reveal>
        </div>

        <Reveal delay={340} className="hero__strip">
          <span className="mono hero__strip-label">Core stack</span>
          <ul className="hero__strip-list">
            {stackLine.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <ArrowDownRight size={16} className="hero__strip-icon" aria-hidden="true" />
        </Reveal>
      </section>

      {/* ─────────────────────────── Selected work ─────────────────────────── */}
      <section className="section container" id="work">
        <Reveal>
          <div className="section-head">
            <div>
              <p className="eyebrow">Selected work</p>
              <h2 className="section-head__title display display--lg">
                The work I&apos;d <span className="serif">show first.</span>
              </h2>
            </div>
            <Link to="/work" className="link-arrow work-all">
              All {projects.length} <span className="work-all__word">projects</span> <ArrowRight size={15} />
            </Link>
          </div>
        </Reveal>

        <div className="work-list">
          {featuredProjects.map((project, index) => (
            <Reveal key={project.slug} delay={index * 60}>
              <Link to={`/work/${project.slug}`} className="work-row">
                <div className="work-row__visual">
                  <ProjectVisual project={project} priority={index === 0} />
                </div>

                <div className="work-row__content">
                  <div className="work-row__index">
                    <span className="mono">0{index + 1}</span>
                    <span className="work-row__line" aria-hidden="true" />
                    <span className="mono">{project.year}</span>
                  </div>

                  <h3 className="work-row__title display display--md">{project.title}</h3>
                  <p className="work-row__tagline">{project.tagline}</p>
                  <p className="work-row__summary body">{project.summary}</p>

                  <div className="tag-row work-row__tags">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <span className="work-row__cta">
                    View case study
                    <MoveRight size={17} />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ─────────────────────────── Approach ─────────────────────────── */}
      <section className="section container">
        <Reveal>
          <div className="section-head">
            <div>
              <p className="eyebrow">How I work</p>
              <h2 className="section-head__title display display--lg">
                Opinions, <span className="serif">earned the hard way.</span>
              </h2>
            </div>
          </div>
        </Reveal>

        <div className="approach">
          {approach.map((item, index) => (
            <Reveal key={item.number} delay={index * 70} className="approach__item">
              <span className="approach__number mono">{item.number}</span>
              <h3 className="approach__title">{item.title}</h3>
              <p className="body">{item.body}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="stack-panel">
            {skillGroups.slice(0, 4).map((group) => (
              <div key={group.title} className="stack-panel__col">
                <p className="mono">{group.title}</p>
                <ul>
                  {group.items.slice(0, 5).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ─────────────────────────── About teaser ─────────────────────────── */}
      <section className="section container section--last">
        <Reveal>
          <div className="about-teaser">
            <div className="about-teaser__left">
              <p className="eyebrow">About</p>
              <h2 className="display display--lg about-teaser__title">
                Full-stack by trade,
                <br />
                <span className="serif serif--accent">backend at heart.</span>
              </h2>
              <p className="body-lg about-teaser__body">{site.bio}</p>
              <Link to="/about" className="link-arrow">
                More about me <ArrowRight size={15} />
              </Link>
            </div>

            <div className="about-teaser__stats">
              {stats.map((stat) => (
                <div key={stat.label} className="about-teaser__stat">
                  <span className="about-teaser__value display">{stat.value}</span>
                  <span className="mono">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
