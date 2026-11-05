import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, MoveRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ProjectVisual } from '@/components/project-visual';
import { Reveal } from '@/components/motion/reveal';
import { cn } from '@/lib/utils';

/** A full-width project row for the homepage: visual beside a numbered summary. */
export function ProjectRow({ project, index, priority = false }) {
  const reduced = useReducedMotion();

  return (
    <Reveal>
      <motion.div
        whileHover={reduced ? undefined : { y: -3 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <Link
          to={`/work/${project.slug}`}
          className="group border-border bg-card/40 hover:border-foreground/20 hover:bg-card/70 grid items-center gap-5 rounded-2xl border p-4 transition-colors sm:gap-7 sm:p-5 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-10"
        >
          <div className={cn('min-w-0', index % 2 === 1 && 'lg:order-2')}>
            <ProjectVisual project={project} priority={priority} compact />
          </div>

          <div className={cn('min-w-0 px-1 pb-2 lg:px-3', index % 2 === 1 && 'lg:order-1')}>
            <div className="flex items-center gap-3">
              <span className="text-muted-foreground font-mono text-[0.68rem] tracking-[0.16em]">
                0{index + 1}
              </span>
              <span className="bg-border h-px flex-1" aria-hidden="true" />
              <span className="text-muted-foreground font-mono text-[0.68rem]">{project.year}</span>
            </div>

            <h3 className="mt-4 text-[1.65rem] leading-tight font-medium tracking-[-0.04em]">
              {project.title}
            </h3>
            <p className="text-muted-foreground mt-1.5 text-[0.95rem]">{project.tagline}</p>
            <p className="text-muted-foreground mt-3 max-w-[46ch] text-[0.9rem] leading-relaxed">
              {project.summary}
            </p>

            <div className="mt-5 flex flex-wrap gap-1.5">
              {project.tags.slice(0, 4).map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>

            <span className="border-border group-hover:border-signal mt-6 inline-flex items-center gap-2 border-b pb-1 text-[0.85rem] transition-colors">
              View case study
              <MoveRight className="text-signal size-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </Link>
      </motion.div>
    </Reveal>
  );
}

/** Compact card used on the /work index. */
export function ProjectCard({ project, priority = false }) {
  return (
    <Link
      to={`/work/${project.slug}`}
      className="group border-border bg-card/40 hover:border-foreground/20 hover:bg-card/70 flex h-full flex-col rounded-2xl border p-3 transition-colors"
    >
      <div className="relative">
        <ProjectVisual project={project} priority={priority} compact />
        <span className="bg-background/80 text-muted-foreground absolute top-2.5 right-2.5 rounded-md px-2 py-0.5 font-mono text-[0.58rem] tracking-[0.1em] uppercase backdrop-blur">
          {project.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col px-2 pt-4 pb-2">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-[1.2rem] leading-tight font-medium tracking-[-0.03em]">
            {project.title}
          </h3>
          <span className="text-muted-foreground font-mono text-[0.62rem]">{project.year}</span>
        </div>
        <p className="text-muted-foreground mt-1.5 text-[0.9rem]">{project.tagline}</p>
        <p className="text-muted-foreground mt-2.5 flex-1 text-[0.86rem] leading-relaxed">
          {project.summary}
        </p>

        <div className="border-border mt-4 flex items-center justify-between gap-3 border-t pt-3.5">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, 2).map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
          <span className="text-muted-foreground group-hover:text-foreground inline-flex items-center gap-1.5 text-[0.78rem] whitespace-nowrap transition-colors">
            Case study
            <ArrowUpRight className="text-signal size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
