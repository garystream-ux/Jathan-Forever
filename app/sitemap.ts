import type { MetadataRoute } from 'next';
import { getAllEntries } from '@/lib/journal';
import { site } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const staticRoutes = ['', '/journey', '/journal', '/gallery', '/about'].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1 : 0.8,
  }));

  const entryRoutes = getAllEntries().map((e) => ({
    url: `${base}/journal/${e.slug}`,
    lastModified: new Date(e.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...entryRoutes];
}
