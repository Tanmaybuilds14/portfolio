import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { education, site, socials, skillGroups, stats, timeline } from '../data/site';
import Reveal from '../components/Reveal';
import './About.css';

const principles = [
  {
    title: 'Read the code before writing it',
    body: 'Before adding a feature I try to understand why the existing shape exists. Most "obvious" refactors lose information that was expensive to get.',
  },
  {
    title: 'Optimise for the next reader',
    body: 'Clear names, honest types and small modules. The person maintaining this in six months is almost certainly me, on a bad day.',
  },
  {
    title: 'Learn in public',
    body: 'Every project here has a repository, a README and a live URL. I would rather show the work than describe it.',
  },
];

export default function About() {
  return (
    <div className="page about-page">
      <div className="container">
        <header className="about-head">
          <Reveal>
            <p className="eyebrow">About</p>
            <h1 className="display display--xl about-head__title">
              Backend instincts,
              <br />
              <span className="serif serif--accent">frontend finish.</span>
            </h1>
          </Reveal>

          <Reveal delay={90} className="about-head__body">
            <p className="body-lg">
              I’m {site.firstName}, a full-stack developer based in {site.location}. I’m finishing a
              Bachelor of Computer Applications while building products end to end — mostly for the web,
              mostly with React and Node.
            </p>
            <p className="body-lg">
              My strongest work is on the server side of that stack: data models, APIs, realtime
              behaviour and the awkward edges — permissions, offline states, concurrent edits. I care
              about interfaces too, but I care about them being truthful first.
            </p>
            <p className="body-lg">
              Away from the editor I practise data structures and algorithms on LeetCode and
              GeeksforGeeks, and read production source code to see how other people solved problems I
              have not faced yet.
            </p>
          </Reveal>
        </header>

        <Reveal>
          <dl className="about-facts">
            <div>
              <dt className="mono">Currently</dt>
              <dd>{site.availability}</dd>
            </div>
            <div>
              <dt className="mono">Studying</dt>
              <dd>{education.degree}</dd>
            </div>
            <div>
              <dt className="mono">Based in</dt>
              <dd>{site.location}</dd>
            </div>
            <div>
              <dt className="mono">Reach me</dt>
              <dd>
                <a href={`mailto:${site.email}`} className="link-underline">
                  {site.email}
                </a>
              </dd>
            </div>
          </dl>
        </Reveal>

        <section className="about-section">
          <Reveal>
            <div className="section-head">
              <div>
                <p className="eyebrow">Toolkit</p>
                <h2 className="section-head__title display display--lg">
                  What I build <span className="serif">with.</span>
                </h2>
              </div>
              <p className="mono about-section__note">Chosen for the job, not for the résumé</p>
            </div>
          </Reveal>

          <div className="skills">
            {skillGroups.map((group, index) => (
              <Reveal key={group.title} delay={index * 50} className="skills__group">
                <p className="skills__label mono">{group.title}</p>
                <ul className="skills__list">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="about-section">
          <Reveal>
            <div className="section-head">
              <div>
                <p className="eyebrow">Track record</p>
                <h2 className="section-head__title display display--lg">
                  So far, <span className="serif">in order.</span>
                </h2>
              </div>
            </div>
          </Reveal>

          <ol className="timeline">
            {timeline.map((item, index) => (
              <Reveal key={item.title} delay={index * 50} as="li" className="timeline__item">
                <span className="timeline__period mono">{item.period}</span>
                <span className="timeline__node" aria-hidden="true" />
                <div className="timeline__content">
                  <span className="timeline__kind mono">{item.kind}</span>
                  <h3 className="timeline__title">{item.title}</h3>
                  <p className="body">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </section>

        <section className="about-section">
          <Reveal>
            <div className="section-head">
              <div>
                <p className="eyebrow">Principles</p>
                <h2 className="section-head__title display display--lg">
                  How I try to <span className="serif">work.</span>
                </h2>
              </div>
            </div>
          </Reveal>

          <div className="principles">
            {principles.map((item, index) => (
              <Reveal key={item.title} delay={index * 60} className="principles__item">
                <span className="mono principles__index">0{index + 1}</span>
                <h3>{item.title}</h3>
                <p className="body">{item.body}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <Reveal className="about-cta-wrap">
          <div className="about-cta">
            <div>
              <h2 className="display display--md">
                Open to <span className="serif serif--accent">internships</span> and full-time roles.
              </h2>
              <p className="body">
                If you are hiring for backend or full-stack work — or you just want an opinion on a
                technical decision — my inbox is open.
              </p>
            </div>
            <div className="about-cta__actions">
              <Link to="/contact" className="btn">
                Start a conversation <ArrowRight size={15} />
              </Link>
              <a href={site.github} target="_blank" rel="noreferrer" className="btn btn--ghost">
                GitHub <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
        </Reveal>

        <div className="about-foot">
          <span className="mono about-foot__label">Find me</span>
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target={social.href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              className="about-foot__link"
            >
              <span className="mono">{social.label}</span>
              <span>{social.handle}</span>
              <ArrowUpRight size={14} />
            </a>
          ))}
          <div className="about-foot__stats">
            {stats.map((stat) => (
              <span key={stat.label} className="mono">
                {stat.value} {stat.label.toLowerCase()}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
