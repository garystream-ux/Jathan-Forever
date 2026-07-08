'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import useInViewSafe from './useInViewSafe';
import AuthorByline from './AuthorByline';
import { blurForImage } from '@/lib/images';
import type { Author } from '@/lib/authors';

export interface JournalCardData {
  slug: string;
  title: string;
  date: string; // pre-formatted
  author: Author;
  name: string; // location
  state: string;
  excerpt: string;
  coverImage: string;
  order: number;
}

/**
 * Entry card used on the home "latest" row and the journal index.
 * Cover image reveals with a clip-path wipe; the whole card lifts on hover.
 */
export default function JournalCard({
  entry,
  index = 0,
  priority = false,
}: {
  entry: JournalCardData;
  index?: number;
  priority?: boolean;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const inView = useInViewSafe(ref, 0.25);

  return (
    <motion.article
      ref={ref}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
      className="group"
    >
      <Link href={`/journal/${entry.slug}`} className="block focus:outline-none">
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-ink/5 shadow-soft">
          <motion.div
            initial={reduce ? false : { clipPath: 'inset(0 0 100% 0)' }}
            animate={inView ? { clipPath: 'inset(0 0 0% 0)' } : undefined}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 + index * 0.08 }}
            className="absolute inset-0"
          >
            <Image
              src={entry.coverImage}
              alt={`${entry.name} — cover photograph`}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              placeholder="blur"
              blurDataURL={blurForImage(entry.coverImage)}
              priority={priority}
              className="object-cover transition-transform duration-700 ease-physical group-hover:scale-105"
            />
          </motion.div>
          <span className="absolute left-3 top-3 rounded-full bg-bone/90 px-2.5 py-1 font-sans text-[11px] font-medium tabular-nums text-ink shadow-sm backdrop-blur">
            Stop {entry.order} · {entry.state}
          </span>
        </div>

        <div className="mt-4">
          <AuthorByline author={entry.author} date={entry.date} />
          <h3 className="mt-2 font-display text-2xl leading-tight text-ink transition-colors group-hover:text-atlantic">
            {entry.title}
          </h3>
          <p className="mt-1 font-sans text-sm text-ink/60">{entry.name}</p>
          <p className="mt-2 line-clamp-2 font-sans text-sm leading-relaxed text-ink/70">
            {entry.excerpt}
          </p>
          <span className="mt-3 inline-flex items-center gap-1.5 font-sans text-sm font-medium text-coffee">
            Read the entry
            <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
              →
            </span>
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
