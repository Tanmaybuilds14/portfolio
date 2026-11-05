/* anime.js v4 (https://animejs.com) — staggered word reveal for headlines. */
import { useEffect, useRef } from 'react';
import { animate, stagger, utils } from 'animejs';
import { cn } from '@/lib/utils';

/**
 * Splits a headline into words and animates them up into place,
 * staggered. Each word keeps its own baseline so inline emphasis works.
 */
export function SplitText({ text, className, delay = 0, as: Tag = 'h1' }) {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const words = root.querySelectorAll('[data-word]');
    utils.set(words, { opacity: 0, translateY: '0.5em', rotate: 1.5 });

    const animation = animate(words, {
      opacity: 1,
      translateY: 0,
      rotate: 0,
      duration: 900,
      delay: stagger(45, { start: delay }),
      ease: 'out(3)',
    });

    return () => animation.pause();
  }, [text, delay]);

  const lines = Array.isArray(text) ? text : [text];

  return (
    <Tag ref={ref} className={cn('text-balance', className)}>
      {lines.map((line, lineIndex) => (
        <span key={lineIndex} className="block">
          {line.split(' ').map((word, wordIndex) => (
            <span key={`${word}-${wordIndex}`} data-word className="inline-block will-change-transform">
              {word}
              {wordIndex < line.split(' ').length - 1 ? '\u00A0' : ''}
            </span>
          ))}
        </span>
      ))}
    </Tag>
  );
}
