'use client';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useEffect, useState } from 'react';

const SESSION_KEY = 'jf-intro-seen';

/**
 * First-paint intro: a brown route line draws itself across the screen while
 * "Jathan Forever" assembles word by word, then the curtain lifts.
 *
 * - Shows once per browser session (sessionStorage), so internal navigation
 *   doesn't replay it.
 * - Under prefers-reduced-motion we skip the animation entirely.
 * - Locks scroll while visible.
 */
export default function Intro() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
    if (reduce) return;
    const seen = sessionStorage.getItem(SESSION_KEY);
    if (seen) return;
    setShow(true);
    document.documentElement.style.overflow = 'hidden';
    const t = setTimeout(() => {
      sessionStorage.setItem(SESSION_KEY, '1');
      setShow(false);
    }, 2600);
    return () => {
      clearTimeout(t);
      document.documentElement.style.overflow = '';
    };
  }, [reduce]);

  // Avoid hydration flash: render nothing until mounted.
  if (!ready) return null;

  const onDone = () => {
    document.documentElement.style.overflow = '';
  };

  return (
    <AnimatePresence onExitComplete={onDone}>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bone"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } }}
          aria-hidden="true"
        >
          {/* Route line drawing itself */}
          <svg
            width="260"
            height="60"
            viewBox="0 0 260 60"
            fill="none"
            className="mb-7"
          >
            <motion.path
              d="M8 44 C 60 8, 110 52, 150 26 S 230 12, 252 30"
              stroke="var(--clay)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              style={{ pathLength: 1 }}
            />
            <motion.circle
              cx="8"
              cy="44"
              r="4"
              fill="var(--ink)"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 400, damping: 18 }}
            />
            <motion.circle
              cx="252"
              cy="30"
              r="4"
              fill="var(--ink)"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.5, type: 'spring', stiffness: 400, damping: 18 }}
            />
          </svg>

          <h1 className="flex gap-[0.3em] overflow-hidden font-display text-4xl font-semibold tracking-tightish text-ink sm:text-6xl">
            {['Jathan', 'Forever'].map((word, i) => (
              <motion.span
                key={word}
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ delay: 0.5 + i * 0.18, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block"
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            className="mt-4 font-sans text-xs uppercase tracking-[0.3em] text-clay"
          >
            Two roads, one map
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
