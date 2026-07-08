import 'server-only';
import fs from 'node:fs';
import path from 'node:path';
import type { Author } from './authors';

/**
 * Voiced gallery captions from content/gallery-captions.json, keyed by image
 * path. These are *display* captions (color-coded to the author who wrote
 * them) — distinct from the plain descriptive alt text used for accessibility.
 */
export interface Caption {
  by: Author;
  caption: string;
}

let _map: Record<string, Caption> | null = null;

function load(): Record<string, Caption> {
  if (_map) return _map;
  const file = path.join(process.cwd(), 'content', 'gallery-captions.json');
  const raw = JSON.parse(fs.readFileSync(file, 'utf8')) as Record<string, unknown>;
  const out: Record<string, Caption> = {};
  for (const [key, value] of Object.entries(raw)) {
    if (key.startsWith('_')) continue; // skip the "_comment" note
    if (value && typeof value === 'object' && 'caption' in value) {
      out[key] = value as Caption;
    }
  }
  _map = out;
  return out;
}

export function getCaption(src: string): Caption | undefined {
  return load()[src];
}
