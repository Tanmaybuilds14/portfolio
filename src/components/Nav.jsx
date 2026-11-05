import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { site } from '../data/site';
import './Nav.css';

const links = [
  { to: '/work', label: 'Work' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
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
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav__inner container">
        <Link to="/" className="nav__brand" aria-label={`${site.name} — home`}>
          <span className="nav__mark" aria-hidden="true">
            TS
          </span>
          <span className="nav__brand-text">
            <span className="nav__name">{site.name}</span>
            <span className="nav__role">{site.focus}</span>
          </span>
        </Link>

        <nav className="nav__links" aria-label="Primary">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `nav__link ${isActive ? 'is-active' : ''}`}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav__actions">
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer"
            className="nav__gh"
            aria-label="GitHub profile"
          >
            GitHub
            <ArrowUpRight size={14} />
          </a>
          <Link to="/contact" className="btn btn--sm nav__cta">
            Let’s talk
          </Link>
          <button
            type="button"
            className="nav__toggle"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" className="nav__mobile">
          <nav className="nav__mobile-links" aria-label="Mobile">
            {[{ to: '/', label: 'Home' }, ...links].map((link, index) => (
              <Link
                key={link.to}
                to={link.to}
                className="nav__mobile-link"
                onClick={() => setOpen(false)}
              >
                <span className="mono">0{index + 1}</span>
                {link.label}
                <ArrowUpRight size={18} />
              </Link>
            ))}
          </nav>
          <div className="nav__mobile-foot">
            <a href={`mailto:${site.email}`} className="link-underline">
              {site.email}
            </a>
            <p className="mono">{site.location}</p>
          </div>
        </div>
      )}
    </header>
  );
}
