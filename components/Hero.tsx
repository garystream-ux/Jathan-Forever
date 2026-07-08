'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { useRef } from 'react';
import { site } from '@/lib/site';
import { blurDataURL } from '@/lib/images';

/**
 * Cinematic, lightly-parallaxed hero. A soft photographic backdrop sits behind
 * a large editorial headline and a scroll cue. The backdrop drifts on scroll
 * (parallax); the content fades as you leave. All motion is gated behind
 * prefers-reduced-motion.
 */
export default function Hero({
  tagline = site.tagline,
  scrollCue = 'Scroll',
}: {
  tagline?: string;
  scrollCue?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // Backdrop drifts down slightly + content lifts/fades as we scroll past.
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '18%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '-12%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, reduce ? 1 : 0]);

  const words = site.name.split(' ');

  return (
    <section
      ref={ref}
      className="relative flex h-[92vh] min-h-[560px] items-center overflow-hidden"
    >
      {/* Backdrop */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 -z-10 scale-110">
        <Image
          src="/images/stops/big-sur/cover.jpg"
          alt=""
          fill
          priority
          placeholder="blur"
          blurDataURL={blurDataURL('#3E6E9C')}
          sizes="100vw"
          className="object-cover"
        />
        {/* Warm editorial wash so headline stays legible (AA contrast). */}
        <div className="absolute inset-0 bg-gradient-to-b from-bone/85 via-bone/55 to-bone" />
        <div className="absolute inset-0 bg-gradient-to-r from-bone/70 to-transparent" />
      </motion.div>

      <motion.div style={{ y: contentY, opacity: contentOpacity }} className="shell">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="eyebrow"
        >
          A road-trip travel journal
        </motion.p>

        <h1 className="mt-4 font-display text-[18vw] font-semibold leading-[0.9] tracking-tightish text-ink sm:text-[14vw] lg:text-[11rem]">
          {words.map((w, i) => (
            <span key={w} className="block overflow-hidden">
              <motion.span
                initial={reduce ? false : { y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ delay: 0.3 + i * 0.12, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block"
              >
                {i === 1 ? <span className="text-clay">{w}</span> : w}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-md font-display text-xl italic text-coffee sm:text-2xl"
        >
          {tagline}
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7 }}
          className="mt-8 flex flex-wrap items-center gap-4"
        >
          <Link
            href="/journal"
            className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-sans text-sm font-medium text-bone transition-colors hover:bg-atlantic"
          >
            Follow their journey
            <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
              →
            </span>
          </Link>
          <Link
            href="/journey"
            className="link-underline font-sans text-sm font-medium text-ink"
          >
            See the route
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      >
        <div className="flex flex-col items-center gap-2 text-ink/50">
          <span className="font-sans text-[10px] uppercase tracking-[0.3em]">{scrollCue}</span>
          <motion.span
            animate={reduce ? undefined : { y: [0, 7, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="block h-7 w-px bg-clay"
          />
        </div>
      </motion.div>
    </section>
  );
}
