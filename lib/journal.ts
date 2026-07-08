import 'server-only';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { z } from 'zod';
import { AUTHORS, type Author } from './authors';

export { AUTHORS, authorMeta } from './authors';
export type { Author } from './authors';

/**
 * The typed content layer.
 *
 * Diary entries live as MDX files in /content/journal. This module is the
 * SINGLE SOURCE OF TRUTH: the home page "latest" cards, the journal index,
 * the entry pages, the journey map, and the gallery all read from here.
 * Frontmatter is validated with zod at read time so a malformed entry fails
 * loudly during the build rather than rendering broken UI.
 */

const FrontmatterSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'date must be YYYY-MM-DD'),
  author: z.enum(AUTHORS),
  location: z.object({
    name: z.string().min(1),
    state: z.string().length(2),
    lat: z.number(),
    lng: z.number(),
  }),
  order: z.number().int().positive(),
  coverImage: z.string().min(1),
  gallery: z.array(z.string()).default([]),
  excerpt: z.string().min(1),
});

export type Frontmatter = z.infer<typeof FrontmatterSchema>;

export interface JournalEntry extends Frontmatter {
  /** raw MDX body (without frontmatter) */
  content: string;
  /** approximate reading time in minutes */
  readingMinutes: number;
}

const CONTENT_DIR = path.join(process.cwd(), 'content', 'journal');

function readEntries(): JournalEntry[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => /\.mdx?$/.test(f));

  const entries = files.map((file) => {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf8');
    const { data, content } = matter(raw);

    const parsed = FrontmatterSchema.safeParse(data);
    if (!parsed.success) {
      throw new Error(
        `Invalid frontmatter in content/journal/${file}:\n${parsed.error.toString()}`,
      );
    }

    const words = content.trim().split(/\s+/).length;
    return {
      ...parsed.data,
      content,
      readingMinutes: Math.max(1, Math.round(words / 200)),
    };
  });

  // Single source of truth ordering: by route position.
  return entries.sort((a, b) => a.order - b.order);
}

// Read once per server process; content is static at build time.
let _cache: JournalEntry[] | null = null;
function allEntries(): JournalEntry[] {
  if (_cache === null) _cache = readEntries();
  return _cache;
}

/** Every entry, in route order (stop 1 → last). */
export function getAllEntries(): JournalEntry[] {
  return allEntries();
}

/** Entries newest-first by date (for "latest from the road"). */
export function getEntriesByDate(): JournalEntry[] {
  return [...allEntries()].sort((a, b) => b.date.localeCompare(a.date));
}

/** The N most recent entries by date. */
export function getLatestEntries(n = 3): JournalEntry[] {
  return getEntriesByDate().slice(0, n);
}

export function getEntryBySlug(slug: string): JournalEntry | undefined {
  return allEntries().find((e) => e.slug === slug);
}

export function getAllSlugs(): string[] {
  return allEntries().map((e) => e.slug);
}

/** Prev/next neighbours along the route for entry navigation. */
export function getAdjacentEntries(slug: string): {
  prev: JournalEntry | null;
  next: JournalEntry | null;
} {
  const entries = allEntries();
  const i = entries.findIndex((e) => e.slug === slug);
  return {
    prev: i > 0 ? entries[i - 1] : null,
    next: i >= 0 && i < entries.length - 1 ? entries[i + 1] : null,
  };
}

/** Distinct US states visited, in route order (for filters). */
export function getStates(): { code: string; name: string }[] {
  const seen = new Map<string, string>();
  for (const e of allEntries()) {
    if (!seen.has(e.location.state)) seen.set(e.location.state, e.location.name);
  }
  return [...seen.entries()].map(([code, name]) => ({ code, name }));
}

/** Serializable card shape consumed by <JournalCard> / <JournalIndex>. */
export function toCardData(e: JournalEntry) {
  return {
    slug: e.slug,
    title: e.title,
    date: formatDate(e.date),
    author: e.author,
    name: e.location.name,
    state: e.location.state,
    excerpt: e.excerpt,
    coverImage: e.coverImage,
    order: e.order,
  };
}

/** Format a YYYY-MM-DD date as e.g. "June 5, 2025" (timezone-safe). */
export function formatDate(date: string): string {
  const [y, m, d] = date.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}
