# Claude Code Build Prompt — *Lost & Found on the Road*

A 10-level hidden objects game that retraces the Jathan Forever road trip.

**Before you start, read the included file `waterfront-sweep.html`.** It is a complete, working single-scene version of this game (Burlington waterfront). It is the reference implementation for the engine mechanics, the art style, the difficulty philosophy, and the UI chrome. Level 1 of this project is a port of that scene.

---

## What this is

**Lost & Found on the Road** is a companion game to *Jathan Forever*, the travel-journal website for the YA novel *Ethan's Edge* by Gary Stream. On that site, Ethan Highfield and Jacob Monroe document a summer road trip from Burlington, Vermont to Big Sur, California — ten stops, ten diary entries, told in alternating voices.

This game retraces the trip. Each stop is a hand-illustrated hidden objects scene. The premise: Ethan and Jacob are chronically losing things at every stop, and the player is sweeping each location before the boys drive on. Ten levels, unlocked in route order.

Deployment target: **jathanforever.com/game/**. The Jathan Forever site is a Next.js 14 project deployed via **GitHub → Vercel** (not Hostinger — that's garystream.com). The game ships inside the same repo but stays a self-contained Vite app; the two codebases share a repo, not code:

- Game source lives in a **`game/` folder at the repo root** (its own `package.json`, own dependencies — do not import from or into the Next.js app).
- The game's Vite build outputs into the Next.js **`public/game/`** directory (`outDir: '../public/game'`, `emptyOutDir: true`, `base: '/game/'`). Anything in `public/` is served as-is by Vercel, so the built game is automatically live at `jathanforever.com/game/` with zero routing config.
- Wire the site's build so the game builds first: a root-level `prebuild` step (or Vercel build command) that runs `cd game && npm ci && npm run build` before `next build`. Commit → push → Vercel deploys both. Alternatively, committing the built `public/game/` output directly is acceptable as a simpler fallback — pick one approach and document it, don't do both.
- Use **hash routing** inside the game so no Vercel rewrites are ever needed.
- Add a **"Play the Game" nav link** in the main site's header if the site code is in the workspace; otherwise put it on the final checklist.

## The route (level order)

1. **Burlington, VT** — the waterfront at golden hour *(port from `waterfront-sweep.html`)*
2. **Niagara Falls, ON** — falls overlook: mist, rainbow, poncho-clad tourists
3. **Detroit, MI** — Motown flavor: brick theater block, record shop window, evening neon
4. **Chicago, IL** — riverwalk at dusk: skyline, bridge, deep-dish pizzeria storefront
5. **St. Paul, MN** — Mississippi riverfront: paddleboat, summer-fair energy
6. **Badlands NP, SD** — dawn: striped buttes, prairie grass, big pink-orange sky
7. **Rocky Mountain NP, CO** — night: campsite under a huge starfield
8. **Zion NP, UT** — midday: red rock canyon trail, cottonwoods, river
9. **Las Vegas, NV** — Fourth of July night: generic neon signs, fireworks (invent all signage — no real casino brands)
10. **Big Sur, CA** — end of the road: coastal cliffs, arched bridge silhouette, Pacific sunset

Do not depict real trademarked landmarks or artworks (e.g., no Cloud Gate sculpture in Chicago, no branded casino signage in Vegas). Evoke each place with generic-but-recognizable scenery.

## Tech stack

- **Vite + React 18**, static build (`vite build`), no server. All routing client-side (hash routing is fine and is safest for Hostinger subfolders).
- No heavy game libraries. Scenes are **inline SVG React components**; the engine is plain React state.
- **localStorage** for progress (unlocked levels, best time / rank / stats per level, souvenirs collected). Wrap all storage access in try/catch and degrade gracefully if unavailable.
- Google Fonts: **Bricolage Grotesque** (display) + **Instrument Sans** (body) — matches the Jathan Forever / garystream.com brand.
- Keep the bundle lean. This should load fast on a phone.

## Architecture — make scenes data-driven

Separate the **engine** from the **scenes** so adding a level never means touching game logic:

```
src/
  engine/          <- timer, hints, scoring, found-state, overlay FX, win logic
  components/      <- HUD, manifest panel, win card, level select, layout
  scenes/
    burlington.jsx     <- SVG art + object registry
    niagara.jsx
    ...one per stop
  data/
    stops.js       <- route metadata: slug, title, narrator, intro line, palette,
                      diary-entry URL on the Jathan Forever site, object list
```

Each scene exports: (a) the SVG artwork component, and (b) an **object registry**: `{ id, name, icon, x, y, hitShape }` for every hidden object. The engine renders an invisible hit layer from the registry.

### Engine requirements (learned the hard way — do not skip)

1. **Invisible top-layer hit zones.** Every hidden object gets a generous transparent hit shape (`circle`, `rect`, or `line` with wide stroke) rendered **above all artwork**, `pointer-events: all`. Artwork never receives clicks. This exists because v1 had a bug where a screen bezel drawn over a keycard swallowed its clicks. Occlusion must be purely visual, always.
2. **Shuffle pool.** Each scene defines **18–20 hidden objects**; each run randomly selects **14**. Unselected objects are not rendered (art + hit zone both excluded). This is the replayability engine.
3. **Scoring:** count-up timer, **+5s misclick penalty** with floating "+5s" feedback, **4 hints** per run (pulse ring on a random unfound object), rank on completion by final time. Rank thresholds per level live in `stops.js`.
4. **Found feedback:** double ring (white + amber) at the object's anchor point, manifest strike-through, rotating quip lines. Port the feel from the reference file.
5. **Accessibility:** hit shapes are keyboard-focusable (`tabindex`, Enter/Space), scene has an `aria-label`, `prefers-reduced-motion` respected, hit targets ≥ 28px effective size on mobile.
6. **Responsive:** scene scales full-width; manifest panel wraps below on narrow screens. Test at 375px width.

## Game structure

- **Title screen → Route map (level select).** The map is the centerpiece: a stylized North America route echoing the Jathan Forever site's journal map — ten markers connected by a brown route line, west-bound. Completed stops get a filled marker + best rank; the next stop pulses; locked stops are dimmed. Clicking an unlocked stop opens its level.
- **Progression:** finishing a stop unlocks the next. (Include a subtle dev/skip toggle behind a query param for testing.)
- **Level intro card:** before each scene, a card with the stop name, a one-or-two-line diary-voice intro (see Writing Voice), and "Start sweep."
- **Level complete:** rank, time, hints, misclicks, the souvenir earned (below), a **"Read this stop's diary entry →"** link (URLs in `stops.js`; use placeholder `FILL_IN_JATHAN_URL` constants until Gary provides them), and "Next stop →".
- **Souvenirs:** each level has one designated **souvenir object** (e.g., Niagara = the barrel keychain). Finding it earns a souvenir icon displayed on the route map — a glovebox collection. Collect all ten for a small end-of-trip screen at Big Sur.
- **The recurring paperback.** Ethan's ember-coral paperback (`#e85d43` cover — it's his own book, wink) is hidden in **every** scene and is always in the 14 selected (exempt from the shuffle). Finding all ten copies earns a distinct trip-end acknowledgment. This is the game's signature.

## Writing voice (intro cards, quips, win text)

Narration alternates between Ethan and Jacob per stop (Ethan odd stops, Jacob even). The voice, per the novel: **dialogue-forward, casual, first-person, comedy braided into emotional weight.** Short lines. Italics for interior asides. Examples of the register:

- Burlington (Ethan): "Jacob swears everything's packed. The cooler is on the porch. *Everything*, he says."
- Vegas (Jacob): "Ethan budgeted for fireworks. Ethan did not budget for Ethan near a claw machine."
- Big Sur (Ethan): "End of the road. Neither of us wants to say it like that."

Write all ten intro lines plus 6–8 found/miss quips per level in the appropriate narrator's voice. Keep it PG-13, warm, funny. Where a moment lands emotionally (Badlands dawn, Big Sur), let one quiet line through — don't joke over it.

## Visual identity

- Brand family: **twilight indigo `#1b1d3f`–`#3a3566`, ember coral `#ff7a5c`/`#e85d43`, soft lavender `#b7a8e0`, warm amber `#ffc46b`** — but each stop gets its **own time-of-day palette within the family**: Burlington golden hour, Badlands pink dawn, Rocky Mountain deep-night blues with a lavender Milky Way, Zion warm reds at midday, Vegas saturated neon night, Big Sur coral-to-indigo sunset.
- Art style: flat vector illustration with gradient skies, layered silhouette depth (2–3 background layers), soft shadow ellipses under objects, small atmosphere FX per scene (Niagara mist, Vegas fireworks, Rocky Mountain star twinkle — all cheap: opacity + simple CSS/SVG animation, disabled under reduced motion).
- Difficulty philosophy from the reference file: objects hide by **color-matching surroundings, partial occlusion, small scale, and posing as scene furniture** (the screwdriver-as-slider trick). Include 2–3 deliberate **decoys** per scene that bait misclicks. Nothing glows.
- UI chrome: dark indigo panels, coral display type, exactly as in the reference file.

## Per-stop object direction (starting points — expand each to 18–20)

Every scene: the coral paperback + a souvenir + location-flavored objects. Seeds:

- **Niagara:** rain poncho, souvenir barrel keychain *(souvenir)*, maple candy tin, lens cap, loonie coin, folded umbrella, mist-fogged glasses
- **Detroit:** vinyl 45 *(souvenir)*, guitar pick, cassette, ticket stub, harmonica, drumstick, neon letter gone dark
- **Chicago:** deep-dish slice *(souvenir)*, transit token, architecture brochure, hot dog (no ketchup — it's a rule), umbrella, pigeon among pigeons (one is Slightly Different)
- **St. Paul:** corn dog *(souvenir)*, paddlewheel toy, fishing bobber, state-fair ribbon, generic paperback on a bench (decoy vs. THE paperback — cruel, keep it)
- **Badlands:** fossil *(souvenir)*, bandana, canteen, prairie dog, trail-mix bag, park pass, hiking sock (just one)
- **Rocky Mountain:** constellation card *(souvenir)*, marshmallow stick, headlamp (off), tent stake, thermos, firefly jar, sap-stuck glove
- **Zion:** trail permit tag *(souvenir)*, hiking pole, chipmunk, sun hat, carabiner, water bottle, lizard on red rock
- **Vegas:** poker chip *(souvenir)*, dice, sparkler, showtime ticket, feather boa strand, tiny cocktail umbrella, dropped sunglasses (again — running gag with Chicago's)
- **Big Sur:** postcard *(souvenir)*, tide-pool starfish, van keychain, sea glass, driftwood heart, one hiking sock (the other one — payoff of the Badlands sock)

> **Author's rule (decided — do not revisit):** no ring box, ring, or proposal imagery anywhere in the game, including the Big Sur finale. Ethan and Jacob are too young for that, and it's not canon. The emotional ceiling of the ending is the driftwood heart, the matched hiking sock, and the trip-end screen. Keep the finale warm, quiet, and open — an "end of the road, not the story" feeling — nothing more.

## Build order (pause for review after each step)

1. Scaffold Vite + React, engine core, and port **Burlington** from `waterfront-sweep.html` into the scene/registry format (expand it to an 18–20 object pool). Prove the engine: shuffle, hits, scoring, storage.
2. Route map / level select + progression + souvenir shelf, with stops 2–10 as locked placeholders.
3. Scenes 2–4 (Niagara, Detroit, Chicago).
4. Scenes 5–7 (St. Paul, Badlands, Rocky Mountain).
5. Scenes 8–10 (Zion, Vegas, Big Sur) + trip-end screen.
6. Polish pass: mobile QA at 375px, accessibility audit, per-level difficulty tuning, `FILL_IN` checklist output, and a `DEPLOY.md` documenting the GitHub → Vercel flow: where the game source lives in the repo, how the build wiring works, how to verify `jathanforever.com/game/` after a deploy, and how to preview the game locally (`cd game && npm run dev`) without running the whole site.

At the end, print a checklist of every `FILL_IN` constant remaining (diary-entry URLs, any copy Gary should review) grouped by file.
