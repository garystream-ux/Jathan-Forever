import { fmtTime } from '../engine/useSweep.js';

export default function Hud({ game }) {
  return (
    <div className="hud">
      <span className="pill" aria-label={`Time elapsed ${fmtTime(game.seconds)}`}>
        ⏱ <b>{fmtTime(game.seconds)}</b>
      </span>
      <span
        className="pill"
        role="status"
        aria-live="polite"
        aria-label={`Found ${game.found.size} of ${game.selected.length}`}
      >
        FOUND <b>{game.found.size}/{game.selected.length}</b>
      </span>
      <button
        className="btn-hint"
        onClick={game.useHint}
        disabled={game.hintsLeft <= 0 || game.done}
        aria-label={`Spot a hidden object — ${game.hintsLeft} left`}
      >
        SPOT ×{game.hintsLeft}
      </button>
      <button className="btn-reset" onClick={game.reset} aria-label="Reset this sweep">
        RESET
      </button>
    </div>
  );
}
