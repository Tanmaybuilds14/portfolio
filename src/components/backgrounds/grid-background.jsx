/*
 * Grid + radial spotlight — 21st.dev background pattern used behind hero
 * sections. Pure CSS, no canvas: a faint 1px grid masked to an ellipse, plus a
 * large radial glow. Transparent by default so the fixed photographic backdrop
 * reads through it; pass `solid` when it needs to stand on its own.
 */
import { cn } from '@/lib/utils';

export function GridBackground({ className, children, cellSize = 72, glow = 'top-right', solid = false }) {
  const glowPosition =
    glow === 'top-right'
      ? 'ellipse 60% 55% at 85% 0%'
      : glow === 'top-left'
        ? 'ellipse 60% 55% at 15% 0%'
        : 'ellipse 70% 60% at 50% 0%';

  return (
    <div className={cn('relative isolate overflow-hidden', solid && 'bg-background', className)}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(to right, color-mix(in oklab, var(--foreground) 6%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklab, var(--foreground) 6%, transparent) 1px, transparent 1px)',
          backgroundSize: `${cellSize}px ${cellSize}px`,
          maskImage: 'radial-gradient(ellipse 75% 60% at 50% 0%, #000 10%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 75% 60% at 50% 0%, #000 10%, transparent 80%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(${glowPosition}, color-mix(in oklab, var(--primary) 12%, transparent), transparent 65%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
