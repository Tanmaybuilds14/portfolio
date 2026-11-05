import { useEffect, useRef, useState } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

/** Tracks the user's reduced-motion preference without a motion library. */
function useReducedMotion() {
  const [reduced, setReduced] = useState(() =>
    typeof window === 'undefined' ? false : window.matchMedia(QUERY).matches,
  );

  useEffect(() => {
    const media = window.matchMedia(QUERY);
    const onChange = (event) => setReduced(event.matches);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  return reduced;
}

/**
 * Fades + lifts content into view once. Visibility is toggled by class on the
 * DOM node, so showing content never triggers a re-render.
 */
export default function Reveal({ children, delay = 0, y = 18, className = '', as = 'div' }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    if (reduced || typeof IntersectionObserver === 'undefined') {
      node.classList.add('is-visible');
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.disconnect();
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [reduced]);

  const Tag = as;

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      style={{
        transitionDelay: `${delay}ms`,
        '--reveal-y': reduced ? '0px' : `${y}px`,
      }}
    >
      {children}
    </Tag>
  );
}
