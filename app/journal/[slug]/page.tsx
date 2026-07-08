import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Reveal from '@/components/Reveal';
import AuthorByline from '@/components/AuthorByline';
import PhotoGrid from '@/components/PhotoGrid';
import MiniMapSection from '@/components/MiniMapSection';
import Comments from '@/components/Comments';
import {
  getAllSlugs,
  getEntryBySlug,
  getAdjacentEntries,
  formatDate,
  authorMeta,
} from '@/lib/journal';
import { blurForImage } from '@/lib/images';
import { site } from '@/lib/site';
import { getHomeCopy } from '@/lib/homepage';
import { getCaption } from '@/lib/captions';

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const entry = getEntryBySlug(params.slug);
  if (!entry) return {};
  const title = `${entry.title} — ${entry.location.name}`;
  return {
    title,
    description: entry.excerpt,
    alternates: { canonical: `/journal/${entry.slug}` },
    openGraph: {
      type: 'article',
      title,
      description: entry.excerpt,
      url: `${site.url}/journal/${entry.slug}`,
      publishedTime: entry.date,
      authors: [authorMeta[entry.author].name],
      images: [{ url: `/images/og/${entry.slug}.png`, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: entry.excerpt,
    },
  };
}

export default function EntryPage({ params }: { params: { slug: string } }) {
  const entry = getEntryBySlug(params.slug);
  if (!entry) notFound();

  const { prev, next } = getAdjacentEntries(entry.slug);
  const homeCopy = getHomeCopy();
  const voice = authorMeta[entry.author];
  const voiceStyle = { ['--voice']: voice.color } as CSSProperties;

  return (
    <article className="pb-16">
      {/* Header */}
      <div className="shell pt-10">
        <Reveal>
          <Link
            href="/journal"
            className="link-underline font-sans text-sm text-ink/60 hover:text-ink"
          >
            ← All entries
          </Link>

          <p className="eyebrow mt-8">
            Stop {entry.order} · {entry.location.name}
          </p>
          <h1
            className="mt-4 max-w-4xl font-display text-4xl leading-[1.05] tracking-tightish text-ink sm:text-6xl"
            style={{ textWrap: 'balance' } as CSSProperties}
          >
            {entry.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-clay/15 pt-5">
            <AuthorByline author={entry.author} date={formatDate(entry.date)} size="lg" />
            <span className="text-ink/20" aria-hidden="true">
              |
            </span>
            <span className="font-sans text-sm text-ink/55">{entry.location.name}</span>
            <span className="text-ink/20" aria-hidden="true">
              |
            </span>
            <span className="font-sans text-sm text-ink/55">
              {entry.readingMinutes} min read
            </span>
          </div>
        </Reveal>
      </div>

      {/* Cover */}
      <div className="shell mt-10">
        <Reveal>
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-ink/5 shadow-soft sm:aspect-[2/1]">
            <Image
              src={entry.coverImage}
              alt={`${entry.location.name} — ${entry.title}`}
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1200px"
              placeholder="blur"
              blurDataURL={blurForImage(entry.coverImage)}
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>

      {/* Body */}
      <div className="shell mt-12">
        <div className="mx-auto max-w-prose">
          {/* voice rule */}
          <div
            className="mb-8 h-1 w-16 rounded-full"
            style={{ backgroundColor: voice.color }}
            aria-hidden="true"
          />
          <div className="entry-prose" style={voiceStyle}>
            <MDXRemote source={entry.content} />
          </div>
        </div>
      </div>

      {/* Gallery */}
      {entry.gallery.length > 0 && (
        <div className="shell mt-16">
          <div className="mx-auto max-w-4xl">
            <p className="eyebrow mb-5">From this stop</p>
            <PhotoGrid
              columns="two"
              photos={entry.gallery.map((src, i) => {
                const cap = getCaption(src);
                return {
                  src,
                  alt: `${entry.location.name} — photo ${i + 1}`,
                  caption: cap?.caption,
                  by: cap?.by,
                };
              })}
            />
          </div>
        </div>
      )}

      {/* Where this was */}
      <div className="shell mt-16">
        <div className="mx-auto max-w-4xl">
          <p className="eyebrow mb-5">Where they were</p>
          <MiniMapSection
            lat={entry.location.lat}
            lng={entry.location.lng}
            color={voice.color}
            label={entry.location.name}
          />
        </div>
      </div>

      {/* Prev / next */}
      <nav
        className="shell mt-16"
        aria-label="More entries"
      >
        <div className="mx-auto grid max-w-4xl gap-4 border-t border-clay/15 pt-8 sm:grid-cols-2">
          {prev ? (
            <Link
              href={`/journal/${prev.slug}`}
              className="group rounded-xl border border-clay/15 p-5 transition-colors hover:border-clay/40"
            >
              <span className="font-sans text-xs uppercase tracking-widest text-ink/40">
                ← Previous stop
              </span>
              <span className="mt-2 block font-display text-xl text-ink group-hover:text-atlantic">
                {prev.title}
              </span>
              <span className="mt-1 block text-sm text-ink/55">{prev.location.name}</span>
            </Link>
          ) : (
            <span aria-hidden="true" />
          )}
          {next ? (
            <Link
              href={`/journal/${next.slug}`}
              className="group rounded-xl border border-clay/15 p-5 text-right transition-colors hover:border-clay/40"
            >
              <span className="font-sans text-xs uppercase tracking-widest text-ink/40">
                Next stop →
              </span>
              <span className="mt-2 block font-display text-xl text-ink group-hover:text-atlantic">
                {next.title}
              </span>
              <span className="mt-1 block text-sm text-ink/55">{next.location.name}</span>
            </Link>
          ) : (
            <span aria-hidden="true" />
          )}
        </div>
      </nav>

      {/* Comments */}
      <section className="shell mt-20" aria-label="Comments">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl text-ink">Notes from readers</h2>
          <p className="mt-1 font-sans text-sm text-ink/55">{homeCopy.commentsInvite}</p>
          <div className="mt-6">
            <Comments term={entry.slug} />
          </div>
        </div>
      </section>
    </article>
  );
}
