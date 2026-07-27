// All storage access is wrapped in try/catch; the game degrades to
// session-only progress if localStorage is unavailable.
const KEY = 'lfotr:v1';

const DEFAULTS = {
  v: 1,
  unlocked: 1, // number of stops unlocked, in route order
  levels: {}, // slug -> { bestTime, bestRank, plays }
  souvenirs: [], // slugs whose souvenir has been collected
  paperbacks: [], // slugs where the coral paperback was found
};

export function loadProgress() {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return { ...DEFAULTS };
    const parsed = JSON.parse(raw);
    return { ...DEFAULTS, ...parsed };
  } catch {
    return { ...DEFAULTS };
  }
}

function saveProgress(progress) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(progress));
  } catch {
    // storage unavailable — keep playing in memory
  }
}

// Called when a sweep completes. Completing a stop always means the paperback
// and souvenir were found (both are exempt from the shuffle).
export function recordResult(progress, stopIndex, slug, { time, rank }) {
  const prev = progress.levels[slug];
  const best = !prev || time < prev.bestTime;
  const next = {
    ...progress,
    unlocked: Math.max(progress.unlocked, Math.min(stopIndex + 2, 10)),
    levels: {
      ...progress.levels,
      [slug]: {
        bestTime: best ? time : prev.bestTime,
        bestRank: best ? rank : prev.bestRank,
        plays: (prev ? prev.plays : 0) + 1,
      },
    },
    souvenirs: progress.souvenirs.includes(slug)
      ? progress.souvenirs
      : [...progress.souvenirs, slug],
    paperbacks: progress.paperbacks.includes(slug)
      ? progress.paperbacks
      : [...progress.paperbacks, slug],
  };
  saveProgress(next);
  return next;
}
