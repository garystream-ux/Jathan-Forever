# Jathan Forever

The companion website to the YA romantic comedy novel **_Ethan's Edge_** by **Gary Stream** — framed as the shared travel journal of two fictional young men, **Ethan Highfield** and **Jacob Monroe**, the summer after the book: a road trip from Burlington, Vermont west to the California coast (via a hop into Ontario), falling deeper in love mile by mile.

An interactive route map, dated diary entries in two distinct voices, photo galleries, and a comment section — built to an Awwwards level of craft.

---

## Tech stack

| Concern | Choice |
| --- | --- |
| Framework | **Next.js 14** (App Router) + **TypeScript** (strict) |
| Styling | **Tailwind CSS** with custom design tokens |
| Motion | **Framer Motion** (`motion`) + **Lenis** smooth scroll |
| Map | **react-leaflet** + OpenStreetMap/CARTO tiles (no API key) |
| Content | **MDX** via `next-mdx-remote/rsc`, typed + validated with **zod** |
| Images | `next/image` + **yet-another-react-lightbox** |
| Comments | **Giscus** (GitHub Discussions) behind one swappable component |
| Fonts | `next/font/google` — Fraunces (display) + Inter (body) |

## Quick start

```bash
npm install
npm run placeholders   # generate palette placeholder images (first run only)
npm run dev            # http://localhost:3000
```

Other scripts:

```bash
npm run build          # production build
npm run start          # serve the production build
npm run typecheck      # tsc --noEmit
npm run lint           # next lint
npm run placeholders   # (re)generate placeholder images in /public/images
```

> **Note on images:** the repo ships with generated palette-colored placeholders
> so the layout renders immediately. Drop real photos in at the **same paths**
> (see below) to replace them — no code changes needed.

## Project structure

```
app/
  layout.tsx              fonts, Lenis, intro, nav, footer, page transitions
  page.tsx                home (hero, premise, route teaser, latest, CTA)
  journey/page.tsx        interactive map
  journal/page.tsx        filterable index
  journal/[slug]/page.tsx entry template (MDX, voices, gallery, mini-map, comments)
  gallery/page.tsx        photo grid + lightbox, grouped by stop
  about/page.tsx          character bios + book + author
  not-found.tsx           in-character 404
  sitemap.ts · robots.ts · icon.svg
components/                Hero, Nav, Footer, RouteMap, MiniMap, JournalCard,
                          JournalIndex, AuthorByline, PhotoGrid, Comments,
                          Reveal, Intro, PageTransition, SmoothScroll …
content/
  journal/*.mdx           the 10 diary entries (single source of truth)
  homepage.md             voiced hero/section/footer/404 copy
  gallery-captions.json   voiced photo captions, keyed by image path (+ author)
  about/book-blurb.md     About-page novel blurb (Ethan's voice)
  about/character-bios.md Ethan & Jacob bios (each written by the other)
lib/
  journal.ts              typed content layer (reads + zod-validates entries)
  route.ts                derives the ordered map route from entries
  authors.ts              author identity + voice colors
  homepage.ts             parses content/homepage.md into typed copy
  captions.ts             loads gallery-captions.json
  about.ts · site.ts · images.ts
scripts/
  generate-placeholders.mjs
public/images/             characters/ + stops/<slug>/
```

## Design tokens

Defined in **`tailwind.config.ts`** and mirrored as CSS variables in
**`app/globals.css`** (so Leaflet, Giscus, and raw SVG can use the same values):

| Token | Hex | Role |
| --- | --- | --- |
| `ink` | `#14304A` | deep blue — text / structure / **Jacob's voice** |
| `atlantic` | `#3E6E9C` | interactive accent blue |
| `coffee` | `#5C3D2E` | coffee brown — secondary |
| `clay` | `#B07A4F` | warm tan — accents / **Ethan's voice** |
| `bone` | `#FAF5EE` | bone white — dominant canvas |
| `paper` | `#FFFFFF` | pure white — cards |

All non-essential motion is gated behind `prefers-reduced-motion` (per-component
via `useReducedMotion`, plus a global CSS safety net).

---

## Adding a new diary entry

1. Create `content/journal/<your-slug>.mdx` with typed frontmatter:

   ```yaml
   ---
   title: "Sunrise over the Badlands"
   slug: "badlands-sunrise"          # must match the filename / URL
   date: "2025-06-02"                # YYYY-MM-DD
   author: "ethan"                   # "ethan" | "jacob"
   location:
     name: "Badlands National Park, SD"
     state: "SD"                     # 2-letter code
     lat: 43.8554
     lng: -102.3397
   order: 7                          # position along the route
   coverImage: "/images/stops/badlands/cover.jpg"
   gallery:
     - "/images/stops/badlands/01.jpg"
     - "/images/stops/badlands/02.jpg"
   excerpt: "Jacob made me pull over before dawn. I'm glad he did."
   ---

   Your entry text in Markdown / MDX…
   ```

2. Add the matching images under `public/images/stops/<stop-slug>/`
   (`cover.jpg`, `01.jpg`, …). Until you have real photos, run
   `npm run placeholders` after adding the stop to `scripts/generate-placeholders.mjs`.

That's it — the entry automatically appears in the **journal index**, the
**map** (a marker at its `lat`/`lng`, connected in `order`), the **gallery**,
the home page **"latest"** row, the **sitemap**, and gets its own **OG card**.
Frontmatter is validated by zod at read time, so a typo fails the build loudly.

## Editing the voiced copy

The site keeps its voice in content files, not in components — edit these and the
pages follow:

- **`content/homepage.md`** — hero tagline + premise, every section header/subhead,
  the CTA label, the comments invite, the footer sign-off, and the 404 copy.
  Parsed by `lib/homepage.ts`; keep the `## Section` headings intact.
- **`content/gallery-captions.json`** — voiced captions keyed by image path, each
  with a `caption` and a `by` (`ethan` | `jacob`) that drives its color. Shown
  under photos, in the lightbox, and under inline photos in diary entries.
  (Plain descriptive `alt` text is written separately for accessibility.)
- **`content/about/character-bios.md`** — the two bios, each written in-voice by
  the *other* person; the About page pairs each portrait with the bio written
  about that person.
- **`content/about/book-blurb.md`** — the *Ethan's Edge* blurb.

## Replacing placeholder images

Drop real files at these exact paths — no code changes required:

- Character portraits: `public/images/characters/jacob.png`, `…/ethan.png`
- Stop photos: `public/images/stops/<slug>/cover.jpg`, `01.jpg`, `02.jpg`, …

Alt text for portraits and stop photos is generated from the content; review
`app/about/page.tsx` to fine-tune the character alt text if your portraits differ.

## Comments (Giscus)

Comments are isolated behind **`components/Comments.tsx`** (look for the
`SWAP POINT` note). Until configured, a friendly placeholder renders.

To enable Giscus:

1. Push this repo to **GitHub** and make it public.
2. Enable **Discussions** (Settings → General → Features).
3. Install the **giscus app**: <https://github.com/apps/giscus>.
4. Visit <https://giscus.app>, enter your repo, choose a Discussion **category**
   (e.g. _General_ or a new _Comments_ category), and copy the generated
   `data-repo-id` and `data-category-id`.
5. Add them to `.env.local` (see `.env.example`):

   ```bash
   NEXT_PUBLIC_GISCUS_REPO=your-username/your-repo
   NEXT_PUBLIC_GISCUS_REPO_ID=R_xxx
   NEXT_PUBLIC_GISCUS_CATEGORY=General
   NEXT_PUBLIC_GISCUS_CATEGORY_ID=DIC_xxx
   ```

Each entry maps to its own discussion via the entry **slug** (`mapping="specific"`).

**Swapping to a database (e.g. Supabase) later:** replace only
`components/Comments.tsx`. Keep its single `term` prop (the entry slug) and
callers won't change. The in-file comment walks through it.

## Swapping the map to Mapbox GL

The map uses free OpenStreetMap/CARTO raster tiles (no key). To switch to a more
stylized Mapbox map, follow the `SWAP POINT — Mapbox GL` note at the top of
**`components/RouteMap.tsx`**. The route data comes from the content layer, so
only that one file changes. The quickest variant keeps Leaflet and just points
the `TileLayer` at a Mapbox raster style URL with `NEXT_PUBLIC_MAPBOX_TOKEN`.

## SEO

- Per-page `metadata` (title template, description, canonical).
- Open Graph + Twitter cards site-wide, plus a **generated OG image per entry**
  (`public/images/og/<slug>.png`, produced by `npm run placeholders` from the
  entry frontmatter — no runtime dependency, works on any host).
- `sitemap.xml` and `robots.txt` generated from the content layer.

Set `NEXT_PUBLIC_SITE_URL` in production so absolute URLs resolve correctly.

## Accessibility

Semantic HTML, a skip link, keyboard-navigable nav / map list / lightbox,
visible focus rings, AA-contrast palette, and `prefers-reduced-motion` honored
throughout.

## Deployment

Deploys cleanly to **Vercel** (zero config). Set the env vars from
`.env.example` in your project settings. Any Node host works via
`npm run build && npm run start`.

---

_Made with long drives and good coffee._
