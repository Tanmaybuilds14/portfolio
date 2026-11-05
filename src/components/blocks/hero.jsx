import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { hero, site } from '@/data/site';
import { Button } from '@/components/ui/button';
import { SplitText } from '@/components/motion/split-text';
import { Marquee } from '@/components/blocks/marquee';

const EASE = [0.16, 1, 0.3, 1];
const stack = ['TypeScript', 'React 19', 'Next.js', 'Node.js', 'PostgreSQL', 'Redis', 'Prisma', 'Docker'];

/** Hero block — 21st.dev structure (eyebrow → split headline → lede → CTAs → ticker). */
export function Hero({ now }) {
  const reduced = useReducedMotion();

  return (
    <div className="border-border relative border-b">
      <div className="page-shell grid items-end gap-10 pt-28 pb-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-14 lg:pt-36 lg:pb-16">
        <div>
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="border-border glass inline-flex items-center gap-2.5 rounded-full border py-1.5 pr-3.5 pl-2.5"
          >
            <span className="relative flex size-1.5">
              <span className="bg-signal absolute inline-flex size-full animate-ping rounded-full opacity-60 motion-reduce:hidden" />
              <span className="bg-signal relative inline-flex size-1.5 rounded-full" />
            </span>
            <span className="text-muted-foreground font-mono text-[0.65rem] tracking-[0.14em] uppercase">
              {site.availability}
            </span>
          </motion.div>

          {/* anime.js word stagger */}
          <SplitText
            as="h1"
            delay={120}
            text={[hero.lineOne, hero.lineTwo]}
            className="mt-7 text-[clamp(2.6rem,7vw,5.1rem)] leading-[0.95] font-medium tracking-[-0.045em]"
          />

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8, ease: EASE }}
            className="text-foreground/70 mt-2 text-[clamp(2.1rem,6.4vw,4.4rem)] leading-[1] font-light tracking-[-0.04em] text-balance"
          >
            <span className="text-foreground/70">{hero.emphasis}</span>
          </motion.p>

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9, ease: EASE }}
            className="text-foreground/75 mt-7 max-w-[54ch] text-[1.02rem] leading-relaxed"
          >
            {site.intro}
          </motion.p>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1, ease: EASE }}
            className="mt-8 flex flex-wrap items-center gap-2.5"
          >
            <Button asChild size="lg">
              <Link to="/work">
                See selected work
                <ArrowRight />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/contact">Get in touch</Link>
            </Button>
          </motion.div>
        </div>

        {now && (
          <motion.aside
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
            className="lg:pb-2"
          >
            <Link
              to={`/work/${now.slug}`}
              className="group border-border glass hover:border-foreground/25 block rounded-2xl border p-5 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="eyebrow">Now building</span>
                <span className="bg-signal size-1.5 rounded-full shadow-[0_0_0_4px_color-mix(in_oklab,var(--signal)_18%,transparent)]" />
              </div>
              <p className="mt-3 text-[1.02rem] leading-snug font-medium tracking-tight">
                {now.title} — {now.tagline}
              </p>
              <p className="text-muted-foreground mt-2 text-[0.85rem] leading-relaxed">
                {now.heroNote}
              </p>
              <span className="text-foreground/90 mt-4 inline-flex items-center gap-1.5 text-[0.82rem]">
                Read the case study
                <ArrowUpRight className="text-signal size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Link>

            <dl className="border-border mt-5 grid gap-2.5 border-t pt-4 text-sm">
              <div className="flex items-baseline justify-between gap-3">
                <dt className="eyebrow">Based in</dt>
                <dd>{site.location}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-3">
                <dt className="eyebrow">Local time</dt>
                <dd className="tnum">{now.time}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-3">
                <dt className="eyebrow">Focus</dt>
                <dd>Backend systems</dd>
              </div>
            </dl>
          </motion.aside>
        )}
      </div>

      <div className="border-border border-t">
        <div className="page-shell flex items-center gap-6 py-3.5">
          <span className="eyebrow shrink-0">Core stack</span>
          <Marquee duration={34} className="mask-fade-r flex-1 [mask-image:linear-gradient(to_right,transparent,#000_6%,#000_92%,transparent)]">
            {stack.map((item) => (
              <span
                key={item}
                className="text-muted-foreground/90 flex items-center gap-10 font-mono text-[0.72rem] tracking-[0.06em] whitespace-nowrap"
              >
                {item}
                <span className="bg-border size-1 rounded-full" aria-hidden="true" />
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </div>
  );
}
