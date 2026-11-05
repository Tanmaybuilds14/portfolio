import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { site } from '@/data/site';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const links = [
  { to: '/work', label: 'Work' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-[100] transition-colors duration-300',
        scrolled ? 'glass border-b border-border' : 'border-b border-transparent',
      )}
    >
      <div className="page-shell flex h-16 items-center justify-between gap-6">
        <Link
          to="/"
          onClick={() => setOpen(false)}
          className="group flex items-center gap-2.5"
          aria-label={`${site.name} — home`}
        >
          <span className="border-signal/35 bg-signal/10 text-signal group-hover:bg-signal group-hover:text-background grid size-8 place-items-center rounded-lg border font-mono text-[0.7rem] transition-colors">
            TS
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-[0.9rem] font-medium tracking-tight">{site.name}</span>
            <span className="text-muted-foreground font-mono text-[0.6rem] tracking-[0.12em] uppercase">
              {site.focus}
            </span>
          </span>
        </Link>

        {/* Desktop: a quiet segmented nav, not a bar of buttons */}
        <nav
          aria-label="Primary"
          className="border-border bg-card/50 hidden items-center gap-0.5 rounded-full border p-1 md:flex"
        >
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  'relative rounded-full px-3.5 py-1.5 text-[0.85rem] transition-colors',
                  isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
                )
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="bg-secondary absolute inset-0 rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{link.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground hover:text-foreground hidden items-center gap-1 rounded-full px-2.5 py-1.5 text-[0.85rem] transition-colors sm:inline-flex"
          >
            GitHub
            <ArrowUpRight className="size-3.5" />
          </a>
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link to="/contact">Let’s talk</Link>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="md:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="bg-background fixed inset-x-0 top-16 bottom-0 z-[99] overflow-y-auto px-5 pt-6 pb-10 sm:px-8 md:hidden"
          >
            <nav aria-label="Mobile" className="flex flex-col">
              {[{ to: '/', label: 'Home' }, ...links].map((link, index) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className="border-border flex items-center gap-3 border-b py-4 text-2xl font-medium tracking-tight"
                >
                  <span className="text-muted-foreground font-mono text-[0.65rem]">
                    0{index + 1}
                  </span>
                  {link.label}
                  <ArrowUpRight className="text-signal ml-auto size-4" />
                </Link>
              ))}
            </nav>
            <div className="mt-8 flex flex-col gap-3">
              <a href={`mailto:${site.email}`} className="text-muted-foreground text-sm">
                {site.email}
              </a>
              <p className="text-muted-foreground font-mono text-[0.65rem] tracking-[0.12em] uppercase">
                {site.location} · {site.availability}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
