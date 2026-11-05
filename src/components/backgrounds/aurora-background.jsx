/*
 * Aurora background — 21st.dev style (Aceternity "Aurora Background" pattern),
 * reimplemented without a motion dependency: two slow layered gradients over a
 * grain-free dark base, plus a vignette so text stays legible.
 * Reference: https://21st.dev/@manuarora700/components/aurora-background
 */
import { cn } from '@/lib/utils';

export function AuroraBackground({ className, children, showRadialGradient = true, ...props }) {
  return (
    <div
      className={cn(
        'relative flex flex-col items-center justify-center overflow-hidden bg-background',
        className,
      )}
      {...props}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className={cn(
            'absolute -inset-[10px] opacity-40 blur-[10px] will-change-transform',
            '[--aurora:repeating-linear-gradient(100deg,var(--primary)_10%,oklch(0.62_0.19_258)_15%,oklch(0.75_0.15_190)_20%,var(--primary)_25%,oklch(0.68_0.2_300)_30%)]',
            '[--dark-gradient:repeating-linear-gradient(100deg,#08090a_0%,#08090a_7%,transparent_10%,transparent_12%,#08090a_16%)]',
            '[background-image:var(--dark-gradient),var(--aurora)]',
            '[background-size:300%,_200%]',
            '[background-position:50%_50%,50%_50%]',
            'animate-[aurora_26s_ease-in-out_infinite]',
            'motion-reduce:animate-none',
            '[mask-image:radial-gradient(ellipse_at_20%_20%,black_10%,transparent_70%)]',
            '[-webkit-mask-image:radial-gradient(ellipse_at_20%_20%,black_10%,transparent_70%)]',
          )}
        />
      </div>

      {showRadialGradient && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,transparent_10%,var(--background)_78%)]"
        />
      )}

      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
}
