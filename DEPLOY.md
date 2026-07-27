# Deploying Jathan Forever (site + the Lost & Found game)

Two codebases share this one repo and ship in a **single Vercel deploy**:

- **The website** — a Next.js 14 app at the repo root (`app/`, `content/`, `lib/`, …).
- **The game** — *Lost & Found on the Road*, a self-contained **Vite + React** app in
  [`game/`](game/). It builds into the site's `public/` folder and is served as
  static files at **`/game/`**, so it needs no routing config of its own.

The two codebases **share a repo, not code** — the game never imports from the
Next.js app or vice versa.

---

## How the build is wired

The game builds **first**, into the Next.js `public/` directory, and Next.js
then builds around it:

1. Root [`package.json`](package.json) has an npm `prebuild` lifecycle script:

   ```json
   "prebuild": "cd game && npm ci && npm run build",
   "build": "next build"
   ```

   `npm run build` automatically runs `prebuild` first, so the order is always
   **game build → `next build`**.

2. The game's [`game/vite.config.js`](game/vite.config.js) outputs straight into
   the site:

   ```js
   base: '/game/',
   build: { outDir: '../public/game', emptyOutDir: true }
   ```

   Everything under `public/` is served as-is by Vercel, so the built game lands
   live at `/game/` with **no rewrites** (the game uses hash routing internally).

### Source of truth vs. build output

- **Committed (source of truth):** the `game/` app, including its painted
  backgrounds in **`game/public/scenes/*.webp`**, and **`game/package-lock.json`**
  (required — `npm ci` fails without it).
- **Git-ignored (regenerated every build):** `public/game/` and
  `game/node_modules/`. Never edit `public/game/` by hand; it's overwritten on
  every build (`emptyOutDir: true`).

---

## Deploying (GitHub → Vercel)

1. Commit your changes — including anything under `game/` and
   `game/package-lock.json`.
2. Push to the default branch (`main`).
3. Vercel runs its usual `npm install` → `npm run build`. Because of `prebuild`,
   that builds the game into `public/game/` and then runs `next build`.
4. Site and game deploy together.

**Vercel settings:** the defaults work — Framework **Next.js**, Build Command
`npm run build` (or left blank), no rewrites, no extra env vars for the game.

---

## Verify after a deploy

- Open **https://jathanforever.com/game/** → the title screen loads.
- A scene background serves, e.g. `https://jathanforever.com/game/scenes/burlington.webp`
  returns **200** (`image/webp`).
- Play a stop → the win card's **"Read this stop's diary entry →"** links to
  `/journal/<slug>` (e.g. `/journal/chicago-deep-dish`) and opens the real entry.
- The route map (`/game/#/map`) and, once every stop is swept, the finale
  (`/game/#/finale`) render.

---

## Preview locally

- **Game only (fastest):**

  ```bash
  cd game && npm run dev
  ```

  → http://localhost:5173/game/. Note: the diary links (`/journal/...`) won't
  resolve here because the journal is served by the Next.js app, not the Vite
  dev server — that's expected in game-only dev.

- **Rebuild just the game** into `public/game/`:

  ```bash
  cd game && npm run build
  ```

- **Whole site + game, production-like:**

  ```bash
  npm run build && npm start
  ```

  (`npm run build` runs `prebuild`, so the game is built into `public/game/`
  before Next.js.)

> ⚠️ **Gotcha:** `npm run dev` (`next dev`) does **not** run `prebuild`, so
> visiting `/game/` under `next dev` shows nothing until you build the game once
> with `cd game && npm run build`. For iterating on the game, use its own dev
> server (`cd game && npm run dev`) instead.

---

## Footprint

- Game JS: ~60 KB gzipped. CSS: ~3 KB gzipped.
- Ten painted WebP backgrounds in `game/public/scenes/`, ~75–190 KB each
  (one image loads per scene, on demand).
