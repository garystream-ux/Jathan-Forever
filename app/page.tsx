import Link from 'next/link';
import Hero from '@/components/Hero';
import Reveal from '@/components/Reveal';
import RouteTeaser from '@/components/RouteTeaser';
import JournalCard from '@/components/JournalCard';
import { getLatestEntries, toCardData } from '@/lib/journal';
import { getRoute } from '@/lib/route';
import { getHomeCopy } from '@/lib/homepage';

export default function Home() {
  const latest = getLatestEntries(3);
  const route = getRoute();
  const copy = getHomeCopy();

  const [lead, ...premiseRest] = copy.premise;
  const first = route[0]?.name.split(',')[0];
  const last = route[route.length - 1]?.name.split(',')[0];

  return (
    <>
      <Hero tagline={copy.tagline} scrollCue={copy.scrollCue} />

      {/* Premise — voiced intro from content/homepage.md */}
      <section className="shell py-24 sm:py-32">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow">The premise</p>
            <h2 className="mt-4 font-display text-4xl leading-tight tracking-tightish text-ink sm:text-5xl">
              {lead}
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="max-w-prose space-y-5 font-sans text-lg leading-relaxed text-ink/75">
            {premiseRest.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <p>
              <Link href="/about" className="link-underline font-medium text-coffee">
                Meet Ethan &amp; Jacob →
              </Link>
            </p>
          </Reveal>
        </div>
      </section>

      {/* Route teaser */}
      <section className="border-y border-clay/15 bg-paper/60 py-24">
        <div className="shell">
          <Reveal className="mb-10 text-center">
            <p className="eyebrow">
              {first} &rarr; {last}
            </p>
            <h2 className="mt-3 font-display text-4xl tracking-tightish text-ink sm:text-5xl">
              {copy.map.header}
            </h2>
            <p className="mx-auto mt-3 max-w-md font-sans text-ink/60">{copy.map.subhead}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <RouteTeaser stops={route} />
          </Reveal>
        </div>
      </section>

      {/* Latest from the road */}
      <section className="shell py-24 sm:py-32">
        <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-xl">
            <h2 className="font-display text-4xl tracking-tightish text-ink sm:text-5xl">
              {copy.latest.header}
            </h2>
            <p className="mt-3 font-sans text-ink/60">{copy.latest.subhead}</p>
          </div>
          <Link href="/journal" className="link-underline font-sans text-sm font-medium text-ink">
            Read the full journal →
          </Link>
        </Reveal>

        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((e, i) => (
            <JournalCard key={e.slug} index={i} entry={toCardData(e)} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="shell pb-28">
        <Reveal className="overflow-hidden rounded-2xl bg-ink px-8 py-16 text-center text-bone sm:px-16 sm:py-20">
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-clay">
            Follow the journey
          </p>
          <h2 className="mx-auto mt-4 max-w-2xl font-display text-4xl leading-tight tracking-tightish sm:text-5xl">
            New miles, new entries. Come along for the ride.
          </h2>
          <Link
            href="/journal"
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-bone px-7 py-3.5 font-sans text-sm font-medium text-ink transition-colors hover:bg-clay hover:text-bone"
          >
            {copy.ctaButton}
            <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
              →
            </span>
          </Link>
        </Reveal>
      </section>
    </>
  );
}
