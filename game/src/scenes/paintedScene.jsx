/*
 * Factory for baked painted scenes (the raster art pivot).
 *
 * Every painted stop is: one compressed WebP background under
 * public/scenes/<slug>.webp + a fixed object registry whose coordinates live
 * in the image's own 1600x900 space. Objects are baked into the art, so every
 * one is `always: true` (the run is the full fixed set — no shuffle; that
 * would require composited sprites). The engine is otherwise untouched: it
 * renders `Art` (just the <image>), then the invisible hit layer from the
 * registry, then FX.
 *
 * Placement of each hit circle was verified offline by compositing the circles
 * back onto the art before wiring them up.
 */
export function makePaintedScene({ slug, ariaLabel, objects }) {
  const BG = `${import.meta.env.BASE_URL}scenes/${slug}.webp`;

  function Art() {
    return (
      <image href={BG} x="0" y="0" width="1600" height="900" preserveAspectRatio="xMidYMid slice" />
    );
  }

  const registry = objects.map((o) => ({
    id: o.id,
    name: o.name,
    icon: o.icon,
    x: o.x,
    y: o.y,
    // Wide/elongated objects (benches, boats, awnings) pass w/h for a rect hit
    // zone centered on x,y so the whole object is clickable; compact objects
    // pass r for a circle. Every listed object is one-of-a-kind in its scene.
    hit:
      o.w != null
        ? { type: 'rect', x: o.x - o.w / 2, y: o.y - o.h / 2, w: o.w, h: o.h }
        : { type: 'circle', r: o.r },
    always: true,
    souvenir: o.souvenir || false,
  }));

  return { slug, viewBox: '0 0 1600 900', ariaLabel, Art, registry };
}
