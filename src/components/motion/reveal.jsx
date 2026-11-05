/* Scroll-triggered entrance built on motion.dev (https://motion.dev). */
import { motion, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';

const EASE = [0.16, 1, 0.3, 1];

export function Reveal({
  children,
  className,
  delay = 0,
  y = 18,
  once = true,
  as = 'div',
  ...props
}) {
  const reduced = useReducedMotion();
  const Component = motion[as] ?? motion.div;

  return (
    <Component
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      className={cn(className)}
      {...props}
    >
      {children}
    </Component>
  );
}

/** Staggers direct children into view. */
export function RevealGroup({ children, className, stagger = 0.07, ...props }) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: 0.05 } },
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className, y = 16, ...props }) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      variants={{
        hidden: reduced ? { opacity: 1 } : { opacity: 0, y },
        visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
