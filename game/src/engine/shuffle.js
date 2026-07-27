// The replayability engine: each scene declares an 18–20 object pool,
// each run plays a random 14. Objects flagged `always` (the coral paperback,
// the stop's souvenir) are exempt from the shuffle and always included.
export const RUN_SIZE = 14;

export function pickRun(registry, count = RUN_SIZE) {
  const always = registry.filter((o) => o.always);
  const rest = registry.filter((o) => !o.always);
  for (let i = rest.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [rest[i], rest[j]] = [rest[j], rest[i]];
  }
  const chosen = new Set(
    always.concat(rest.slice(0, Math.max(0, count - always.length))).map((o) => o.id)
  );
  // Return in registry order so the manifest list is stable run to run.
  return registry.filter((o) => chosen.has(o.id));
}
