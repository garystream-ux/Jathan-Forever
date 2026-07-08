'use client';

import dynamic from 'next/dynamic';
import type { RouteStop } from '@/lib/route';

/**
 * Client boundary that loads the Leaflet map with SSR disabled (Leaflet needs
 * `window`). Shows a calm skeleton while the map chunk loads.
 */
const RouteMap = dynamic(() => import('./RouteMap'), {
  ssr: false,
  loading: () => (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="h-[60vh] min-h-[420px] animate-pulse rounded-xl border border-clay/20 bg-ink/5" />
      <div className="hidden flex-col gap-2 lg:flex">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-16 animate-pulse rounded-lg bg-ink/5" />
        ))}
      </div>
    </div>
  ),
});

export default function MapSection({ stops }: { stops: RouteStop[] }) {
  return <RouteMap stops={stops} />;
}
