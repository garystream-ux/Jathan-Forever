import 'server-only';
import { getAllEntries, type Author } from './journal';

/**
 * Derives the ordered route + map markers from the journal entries.
 * This is plain, serializable data so a server component can compute it once
 * and hand it to the client-side <RouteMap> (which can't import server-only).
 */
export interface RouteStop {
  slug: string;
  order: number;
  title: string;
  date: string;
  author: Author;
  name: string; // location name e.g. "Big Sur, CA"
  state: string;
  lat: number;
  lng: number;
  excerpt: string;
  coverImage: string;
}

export function getRoute(): RouteStop[] {
  return getAllEntries().map((e) => ({
    slug: e.slug,
    order: e.order,
    title: e.title,
    date: e.date,
    author: e.author,
    name: e.location.name,
    state: e.location.state,
    lat: e.location.lat,
    lng: e.location.lng,
    excerpt: e.excerpt,
    coverImage: e.coverImage,
  }));
}

/** Ordered [lat, lng] pairs for drawing the route polyline. */
export function getRoutePath(): [number, number][] {
  return getRoute().map((s) => [s.lat, s.lng]);
}
