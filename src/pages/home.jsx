import { Link } from 'react-router-dom';
import { ArrowRight, MoveUpRight } from 'lucide-react';
import { featuredProjects, getProject, projects } from '@/data/projects';
import { site, skillGroups, stats } from '@/data/site';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Hero } from '@/components/blocks/hero';
import { ProjectRow } from '@/components/blocks/project-row';
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/reveal';
import { Counter } from '@/components/motion/counter';
import { DotGridBackground } from '@/components/backgrounds/dot-grid-background';
import useLocalTime from '@/hooks/useLocalTime';

const approach = [
  {
    number: '01',
    title: 'Interfaces that stay honest',
    body: 'A UI should never pretend the backend is doing something it is not. Loading, empty, error and offline states are first-class screens, not afterthoughts.',
  },
  {
    number: '02',
    title: 'Data models before screens',
    body: 'Most hard bugs I have fixed were schema bugs wearing a UI costume. Design the entities, the legal transitions and the constraints first.',
  },
  {
    number: '03',
    title: 'Ship, then read the logs',
    body: 'Small releases and real feedback. Instrument the thing, watch where it hurts, and fix that instead of the imaginary problem.',
  },
];

export default function Home() {
  const time = useLocalTime(site.timeZone);

  return (
    <>
      <Hero now={{ ...getProject('inkwell'), time }} />

      {/* ── Selected work ─────────────────────────────────────────── */}
      <section className="page-shell py-16 lg:py-24">
        <Reveal className="border-border flex flex-wrap items-end justify-between gap-5 border-b pb-5">
          <h2 className="eyebrow !text-foreground">Selected work</h2>
          <div className="flex items-center gap-6">
            <p className="text-muted-foreground hidden text-[0.86rem] sm:block">
              {projects.length} projects, each with a written case study
            </p>
            <Link
              to="/work"
              className="text-muted-foreground hover:text-foreground group inline-flex items-center gap-2 text-[0.88rem] transition-colors"
            >
              View all
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-7 flex flex-col gap-4 lg:gap-5">
          {featuredProjects.map((project, index) => (
            <ProjectRow key={project.slug} project={project} index={index} priority={index === 0} />
          ))}
        </div>
      </section>

      {/* ── Approach ──────────────────────────────────────────────── */}
      <section className="page-shell pb-16 lg:pb-24">
        <Reveal className="border-border border-b pb-5">
          <h2 className="eyebrow !text-foreground">Working notes</h2>
        </Reveal>

        <RevealGroup className="mt-8 grid gap-8 md:grid-cols-3 md:gap-6">
          {approach.map((item) => (
            <RevealItem key={item.number} className="border-border border-t pt-5">
              <span className="text-muted-foreground font-mono text-[0.7rem] tracking-[0.16em]">{item.number}</span>
              <h3 className="mt-4 text-[1.08rem] leading-snug font-medium tracking-[-0.02em]">
                {item.title}
              </h3>
              <p className="text-muted-foreground mt-2 text-[0.9rem] leading-relaxed">{item.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="border-border bg-card/40 mt-12 grid gap-7 rounded-2xl border p-6 sm:grid-cols-2 lg:grid-cols-4 lg:p-8">
          {skillGroups.slice(0, 4).map((group) => (
            <div key={group.title}>
              <p className="eyebrow">{group.title}</p>
              <ul className="mt-4 flex flex-col gap-1.5 text-[0.88rem]">
                {group.items.slice(0, 5).map((item) => (
                  <li key={item} className="text-muted-foreground">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Reveal>
      </section>

      {/* ── About teaser over a dot grid ──────────────────────────── */}
      <DotGridBackground className="border-border border-y">
        <section className="page-shell grid gap-10 py-16 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:gap-16 lg:py-24">
          <Reveal>
            <p className="eyebrow">About</p>
            <h2 className="mt-3 max-w-[24ch] text-[clamp(2rem,4.6vw,3.2rem)] leading-[1.05] font-medium tracking-[-0.04em] text-balance">
              Most of my work happens on the server.
            </h2>
            <p className="text-muted-foreground mt-5 max-w-[58ch] text-[1.02rem] leading-relaxed">
              {site.bio}
            </p>
            <Button asChild variant="outline" className="mt-7">
              <Link to="/about">
                More about me
                <ArrowRight />
              </Link>
            </Button>
          </Reveal>

          <RevealGroup className="grid content-center gap-6 sm:grid-cols-3 lg:grid-cols-1 lg:border-l lg:pl-10">
            {stats.map((stat) => (
              <RevealItem key={stat.label} className="lg:border-border lg:border-t lg:pt-4 lg:first:border-t-0 lg:first:pt-0">
                <span className="block text-[2.3rem] leading-none font-medium tracking-[-0.045em]">
                  <Counter value={stat.value} />
                </span>
                <span className="eyebrow mt-2 block">{stat.label}</span>
              </RevealItem>
            ))}
          </RevealGroup>
        </section>
      </DotGridBackground>

      {/* ── Closing note ──────────────────────────────────────────── */}
      <section className="page-shell py-16 lg:py-20">
        <Reveal className="border-border flex flex-wrap items-center justify-between gap-6 border-t pt-10">
          <p className="text-muted-foreground max-w-[52ch] text-[0.95rem] leading-relaxed">
            Currently open to internships and full-time roles across backend and full-stack teams.
          </p>
          <Button asChild variant="ghost">
            <a href={site.github} target="_blank" rel="noreferrer">
              Browse GitHub
              <MoveUpRight />
            </a>
          </Button>
        </Reveal>
        <Separator className="mt-10 opacity-0" />
      </section>
    </>
  );
}
