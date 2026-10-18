'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import useInViewSafe from './useInViewSafe';
import type { RouteStop } from '@/lib/route';

/**
 * An animated teaser of the route for the home page: the brown travel line
 * draws itself across a stylized field while stop dots pop in along it.
 * Coordinates are a simple equirectangular projection of the real lat/lng so
 * the arc matches the actual journey (CA → MN). Tapping any dot deep-links to
 * that diary entry.
 */
const W = 1000;
const H = 460;
const PAD_X = 90;
const PAD_Y = 70;
const FONT = 13;
const CHAR_W = 7.4; // rough average glyph width of the 13px sans label font

type Box = { x0: number; y0: number; x1: number; y1: number };
type Label = { x: number; y: number; anchor: 'start' | 'middle' | 'end'; text: string };
const overlaps = (a: Box, b: Box) => a.x0 < b.x1 && b.x0 < a.x1 && a.y0 < b.y1 && b.y0 < a.y1;

/** Whether the route polyline passes through a box (sampled every few px). */
function crossesLine(b: Box, pts: { x: number; y: number }[]) {
  for (let k = 1; k < pts.length; k++) {
    const a = pts[k - 1];
    const c = pts[k];
    const steps = Math.ceil(Math.hypot(c.x - a.x, c.y - a.y) / 3);
    for (let s = 0; s <= steps; s++) {
      const x = a.x + ((c.x - a.x) * s) / steps;
      const y = a.y + ((c.y - a.y) * s) / steps;
      if (x > b.x0 && x < b.x1 && y > b.y0 && y < b.y1) return true;
    }
  }
  return false;
}

/**
 * Labels alternate above/below the dots, but stops can sit close together
 * (Zion and Las Vegas), so each label takes the first spot — preferred side,
 * other side, right, left — that doesn't collide with an earlier label or a dot.
 */
function placeLabels(points: { x: number; y: number; name: string }[]): Label[] {
  const placed: Box[] = [];
  const dots: Box[] = points.map((p) => ({ x0: p.x - 9, y0: p.y - 9, x1: p.x + 9, y1: p.y + 9 }));
  return points.map((p, i) => {
    const text = p.name.split(',')[0];
    const w = text.length * CHAR_W;
    const above: Label = { x: p.x, y: p.y - 16, anchor: 'middle', text };
    const below: Label = { x: p.x, y: p.y + 28, anchor: 'middle', text };
    const right: Label = { x: p.x + 16, y: p.y + 5, anchor: 'start', text };
    const left: Label = { x: p.x - 16, y: p.y + 5, anchor: 'end', text };
    const options = i % 2 === 0 ? [above, below, right, left] : [below, above, left, right];
    const box = (l: Label): Box => {
      const x0 = l.anchor === 'middle' ? l.x - w / 2 : l.anchor === 'start' ? l.x : l.x - w;
      return { x0: x0 - 4, x1: x0 + w + 4, y0: l.y - FONT, y1: l.y + 4 };
    };
    const fits = (l: Label) => {
      const b = box(l);
      return b.x0 >= 0 && b.x1 <= W && b.y0 >= 0 && b.y1 <= H &&
        !placed.some((o) => overlaps(o, b)) && !dots.some((dot, j) => j !== i && overlaps(dot, b));
    };
    // Also keep text off the route line when there's a spot that allows it.
    const clearOfLine = (l: Label) => !crossesLine(box(l), points);
    const pick = options.find((l) => fits(l) && clearOfLine(l)) ?? options.find(fits) ?? options[0];
    placed.push(box(pick));
    return pick;
  });
}

export default function RouteTeaser({ stops }: { stops: RouteStop[] }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInViewSafe(ref, 0.4);

  const lats = stops.map((s) => s.lat);
  const lngs = stops.map((s) => s.lng);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);

  const project = (lat: number, lng: number) => {
    const x = PAD_X + ((lng - minLng) / (maxLng - minLng || 1)) * (W - PAD_X * 2);
    const y = PAD_Y + ((maxLat - lat) / (maxLat - minLat || 1)) * (H - PAD_Y * 2);
    return { x, y };
  };

  const points = stops.map((s) => ({ ...s, ...project(s.lat, s.lng) }));
  const labels = placeLabels(points);
  const d =points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');

  return (
    <div className="relative" ref={ref}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full"
        role="img"
        aria-label={`Route map from ${stops[0]?.name} to ${stops[stops.length - 1]?.name}`}
      >
        {/* faint baseline grid for an analog, map-like feel */}
        {[0.25, 0.5, 0.75].map((f) => (
          <line
            key={f}
            x1={0}
            x2={W}
            y1={H * f}
            y2={H * f}
            stroke="var(--ink)"
            strokeOpacity="0.05"
            strokeDasharray="2 8"
          />
        ))}

        {/* the route line drawing itself */}
        <motion.path
          d={d}
          fill="none"
          stroke="var(--clay)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reduce ? false : { pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : undefined}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* stop markers */}
        {points.map((p, i) => (
          <motion.g
            key={p.slug}
            initial={reduce ? false : { opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : undefined}
            transition={{ delay: reduce ? 0 : 0.3 + i * 0.28, type: 'spring', stiffness: 300, damping: 18 }}
            style={{ transformOrigin: `${p.x}px ${p.y}px` }}
          >
            <Link href={`/journal/${p.slug}`} aria-label={`${p.name} — read entry`}>
              <circle cx={p.x} cy={p.y} r="14" fill="transparent" className="cursor-pointer" />
              <circle cx={p.x} cy={p.y} r="6" fill="var(--bone)" stroke="var(--ink)" strokeWidth="2.5" className="pointer-events-none" />
              <text
                x={labels[i].x}
                y={labels[i].y}
                textAnchor={labels[i].anchor}
                className="pointer-events-none fill-ink font-sans text-[13px]"
              >
                {labels[i].text}
              </text>
            </Link>
          </motion.g>
        ))}
      </svg>

      <div className="mt-6 text-center">
        <Link
          href="/journey"
          className="group inline-flex items-center gap-2 font-sans text-sm font-medium text-coffee"
        >
          Open the interactive map
          <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
            →
          </span>
        </Link>
      </div>
    </div>
  );
}
