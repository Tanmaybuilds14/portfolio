import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, MoveRight } from 'lucide-react';
import { projects } from '../data/projects';
import ProjectVisual from '../components/ProjectVisual';
import Reveal from '../components/Reveal';
import './Work.css';
import '../components/Visual.css';

export default function Work() {
  const filters = useMemo(() => ['All', ...new Set(projects.map((project) => project.category))], []);
  const [active, setActive] = useState('All');

  const visible =
    active === 'All' ? projects : projects.filter((project) => project.category === active);

  return (
    <div className="page work-page">
      <div className="container">
        <header className="work-head">
          <Reveal>
            <p className="eyebrow">
              Index — {String(projects.length).padStart(2, '0')} projects, {new Set(projects.map((p) => p.category)).size} disciplines
            </p>
            <h1 className="display display--xl work-head__title">
              Work that shipped,
              <br />
              <span className="serif serif--accent">and what it cost.</span>
            </h1>
            <p className="body-lg work-head__lede">
              Each case study covers the problem, the decisions that mattered, and the part that was
              genuinely difficult. Screenshots where the project is public; diagrams where the work
              lived on the server.
            </p>
          </Reveal>

          <Reveal delay={80} className="work-filters" role="group" aria-label="Filter projects by category">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActive(filter)}
                className={`work-filter ${active === filter ? 'is-active' : ''}`}
                aria-pressed={active === filter}
              >
                {filter}
              </button>
            ))}
          </Reveal>
        </header>

        <div className="work-grid">
          {visible.map((project, index) => (
            <Reveal key={project.slug} delay={index * 55} className="work-card-wrap">
              <article className="work-card card">
                <Link to={`/work/${project.slug}`} className="work-card__link">
                  <div className="work-card__visual">
                    <ProjectVisual project={project} priority={index < 2} />
                    <span className="work-card__year mono">{project.category}</span>
                  </div>

                  <div className="work-card__body">
                    <div className="work-card__top">
                      <h2 className="work-card__title">{project.title}</h2>
                      <span className="work-card__status mono">{project.year}</span>
                    </div>
                    <p className="work-card__tagline">{project.tagline}</p>
                    <p className="work-card__summary body">{project.summary}</p>

                    <div className="work-card__foot">
                      <div className="tag-row">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="work-card__cta">
                        Case study <MoveRight size={16} />
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="work-outro">
            <div>
              <p className="eyebrow">More on GitHub</p>
              <p className="display display--md work-outro__title">
                Experiments and <span className="serif">unfinished things</span> live in the repos.
              </p>
            </div>
            <a
              href="https://github.com/Tanmaybuilds14?tab=repositories"
              target="_blank"
              rel="noreferrer"
              className="btn btn--ghost"
            >
              Browse repositories <ArrowUpRight size={15} />
            </a>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
