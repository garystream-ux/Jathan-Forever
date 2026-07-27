import { useEffect, useState } from 'react';
import { getStop, stopIndex, tripComplete } from './data/stops.js';
import { loadProgress } from './engine/storage.js';
import LevelScreen from './components/LevelScreen.jsx';
import RouteMapScreen from './components/RouteMapScreen.jsx';
import TitleScreen from './components/TitleScreen.jsx';
import FinaleScreen from './components/FinaleScreen.jsx';

// Hash routing only — no server rewrites needed anywhere the game is hosted.
// #/            title screen
// #/map         route map (level select)
// #/stop/:slug  a stop's sweep
// #/finale      trip-end screen (only once every stop is swept)
function useHashRoute() {
  const [hash, setHash] = useState(() => window.location.hash || '#/');
  useEffect(() => {
    const onHash = () => setHash(window.location.hash || '#/');
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  return hash;
}

export default function App() {
  const hash = useHashRoute();
  const [progress, setProgress] = useState(loadProgress);

  const m = hash.match(/^#\/stop\/([a-z]+)/);
  if (m) {
    const stop = getStop(m[1]);
    const idx = stop ? stopIndex(stop.slug) : -1;
    // Dev/skip toggle for testing: append ?dev to the URL to open any stop.
    const dev = window.location.search.includes('dev');
    if (stop && stop.scene && (dev || idx < progress.unlocked)) {
      return (
        <LevelScreen
          key={stop.slug}
          stop={stop}
          index={idx}
          progress={progress}
          setProgress={setProgress}
        />
      );
    }
    // Unknown, locked, or not-yet-built stop: fall back to the map.
    return <RouteMapScreen progress={progress} />;
  }
  if (hash.startsWith('#/finale')) {
    // Only reachable once the trip is complete (or in dev, for previewing).
    const dev = window.location.search.includes('dev');
    if (tripComplete(progress) || dev) {
      return <FinaleScreen progress={progress} />;
    }
    return <RouteMapScreen progress={progress} />;
  }
  if (hash.startsWith('#/map')) {
    return <RouteMapScreen progress={progress} />;
  }
  return <TitleScreen progress={progress} />;
}
