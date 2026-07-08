import type { Metadata } from 'next';
import Reveal from '@/components/Reveal';
import MapSection from '@/components/MapSection';
import { getRoute } from '@/lib/route';
import { getAllEntries } from '@/lib/journal';

export const metadata: Metadata = {
  title: 'The Route',
  description:
    'Follow Ethan & Jacob across the country — an interactive map of every stop on their road trip, from Big Sur to St. Paul.',
  alternates: { canonical: '/journey' },
};

export default function JourneyPage() {
  const stops = getRoute();
  const total = getAllEntries().length;
  const first = stops[0];
  const last = stops[stops.length - 1];

  return (
    <div className="shell py-16 sm:py-20">
      <Reveal>
        <p className="eyebrow">Their route</p>
        <h1 className="mt-4 max-w-3xl font-display text-5xl leading-[1.05] tracking-tightish text-ink sm:text-6xl">
          Every mile, mapped.
        </h1>
        <p className="mt-5 max-w-prose font-sans text-lg leading-relaxed text-ink/70">
          {total} stops and counting, from {first?.name} to {last?.name}. Tap any
          marker — or any stop in the list — to see where they were and read the
          entry they wrote there.
        </p>
      </Reveal>

      <Reveal delay={0.1} className="mt-10">
        <MapSection stops={stops} />
      </Reveal>

      <p className="mt-6 font-sans text-xs text-ink/45">
        Map tiles © OpenStreetMap contributors, © CARTO. Markers are colored by
        author — deep blue for Jacob, clay for Ethan.
      </p>
    </div>
  );
}
