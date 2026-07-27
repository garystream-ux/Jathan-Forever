import { STOPS } from '../data/stops.js';
import { fmtTime } from '../engine/useSweep.js';
import Voice from './Voice.jsx';

const BG = `${import.meta.env.BASE_URL}scenes/bigsur.webp`;

// Trip-end finale, shown once every stop is swept: the full glovebox, all ten
// coral paperbacks, and a quiet close in Ethan's voice. Warm and open on
// purpose — end of the road, not the end of the story (no proposal, per the
// author's rule).
export default function FinaleScreen({ progress }) {
  const totalTime = STOPS.reduce(
    (sum, s) => sum + (progress.levels[s.slug] ? progress.levels[s.slug].bestTime : 0),
    0
  );
  const souvenirs = progress.souvenirs.length;
  const paperbacks = progress.paperbacks.length;

  return (
    <div className="finale" style={{ backgroundImage: `url(${BG})` }}>
      <div className="finale-veil" />
      <div className="finale-inner">
        <div className="eyebrow">End of the road · Big Sur</div>
        <h1 className="finale-title">The glovebox is full.</h1>

        <div className="finale-lines">
          <p>
            <Voice text="Ten stops. Ten things we lost and found again — one from every town between the lake and here. *Proof we were somewhere.*" />
          </p>
          <p>
            <Voice text="And ten coral paperbacks — Ethan's own book, one tucked into every stop. He keeps leaving them for whoever pulls in next. *I've stopped asking.*" />
          </p>
        </div>

        <div className="finale-shelf">
          {STOPS.map((s) => {
            const got = progress.souvenirs.includes(s.slug);
            return (
              <div
                key={s.slug}
                className={got ? 'slot got' : 'slot'}
                title={got ? `${s.short}: ${s.souvenir.name}` : `${s.short} — not yet`}
              >
                <span className="slot-ico">{got ? s.souvenir.icon : '?'}</span>
                <span className="slot-name">{got ? s.souvenir.name : s.short}</span>
              </div>
            );
          })}
        </div>

        <div className="finale-pb">
          <span className="pb-row" aria-hidden="true">
            {STOPS.map((s) => (
              <span key={s.slug} className={progress.paperbacks.includes(s.slug) ? 'pb got' : 'pb'}>
                📕
              </span>
            ))}
          </span>
          <span className="pb-label">
            Souvenirs {souvenirs}/10 &nbsp;·&nbsp; Coral paperbacks {paperbacks}/10
          </span>
        </div>

        {totalTime > 0 && (
          <p className="finale-stats">
            The whole trip, swept in <b>{fmtTime(totalTime)}</b>.
          </p>
        )}

        <p className="finale-close">
          <Voice text="End of the road. Neither of us wants to say it like that — so we won't. *Not the end of the story.*" />
        </p>
        <div className="finale-signoff">— Ethan &amp; Jacob</div>

        <div className="finale-actions">
          <a className="btn-reset btn-link" href="#/map">
            ← Back to the map
          </a>
          <a className="btn-hint btn-link" href="#/">
            Title screen
          </a>
        </div>

        <p className="finale-credit">
          A companion game to <em>Jathan Forever</em> — the travel journal of{' '}
          <em>Ethan&apos;s Edge</em> by Gary Stream.
        </p>
      </div>
    </div>
  );
}
