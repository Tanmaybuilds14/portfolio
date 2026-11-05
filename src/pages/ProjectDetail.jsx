import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import { getAdjacentProject, getProject } from '../data/projects';
import ProjectVisual from '../components/ProjectVisual';
import Reveal from '../components/Reveal';
import NotFound from './NotFound';
import './ProjectDetail.css';
import '../components/Visual.css';

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = getProject(slug);

  useEffect(() => {
    if (project) document.title = `${project.title} — Tanmay Sarve`;
  }, [project]);

  if (!project) return <NotFound />;

  const { previous, next } = getAdjacentProject(slug);
  const meta = [
    { label: 'Year', value: project.year },
    { label: 'Role', value: project.role },
    { label: 'Status', value: project.status },
    { label: 'Stack', value: project.tags.slice(0, 3).join(' · ') },
  ];

  return (
    <article className="page detail" style={{ '--project-accent': project.accent }}>
      <div className="container">
        <Reveal>
          <Link to="/work" className="detail__back">
            <ArrowLeft size={15} />
            All work
          </Link>
        </Reveal>

        <header className="detail__head">
          <Reveal>
            <div className="detail__kicker">
              <span className="detail__dot" aria-hidden="true" />
              <span className="mono">Case study</span>
              <span className="detail__rule" aria-hidden="true" />
              <span className="mono">{project.status}</span>
            </div>
            <h1 className="detail__title display display--xl">{project.title}</h1>
            <p className="detail__tagline serif">{project.tagline}</p>
          </Reveal>

          <Reveal delay={80}>
            <p className="detail__summary body-lg">{project.summary}</p>
            <div className="detail__actions">
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn">
                  Visit live site <ArrowUpRight size={15} />
                </a>
              )}
              {project.sourceUrl && (
                <a href={project.sourceUrl} target="_blank" rel="noreferrer" className="btn btn--ghost">
                  Source <ArrowUpRight size={15} />
                </a>
              )}
            </div>
          </Reveal>
        </header>

        <Reveal delay={120} className="detail__visual">
          <ProjectVisual project={project} priority />
        </Reveal>

        <Reveal delay={80}>
          <dl className="detail__meta meta-grid">
            {meta.map((item) => (
              <div key={item.label} className="meta-item">
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <div className="detail__stats">
          {project.stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 60} className="detail__stat">
              <span className="detail__stat-value display">{stat.value}</span>
              <span className="mono">{stat.label}</span>
            </Reveal>
          ))}
        </div>

        <div className="detail__layout">
          <aside className="detail__side">
            <Reveal>
              <p className="mono detail__side-title">Stack</p>
              <ul className="detail__stack">
                {project.stack.map((item) => (
                  <li key={item.layer}>
                    <span className="mono">{item.layer}</span>
                    <span>{item.value}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </aside>

          <div className="detail__main">
            <Reveal>
              <section className="detail__block">
                <h2 className="detail__block-title display display--md">
                  The <span className="serif">brief</span>
                </h2>
                {project.overview.map((paragraph, index) => (
                  <p key={index} className="body-lg detail__para">
                    {paragraph}
                  </p>
                ))}
              </section>
            </Reveal>

            <Reveal>
              <section className="detail__block">
                <h2 className="detail__block-title display display--md">
                  What I <span className="serif">built</span>
                </h2>
                <ul className="detail__highlights">
                  {project.highlights.map((highlight) => (
                    <li key={highlight.title}>
                      <span className="detail__check" aria-hidden="true">
                        <Check size={13} strokeWidth={2.4} />
                      </span>
                      <div>
                        <h3>{highlight.title}</h3>
                        <p className="body">{highlight.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>

            {project.challenges?.length > 0 && (
              <Reveal>
                <section className="detail__block">
                  <h2 className="detail__block-title display display--md">
                    The hard <span className="serif">part</span>
                  </h2>
                  {project.challenges.map((challenge) => (
                    <div key={challenge.title} className="detail__challenge">
                      <h3>{challenge.title}</h3>
                      <p className="body-lg">{challenge.description}</p>
                    </div>
                  ))}
                </section>
              </Reveal>
            )}
          </div>
        </div>

        <nav className="detail__next" aria-label="More projects">
          {previous && (
            <Link to={`/work/${previous.slug}`} className="detail__next-card detail__next-card--prev">
              <span className="mono">
                <ArrowLeft size={12} /> Previous
              </span>
              <span className="detail__next-title display">{previous.title}</span>
              <span className="detail__next-tag">{previous.tagline}</span>
            </Link>
          )}
          {next && (
            <Link to={`/work/${next.slug}`} className="detail__next-card detail__next-card--next">
              <span className="mono">
                Next <ArrowRight size={12} />
              </span>
              <span className="detail__next-title display">{next.title}</span>
              <span className="detail__next-tag">{next.tagline}</span>
            </Link>
          )}
        </nav>
      </div>
    </article>
  );
}
