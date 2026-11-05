/*
 * Marquee — infinite horizontal ticker (21st.dev / magicui pattern).
 * The track is duplicated once and translated -50%, which loops seamlessly and
 * needs no JS. Pauses on hover so it never fights the reader.
 */
import { cn } from '@/lib/utils';

export function Marquee({ children, className, duration = 38, reverse = false, pauseOnHover = true }) {
  return (
    <div
      className={cn('group relative flex overflow-hidden', className)}
      style={{ '--marquee-duration': `${duration}s` }}
    >
      {Array.from({ length: 2 }).map((_, index) => (
        <div
          key={index}
          aria-hidden={index === 1}
          className={cn(
            'flex w-max shrink-0 items-center gap-10 pr-10 animate-marquee',
            reverse && '[animation-direction:reverse]',
            pauseOnHover && 'group-hover:[animation-play-state:paused]',
            'motion-reduce:animate-none',
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
