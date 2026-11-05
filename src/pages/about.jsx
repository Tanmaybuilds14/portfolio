import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { education, site, socials, skillGroups, stats, timeline } from '@/data/site';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/reveal';
import { Counter } from '@/components/motion/counter';
import { GridBackground } from '@/components/backgrounds/grid-background';
import { DotGridBackground } from '@/components/backgrounds/dot-grid-background';

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
    <>
      <GridBackground className="border-border border-b" cellSize={76}>
        <div className="page-shell grid items-end gap-10 pt-28 pb-12 lg:grid-cols-2 lg:gap-16 lg:pt-36 lg:pb-16">
          <Reveal>
            <p className="eyebrow">About</p>
            <h1 className="mt-4 max-w-[16ch] text-[clamp(2.2rem,5.2vw,3.6rem)] leading-[1] font-medium tracking-[-0.04em]">
              Full-stack developer, mostly on the server side.
            </h1>
          </Reveal>

          <Reveal delay={0.08} className="space-y-4">
            <p className="text-muted-foreground text-[1rem] leading-relaxed">
              I’m {site.firstName}, a full-stack developer based in {site.location}. I’m finishing a
              Bachelor of Computer Applications while building products end to end — mostly for the
              web, mostly with React and Node.
            </p>
            <p className="text-muted-foreground text-[1rem] leading-relaxed">
              My strongest work is on the server side of that stack: data models, APIs, realtime
              behaviour and the awkward edges — permissions, offline states, concurrent edits. I care
              about interfaces too, but I care about them being truthful first.
            </p>
            <p className="text-muted-foreground text-[1rem] leading-relaxed">
              Away from the editor I practise data structures and algorithms on LeetCode and
              GeeksforGeeks, and read production source code to see how other people solved problems I
              have not faced yet.
            </p>
          </Reveal>
        </div>
      </GridBackground>

      <section className="page-shell py-10">
        <Reveal>
          <dl className="border-border grid gap-6 border-b pb-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'Currently', value: site.availability },
              { label: 'Studying', value: education.degree },
              { label: 'Based in', value: site.location },
              { label: 'Reach me', value: site.email, href: `mailto:${site.email}` },
            ].map((item) => (
              <div key={item.label}>
                <dt className="eyebrow">{item.label}</dt>
                <dd className="mt-1.5 text-[0.92rem] break-words">
                  {item.href ? (
                    <a href={item.href} className="hover:text-signal border-border border-b pb-0.5 transition-colors">
                      {item.value}
                    </a>
                  ) : (
                    item.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>

      {/* Toolkit */}
      <section className="page-shell py-10 lg:py-14">
        <Reveal className="border-border flex flex-wrap items-end justify-between gap-4 border-b pb-5">
          <div>
            <p className="eyebrow">Toolkit</p>
            <h2 className="mt-3 text-[1.9rem] leading-tight font-medium tracking-[-0.035em]">
              Tools, by layer
            </h2>
          </div>
          <p className="text-muted-foreground font-mono text-[0.68rem] tracking-wide">
            Chosen for the job, not for the résumé
          </p>
        </Reveal>

        <RevealGroup className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">
          {skillGroups.map((group) => (
            <RevealItem key={group.title} className="border-border border-t pt-4">
              <p className="text-muted-foreground font-mono text-[0.62rem] tracking-[0.16em] uppercase">
                {group.title}
              </p>
              <ul className="mt-3 flex flex-col gap-1.5">
                {group.items.map((item) => (
                  <li key={item} className="text-muted-foreground text-[0.88rem]">
                    {item}
                  </li>
                ))}
              </ul>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* Timeline */}
      <section className="page-shell py-10 lg:py-14">
        <Reveal className="border-border border-b pb-5">
          <p className="eyebrow">Track record</p>
          <h2 className="mt-3 text-[1.9rem] leading-tight font-medium tracking-[-0.035em]">
            Newest first
          </h2>
        </Reveal>

        <ol className="mt-2">
          {timeline.map((item, index) => (
            <Reveal as="li" key={item.title} delay={index * 0.04}>
              <div className="border-border grid gap-2 border-b py-6 sm:grid-cols-[130px_100px_minmax(0,1fr)] sm:gap-6">
                <span className="text-muted-foreground tnum font-mono text-[0.7rem] tracking-[0.1em] uppercase">
                  {item.period}
                </span>
                <Badge variant="accent" className="justify-self-start">
                  {item.kind}
                </Badge>
                <div className="max-w-[62ch]">
                  <h3 className="text-[1.05rem] font-medium tracking-[-0.02em]">{item.title}</h3>
                  <p className="text-muted-foreground mt-1.5 text-[0.9rem] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* Principles as an accordion */}
      <DotGridBackground className="border-border border-y">
        <section className="page-shell py-14 lg:py-20">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
            <Reveal>
              <p className="eyebrow">Principles</p>
              <h2 className="mt-3 text-[1.9rem] leading-tight font-medium tracking-[-0.035em]">
                Three habits
              </h2>
              <p className="text-muted-foreground mt-4 max-w-[38ch] text-[0.94rem] leading-relaxed">
                Three rules I keep coming back to, usually after breaking one of them.
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <Accordion type="single" collapsible defaultValue="item-0" className="border-border border-t">
                {principles.map((item, index) => (
                  <AccordionItem key={item.title} value={`item-${index}`}>
                    <AccordionTrigger className="text-[1.02rem]">
                      <span className="flex items-baseline gap-3">
                        <span className="text-muted-foreground font-mono text-[0.65rem]">0{index + 1}</span>
                        {item.title}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground max-w-[60ch] pl-7 text-[0.92rem] leading-relaxed">
                        {item.body}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>
          </div>
        </section>
      </DotGridBackground>

      {/* CTA */}
      <section className="page-shell py-14 lg:py-20">
        <Reveal className="border-border bg-card/40 flex flex-wrap items-center justify-between gap-7 rounded-2xl border p-6 lg:p-9">
          <div>
            <h2 className="max-w-[24ch] text-[clamp(1.6rem,3.2vw,2.2rem)] leading-tight font-medium tracking-[-0.035em]">
              Open to internships and full-time roles.
            </h2>
            <p className="text-muted-foreground mt-3 max-w-[48ch] text-[0.94rem] leading-relaxed">
              If you are hiring for backend or full-stack work — or you just want an opinion on a
              technical decision — my inbox is open.
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <Button asChild>
              <Link to="/contact">
                Start a conversation
                <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <a href={site.github} target="_blank" rel="noreferrer">
                GitHub
                <ArrowUpRight />
              </a>
            </Button>
          </div>
        </Reveal>

        <Separator className="my-10" />

        <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target={social.href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              className="text-muted-foreground hover:text-foreground group inline-flex items-center gap-2 text-[0.88rem] transition-colors"
            >
              <span className="font-mono text-[0.62rem] tracking-[0.14em] uppercase">{social.label}</span>
              {social.handle}
              <ArrowUpRight className="text-signal size-3.5 opacity-70" />
            </a>
          ))}
          <div className="text-muted-foreground ml-auto flex gap-5 font-mono text-[0.62rem] tracking-[0.12em] uppercase">
            {stats.map((stat) => (
              <span key={stat.label}>
                <Counter value={stat.value} /> {stat.label.toLowerCase()}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
