/*
 * Generated project visuals.
 * Projects with a real screenshot render it inside a browser frame;
 * everything else gets a geometric "spec plate" drawn in SVG.
 * All coordinates below live in a 100 × 100 viewBox.
 */
import { cn } from '@/lib/utils';

const art = {
  collab: ({ accent }) => (
    <g>
      <rect x="18" y="24" width="64" height="52" rx="4" fill={accent} fillOpacity="0.06" />
      <g stroke="#ffffff" strokeOpacity="0.18" strokeWidth="0.8">
        <path d="M24 38H62" />
        <path d="M24 45H74" />
        <path d="M24 52H56" />
        <path d="M24 59H68" />
        <path d="M24 66H48" />
      </g>
      <path d="M49.2 33v40" stroke={accent} strokeWidth="1.1" />
      <path d="M50 28.5l4.4 5.5h-8.8z" fill={accent} />
      <path d="M63.4 41v30" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="0.9" />
      <rect x="58" y="18" width="16" height="6" rx="3" fill={accent} />
      <rect x="64" y="17" width="12" height="5" rx="2.5" fill="#ffffff" fillOpacity="0.5" />
    </g>
  ),
  orbit: ({ accent }) => (
    <g fill="none" stroke={accent}>
      <ellipse cx="50" cy="50" rx="34" ry="15" strokeOpacity="0.38" />
      <ellipse cx="50" cy="50" rx="34" ry="15" strokeOpacity="0.22" transform="rotate(56 50 50)" />
      <ellipse cx="50" cy="50" rx="34" ry="15" strokeOpacity="0.14" transform="rotate(-48 50 50)" />
      <circle cx="50" cy="50" r="15" stroke="#ffffff" strokeOpacity="0.18" strokeDasharray="1.5 4" />
      <circle cx="50" cy="50" r="4" fill={accent} stroke="none" />
      <circle cx="84" cy="50" r="2.6" fill="#ffffff" stroke="none" fillOpacity="0.9" />
      <circle cx="69" cy="38" r="2" fill={accent} stroke="none" />
      <circle cx="31" cy="62" r="2" fill={accent} stroke="none" fillOpacity="0.6" />
    </g>
  ),
  wave: ({ accent }) => (
    <g fill="none" strokeLinecap="round">
      <g stroke="#ffffff" strokeOpacity="0.12" strokeWidth="0.6">
        <path d="M14 26H86" />
        <path d="M14 74H86" />
      </g>
      <path
        d="M14 62C24 62 26 36 38 36C50 36 50 68 62 68C74 68 76 46 86 46"
        stroke={accent}
        strokeWidth="1.5"
      />
      <path
        d="M14 70C24 70 28 52 40 52C52 52 54 76 64 76C74 76 78 60 86 60"
        stroke={accent}
        strokeOpacity="0.3"
        strokeWidth="0.7"
      />
      <circle cx="38" cy="36" r="2" fill={accent} stroke="none" />
      <circle cx="62" cy="68" r="2" fill={accent} stroke="none" />
    </g>
  ),
  grid: ({ accent }) => (
    <g>
      {Array.from({ length: 9 }).map((_, row) =>
        Array.from({ length: 14 }).map((_, col) => {
          const active = (row * 3 + col * 2) % 11 === 0;
          return (
            <circle
              key={`${row}-${col}`}
              cx={16 + col * 5.4}
              cy={18 + row * 7.6}
              r={active ? 2.1 : 0.9}
              fill={active ? accent : '#ffffff'}
              fillOpacity={active ? 0.85 : 0.13}
            />
          );
        }),
      )}
      <rect
        x="42"
        y="34"
        width="24"
        height="30"
        rx="3"
        fill="none"
        stroke={accent}
        strokeOpacity="0.55"
        strokeDasharray="2 3"
      />
    </g>
  ),
  box: ({ accent }) => (
    <g fill="none" stroke={accent} strokeLinejoin="round">
      <path d="M50 30L74 43v22L50 78L26 65V43Z" strokeWidth="1.1" strokeOpacity="0.8" />
      <path d="M26 43L50 56L74 43" strokeWidth="1" strokeOpacity="0.5" />
      <path d="M50 56v22" strokeWidth="1" strokeOpacity="0.5" />
      <path d="M50 14L90 36v46L50 92L10 70V36Z" strokeWidth="0.7" strokeOpacity="0.16" strokeDasharray="2 4" />
      <circle cx="50" cy="56" r="1.6" fill={accent} stroke="none" />
    </g>
  ),
  spark: ({ accent }) => (
    <g stroke={accent} strokeLinecap="round" fill="none">
      <circle cx="50" cy="50" r="13" stroke="#ffffff" strokeOpacity="0.18" />
      {Array.from({ length: 20 }).map((_, index) => {
        const angle = (index / 20) * Math.PI * 2;
        const inner = 17;
        const outer = index % 5 === 0 ? 40 : 29;
        return (
          <line
            key={index}
            x1={(50 + Math.cos(angle) * inner).toFixed(2)}
            y1={(50 + Math.sin(angle) * inner).toFixed(2)}
            x2={(50 + Math.cos(angle) * outer).toFixed(2)}
            y2={(50 + Math.sin(angle) * outer).toFixed(2)}
            strokeWidth={index % 5 === 0 ? 1.1 : 0.6}
            strokeOpacity={index % 5 === 0 ? 0.9 : 0.3}
          />
        );
      })}
      <circle cx="50" cy="50" r="4.5" fill={accent} stroke="none" />
    </g>
  ),
};

export function ProjectVisual({ project, className, priority = false, compact = false }) {
  const accent = project.accent ?? 'oklch(0.88 0.2 124)';

  return (
    <div
      className={cn(
        'group/visual border-border relative w-full overflow-hidden rounded-xl border',
        project.image ? 'bg-card' : 'aspect-[16/10] bg-[#0a0c0d]',
        className,
      )}
      style={{
        backgroundImage: project.image
          ? undefined
          : `radial-gradient(120% 90% at 50% 0%, color-mix(in oklab, ${accent} 18%, transparent), transparent 70%)`,
      }}
    >
      {project.image ? (
        <div className="flex flex-col">
          <div className="border-border/60 bg-secondary/30 flex items-center gap-2 border-b px-3 py-1.5">
            <span className="flex gap-[3px]" aria-hidden="true">
              {['bg-foreground/15', 'bg-foreground/15', 'bg-foreground/15'].map((tone, i) => (
                <i key={i} className={cn('size-[5px] rounded-full', tone)} />
              ))}
            </span>
            <span className="text-muted-foreground/80 truncate font-mono text-[0.58rem] tracking-wide">
              {new URL(project.liveUrl ?? 'https://example.com').host}
            </span>
          </div>
          <img
            src={project.image}
            alt={`${project.title} — interface preview`}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            className="h-auto w-full transition-transform duration-700 ease-out group-hover/card:scale-[1.02]"
          />
        </div>
      ) : (
        <div
          className="absolute inset-0 grid grid-rows-[auto_1fr_auto] p-3.5"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '34px 34px',
          }}
        >
          <span className="text-muted-foreground/70 justify-self-start font-mono text-[0.56rem] tracking-[0.16em] uppercase">
            {project.title} <span aria-hidden="true">·</span> {project.category}
          </span>
          <svg
            viewBox="0 0 100 100"
            role="img"
            aria-label={`${project.title} — abstract diagram`}
            className={cn(
              'h-full w-full transition-transform duration-700 ease-out group-hover/card:scale-[1.04]',
              compact ? 'px-6 py-4' : 'px-10 py-6',
            )}
          >
            {(art[project.mark] ?? art.grid)({ accent })}
          </svg>
          <span
            className="justify-self-end font-mono text-[0.56rem] tracking-[0.16em] uppercase"
            style={{ color: `color-mix(in oklab, ${accent} 80%, white)` }}
          >
            {project.year}
          </span>
        </div>
      )}
    </div>
  );
}
