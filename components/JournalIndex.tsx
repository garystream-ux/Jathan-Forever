'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import JournalCard, { type JournalCardData } from './JournalCard';
import { authorMeta, AUTHORS, type Author } from '@/lib/authors';

type AuthorFilter = Author | 'all';

/**
 * Client-side filterable journal index. Filter by author (Ethan / Jacob / both)
 * and by state. Cards reflow with a soft layout animation (reduced-motion safe).
 */
export default function JournalIndex({
  entries,
  states,
}: {
  entries: JournalCardData[];
  states: { code: string; name: string }[];
}) {
  const reduce = useReducedMotion();
  const [author, setAuthor] = useState<AuthorFilter>('all');
  const [state, setState] = useState<string>('all');

  const filtered = useMemo(
    () =>
      entries.filter(
        (e) => (author === 'all' || e.author === author) && (state === 'all' || e.state === state),
      ),
    [entries, author, state],
  );

  const authorOptions: { value: AuthorFilter; label: string; color?: string }[] = [
    { value: 'all', label: 'Both voices' },
    ...AUTHORS.map((a) => ({ value: a, label: authorMeta[a].first, color: authorMeta[a].color })),
  ];

  return (
    <div>
      {/* Filters */}
      <div className="mb-10 flex flex-col gap-5 border-y border-clay/15 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by author">
          {authorOptions.map((opt) => {
            const active = author === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => setAuthor(opt.value)}
                aria-pressed={active}
                className={`rounded-full border px-4 py-1.5 font-sans text-sm transition-colors ${
                  active
                    ? 'border-transparent bg-ink text-bone'
                    : 'border-clay/30 text-ink/70 hover:border-clay/60'
                }`}
                style={active && opt.color ? { backgroundColor: opt.color } : undefined}
              >
                {opt.label}
              </button>
            );
          })}
        </div>

        <label className="flex items-center gap-2 font-sans text-sm text-ink/70">
          <span className="sr-only sm:not-sr-only">State</span>
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="rounded-full border border-clay/30 bg-paper px-4 py-1.5 font-sans text-sm text-ink focus:border-atlantic"
          >
            <option value="all">All states</option>
            {states.map((s) => (
              <option key={s.code} value={s.code}>
                {s.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Count */}
      <p className="mb-8 font-sans text-sm text-ink/50" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? 'entry' : 'entries'}
      </p>

      {/* Grid */}
      <motion.div layout className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((e, i) => (
            <motion.div
              key={e.slug}
              layout={!reduce}
              initial={reduce ? false : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <JournalCard entry={e} index={i} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="py-16 text-center font-display text-2xl text-ink/50">
          No entries from here yet — check back down the road.
        </p>
      )}
    </div>
  );
}
