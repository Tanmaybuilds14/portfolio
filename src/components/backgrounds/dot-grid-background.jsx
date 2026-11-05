/*
 * Dot grid + spotlight — 21st.dev background pattern. A static CSS dot grid with
 * a cursor-tracked radial highlight that fades in on hover. Pointer events are
 * ignored so links underneath stay clickable, and the whole thing respects
 * reduced-motion by staying static.
 */
import { useCallback, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export function DotGridBackground({ className, dotSize = 1, gap = 28, children }) {
  const ref = useRef(null);
  const [cursor, setCursor] = useState(null);

  const onPointerMove = useCallback((event) => {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return;
    setCursor({ x: event.clientX - bounds.left, y: event.clientY - bounds.top });
  }, []);

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={() => setCursor(null)}
      className={cn('relative isolate overflow-hidden', className)}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage: `radial-gradient(circle at center, color-mix(in oklab, var(--foreground) 22%, transparent) ${dotSize}px, transparent ${dotSize}px)`,
          backgroundSize: `${gap}px ${gap}px`,
          backgroundPosition: 'center center',
          maskImage: 'radial-gradient(ellipse 80% 70% at 50% 35%, #000 20%, transparent 78%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 35%, #000 20%, transparent 78%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: cursor ? 1 : 0,
          background: cursor
            ? `radial-gradient(340px circle at ${cursor.x}px ${cursor.y}px, color-mix(in oklab, var(--primary) 13%, transparent), transparent 72%)`
            : 'none',
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
