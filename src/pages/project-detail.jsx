import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'motion/react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import { getAdjacentProject, getProject } from '@/data/projects';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ProjectVisual } from '@/components/project-visual';
import { Reveal } from '@/components/motion/reveal';
import { Counter } from '@/components/motion/counter';
import { GridBackground } from '@/components/backgrounds/grid-background';
import NotFound from './not-found';

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = getProject(slug);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 160, damping: 26, restDelta: 0.001 });

  useEffect(() => {
    if (project) document.title = `${project.title} — Tanmay Sarve`;
  }, [project]);

  if (!project) return <NotFound />;

  const { previous, next } = getAdjacentProject(slug);
  const accent = project.accent ?? 'oklch(0.88 0.2 124)';

  return (
    <article style={{ '--project': accent }}>
      {/* Scroll progress for the case study */}
      <motion.div
        aria-hidden="true"
        style={{ scaleX: progress, backgroundColor: accent }}
        className="fixed inset-x-0 top-16 z-[90] h-px origin-left"
      />

      <GridBackground className="border-border border-b" cellSize={76}>
        <div className="page-shell pt-24 pb-12 lg:pt-32 lg:pb-14">
          <Reveal>
            <Link
              to="/work"
              className="text-muted-foreground hover:text-foreground group inline-flex items-center gap-2 text-[0.85rem] transition-colors"
            >
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
              All work
            </Link>
          </Reveal>

          <div className="mt-8 grid items-end gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-14">
            <Reveal>
              <div className="flex items-center gap-3">
                <span
                  className="size-1.5 rounded-full"
                  style={{ backgroundColor: accent, boxShadow: `0 0 0 4px color-mix(in oklab, ${accent} 18%, transparent)` }}
                />
                <span className="eyebrow">Case study</span>
                <span className="bg-border h-px w-7" aria-hidden="true" />
                <span className="eyebrow">{project.status}</span>
              </div>

              <h1 className="mt-5 text-[clamp(2.4rem,6.6vw,4.5rem)] leading-[0.96] font-medium tracking-[-0.045em]">
                {project.title}
              </h1>
              <p
                className="mt-3 text-[clamp(1.1rem,2.4vw,1.5rem)] leading-snug"
                style={{ color: `color-mix(in oklab, ${accent} 80%, white)` }}
              >
                {project.tagline}
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="text-muted-foreground text-[0.98rem] leading-relaxed">{project.summary}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {project.liveUrl && (
                  <Button asChild>
                    <a href={project.liveUrl} target="_blank" rel="noreferrer">
                      Visit live site
                      <ArrowUpRight />
                    </a>
                  </Button>
                )}
                {project.sourceUrl && (
                  <Button asChild variant="outline">
                    <a href={project.sourceUrl} target="_blank" rel="noreferrer">
                      Source
                      <ArrowUpRight />
                    </a>
                  </Button>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </GridBackground>

      <div className="page-shell pt-10 lg:pt-14">
        <Reveal>
          <ProjectVisual project={project} priority />
        </Reveal>

        <Reveal>
          <dl className="border-border mt-8 grid grid-cols-2 gap-6 border-y py-6 md:grid-cols-4">
            {[
              { label: 'Year', value: project.year },
              { label: 'Role', value: project.role },
              { label: 'Status', value: project.status },
              { label: 'Stack', value: project.tags.slice(0, 3).join(' · ') },
            ].map((item) => (
              <div key={item.label}>
                <dt className="eyebrow">{item.label}</dt>
                <dd className="mt-1.5 text-[0.92rem]">{item.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <div className="grid grid-cols-3 gap-6 py-8">
          {project.stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.06}>
              <span
                className="block text-[clamp(1.6rem,3.2vw,2.3rem)] leading-none font-medium tracking-[-0.04em]"
                style={{ color: accent }}
              >
                <Counter value={stat.value} />
              </span>
              <span className="eyebrow mt-2 block">{stat.label}</span>
            </Reveal>
          ))}
        </div>

        <Separator />

        <div className="grid gap-10 pt-10 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-16 lg:pt-14">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <Reveal>
              <p className="eyebrow">Stack</p>
              <ul className="mt-4 flex flex-col">
                {project.stack.map((item) => (
                  <li key={item.layer} className="border-border flex flex-col gap-0.5 border-b py-3 last:border-0">
                    <span className="text-muted-foreground font-mono text-[0.6rem] tracking-[0.14em] uppercase">
                      {item.layer}
                    </span>
                    <span className="text-muted-foreground text-[0.86rem]">{item.value}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </aside>

          <div className="min-w-0">
            <Reveal>
              <h2 className="border-border border-b pb-3 text-[clamp(1.6rem,3vw,2.2rem)] font-medium tracking-[-0.035em]">
                The brief
              </h2>
              <div className="mt-5 space-y-4">
                {project.overview.map((paragraph, index) => (
                  <p key={index} className="text-muted-foreground text-[1rem] leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>

            <Reveal className="mt-14">
              <h2 className="border-border border-b pb-3 text-[clamp(1.6rem,3vw,2.2rem)] font-medium tracking-[-0.035em]">
                What I built
              </h2>
              <ul className="mt-6 grid gap-6">
                {project.highlights.map((highlight) => (
                  <li key={highlight.title} className="grid grid-cols-[24px_minmax(0,1fr)] gap-3">
                    <span
                      className="mt-0.5 grid size-5 place-items-center rounded-full border"
                      style={{
                        borderColor: `color-mix(in oklab, ${accent} 40%, transparent)`,
                        backgroundColor: `color-mix(in oklab, ${accent} 12%, transparent)`,
                        color: `color-mix(in oklab, ${accent} 85%, white)`,
                      }}
                    >
                      <Check className="size-3" strokeWidth={2.6} />
                    </span>
                    <div>
                      <h3 className="text-[0.98rem] font-medium tracking-[-0.02em]">{highlight.title}</h3>
                      <p className="text-muted-foreground mt-1 text-[0.92rem] leading-relaxed">
                        {highlight.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>

            {project.challenges?.length > 0 && (
              <Reveal className="mt-14">
                <h2 className="border-border border-b pb-3 text-[clamp(1.6rem,3vw,2.2rem)] font-medium tracking-[-0.035em]">
                  The hard part
                </h2>
                {project.challenges.map((challenge) => (
                  <div
                    key={challenge.title}
                    className="bg-card/40 mt-5 rounded-r-xl border border-l-2 p-5 lg:p-6"
                    style={{ borderLeftColor: accent }}
                  >
                    <h3 className="text-[0.98rem] font-medium">{challenge.title}</h3>
                    <p className="text-muted-foreground mt-2 text-[0.94rem] leading-relaxed">
                      {challenge.description}
                    </p>
                  </div>
                ))}
              </Reveal>
            )}
          </div>
        </div>

        <nav aria-label="More projects" className="border-border mt-16 grid gap-4 border-t pt-10 sm:grid-cols-2">
          {previous && (
            <Link
              to={`/work/${previous.slug}`}
              className="group border-border bg-card/40 hover:border-foreground/20 hover:bg-card/70 flex flex-col gap-2 rounded-xl border p-5 transition-colors"
            >
              <span className="eyebrow inline-flex items-center gap-1.5">
                <ArrowLeft className="size-3" /> Previous
              </span>
              <span className="text-[1.35rem] font-medium tracking-[-0.03em]">{previous.title}</span>
              <span className="text-muted-foreground text-[0.9rem]">{previous.tagline}</span>
            </Link>
          )}
          {next && (
            <Link
              to={`/work/${next.slug}`}
              className="group border-border bg-card/40 hover:border-foreground/20 hover:bg-card/70 flex flex-col items-end gap-2 rounded-xl border p-5 text-right transition-colors"
            >
              <span className="eyebrow inline-flex items-center gap-1.5">
                Next <ArrowRight className="size-3" />
              </span>
              <span className="text-[1.35rem] font-medium tracking-[-0.03em]">{next.title}</span>
              <span className="text-muted-foreground text-[0.9rem]">{next.tagline}</span>
            </Link>
          )}
        </nav>
      </div>

      <div className="h-16" />
    </article>
  );
}
