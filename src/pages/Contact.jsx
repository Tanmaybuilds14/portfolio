import { useState } from 'react';
import { ArrowUpRight, Check, Copy, Mail } from 'lucide-react';
import { site, socials } from '../data/site';
import Reveal from '../components/Reveal';
import useLocalTime from '../hooks/useLocalTime';
import './Contact.css';

const topics = [
  'A role you are hiring for',
  'A project you want built',
  'A technical question',
  'Something else',
];

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', topic: topics[0], message: '' });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const time = useLocalTime(site.timeZone);

  const update = (field) => (event) => setForm((prev) => ({ ...prev, [field]: event.target.value }));

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.name.trim() || !form.message.trim() || !form.email.trim()) {
      setError('Please add your name, email and a message.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) {
      setError('That email address does not look right.');
      return;
    }

    setError('');
    setSent(true);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="page contact-page">
      <div className="container">
        <header className="contact-head">
          <Reveal>
            <p className="eyebrow">Contact</p>
            <h1 className="display display--xl contact-head__title">
              Tell me what
              <br />
              you’re <span className="serif serif--accent">building.</span>
            </h1>
          </Reveal>
          <Reveal delay={80}>
            <p className="body-lg">
              I read everything that arrives and usually reply within a day or two. A short note with
              context is far more useful than a long one with none.
            </p>
          </Reveal>
        </header>

        <div className="contact-grid">
          <Reveal className="contact-card card">
            {sent ? (
              <div className="contact-success" role="status">
                <span className="contact-success__icon">
                  <Check size={20} strokeWidth={2.2} />
                </span>
                <h2 className="display display--md">Message ready to send.</h2>
                <p className="body">
                  This site is a static build, so nothing was transmitted automatically. Your message is
                  formatted below — email it to me and it will land in my inbox directly.
                </p>
                <div className="contact-success__preview">
                  <p className="mono">Draft</p>
                  <pre>{`To: ${site.email}\nSubject: ${form.topic}\n\n${form.name} <${form.email}>\n\n${form.message}`}</pre>
                </div>
                <div className="contact-success__actions">
                  <a
                    className="btn"
                    href={`mailto:${site.email}?subject=${encodeURIComponent(form.topic)}&body=${encodeURIComponent(
                      `${form.message}\n\n— ${form.name} (${form.email})`,
                    )}`}
                  >
                    Open in mail app <ArrowUpRight size={15} />
                  </a>
                  <button type="button" className="btn btn--ghost" onClick={() => setSent(false)}>
                    Edit message
                  </button>
                </div>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <div className="contact-form__row">
                  <label className="field">
                    <span className="field__label mono">Your name</span>
                    <input
                      type="text"
                      name="name"
                      placeholder="Ada Lovelace"
                      value={form.name}
                      onChange={update('name')}
                      autoComplete="name"
                      required
                    />
                  </label>
                  <label className="field">
                    <span className="field__label mono">Email</span>
                    <input
                      type="email"
                      name="email"
                      placeholder="you@company.com"
                      value={form.email}
                      onChange={update('email')}
                      autoComplete="email"
                      required
                    />
                  </label>
                </div>

                <fieldset className="field contact-form__topics">
                  <legend className="field__label mono">What is this about?</legend>
                  <div className="topic-row">
                    {topics.map((topic) => (
                      <label
                        key={topic}
                        className={`topic ${form.topic === topic ? 'is-active' : ''}`}
                      >
                        <input
                          type="radio"
                          name="topic"
                          value={topic}
                          checked={form.topic === topic}
                          onChange={update('topic')}
                        />
                        {topic}
                      </label>
                    ))}
                  </div>
                </fieldset>

                <label className="field">
                  <span className="field__label mono">Message</span>
                  <textarea
                    name="message"
                    rows="6"
                    placeholder="A little context: what you’re working on, what you need, and any timeline."
                    value={form.message}
                    onChange={update('message')}
                    required
                  />
                </label>

                {error && (
                  <p className="contact-form__error" role="alert">
                    {error}
                  </p>
                )}

                <div className="contact-form__actions">
                  <button type="submit" className="btn">
                    Prepare message <ArrowUpRight size={15} />
                  </button>
                  <p className="mono contact-form__hint">
                    Or email directly — the address is on the right.
                  </p>
                </div>
              </form>
            )}
          </Reveal>

          <div className="contact-side">
            <Reveal delay={60} className="contact-side__card">
              <p className="mono">Direct</p>
              <button type="button" className="contact-email" onClick={copyEmail}>
                <Mail size={16} />
                <span>{site.email}</span>
                <span className="contact-email__copy">
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  <span className="sr-only">{copied ? 'Copied' : 'Copy email address'}</span>
                </span>
              </button>
              <p className="contact-side__note">
                {copied ? 'Copied to clipboard.' : 'Click to copy the address.'}
              </p>
            </Reveal>

            <Reveal delay={110} className="contact-side__card">
              <p className="mono">Elsewhere</p>
              <ul className="contact-links">
                {socials
                  .filter((social) => social.label !== 'Email')
                  .map((social) => (
                    <li key={social.label}>
                      <a href={social.href} target="_blank" rel="noreferrer">
                        <span>{social.label}</span>
                        <span className="contact-links__handle">{social.handle}</span>
                        <ArrowUpRight size={14} />
                      </a>
                    </li>
                  ))}
              </ul>
            </Reveal>

            <Reveal delay={160} className="contact-side__card contact-side__facts">
              <div>
                <p className="mono">Based in</p>
                <p>{site.location}</p>
              </div>
              <div>
                <p className="mono">Local time</p>
                <p>{time} IST</p>
              </div>
              <div>
                <p className="mono">Availability</p>
                <p className="contact-side__available">
                  <span className="status-dot" aria-hidden="true" />
                  {site.availability}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
}
