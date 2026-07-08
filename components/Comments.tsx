'use client';

import Giscus from '@giscus/react';

/*
  ──────────────────────────────────────────────────────────────────────────
  SWAP POINT — Comments backend
  This isolates ALL comment logic behind one component. Today it renders Giscus
  (GitHub Discussions-backed, free, no database). To move to a Supabase-backed
  solution later, replace ONLY this file:
    1. Create a `comments` table keyed by `term` (the entry slug).
    2. Swap the <Giscus> element below for your own form + list that reads/writes
       that table (e.g. via @supabase/supabase-js).
    3. Keep the same prop — `term` (the entry slug) — so callers don't change.
  Setup for the current Giscus implementation lives in the README.
  ──────────────────────────────────────────────────────────────────────────
*/

interface CommentsProps {
  /** Unique discussion key for this page — the entry slug. */
  term: string;
}

export default function Comments({ term }: CommentsProps) {
  const repo = process.env.NEXT_PUBLIC_GISCUS_REPO; // "owner/repo"
  const repoId = process.env.NEXT_PUBLIC_GISCUS_REPO_ID;
  const category = process.env.NEXT_PUBLIC_GISCUS_CATEGORY;
  const categoryId = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID;

  // Graceful fallback until Giscus env values are wired up (see README).
  if (!repo || !repoId || !categoryId) {
    return (
      <div className="rounded-xl border border-dashed border-clay/40 bg-paper/60 p-6 text-center">
        <p className="font-display text-lg text-ink">Comments are almost ready.</p>
        <p className="mx-auto mt-2 max-w-md font-sans text-sm text-ink/60">
          Add your Giscus environment values (see the README) to let readers
          leave notes on this entry. Until then, the road is quiet here.
        </p>
      </div>
    );
  }

  return (
    <Giscus
      id="comments"
      repo={repo as `${string}/${string}`}
      repoId={repoId}
      category={category || 'General'}
      categoryId={categoryId}
      // Map this page to its discussion by the entry slug (stable, readable).
      mapping="specific"
      term={term}
      strict="1"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      // Themed to match the palette via a hosted CSS, falls back to "light".
      theme="light"
      lang="en"
      loading="lazy"
    />
  );
}
