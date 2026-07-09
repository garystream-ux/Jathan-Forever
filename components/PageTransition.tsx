'use client';

import { usePathname } from 'next/navigation';
import { motion, useReducedMotion } from 'motion/react';
import { useEffect, useRef } from 'react';

/**
 * Soft fade + lift on the incoming page, keyed by pathname.
 *
 * Deliberately enter-only: no AnimatePresence, no exit animation. The old
 * mode="wait" exit blocked the incoming page from mounting until the outgoing
 * animation reported completion — and that handoff can stall with the App
 * Router on slower/throttled devices, leaving a permanently blank page on
 * every subsequent navigation. Mounting the new page immediately can never
 * stall; worst case the fade simply doesn't play.
 *
 * Scroll is reset to the top on each route change (driving Lenis when present).
 * Fully disabled under prefers-reduced-motion — content just swaps.
 */
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  // No fade on the very first paint — only on client-side navigations.
  const firstRender = useRef(true);

  useEffect(() => {
    firstRender.current = false;
  }, []);

  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: { scrollTo: (n: number, o?: object) => void } })
      .__lenis;
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname]);

  if (reduce) return <>{children}</>;

  return (
    <motion.div
      key={pathname}
      initial={firstRender.current ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
