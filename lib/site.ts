/**
 * Site-wide constants. Editing these updates nav, footer, metadata and SEO.
 */
export const site = {
  name: 'Jathan Forever',
  // Primary tagline — sourced from content/homepage.md (kept here too for SEO/metadata).
  tagline: 'Two boys, one car, and the whole country in between.',
  description:
    "Ethan Highfield and Jacob Monroe's shared travel journal — the summer after Ethan's Edge, driving from Vermont to the California coast. Dated diary entries in two voices, an interactive route map, and photographs from the road.",
  // Used for absolute URLs (OG images, sitemap) — server-side only.
  // Priority: explicit NEXT_PUBLIC_SITE_URL, then Vercel's production domain
  // (set automatically on every deploy, follows custom domains), then fallback.
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : 'https://jathanforever.com'),
  author: 'Gary Stream',
  bookTitle: "Ethan's Edge",
  bookLink: 'https://www.goodreads.com/gary-stream',
  social: [
    { label: 'Instagram', href: 'https://www.instagram.com/foreverjathan/' },
    { label: 'TikTok', href: 'https://www.tiktok.com/@jathanforever' },
    { label: 'Goodreads', href: 'https://www.goodreads.com/gary-stream' },
  ],
} as const;

export const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/journey', label: 'Journey' },
  { href: '/journal', label: 'Journal' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/about', label: 'About' },
  // Static Vite app served from public/game — needs a hard link, not a
  // Next.js client navigation (there is no matching app route).
  { href: '/game/', label: 'Game', hardLink: true },
] as const;
