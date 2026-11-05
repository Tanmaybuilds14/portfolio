import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Check, Copy, Mail } from 'lucide-react';
import { site, socials } from '@/data/site';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Reveal } from '@/components/motion/reveal';
import { GridBackground } from '@/components/backgrounds/grid-background';
import { cn } from '@/lib/utils';
import useLocalTime from '@/hooks/useLocalTime';

const topics = ['A role you are hiring for', 'A project you want built', 'A technical question', 'Something else'];

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
    <>
      <GridBackground className="border-border border-b" cellSize={76}>
        <div className="page-shell grid items-end gap-8 pt-28 pb-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-16 lg:pt-36 lg:pb-16">
          <Reveal>
            <p className="eyebrow">Contact</p>
            <h1 className="mt-4 max-w-[16ch] text-[clamp(2.2rem,5.2vw,3.6rem)] leading-[1] font-medium tracking-[-0.04em]">
              Get in touch.
            </h1>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-muted-foreground text-[1rem] leading-relaxed">
              I read everything that arrives and usually reply within a day or two. A short note with
              context is far more useful than a long one with none.
            </p>
          </Reveal>
        </div>
      </GridBackground>

      <section className="page-shell grid gap-5 py-12 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] lg:gap-6 lg:py-16">
        <Reveal className="border-border bg-card/40 rounded-2xl border p-5 sm:p-7 lg:p-9">
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="sent"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                role="status"
              >
                <span className="border-signal/40 bg-signal/10 text-signal grid size-10 place-items-center rounded-full border">
                  <Check className="size-5" strokeWidth={2.4} />
                </span>
                <h2 className="mt-5 text-[1.7rem] font-medium tracking-[-0.03em]">Message ready to send.</h2>
                <p className="text-muted-foreground mt-2 max-w-[52ch] text-[0.95rem] leading-relaxed">
                  This site is a static build, so nothing was transmitted automatically. Your message is
                  formatted below — send it from your mail app and it lands in my inbox directly.
                </p>

                <div className="border-border bg-background/60 mt-6 rounded-xl border p-4">
                  <p className="eyebrow mb-3">Draft</p>
                  <pre className="text-muted-foreground font-mono text-[0.76rem] leading-relaxed whitespace-pre-wrap break-words">
{`To: ${site.email}
Subject: ${form.topic}

${form.name} <${form.email}>

${form.message}`}
                  </pre>
                </div>

                <div className="mt-6 flex flex-wrap gap-2.5">
                  <Button asChild>
                    <a
                      href={`mailto:${site.email}?subject=${encodeURIComponent(form.topic)}&body=${encodeURIComponent(
                        `${form.message}\n\n— ${form.name} (${form.email})`,
                      )}`}
                    >
                      Open in mail app
                      <ArrowUpRight />
                    </a>
                  </Button>
                  <Button variant="outline" onClick={() => setSent(false)}>
                    Edit message
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                onSubmit={handleSubmit}
                noValidate
                className="flex flex-col gap-5"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="flex flex-col gap-2">
                    <span className="eyebrow">Your name</span>
                    <Input name="name" placeholder="Ada Lovelace" value={form.name} onChange={update('name')} autoComplete="name" />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="eyebrow">Email</span>
                    <Input type="email" name="email" placeholder="you@company.com" value={form.email} onChange={update('email')} autoComplete="email" />
                  </label>
                </div>

                <fieldset className="flex flex-col gap-2.5">
                  <legend className="eyebrow mb-2.5">What is this about?</legend>
                  <div className="flex flex-wrap gap-2">
                    {topics.map((topic) => (
                      <label
                        key={topic}
                        className={cn(
                          'cursor-pointer rounded-full border px-3.5 py-1.5 text-[0.82rem] transition-colors focus-within:ring-[3px] focus-within:ring-ring/30',
                          form.topic === topic
                            ? 'border-signal bg-signal text-background'
                            : 'border-border text-muted-foreground hover:text-foreground hover:border-foreground/25',
                        )}
                      >
                        <input
                          type="radio"
                          name="topic"
                          value={topic}
                          checked={form.topic === topic}
                          onChange={update('topic')}
                          className="sr-only"
                        />
                        {topic}
                      </label>
                    ))}
                  </div>
                </fieldset>

                <label className="flex flex-col gap-2">
                  <span className="eyebrow">Message</span>
                  <Textarea
                    name="message"
                    rows={6}
                    placeholder="A little context: what you’re working on, what you need, and any timeline."
                    value={form.message}
                    onChange={update('message')}
                  />
                </label>

                {error && (
                  <p role="alert" className="border-destructive/40 bg-destructive/10 text-destructive rounded-xl border px-3.5 py-2.5 text-[0.86rem]">
                    {error}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-4">
                  <Button type="submit" size="lg">
                    Prepare message
                    <ArrowUpRight />
                  </Button>
                  <p className="text-muted-foreground font-mono text-[0.66rem] tracking-wide">
                    Or email directly — the address is alongside.
                  </p>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </Reveal>

        <div className="flex flex-col gap-4">
          <Reveal className="border-border bg-card/40 rounded-xl border p-5">
            <p className="eyebrow">Direct</p>
            <div className="mt-3 flex items-center gap-2">
              <Mail className="text-muted-foreground size-4 shrink-0" />
              <button
                type="button"
                onClick={copyEmail}
                className="hover:text-signal min-w-0 truncate text-left text-[0.92rem] transition-colors"
              >
                {site.email}
              </button>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" onClick={copyEmail} className="ml-auto size-8 shrink-0" aria-label="Copy email address">
                      {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>{copied ? 'Copied' : 'Copy address'}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </Reveal>

          <Reveal delay={0.05} className="border-border bg-card/40 rounded-xl border p-5">
            <p className="eyebrow">Elsewhere</p>
            <ul className="mt-2">
              {socials
                .filter((social) => social.label !== 'Email')
                .map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group border-border hover:text-foreground flex items-center gap-2 border-b py-2.5 text-[0.9rem] last:border-0"
                    >
                      {social.label}
                      <span className="text-muted-foreground ml-auto truncate font-mono text-[0.66rem]">
                        {social.handle}
                      </span>
                      <ArrowUpRight className="text-signal size-3.5" />
                    </a>
                  </li>
                ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1} className="border-border bg-card/40 grid gap-4 rounded-xl border p-5 sm:grid-cols-3 lg:grid-cols-1">
            <div>
              <p className="eyebrow">Based in</p>
              <p className="mt-1 text-[0.9rem]">{site.location}</p>
            </div>
            <div>
              <p className="eyebrow">Local time</p>
              <p className="tnum mt-1 text-[0.9rem]">{time} IST</p>
            </div>
            <div>
              <p className="eyebrow">Availability</p>
              <p className="mt-1 flex items-center gap-2 text-[0.9rem]">
                <span className="bg-signal size-1.5 rounded-full" />
                {site.availability}
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
