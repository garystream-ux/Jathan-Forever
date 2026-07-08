import type { Metadata } from 'next';
import Reveal from '@/components/Reveal';
import JournalIndex from '@/components/JournalIndex';
import { getEntriesByDate, getStates, toCardData } from '@/lib/journal';

export const metadata: Metadata = {
  title: 'The Journal',
  description:
    'Dated diary entries from the road, in two voices — filter by Ethan, Jacob, or by state.',
  alternates: { canonical: '/journal' },
};

export default function JournalPage() {
  const entries = getEntriesByDate().map(toCardData);
  const states = getStates();

  return (
    <div className="shell py-16 sm:py-20">
      <Reveal>
        <p className="eyebrow">The journal</p>
        <h1 className="mt-4 max-w-3xl font-display text-5xl leading-[1.05] tracking-tightish text-ink sm:text-6xl">
          Entries from the road.
        </h1>
        <p className="mt-5 max-w-prose font-sans text-lg leading-relaxed text-ink/70">
          Every stop, written down the night it happened. Ethan tends to run
          warm and loud; Jacob runs quiet and steady. Read them in whichever
          order feels right.
        </p>
      </Reveal>

      <Reveal delay={0.1} className="mt-12">
        <JournalIndex entries={entries} states={states} />
      </Reveal>
    </div>
  );
}
