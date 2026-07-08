'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { RouteStop } from '@/lib/route';
import { authorMeta } from '@/lib/authors';
import { blurForImage } from '@/lib/images';

/*
  ──────────────────────────────────────────────────────────────────────────
  SWAP POINT — Mapbox GL
  This map uses free OpenStreetMap raster tiles (no API key). To swap in a
  more stylized Mapbox map later:
    1. npm i react-map-gl mapbox-gl
    2. Replace <MapContainer>/<TileLayer> with react-map-gl's <Map> using a
       Mapbox style URL + NEXT_PUBLIC_MAPBOX_TOKEN.
    3. Re-create markers with <Marker> and the route with a GeoJSON <Source>/
       <Layer> line. The data (props.stops) stays identical, so only this file
       changes — the journey page and content layer are untouched.
  Alternatively keep Leaflet and point TileLayer at a Mapbox raster style:
    url={`https://api.mapbox.com/styles/v1/<user>/<style>/tiles/{z}/{x}/{y}?access_token=${TOKEN}`}
  ──────────────────────────────────────────────────────────────────────────
*/

const CLAY = '#B07A4F';
const INK = '#14304A';

/** Numbered, palette-styled marker with a little bounce-in. */
function makeIcon(order: number, color: string, active: boolean) {
  return L.divIcon({
    className: 'jf-marker',
    html: `<span class="jf-pin ${active ? 'jf-pin--active' : ''}" style="--pin:${color}">${order}</span>`,
    iconSize: [34, 34],
    iconAnchor: [17, 17],
    popupAnchor: [0, -18],
  });
}

/** Imperatively flies the map to a stop when selected from the list. */
function FlyTo({ stop }: { stop: RouteStop | null }) {
  const map = useMap();
  useEffect(() => {
    if (stop) map.flyTo([stop.lat, stop.lng], 6, { duration: 1.1 });
  }, [stop, map]);
  return null;
}

/** Frames the whole route on mount, regardless of how many stops there are. */
function FitBounds({ path }: { path: [number, number][] }) {
  const map = useMap();
  useEffect(() => {
    if (path.length > 1) {
      map.fitBounds(path, { padding: [48, 48] });
    }
  }, [path, map]);
  return null;
}

export default function RouteMap({ stops }: { stops: RouteStop[] }) {
  const [selected, setSelected] = useState<RouteStop | null>(null);

  const path = useMemo<[number, number][]>(
    () => stops.map((s) => [s.lat, s.lng]),
    [stops],
  );

  // Icons are stable objects; building both states up front means a selection
  // change only swaps the icon on the two affected markers instead of
  // recreating every marker's DOM on each click.
  const icons = useMemo(() => {
    const m = new Map<string, { base: L.DivIcon; active: L.DivIcon }>();
    for (const s of stops) {
      const color = authorMeta[s.author].color;
      m.set(s.slug, {
        base: makeIcon(s.order, color, false),
        active: makeIcon(s.order, color, true),
      });
    }
    return m;
  }, [stops]);

  // Center / fit roughly on the route.
  const center = useMemo<[number, number]>(() => {
    const lat = stops.reduce((a, s) => a + s.lat, 0) / stops.length;
    const lng = stops.reduce((a, s) => a + s.lng, 0) / stops.length;
    return [lat, lng];
  }, [stops]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="relative h-[60vh] min-h-[420px] overflow-hidden rounded-xl border border-clay/20 shadow-soft">
        <MapContainer
          center={center}
          zoom={4}
          scrollWheelZoom={false}
          className="h-full w-full"
          style={{ background: '#e9e2d6' }}
        >
          <TileLayer
            // Carto "Voyager" — warm, light, editorial. No key required.
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />

          <Polyline
            positions={path}
            pathOptions={{ color: CLAY, weight: 3, opacity: 0.9, dashArray: '1 8', lineCap: 'round' }}
          />

          {stops.map((s) => (
            <Marker
              key={s.slug}
              position={[s.lat, s.lng]}
              icon={selected?.slug === s.slug ? icons.get(s.slug)!.active : icons.get(s.slug)!.base}
              eventHandlers={{ click: () => setSelected(s) }}
            >
              <Popup>
                <div className="w-52">
                  <div className="relative mb-2 h-24 w-full overflow-hidden rounded">
                    <Image
                      src={s.coverImage}
                      alt={`${s.name} — cover`}
                      fill
                      sizes="208px"
                      placeholder="blur"
                      blurDataURL={blurForImage(s.coverImage)}
                      className="object-cover"
                    />
                  </div>
                  <p className="text-[11px] font-medium uppercase tracking-wide" style={{ color: authorMeta[s.author].color }}>
                    Stop {s.order} · {authorMeta[s.author].first}
                  </p>
                  <p className="font-display text-base leading-tight text-ink">{s.title}</p>
                  <p className="mt-0.5 text-xs text-ink/60">{s.name}</p>
                  <p className="mt-1 text-xs italic leading-snug text-ink/70">{s.excerpt}</p>
                  <Link href={`/journal/${s.slug}`} className="mt-2 inline-block text-xs font-semibold text-atlantic">
                    Read entry →
                  </Link>
                </div>
              </Popup>
            </Marker>
          ))}

          <FitBounds path={path} />
          <FlyTo stop={selected} />
        </MapContainer>
      </div>

      {/* Stop list — syncs with the map, comfortable for touch */}
      <ol className="flex max-h-[60vh] flex-col gap-2 overflow-y-auto pr-1">
        {stops.map((s) => {
          const active = selected?.slug === s.slug;
          return (
            <li key={s.slug}>
              <button
                type="button"
                onClick={() => setSelected(s)}
                aria-pressed={active}
                className={`flex w-full items-center gap-3 rounded-lg border px-3 py-3 text-left transition-colors ${
                  active
                    ? 'border-clay/50 bg-clay/10'
                    : 'border-clay/15 bg-paper hover:border-clay/40'
                }`}
              >
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-bone"
                  style={{ backgroundColor: authorMeta[s.author].color }}
                >
                  {s.order}
                </span>
                <span className="min-w-0">
                  <span className="block truncate font-display text-base leading-tight text-ink">
                    {s.title}
                  </span>
                  <span className="block truncate text-xs text-ink/55">{s.name}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
