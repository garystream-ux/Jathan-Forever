import 'server-only';
import fs from 'node:fs';
import path from 'node:path';
import type { Author } from './authors';

const ABOUT_DIR = path.join(process.cwd(), 'content', 'about');

/** The Ethan's-Edge blurb (voiced, in Ethan's voice — no frontmatter). */
export interface BookBlurb {
  /** markdown body to render (the leading H1 is stripped) */
  body: string;
}

export function getBookBlurb(): BookBlurb {
  const raw = fs.readFileSync(path.join(ABOUT_DIR, 'book-blurb.md'), 'utf8');
  // Drop the leading "# About the Book …" heading (the page renders its own),
  // then the italic subtitle line right under it (shown in the page heading).
  const body = raw
    .replace(/^#\s+.*$/m, '')
    .trim()
    .replace(/^\*[^\n]*\*\s*$/m, '')
    .trim();
  return { body };
}

/**
 * Character bios from content/about/character-bios.md. Each bio is written
 * in-voice by the *other* person, so we expose both who it's about (`subject`,
 * whose portrait to show) and who wrote it (`writtenBy`, whose color to use).
 */
export interface CharacterBio {
  subject: Author;
  writtenBy: Author;
  name: string;
  descriptor: string;
  body: string;
}

export function getCharacterBios(): CharacterBio[] {
  const raw = fs.readFileSync(path.join(ABOUT_DIR, 'character-bios.md'), 'utf8');

  // Split into "## Name" sections.
  const sections = raw.split(/^##\s+/m).slice(1);
  const bios: CharacterBio[] = [];

  for (const sec of sections) {
    const nl = sec.indexOf('\n');
    const name = sec.slice(0, nl).trim();
    const rest = sec.slice(nl + 1);

    const subject: Author = /ethan/i.test(name) ? 'ethan' : 'jacob';
    const descriptor = rest.match(/^\s*\*(.+?)\*\s*$/m)?.[1].trim() ?? '';
    const writtenByName = rest.match(/\*\*\s*—\s*written by\s+(\w+)\s*\*\*/i)?.[1] ?? '';
    const writtenBy: Author = /ethan/i.test(writtenByName) ? 'ethan' : 'jacob';

    // Body = everything after the "**— written by X**" line, trimmed of the
    // descriptor/byline scaffolding. Keeps the prose + closing "— J/— E".
    const afterByline = rest.split(/\*\*\s*—\s*written by[^*]*\*\*/i)[1] ?? rest;
    const body = afterByline
      .split('\n')
      .filter((l) => l.trim() !== `*${descriptor}*`)
      .join('\n')
      .trim();

    bios.push({ subject, writtenBy, name, descriptor, body });
  }

  return bios;
}
