'use client';

import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { authorMeta, type Author } from '@/lib/authors';

export interface LightboxSlide {
  src: string;
  alt: string;
  caption?: string;
  by?: Author;
}

// The lightbox sits on a near-ink backdrop, where Jacob's deep blue would be
// illegible — use lighter author tints there for contrast.
const onDark: Record<Author, string> = { ethan: '#D2A074', jacob: '#8FB4DC' };

/**
 * The lightbox half of PhotoGrid, split into its own chunk so the library and
 * its CSS only download the first time a visitor actually opens a photo.
 */
export default function GalleryLightbox({
  open,
  index,
  close,
  slides,
  reduce,
}: {
  open: boolean;
  index: number;
  close: () => void;
  slides: LightboxSlide[];
  reduce: boolean;
}) {
  return (
    <Lightbox
      open={open}
      close={close}
      index={index}
      slides={slides}
      styles={{ container: { backgroundColor: 'rgba(20, 48, 74, 0.94)' } }}
      animation={{ swipe: reduce ? 0 : 500 }}
      controller={{ closeOnBackdropClick: true }}
      render={{
        // Color-coded voiced caption pinned to the bottom of each slide.
        slideFooter: ({ slide }) => {
          const s = slide as LightboxSlide;
          if (!s.caption) return null;
          return (
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-6 pt-12 text-center">
              <p className="mx-auto max-w-2xl font-sans text-sm leading-snug text-bone sm:text-base">
                {s.by && (
                  <span className="font-medium" style={{ color: onDark[s.by] }}>
                    {authorMeta[s.by].first}:{' '}
                  </span>
                )}
                <span className="text-bone/90">{s.caption}</span>
              </p>
            </div>
          );
        },
      }}
    />
  );
}
