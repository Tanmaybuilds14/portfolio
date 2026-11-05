import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { site, socials } from '../data/site';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__lead">
            <p className="eyebrow">Available for work</p>
            <h2 className="footer__title display display--md">
              Got something worth <span className="serif serif--accent">building?</span>
            </h2>
            <a href={`mailto:${site.email}`} className="footer__mail">
              {site.email}
              <ArrowUpRight size={18} />
            </a>
          </div>

          <div className="footer__cols">
            <div className="footer__col">
              <p className="mono">Elsewhere</p>
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className="footer__link"
                >
                  {social.label}
                  <ArrowUpRight size={13} />
                </a>
              ))}
            </div>
            <div className="footer__col">
              <p className="mono">Navigate</p>
              <Link to="/work" className="footer__link">
                Work
              </Link>
              <Link to="/about" className="footer__link">
                About
              </Link>
              <Link to="/contact" className="footer__link">
                Contact
              </Link>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="mono">© {new Date().getFullYear()} {site.name}</p>
          <p className="mono footer__note">Designed & built from scratch — React, Vite, no template.</p>
          <p className="mono">{site.location}</p>
        </div>
      </div>
    </footer>
  );
}
