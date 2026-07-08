'use client';

import { useEffect, useRef, useState, type RefObject } from 'react';

/**
 * Robust one-shot "is this element in the viewport?" hook.
 *
 * IntersectionObserver alone can silently never fire in some environments
 * (observed on mixed-DPI multi-monitor Windows setups in both Chrome and
 * Firefox), which left whileInView content permanently invisible. This hook
 * uses IO when it works, but also verifies with plain getBoundingClientRect
 * checks on mount, scroll, and resize — so a reveal can never be lost.
 *
 * `amount` matches framer-motion's viewport amount: the fraction of the
 * element that must be visible. Once true, it stays true (reveal-once).
 */
export default function useInViewSafe(
  ref: RefObject<Element | null>,
  amount = 0.3,
): boolean {
  const [inView, setInView] = useState(false);
  const seen = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || seen.current) return;

    let io: IntersectionObserver | undefined;
    let raf = 0;

    const mark = () => {
      if (seen.current) return;
      seen.current = true;
      setInView(true);
      io?.disconnect();
    };

    const check = () => {
      if (seen.current) return;
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) return;
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      const vertVisible = Math.min(r.bottom, vh) - Math.max(r.top, 0);
      const horizVisible = Math.min(r.right, vw) - Math.max(r.left, 0);
      // Like framer's `amount`, but capped so elements taller than the
      // viewport can still qualify.
      const needed = Math.min(r.height, vh) * amount;
      if (vertVisible >= needed && horizVisible > 0) mark();
    };

    if (typeof IntersectionObserver !== 'undefined') {
      io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) mark();
        },
        { threshold: Math.min(amount, 0.98) },
      );
      io.observe(el);
    }

    const onScrollOrResize = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        check();
      });
    };

    // Check immediately, and again once first paint/layout has settled.
    check();
    const settle = setTimeout(check, 300);
    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });

    return () => {
      io?.disconnect();
      clearTimeout(settle);
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, [ref, amount]);

  return inView;
}
