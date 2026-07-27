import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Builds straight into the Next.js public/ folder so Vercel serves the game
// as static files at jathanforever.com/game/ with zero routing config.
export default defineConfig({
  plugins: [react()],
  base: '/game/',
  build: {
    outDir: '../public/game',
    emptyOutDir: true,
  },
});
