import { useEffect, useRef } from 'react';
import { fmtTime } from '../engine/useSweep.js';

export default function WinCard({ stop, nextStop, tripComplete, game, rank, onAgain }) {
  const souvenir = stop.souvenir;
  const cardRef = useRef(null);

  // Move focus to the win card when it appears so keyboard and screen-reader
  // users are told the sweep is complete instead of being stranded in the scene.
  useEffect(() => {
    cardRef.current?.focus();
  }, []);

  return (
    <div className="win show">
      <div
        className="win-card"
        ref={cardRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="win-rank"
        tabIndex={-1}
      >
        <div className="rank-label">Sweep complete · {stop.rankNoun}</div>
        <div className="rank" id="win-rank">{rank}</div>
        <div className="stats">
          Time: <b>{fmtTime(game.seconds)}</b> &nbsp;·&nbsp; Spots used:{' '}
          <b>
            {game.totalHints - game.hintsLeft}/{game.totalHints}
          </b>{' '}
          &nbsp;·&nbsp; Misclicks: <b>{game.misclicks}</b>
        </div>
        <div className="souvenir-earned">
          <span className="ico">{souvenir.icon}</span> Souvenir for the glovebox:{' '}
          <b>{souvenir.name}</b>
        </div>
        {stop.diaryUrl ? (
          <a className="diary-link" href={stop.diaryUrl}>
            Read this stop's diary entry →
          </a>
        ) : (
          <span className="diary-link dim">Diary entry link coming soon</span>
        )}
        <div className="win-actions">
          <button className="btn-hint" onClick={onAgain}>
            RUN IT BACK
          </button>
          {tripComplete ? (
            <a className="btn-reset btn-link" href="#/finale">
              END OF THE ROAD →
            </a>
          ) : nextStop && nextStop.scene ? (
            <a className="btn-reset btn-link" href={`#/stop/${nextStop.slug}`}>
              NEXT STOP →
            </a>
          ) : (
            <a className="btn-reset btn-link" href="#/map">
              ROUTE MAP →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
