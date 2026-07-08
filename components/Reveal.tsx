'use client';

import { motion, useReducedMotion, type Variants } from 'motion/react';
import { useMemo, type ElementType, type ReactNode } from 'react';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

const offset: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 28 },
  down: { x: 0, y: -28 },
  left: { x: 28, y: 0 },
  right: { x: -28, y: 0 },
  none: { x: 0, y: 0 },
};

interface RevealProps {
  children: ReactNode;
  /** direction the content eases in from */
  direction?: Direction;
  /** seconds of delay; stagger siblings by hand or use `index` */
  delay?: number;
  /** convenience: multiplies a small base delay for list staggering */
  index?: number;
  as?: ElementType;
  className?: string;
  /** how much must be visible before triggering (0–1) */
  amount?: number;
  once?: boolean;
}

/**
 * Scroll-triggered reveal: fades + eases content up as it enters the viewport.
 * Honors prefers-reduced-motion (renders statically, fully visible).
 */
export default function Reveal({
  children,
  direction = 'up',
  delay = 0,
  index,
  as = 'div',
  className,
  amount = 0.3,
  once = true,
}: RevealProps) {
  const reduce = useReducedMotion();
  // motion.create() is the non-deprecated factory; memoize so we don't rebuild
  // the component type (and break reconciliation) on every render.
  const MotionTag = useMemo(() => motion.create(as as ElementType), [as]);

  if (reduce) {
    const Tag = as as ElementType;
    return <Tag className={className}>{children}</Tag>;
  }

  const computedDelay = delay + (index != null ? index * 0.09 : 0);
  const { x, y } = offset[direction];

  const variants: Variants = {
    hidden: { opacity: 0, x, y },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: computedDelay },
    },
  };

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
    >
      {children}
    </MotionTag>
  );
}
