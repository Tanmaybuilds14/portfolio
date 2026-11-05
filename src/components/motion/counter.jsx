/* anime.js v4 — number counters that run once when scrolled into view. */
import { useEffect, useRef } from 'react';
import { animate, utils } from 'animejs';

/**
 * Counts from 0 to `value`. Non-numeric suffixes (ms, K, x) are preserved,
 * and non-numeric strings are left untouched.
 */
export function Counter({ value, duration = 1400, className }) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const match = String(value).match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/);
    if (!match) {
      node.textContent = value;
      return undefined;
    }

    const [, prefix, digits, suffix] = match;
    const target = Number(digits);
    const decimals = digits.includes('.') ? digits.split('.')[1].length : 0;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      node.textContent = `${prefix}${target.toFixed(decimals)}${suffix}`;
      return undefined;
    }

    const state = { progress: 0 };
    node.textContent = `${prefix}${(0).toFixed(decimals)}${suffix}`;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.disconnect();

          animate(state, {
            progress: target,
            duration,
            ease: 'out(4)',
            onUpdate: () => {
              node.textContent = `${prefix}${state.progress.toFixed(decimals)}${suffix}`;
            },
            onComplete: () => {
              node.textContent = `${prefix}${target.toFixed(decimals)}${suffix}`;
            },
          });
        });
      },
      { threshold: 0.5 },
    );

    observer.observe(node);
    utils.set(node, { opacity: 1 });

    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
