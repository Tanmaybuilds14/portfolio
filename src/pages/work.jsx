import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '@/data/projects';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProjectCard } from '@/components/blocks/project-row';
import { Reveal } from '@/components/motion/reveal';
import { GridBackground } from '@/components/backgrounds/grid-background';

const categories = ['All', ...new Set(projects.map((project) => project.category))];

export default function Work() {
  const [params, setParams] = useSearchParams();
  const initial = params.get('filter') ?? 'All';
  const [active, setActive] = useState(categories.includes(initial) ? initial : 'All');

  const visible = active === 'All' ? projects : projects.filter((p) => p.category === active);

  const onChange = (value) => {
    setActive(value);
    setParams(value === 'All' ? {} : { filter: value }, { replace: true });
  };

  return (
    <>
      <GridBackground className="border-border border-b" cellSize={76} glow="top-left">
        <div className="page-shell pt-28 pb-10 lg:pt-36 lg:pb-14">
          <Reveal>
            <p className="eyebrow">
              Index — {String(projects.length).padStart(2, '0')} projects,{' '}
              {categories.length - 1} disciplines
            </p>
            <h1 className="mt-4 max-w-[20ch] text-[clamp(2rem,4.6vw,3.2rem)] leading-[1.02] font-medium tracking-[-0.04em] text-balance">
              Each of these ran into something that did not work the first time.
            </h1>
            <p className="text-muted-foreground mt-6 max-w-[62ch] text-[1.02rem] leading-relaxed">
              Each case study covers the problem, the decisions that mattered, and the part that was
              genuinely difficult. Screenshots where the project is public; diagrams where the work
              lived on the server.
            </p>
          </Reveal>
        </div>
      </GridBackground>

      <section className="page-shell py-10 lg:py-14">
        <Reveal className="border-border flex flex-wrap items-center justify-between gap-4 border-b pb-5">
          <Tabs value={active} onValueChange={onChange}>
            <TabsList>
              {categories.map((category) => (
                <TabsTrigger key={category} value={category}>
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <p className="text-muted-foreground font-mono text-[0.68rem] tracking-[0.12em] uppercase">
            {visible.length} shown
          </p>
        </Reveal>

        <motion.div layout className="mt-7 grid gap-4 sm:grid-cols-2 lg:gap-5">
          <AnimatePresence mode="popLayout">
            {visible.map((project, index) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <ProjectCard project={project} priority={index < 2} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <Reveal className="border-border bg-card/40 mt-12 flex flex-wrap items-center justify-between gap-6 rounded-2xl border p-6 lg:p-8">
          <div>
            <p className="eyebrow">More on GitHub</p>
            <p className="mt-3 max-w-[30ch] text-[1.4rem] leading-tight font-medium tracking-[-0.03em]">
              Experiments and unfinished things live in the repos.
            </p>
          </div>
          <Button asChild variant="outline">
            <a href="https://github.com/Tanmaybuilds14?tab=repositories" target="_blank" rel="noreferrer">
              Browse repositories
              <ArrowUpRight />
            </a>
          </Button>
        </Reveal>
      </section>
    </>
  );
}
