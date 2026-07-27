import { useEffect, useRef, useState } from 'react';
import { useSweep, rankFor } from '../engine/useSweep.js';
import { recordResult } from '../engine/storage.js';
import { STOPS } from '../data/stops.js';
import SceneStage from './SceneStage.jsx';
import Hud from './Hud.jsx';
import Manifest from './Manifest.jsx';
import IntroCard from './IntroCard.jsx';
import WinCard from './WinCard.jsx';

export default function LevelScreen({ stop, index, progress, setProgress }) {
  const scene = stop.scene;
  const game = useSweep(scene, stop);
  const [started, setStarted] = useState(false);
  const recordedRef = useRef(false);

  const rank = game.done ? rankFor(stop.ranks, game.seconds) : null;

  useEffect(() => {
    if (game.done && !recordedRef.current) {
      recordedRef.current = true;
      setProgress((p) => recordResult(p, index, stop.slug, { time: game.seconds, rank }));
    }
  }, [game.done, game.seconds, rank, index, stop.slug, setProgress]);

  const runItBack = () => {
    recordedRef.current = false;
    game.reset();
  };

  // The trip is complete if every OTHER stop is already swept and this one
  // just finished — computed immediately so the win card can offer the finale
  // without waiting for the progress write to land.
  const tripComplete =
    game.done && STOPS.every((s) => s.slug === stop.slug || progress.levels[s.slug]);

  return (
    <div className="wrap">
      <header>
        <div className="title-block">
          <h1>{stop.title.toUpperCase()}</h1>
          <div className="sub">
            <a className="back-link" href="#/map">◀ Route</a>
            {' · '}
            {stop.subtitle} · {game.selected.length} items lost along the way
          </div>
        </div>
        <Hud game={game} />
      </header>

      <div className="game">
        <div className="scene">
          <SceneStage scene={scene} game={game} />
          {game.done && (
            <WinCard
              stop={stop}
              nextStop={STOPS[index + 1] || null}
              tripComplete={tripComplete}
              game={game}
              rank={rank}
              onAgain={runItBack}
            />
          )}
        </div>
        <Manifest stop={stop} game={game} />
      </div>

      {!started && <IntroCard stop={stop} index={index} onStart={() => setStarted(true)} />}
    </div>
  );
}
