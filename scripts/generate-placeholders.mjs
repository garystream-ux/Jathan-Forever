/**
 * Generates lightweight, palette-colored placeholder images so the layout
 * renders before real photography arrives. Each is a solid block in the brand
 * palette with the stop name + filename labeled.
 *
 * Drop real photos in at the SAME paths to replace them — no code changes
 * needed. Re-run any time with:  npm run placeholders
 *
 * Output:
 *   /public/images/characters/{jacob,ethan}.png
 *   /public/images/stops/<slug>/{cover,01,02}.jpg
 *   /public/images/og-default.png        (social card fallback)
 */
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const PUBLIC = path.join(ROOT, 'public', 'images');

const palette = {
  ink: '#14304A',
  atlantic: '#3E6E9C',
  coffee: '#5C3D2E',
  clay: '#B07A4F',
  bone: '#FAF5EE',
};

function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/** Build an SVG: solid block, soft diagonal band, centered label + sublabel. */
function svg({ w, h, bg, accent, label, sub }) {
  const cx = w / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <rect width="${w}" height="${h}" fill="${bg}"/>
  <path d="M0 ${h * 0.62} L${w} ${h * 0.32} L${w} ${h} L0 ${h} Z" fill="${accent}" fill-opacity="0.28"/>
  <rect x="14" y="14" width="${w - 28}" height="${h - 28}" fill="none" stroke="${palette.bone}" stroke-opacity="0.35" stroke-width="2"/>
  <circle cx="${cx}" cy="${h * 0.4}" r="${Math.min(w, h) * 0.06}" fill="none" stroke="${palette.bone}" stroke-opacity="0.5" stroke-width="3"/>
  <text x="${cx}" y="${h * 0.58}" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="${Math.round(Math.min(w, h) * 0.085)}" fill="${palette.bone}" font-style="italic">${esc(label)}</text>
  <text x="${cx}" y="${h * 0.58 + Math.round(Math.min(w, h) * 0.07)}" text-anchor="middle" font-family="Arial, sans-serif" font-size="${Math.round(Math.min(w, h) * 0.035)}" letter-spacing="3" fill="${palette.bone}" fill-opacity="0.7">${esc(sub)}</text>
</svg>`;
}

// Pass --force to overwrite existing placeholders.
const FORCE = process.argv.includes('--force');

async function write(file, markup, format, { protect = true } = {}) {
  const rel = path.relative(ROOT, file);
  // Never clobber real photos that have been dropped in. `protect` images
  // (stop photos, portraits) are skipped if they already exist; derived
  // assets like OG cards pass protect:false so they always refresh.
  if (protect && !FORCE && fs.existsSync(file)) {
    console.log('  • skip (exists)', rel);
    return;
  }
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const img = sharp(Buffer.from(markup));
  if (format === 'jpg') await img.jpeg({ quality: 82 }).toFile(file);
  else await img.png().toFile(file);
  console.log('  ✓', rel);
}

// stop slug -> [coverColor, accentColor], rotated through the palette
const stops = [
  { slug: 'big-sur', name: 'Big Sur', bg: palette.atlantic, accent: palette.ink },
  { slug: 'las-vegas', name: 'Las Vegas', bg: palette.coffee, accent: palette.clay },
  { slug: 'zion', name: 'Zion', bg: palette.clay, accent: palette.coffee },
  { slug: 'rocky-mountain', name: 'Rocky Mountain', bg: palette.ink, accent: palette.atlantic },
  { slug: 'badlands', name: 'Badlands', bg: palette.coffee, accent: palette.clay },
  { slug: 'st-paul', name: 'St. Paul', bg: palette.atlantic, accent: palette.ink },
  { slug: 'chicago', name: 'Chicago', bg: palette.ink, accent: palette.atlantic },
  { slug: 'detroit', name: 'Detroit', bg: palette.coffee, accent: palette.clay },
  { slug: 'niagara-falls', name: 'Niagara Falls', bg: palette.atlantic, accent: palette.coffee },
  { slug: 'burlington', name: 'Burlington', bg: palette.clay, accent: palette.ink },
];

const AUTHOR_COLOR = { jacob: palette.ink, ethan: palette.clay };
const AUTHOR_FIRST = { jacob: 'Jacob', ethan: 'Ethan' };

function fmtDate(d) {
  const [y, m, day] = String(d).split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, day)).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

/** Editorial 1200×630 social card per diary entry, rendered from frontmatter. */
function ogSvg({ title, location, author, order, date }) {
  const color = AUTHOR_COLOR[author] ?? palette.clay;
  const first = AUTHOR_FIRST[author] ?? '';
  // crude wrap for long titles
  const words = title.split(' ');
  const lines = [];
  let line = '';
  for (const w of words) {
    if ((line + ' ' + w).trim().length > 22) {
      lines.push(line.trim());
      line = w;
    } else line += ' ' + w;
  }
  if (line.trim()) lines.push(line.trim());
  const titleTspans = lines
    .map((l, i) => `<tspan x="80" dy="${i === 0 ? 0 : 86}">${esc(l)}</tspan>`)
    .join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${palette.bone}"/>
  <g font-family="Georgia, 'Times New Roman', serif">
    <circle cx="88" cy="86" r="9" fill="${color}"/>
    <text x="110" y="94" font-family="Arial, sans-serif" font-size="26" letter-spacing="2" fill="${palette.ink}">Stop ${order} · ${esc(first)}</text>
    <text x="80" y="300" font-size="76" font-weight="bold" fill="${palette.ink}">${titleTspans}</text>
    <text x="80" y="${320 + lines.length * 86}" font-size="32" font-style="italic" fill="${palette.clay}">${esc(location)}  ·  ${esc(fmtDate(date))}</text>
    <text x="80" y="560" font-size="30" font-weight="bold" fill="${palette.ink}">Jathan <tspan fill="${palette.clay}">Forever</tspan></text>
    <text x="1120" y="560" text-anchor="end" font-family="Arial, sans-serif" font-size="22" fill="${palette.ink}" fill-opacity="0.55">Two roads · one map</text>
  </g>
  <rect x="0" y="618" width="1200" height="12" fill="${color}"/>
</svg>`;
}

async function generateOgCards() {
  const dir = path.join(ROOT, 'content', 'journal');
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir).filter((f) => /\.mdx?$/.test(f));
  for (const f of files) {
    const { data } = matter(fs.readFileSync(path.join(dir, f), 'utf8'));
    await write(
      path.join(PUBLIC, 'og', `${data.slug}.png`),
      ogSvg({
        title: data.title,
        location: data.location?.name ?? '',
        author: data.author,
        order: data.order,
        date: data.date,
      }),
      'png',
      { protect: false }, // OG cards are derived — always refresh
    );
  }
}

async function main() {
  console.log('Generating placeholder images…');

  // Character portraits (3:4)
  await write(
    path.join(PUBLIC, 'characters', 'jacob.png'),
    svg({ w: 900, h: 1200, bg: palette.ink, accent: palette.atlantic, label: 'Jacob Monroe', sub: 'PORTRAIT PLACEHOLDER' }),
    'png',
  );
  await write(
    path.join(PUBLIC, 'characters', 'ethan.png'),
    svg({ w: 900, h: 1200, bg: palette.clay, accent: palette.coffee, label: 'Ethan Highfield', sub: 'PORTRAIT PLACEHOLDER' }),
    'png',
  );

  // Stop photos
  for (const s of stops) {
    await write(
      path.join(PUBLIC, 'stops', s.slug, 'cover.jpg'),
      svg({ w: 1600, h: 1000, bg: s.bg, accent: s.accent, label: s.name, sub: 'cover.jpg' }),
      'jpg',
    );
    for (const n of ['01', '02']) {
      await write(
        path.join(PUBLIC, 'stops', s.slug, `${n}.jpg`),
        svg({ w: 1200, h: 900, bg: s.bg, accent: s.accent, label: s.name, sub: `${n}.jpg` }),
        'jpg',
      );
    }
  }

  // Default OG card (1200x630)
  await write(
    path.join(PUBLIC, 'og-default.png'),
    svg({ w: 1200, h: 630, bg: palette.ink, accent: palette.clay, label: 'Jathan Forever', sub: 'TWO ROADS · ONE MAP' }),
    'png',
  );

  // Per-entry social cards (read from the diary frontmatter)
  await generateOgCards();

  console.log('Done.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
