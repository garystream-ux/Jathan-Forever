/**
 * Author identity + voice metadata. Kept free of `server-only` so both server
 * and client components (bylines, filters, the map) can import it.
 *
 * Byline colors come straight from the brief:
 *   Jacob = deep blue #14304A   ·   Ethan = warm tan/clay #B07A4F
 */
export const AUTHORS = ['ethan', 'jacob'] as const;
export type Author = (typeof AUTHORS)[number];

export interface AuthorMeta {
  name: string;
  first: string;
  color: string;
  /** very short descriptor used in bios / hovers */
  note: string;
}

export const authorMeta: Record<Author, AuthorMeta> = {
  jacob: {
    name: 'Jacob Monroe',
    first: 'Jacob',
    color: '#14304A',
    note: 'quieter, steadier',
  },
  ethan: {
    name: 'Ethan Highfield',
    first: 'Ethan',
    color: '#B07A4F',
    note: 'warmer, openly joyful',
  },
};
