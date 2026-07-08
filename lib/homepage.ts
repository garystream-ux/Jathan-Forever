import 'server-only';
import fs from 'node:fs';
import path from 'node:path';

/**
 * Reads the voiced landing-page copy from content/homepage.md and parses it
 * into a typed object. The whole site (hero, section headers, footer sign-off,
 * 404, comments invite) pulls its words from here so it stays in Ethan &
 * Jacob's voice — edit the markdown, not the components.
 */
export interface HomeCopy {
  title: string;
  tagline: string;
  premise: string[];
  scrollCue: string;
  latest: { header: string; subhead: string };
  map: { header: string; subhead: string };
  gallery: { header: string; subhead: string };
  ctaButton: string;
  commentsInvite: string;
  footerSignoff: string[];
  notFound: { heading: string; body: string; button: string };
}

/** Split the doc into { normalizedHeading: bodyText } by its "## " headers. */
function sections(raw: string): Record<string, string> {
  const out: Record<string, string> = {};
  const parts = raw.split(/^##\s+/m).slice(1); // drop the leading "# …" preamble
  for (const part of parts) {
    const nl = part.indexOf('\n');
    const heading = part.slice(0, nl < 0 ? undefined : nl).trim().toLowerCase();
    const body = nl < 0 ? '' : part.slice(nl + 1);
    out[heading] = body;
  }
  return out;
}

const find = (secs: Record<string, string>, needle: string) =>
  secs[Object.keys(secs).find((k) => k.includes(needle)) ?? ''] ?? '';

const firstLine = (body: string) =>
  body.split('\n').map((l) => l.trim()).find(Boolean) ?? '';

const nonEmptyLines = (body: string) =>
  body.split('\n').map((l) => l.trim()).filter(Boolean);

const paragraphs = (body: string) =>
  body
    .split(/\n\s*\n/)
    .map((p) => p.trim().replace(/\s*\n\s*/g, ' '))
    .filter(Boolean);

/** Extract a "**Label:** value" field from a section body. */
function field(body: string, label: string): string {
  const re = new RegExp(`\\*\\*\\s*${label}\\s*:?\\*\\*\\s*(.+)`, 'i');
  return body.match(re)?.[1].trim() ?? '';
}

let _cache: HomeCopy | null = null;

export function getHomeCopy(): HomeCopy {
  if (_cache) return _cache;

  const raw = fs.readFileSync(
    path.join(process.cwd(), 'content', 'homepage.md'),
    'utf8',
  );
  const s = sections(raw);

  // Tagline: the section lists numbered options, primary first.
  const taglineBody = find(s, 'hero tagline');
  const tagline =
    taglineBody.match(/^\s*1\.\s*(.+)$/m)?.[1].trim() || firstLine(taglineBody);

  const footer = nonEmptyLines(find(s, 'footer sign-off'));
  const nf = find(s, '404');

  _cache = {
    title: firstLine(find(s, 'site title')) || 'Jathan Forever',
    tagline,
    premise: paragraphs(find(s, 'hero premise')),
    scrollCue: firstLine(find(s, 'scroll cue')) || 'Scroll',
    latest: {
      header: field(find(s, 'latest from the road'), 'Header'),
      subhead: field(find(s, 'latest from the road'), 'Subhead'),
    },
    map: {
      header: field(find(s, 'map section'), 'Header'),
      subhead: field(find(s, 'map section'), 'Subhead'),
    },
    gallery: {
      header: field(find(s, 'gallery section'), 'Header'),
      subhead: field(find(s, 'gallery section'), 'Subhead'),
    },
    ctaButton: field(find(s, 'follow'), 'CTA button') || 'Ride along',
    commentsInvite: field(find(s, 'follow'), 'Comments invite'),
    footerSignoff: footer,
    notFound: {
      heading: field(nf, 'Heading'),
      body: field(nf, 'Body'),
      button: field(nf, 'Button'),
    },
  };
  return _cache;
}
