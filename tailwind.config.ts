import type { Config } from 'tailwindcss';

/**
 * Design tokens for Jathan Forever.
 *
 * Palette: warm, editorial, sunlit-and-analog — blue / brown / white.
 * The bone-white canvas dominates; deep blue carries text + structure;
 * brown + tan are the warm accents (rules, captions, hover, the route line).
 *
 * Colors are exposed both as Tailwind tokens AND as CSS variables in
 * styles/globals.css so non-Tailwind contexts (Leaflet, Giscus theme,
 * inline SVG) can reference the exact same values.
 */
const config: Config = {
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{md,mdx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#14304A', // deep blue — primary / text / structure (also Jacob's voice)
        atlantic: '#3E6E9C', // interactive accent blue
        coffee: '#5C3D2E', // coffee brown — secondary
        clay: '#B07A4F', // warm tan / clay — tertiary accent (also Ethan's voice)
        bone: '#FAF5EE', // bone white — dominant background
        paper: '#FFFFFF', // pure white — cards / contrast
        // semantic aliases for the two voices
        jacob: '#14304A',
        ethan: '#B07A4F',
      },
      fontFamily: {
        // Provided by next/font in app/layout.tsx via CSS variables.
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        prose: '68ch',
        shell: '80rem',
      },
      letterSpacing: {
        tightish: '-0.02em',
      },
      boxShadow: {
        soft: '0 18px 40px -24px rgba(20, 48, 74, 0.35)',
        lift: '0 28px 60px -28px rgba(20, 48, 74, 0.45)',
      },
      transitionTimingFunction: {
        // a physical, slightly-overshooting ease used across reveals
        physical: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'draw-line': {
          from: { strokeDashoffset: '1' },
          to: { strokeDashoffset: '0' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
  plugins: [],
};

export default config;
