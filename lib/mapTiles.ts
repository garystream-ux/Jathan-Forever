/**
 * Basemap tiles shared by the journey map and the per-entry mini maps.
 *
 * CARTO "Voyager" (warm, light, editorial) has needed a free API key since
 * 23 Sep 2026 — without one every tile carries an "API KEY REQUIRED"
 * watermark. Set NEXT_PUBLIC_CARTO_KEY (Vercel → Settings → Environment
 * Variables, and .env.local for dev) to use it. Until a key is set, fall back
 * to the standard OpenStreetMap tiles, which need no key.
 *
 * Both providers require their attribution to stay visible on every map.
 */
const CARTO_KEY = process.env.NEXT_PUBLIC_CARTO_KEY;

export const MAP_TILES = CARTO_KEY
  ? {
      url: `https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png?key=${CARTO_KEY}`,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
    }
  : {
      url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    };
