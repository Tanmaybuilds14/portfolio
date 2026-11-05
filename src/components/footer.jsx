import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { site, socials } from '@/data/site';
import { Separator } from '@/components/ui/separator';
import { Reveal } from '@/components/motion/reveal';

export function Footer() {
  return (
    <footer className="border-border relative mt-auto border-t">
      <div className="page-shell py-14 lg:py-20">
        <div className="flex flex-wrap justify-between gap-10">
          <Reveal className="max-w-lg">
            <p className="eyebrow">Available for work</p>
            <h2 className="mt-4 max-w-[18ch] text-3xl font-medium tracking-tight text-balance sm:text-4xl">
              Have a project in mind?
            </h2>
            <p className="text-muted-foreground mt-3 max-w-[40ch] text-[0.94rem] leading-relaxed">
              I reply to everything, usually within a day or two.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="border-border hover:border-signal group mt-6 inline-flex items-center gap-2 border-b pb-1 text-base transition-colors"
            >
              {site.email}
              <ArrowUpRight className="text-signal size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Reveal>

          <div className="flex gap-14">
            <div className="flex flex-col gap-3">
              <p className="eyebrow">Elsewhere</p>
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-sm transition-colors"
                >
                  {social.label}
                  <ArrowUpRight className="size-3 opacity-60" />
                </a>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <p className="eyebrow">Navigate</p>
              {[
                { to: '/work', label: 'Work' },
                { to: '/about', label: 'About' },
                { to: '/contact', label: 'Contact' },
              ].map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="text-muted-foreground flex flex-wrap items-center justify-between gap-4 font-mono text-[0.65rem] tracking-[0.12em] uppercase">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <p className="hidden sm:block">React · Tailwind v4 · shadcn/ui · motion.dev · anime.js</p>
          <p>{site.location}</p>
        </div>
      </div>
    </footer>
  );
}
