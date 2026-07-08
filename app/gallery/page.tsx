import type { Metadata } from 'next';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import PhotoGrid, { type Photo } from '@/components/PhotoGrid';
import AuthorByline from '@/components/AuthorByline';
import { getAllEntries, formatDate } from '@/lib/journal';
import { getCaption } from '@/lib/captions';
import { getHomeCopy } from '@/lib/homepage';

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Photographs from the road, organized stop by stop.',
  alternates: { canonical: '/gallery' },
};

export default function GalleryPage() {
  const copy = getHomeCopy();

  // Group photos by stop. Cover + gallery images, deduped, with descriptive alt
  // text plus the voiced (color-coded) caption when one exists for that path.
  const stops = getAllEntries().map((e) => {
    const seen = new Set<string>();
    const photos: Photo[] = [];
    for (const src of [e.coverImage, ...e.gallery]) {
      if (seen.has(src)) continue;
      seen.add(src);
      const cap = getCaption(src);
      photos.push({
        src,
        alt: `${e.location.name} — ${e.title}`,
        caption: cap?.caption,
        by: cap?.by,
      });
    }
    return { entry: e, photos };
  });

  return (
    <div className="shell py-16 sm:py-20">
      <Reveal>
        <p className="eyebrow">The gallery</p>
        <h1 className="mt-4 max-w-3xl font-display text-5xl leading-[1.05] tracking-tightish text-ink sm:text-6xl">
          {copy.gallery.header}
        </h1>
        <p className="mt-5 max-w-prose font-sans text-lg leading-relaxed text-ink/70">
          {copy.gallery.subhead}
        </p>
      </Reveal>

      <div className="mt-16 space-y-20">
        {stops.map(({ entry, photos }) => (
          <section key={entry.slug} aria-labelledby={`gallery-${entry.slug}`}>
            <Reveal className="mb-6 flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2
                  id={`gallery-${entry.slug}`}
                  className="font-display text-3xl tracking-tightish text-ink"
                >
                  {entry.location.name}
                </h2>
                <div className="mt-2">
                  <AuthorByline author={entry.author} date={formatDate(entry.date)} />
                </div>
              </div>
              <Link
                href={`/journal/${entry.slug}`}
                className="link-underline font-sans text-sm font-medium text-coffee"
              >
                Read this entry →
              </Link>
            </Reveal>
            <PhotoGrid photos={photos} columns="three" />
          </section>
        ))}
      </div>
    </div>
  );
}
