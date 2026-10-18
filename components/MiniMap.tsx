'use client';

import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MAP_TILES } from '@/lib/mapTiles';

/**
 * A small, calm single-stop map for the bottom of a diary entry.
 * Interaction is dialed down (no zoom controls / scroll) so it reads as a
 * "you were here" inset rather than a full map. See RouteMap for the Mapbox
 * SWAP POINT — the same approach applies here.
 */
function pin(color: string) {
  return L.divIcon({
    className: 'jf-marker',
    html: `<span class="jf-pin" style="--pin:${color}">●</span>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });
}

export default function MiniMap({
  lat,
  lng,
  color,
  label,
}: {
  lat: number;
  lng: number;
  color: string;
  label: string;
}) {
  return (
    <MapContainer
      center={[lat, lng]}
      zoom={6}
      scrollWheelZoom={false}
      dragging={false}
      doubleClickZoom={false}
      zoomControl={false}
      attributionControl
      className="h-full w-full"
      style={{ background: '#e9e2d6' }}
    >
      {/* Both tile providers require visible attribution, so it stays on even here. */}
      <TileLayer attribution={MAP_TILES.attribution} url={MAP_TILES.url} />
      <Marker position={[lat, lng]} icon={pin(color)} title={label} />
    </MapContainer>
  );
}
