/**
 * Image helpers shared by next/image usages.
 *
 * blurDataURL() builds a tiny inline SVG data URL in a palette tone, used as
 * the blur-up placeholder so images fade in without layout shift. Works on
 * both server and client (no Buffer/btoa assumptions leak out).
 */
function toBase64(str: string): string {
  if (typeof window === 'undefined') return Buffer.from(str).toString('base64');
  return window.btoa(str);
}

export function blurDataURL(hex = '#3E6E9C'): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="8" height="6"><rect width="8" height="6" fill="${hex}"/></svg>`;
  return `data:image/svg+xml;base64,${toBase64(svg)}`;
}

/** A muted tone per stop, used for blur-up placeholders. */
const STOP_TINT: Record<string, string> = {
  'big-sur': '#3E6E9C',
  'las-vegas': '#5C3D2E',
  zion: '#B07A4F',
  'rocky-mountain': '#14304A',
  badlands: '#5C3D2E',
  'st-paul': '#3E6E9C',
  // Sampled from each cover so the blur-up doesn't flash a mismatched hue.
  burlington: '#8A8064',
  chicago: '#4A4746',
  detroit: '#6E7468',
  'niagara-falls': '#656E74',
};

/** Derive the stop slug from an image path like /images/stops/zion/cover.jpg */
export function stopSlugFromPath(src: string): string | undefined {
  return src.match(/\/stops\/([^/]+)\//)?.[1];
}

export function blurForImage(src: string): string {
  const slug = stopSlugFromPath(src);
  return blurDataURL(slug ? STOP_TINT[slug] ?? '#3E6E9C' : '#3E6E9C');
}
