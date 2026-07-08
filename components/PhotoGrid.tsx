'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { motion, useReducedMotion } from 'motion/react';
import useInViewSafe from './useInViewSafe';
import { blurForImage } from '@/lib/images';
import { authorMeta, type Author } from '@/lib/authors';

// Loaded on first click only — keeps the lightbox library (and its CSS) out
// of the initial bundle for entry pages and the gallery.
const GalleryLightbox = dynamic(() => import('./GalleryLightbox'), { ssr: false });

export interface Photo {
  src: string;
  /** plain descriptive alt text (accessibility) */
  alt: string;
  /** voiced display caption (optional) */
  caption?: string;
  /** caption author, for color-coding */
  by?: Author;
}

/**
 * Responsive photo grid with a clip-path reveal on scroll and a touch-friendly
 * lightbox. Voiced captions (when present) show under each photo and in the
 * lightbox, color-coded to the author who wrote them. Shared by diary entries
 * and the main gallery. Lazy-loaded with blur-up placeholders; no layout shift.
 */
export default function PhotoGrid({
  photos,
  columns = 'three',
}: {
  photos: Photo[];
  columns?: 'two' | 'three';
}) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(-1);
  // Once the lightbox has been opened once, keep it mounted so close/swipe
  // animations work; before that, its chunk is never fetched.
  const [wanted, setWanted] = useState(false);

  const grid = columns === 'two' ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-3';

  const open = (i: number) => {
    setWanted(true);
    setIndex(i);
  };

  return (
    <>
      <div className={`grid gap-x-3 gap-y-6 sm:gap-x-4 ${grid}`}>
        {photos.map((p, i) => (
          <GridPhoto key={p.src + i} photo={p} index={i} reduce={!!reduce} onOpen={() => open(i)} />
        ))}
      </div>

      {wanted && (
        <GalleryLightbox
          open={index >= 0}
          close={() => setIndex(-1)}
          index={Math.max(0, index)}
          slides={photos.map((p) => ({ src: p.src, alt: p.alt, caption: p.caption, by: p.by }))}
          reduce={!!reduce}
        />
      )}
    </>
  );
}

/** One grid tile: fade/lift on the figure, clip-path wipe on the photo. */
function GridPhoto({
  photo: p,
  index: i,
  reduce,
  onOpen,
}: {
  photo: Photo;
  index: number;
  reduce: boolean;
  onOpen: () => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInViewSafe(ref, 0.2);

  return (
    <motion.figure
      ref={ref}
      initial={reduce ? false : { opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: (i % 3) * 0.06 }}
    >
      <motion.button
        type="button"
        onClick={onOpen}
        initial={reduce ? false : { clipPath: 'inset(0 0 100% 0)' }}
        animate={inView ? { clipPath: 'inset(0 0 0% 0)' } : undefined}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: (i % 3) * 0.08 }}
        className="group relative block aspect-[4/3] w-full overflow-hidden rounded-lg bg-ink/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-atlantic"
        aria-label={`Open photo: ${p.alt}`}
      >
        <Image
          src={p.src}
          alt={p.alt}
          fill
          loading="lazy"
          sizes="(max-width: 768px) 50vw, 33vw"
          placeholder="blur"
          blurDataURL={blurForImage(p.src)}
          className="object-cover transition-transform duration-700 ease-physical group-hover:scale-105"
        />
        <span className="pointer-events-none absolute inset-0 bg-ink/0 transition-colors duration-300 group-hover:bg-ink/10" />
      </motion.button>

      {p.caption && (
        <figcaption className="mt-2 font-sans text-sm leading-snug text-ink/70">
          <span style={p.by ? { color: authorMeta[p.by].color } : undefined}>
            {p.caption}
          </span>
          {p.by && (
            <span className="ml-1.5 text-ink/40">— {authorMeta[p.by].first}</span>
          )}
        </figcaption>
      )}
    </motion.figure>
  );
}
