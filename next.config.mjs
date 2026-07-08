/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // MDX is rendered at runtime via next-mdx-remote, so we don't need the
  // @next/mdx webpack loader here. Keep page extensions to the defaults.
  images: {
    formats: ['image/avif', 'image/webp'],
    // Stop/character photos are served from /public. If you later host images
    // on a CDN (e.g. Mapbox static, Cloudinary), add the host here.
    remotePatterns: [],
  },
};

export default nextConfig;
