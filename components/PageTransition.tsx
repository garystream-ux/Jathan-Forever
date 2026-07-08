'use client';

import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useEffect } from 'react';

/**
 * Smooth cross-route transitions. A soft fade + lift on the incoming page,
 * keyed by pathname so AnimatePresence runs on navigation.
 *
 * Scroll is reset to the top on each route change (driving Lenis when present).
 * Fully disabled under prefers-reduced-motion — content just swaps.
 */
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();

  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: { scrollTo: (n: number, o?: object) => void } })
      .__lenis;
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname]);

  if (reduce) return <>{children}</>;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
