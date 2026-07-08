import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import fs from 'node:fs';
import path from 'node:path';
import Image from 'next/image';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Reveal from '@/components/Reveal';
import { getBookBlurb, getCharacterBios } from '@/lib/about';
import { authorMeta, type Author } from '@/lib/authors';
import { site } from '@/lib/site';
import { blurDataURL } from '@/lib/images';

export const metadata: Metadata = {
  title: 'About',
  description:
    "About Ethan & Jacob, author Gary Stream, and the YA romantic comedy novel Ethan's Edge that started it all.",
  alternates: { canonical: '/about' },
};

// Portrait sources + descriptive alt text (from the Character reference).
const portrait: Record<Author, { src: string; alt: string }> = {
  ethan: {
    src: '/images/characters/ethan.png',
    alt: 'Ethan Highfield in a gray zip-up hoodie over a blue tee, leaning on a railing by the water in soft evening light, smiling.',
  },
  jacob: {
    src: '/images/characters/jacob.png',
    alt: 'Jacob Monroe sitting on sunlit grass in a white tee and jeans with a leather-cord dog-tag necklace, at golden hour.',
  },
};

// Author photo — drop the file at public/images/characters/author.jpg and it
// appears automatically; until then the section renders text-only.
const AUTHOR_PHOTO = '/images/characters/author.jpg';

export default function AboutPage() {
  const book = getBookBlurb();
  const bios = getCharacterBios();
  const hasAuthorPhoto = fs.existsSync(path.join(process.cwd(), 'public', AUTHOR_PHOTO));

  return (
    <div className="py-16 sm:py-20">
      {/* Intro */}
      <div className="shell">
        <Reveal>
          <p className="eyebrow">About</p>
          <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[1.05] tracking-tightish text-ink sm:text-6xl">
            The book, the boys, and the road between them.
          </h1>
          <p className="mt-5 max-w-prose font-sans text-lg leading-relaxed text-ink/70">
            <span className="italic">Jathan Forever</span> is the travel journal
            of two fictional young men from{' '}
            <span className="italic">{site.bookTitle}</span> — set the summer
            after the book, once Ethan and Jacob are finally together. They wrote
            each other&apos;s introductions. They did not let each other edit first.
          </p>
        </Reveal>
      </div>

      {/* Character bios — each written by the other, shown with the subject's portrait */}
      <div className="shell mt-20 space-y-16 lg:space-y-24">
        {bios.map((bio, i) => {
          const subject = authorMeta[bio.subject];
          const writer = authorMeta[bio.writtenBy];
          const p = portrait[bio.subject];
          const voiceStyle = { ['--voice']: writer.color } as CSSProperties;
          return (
            <Reveal key={bio.subject}>
              <div
                className={`grid items-center gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14 ${
                  i % 2 === 1 ? 'lg:[&>figure]:order-2' : ''
                }`}
              >
                <figure className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-2xl bg-ink/5 shadow-lift">
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    sizes="(max-width: 1024px) 90vw, 420px"
                    placeholder="blur"
                    blurDataURL={blurDataURL(subject.color)}
                    className="object-cover"
                  />
                  <span
                    className="absolute bottom-0 left-0 h-1.5 w-full"
                    style={{ backgroundColor: subject.color }}
                    aria-hidden="true"
                  />
                </figure>

                <div>
                  <p
                    className="font-sans text-xs font-medium uppercase tracking-[0.25em]"
                    style={{ color: subject.color }}
                  >
                    {bio.descriptor}
                  </p>
                  <h2 className="mt-3 font-display text-4xl tracking-tightish text-ink sm:text-5xl">
                    {bio.name}
                  </h2>
                  <p className="mt-2 font-sans text-sm text-ink/50">
                    Written by{' '}
                    <span className="font-medium" style={{ color: writer.color }}>
                      {writer.first}
                    </span>
                  </p>
                  <div className="bio-prose mt-5 max-w-prose" style={voiceStyle}>
                    <MDXRemote source={bio.body} />
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* The book */}
      <div className="mt-24 border-y border-clay/15 bg-paper/60 py-20">
        <div className="shell">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
            <Reveal>
              <p className="eyebrow">The novel</p>
              <h2 className="mt-3 font-display text-4xl tracking-tightish text-ink sm:text-5xl">
                {site.bookTitle}
              </h2>
              <p className="mt-2 font-display text-xl italic text-coffee">
                A young adult romantic comedy
              </p>
              <p className="mt-4 font-sans text-sm text-ink/55">by {site.author}</p>
              <a
                href={site.bookLink}
                target="_blank"
                rel="noreferrer noopener"
                className="group mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-sans text-sm font-medium text-bone transition-colors hover:bg-atlantic"
              >
                Read the book
                <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                  →
                </span>
              </a>
            </Reveal>

            <Reveal delay={0.1} className="max-w-prose">
              {/* Blurb is in Ethan's voice → clay drop cap + rule. */}
              <div
                className="entry-prose"
                style={{ ['--voice']: authorMeta.ethan.color } as CSSProperties}
              >
                <MDXRemote source={book.body} />
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* The author */}
      <div className="shell mt-20">
        <Reveal className="mx-auto max-w-prose text-center">
          <p className="eyebrow">The author</p>
          {hasAuthorPhoto && (
            <div className="relative mx-auto mt-6 h-40 w-40 overflow-hidden rounded-full shadow-lift ring-2 ring-clay/30">
              <Image
                src={AUTHOR_PHOTO}
                alt={`${site.author}, smiling in glasses and a blue patterned shirt, in front of shelves of books.`}
                fill
                sizes="160px"
                placeholder="blur"
                blurDataURL={blurDataURL('#B07A4F')}
                className="object-cover"
              />
            </div>
          )}
          <h2 className="mt-3 font-display text-3xl tracking-tightish text-ink">
            {site.author}
          </h2>
          <p className="mt-4 font-sans text-lg leading-relaxed text-ink/75">
            From the pastures of a Western Michigan dairy farm to the vibrant
            energy of Sacramento, California, Gary Stream&rsquo;s journey has always
            been grounded in community and story. (And yes, he still maintains
            that cows can be cool if they want to be.){' '}
            <span className="italic">Ethan&rsquo;s Edge</span> marks his debut into
            the world of fiction, where he is dedicated to crafting meaningful
            books and short stories for LGBTQ youth.
          </p>
          <p className="mt-5 font-sans text-sm text-ink/55">
            Find him online via Instagram:{' '}
            <a
              href="https://www.instagram.com/garystream"
              target="_blank"
              rel="noreferrer noopener"
              className="link-underline font-medium text-coffee"
            >
              @garystream
            </a>
          </p>
        </Reveal>
      </div>
    </div>
  );
}
