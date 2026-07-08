'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
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

export default function RouteTeaser({ stops }: { stops: RouteStop[] }) {
  const reduce = useReducedMotion();

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
  const d = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');

  return (
    <div className="relative">
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
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* stop markers */}
        {points.map((p, i) => (
          <motion.g
            key={p.slug}
            initial={reduce ? false : { opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: reduce ? 0 : 0.3 + i * 0.28, type: 'spring', stiffness: 300, damping: 18 }}
            style={{ transformOrigin: `${p.x}px ${p.y}px` }}
          >
            <Link href={`/journal/${p.slug}`} aria-label={`${p.name} — read entry`}>
              <circle cx={p.x} cy={p.y} r="14" fill="transparent" className="cursor-pointer" />
              <circle cx={p.x} cy={p.y} r="6" fill="var(--bone)" stroke="var(--ink)" strokeWidth="2.5" className="pointer-events-none" />
              <text
                x={p.x}
                y={i % 2 === 0 ? p.y - 16 : p.y + 28}
                textAnchor="middle"
                className="pointer-events-none fill-ink font-sans text-[13px]"
              >
                {p.name.split(',')[0]}
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
