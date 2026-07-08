/**
 * Site-wide constants. Editing these updates nav, footer, metadata and SEO.
 */
export const site = {
  name: 'Jathan Forever',
  // Primary tagline — sourced from content/homepage.md (kept here too for SEO/metadata).
  tagline: 'Two boys, one car, and the whole country in between.',
  description:
    "Ethan Highfield and Jacob Monroe's shared travel journal — the summer after Ethan's Edge, driving from Vermont to the California coast. Dated diary entries in two voices, an interactive route map, and photographs from the road.",
  // Used for absolute URLs (OG images, sitemap). Override via NEXT_PUBLIC_SITE_URL.
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://jathanforever.com',
  author: 'Gary Stream',
  bookTitle: "Ethan's Edge",
  bookLink: '[PURCHASE / GOODREADS LINK]',
  social: [
    { label: 'Instagram', href: 'https://www.instagram.com/garystream' },
    { label: 'TikTok', href: '#' },
    { label: 'Goodreads', href: '#' },
  ],
} as const;

export const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/journey', label: 'Journey' },
  { href: '/journal', label: 'Journal' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/about', label: 'About' },
] as const;
