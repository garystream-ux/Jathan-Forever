'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useEffect, useState } from 'react';
import { navLinks, site } from '@/lib/site';

/**
 * Sticky-but-minimal global navigation.
 * - Desktop: inline links with an animated underline-draw + active marker.
 * - Mobile: a full-screen sheet, comfortable one-handed (large tap targets).
 * - Subtle background fades in once the page is scrolled.
 */
export default function Nav() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile sheet on route change.
  useEffect(() => setOpen(false), [pathname]);

  // Lock scroll while the mobile sheet is open.
  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [open]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled || open
          ? 'border-b border-clay/20 bg-bone/85 backdrop-blur-md'
          : 'border-b border-transparent'
      }`}
    >
      <nav className="shell flex h-[var(--header-h)] items-center justify-between">
        <Link
          href="/"
          className="group font-display text-lg font-semibold tracking-tightish text-ink"
          aria-label={`${site.name} — home`}
        >
          Jathan
          <span className="text-clay transition-colors group-hover:text-coffee"> Forever</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={isActive(l.href) ? 'page' : undefined}
                className={`link-underline font-sans text-sm tracking-wide transition-colors ${
                  isActive(l.href)
                    ? 'text-ink'
                    : 'text-ink/60 hover:text-ink'
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="-mr-2 flex h-11 w-11 items-center justify-center md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          <span className="relative block h-3.5 w-6">
            <span
              className={`absolute left-0 h-[2px] w-6 bg-ink transition-all duration-300 ${
                open ? 'top-1.5 rotate-45' : 'top-0'
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 h-[2px] w-6 bg-ink transition-opacity duration-300 ${
                open ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`absolute left-0 h-[2px] w-6 bg-ink transition-all duration-300 ${
                open ? 'top-1.5 -rotate-45' : 'top-3'
              }`}
            />
          </span>
        </button>
      </nav>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="border-t border-clay/15 bg-bone/95 backdrop-blur-md md:hidden"
          >
            <ul className="shell flex flex-col py-3">
              {navLinks.map((l, i) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={isActive(l.href) ? 'page' : undefined}
                    className={`flex items-baseline justify-between border-b border-clay/10 py-4 font-display text-2xl ${
                      isActive(l.href) ? 'text-clay' : 'text-ink'
                    }`}
                  >
                    {l.label}
                    <span className="font-sans text-xs tabular-nums text-ink/30">
                      0{i + 1}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
