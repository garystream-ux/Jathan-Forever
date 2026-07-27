import { useEffect, useRef, useState } from 'react';
import { STOPS, tripComplete } from '../data/stops.js';
import { fmtTime } from '../engine/useSweep.js';

// The level select: a stylized North America with the ten stops strung
// west-bound on a brown route line. Completed stops fill in with best rank,
// the next stop pulses, locked stops dim. Below the map: the glovebox
// (souvenir shelf) and the coral-paperback count.
export default function RouteMapScreen({ progress }) {
  const [stub, setStub] = useState(null);
  const dev = window.location.search.includes('dev');

  const states = STOPS.map((stop, i) => ({
    stop,
    i,
    completed: !!progress.levels[stop.slug],
    unlocked: dev || i < progress.unlocked,
  }));

  // How far the route has actually been driven: the consecutive completed
  // prefix (finishing a stop means driving on to the next one).
  let prefix = 0;
  while (prefix < STOPS.length && progress.levels[STOPS[prefix].slug]) prefix++;
  const next = states.find((s) => s.unlocked && !s.completed);
  const nextIdx = next ? next.i : -1;

  const openStop = (st) => {
    if (!st.unlocked) return;
    if (!st.stop.scene) {
      setStub(st.stop);
      return;
    }
    window.location.hash = `#/stop/${st.stop.slug}`;
  };

  const pts = STOPS.map((s) => s.map);
  const traveled = prefix > 0 ? pts.slice(0, Math.min(prefix + 1, pts.length)) : [];

  // On phones the map keeps a minimum width and scrolls horizontally;
  // start scrolled so the next stop is in view (the trip reads east → west).
  const scrollRef = useRef(null);
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || el.scrollWidth <= el.clientWidth) return;
    const focusX = nextIdx >= 0 ? pts[nextIdx].x : pts[9].x;
    el.scrollLeft = (focusX / 1000) * el.scrollWidth - el.clientWidth / 2;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="wrap">
      <header>
        <div className="title-block">
          <h1>THE ROUTE</h1>
          <div className="sub">
            <a className="back-link" href="#/">◀ Title</a>
            {' · '}Burlington → Big Sur · one summer, ten stops
            {dev && ' · dev mode: all stops open'}
          </div>
        </div>
        <div className="hud">
          <span className="pill">
            SWEPT <b>{prefix}/10</b>
          </span>
          <span className="pill">
            SOUVENIRS <b>{progress.souvenirs.length}/10</b>
          </span>
        </div>
      </header>

      <div className="map-panel">
        <div className="map-scroll" ref={scrollRef}>
        <svg
          viewBox="0 0 1000 470"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Route map of North America showing ten stops from Burlington, Vermont to Big Sur, California. Unlocked stops can be opened."
        >
          <defs>
            <linearGradient id="rm-land" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#262752" />
              <stop offset="1" stopColor="#1f2044" />
            </linearGradient>
          </defs>

          {/* landmass */}
          <path
            d="M 75 300
               C 60 260, 70 220, 100 195
               C 160 165, 260 150, 370 140
               C 490 128, 610 120, 700 122
               C 730 124, 745 140, 775 138
               C 820 130, 870 118, 905 132
               C 930 142, 935 165, 920 185
               C 900 215, 870 235, 850 260
               C 835 285, 830 310, 840 340
               C 845 370, 830 400, 800 415
               C 760 430, 700 425, 650 430
               C 580 438, 520 442, 460 440
               C 380 438, 300 430, 240 410
               C 190 395, 140 370, 110 340
               C 90 322, 82 312, 75 300 z"
            fill="url(#rm-land)"
            stroke="#323463"
            strokeWidth="2"
          />

          {/* great lakes hint */}
          <g fill="#131427" opacity=".8">
            <ellipse cx="726" cy="162" rx="16" ry="7" transform="rotate(-24 726 162)" />
            <ellipse cx="752" cy="176" rx="11" ry="5" transform="rotate(-40 752 176)" />
            <ellipse cx="700" cy="176" rx="8" ry="4" transform="rotate(10 700 176)" />
          </g>

          {/* landscape glyphs */}
          <g stroke="#3f4170" strokeWidth="2" fill="none" opacity=".9">
            {/* Rockies */}
            <path d="M330 216 l9 -14 l9 14 M352 220 l11 -17 l11 17 M382 214 l8 -12 l8 12" />
            {/* desert mesas */}
            <path d="M300 340 h16 m-13 -5 h10 m-22 5 v-5 m25 0 v5 M340 352 h13 m-10 -4 h7" />
            {/* NE pines */}
            <path d="M846 196 l5 -9 l5 9 z M862 202 l4 -8 l4 8 z" />
            {/* gulf waves */}
            <path d="M520 462 q6 -5 12 0 q6 -5 12 0 M700 458 q6 -5 12 0" />
            {/* pacific waves */}
            <path d="M30 330 q6 -5 12 0 q6 -5 12 0 M22 366 q6 -5 12 0" />
          </g>

          {/* compass */}
          <g transform="translate(944 400)" stroke="#4a4c7e" fill="none" strokeWidth="1.5">
            <circle r="14" />
            <path d="M0 -14 v28 M-14 0 h28" opacity=".5" />
            <path d="M0 -14 l4 10 h-8 z" fill="#8a84b0" stroke="none" />
            <text y="-19" textAnchor="middle" fontSize="10" fill="#8a84b0" stroke="none" fontFamily="'Bricolage Grotesque', sans-serif">
              N
            </text>
          </g>

          {/* the road: full route dashed, traveled portion solid */}
          <path d={roadPath(pts)} fill="none" stroke="#6e5138" strokeWidth="3.5" strokeDasharray="7 7" strokeLinecap="round" opacity=".75" />
          {traveled.length > 1 && (
            <path d={roadPath(traveled)} fill="none" stroke="#8f6b4b" strokeWidth="4" strokeLinecap="round" />
          )}

          {/* stop markers */}
          {states.map((st) => (
            <Marker key={st.stop.slug} st={st} isNext={st.i === nextIdx} progress={progress} onOpen={() => openStop(st)} />
          ))}

          {/* the van, parked at the next stop (or Big Sur when the trip is done) */}
          <Van at={nextIdx >= 0 ? pts[nextIdx] : pts[9]} />
        </svg>
        </div>
      </div>

      <div className="below-map">
        <div className="panel glovebox">
          <h2>Glovebox</h2>
          <div className="shelf">
            {STOPS.map((s) => {
              const got = progress.souvenirs.includes(s.slug);
              return (
                <div key={s.slug} className={got ? 'slot got' : 'slot'} title={got ? s.souvenir.name : `${s.short} — not yet`}>
                  <span className="slot-ico">{got ? s.souvenir.icon : '?'}</span>
                  <span className="slot-name">{got ? s.souvenir.name : s.short}</span>
                </div>
              );
            })}
          </div>
          <div className="paperbacks">
            <span className="pb-row" aria-hidden="true">
              {STOPS.map((s) => (
                <span key={s.slug} className={progress.paperbacks.includes(s.slug) ? 'pb got' : 'pb'}>📕</span>
              ))}
            </span>
            <span className="pb-label">
              Coral paperbacks · {progress.paperbacks.length}/10
            </span>
          </div>
          {tripComplete(progress) && (
            <a className="finale-cta" href="#/finale">
              The glovebox is full — see the end of the road →
            </a>
          )}
        </div>
      </div>

      {stub && (
        <div className="overlay-screen" onClick={() => setStub(null)}>
          <div className="card intro-card" onClick={(e) => e.stopPropagation()}>
            <div className="eyebrow">Up the road</div>
            <h2>{stub.title}</h2>
            <p className="intro-line">
              The boys haven't written this one up yet — this stop's scene
              arrives in a later build step.
            </p>
            <button className="btn-hint" onClick={() => setStub(null)} autoFocus>
              BACK TO THE MAP
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Gently curved road through the marker points (alternating bow direction).
function roadPath(pts) {
  if (!pts.length) return '';
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1];
    const b = pts[i];
    const mx = (a.x + b.x) / 2;
    const my = (a.y + b.y) / 2;
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const len = Math.hypot(dx, dy) || 1;
    const off = 10 * (i % 2 ? 1 : -1);
    d += ` Q ${mx - (dy / len) * off} ${my + (dx / len) * off} ${b.x} ${b.y}`;
  }
  return d;
}

function Marker({ st, isNext, progress, onOpen }) {
  const { stop, i, completed, unlocked } = st;
  const above = stop.map.label === 'above';
  const best = progress.levels[stop.slug];
  const clickable = unlocked;
  const label = unlocked
    ? completed
      ? `${stop.title}, swept — best rank ${best.bestRank}`
      : `${stop.title}, open`
    : `${stop.title}, locked`;
  return (
    <g
      transform={`translate(${stop.map.x} ${stop.map.y})`}
      className={`map-marker${clickable ? ' clickable' : ' locked'}`}
      tabIndex={clickable ? 0 : -1}
      role={clickable ? 'link' : undefined}
      aria-label={label}
      onClick={clickable ? onOpen : undefined}
      onKeyDown={
        clickable
          ? (ev) => {
              if (ev.key === 'Enter' || ev.key === ' ') {
                ev.preventDefault();
                onOpen();
              }
            }
          : undefined
      }
    >
      {/* generous invisible tap target */}
      <circle r="20" fill="transparent" />
      {isNext && <circle className="map-pulse" r="16" fill="none" stroke="#ffc46b" strokeWidth="2.5" />}
      <circle
        r="11"
        fill={completed ? '#e85d43' : unlocked ? '#232449' : '#1a1b36'}
        stroke={completed || unlocked ? '#ff7a5c' : '#323463'}
        strokeWidth="2"
      />
      <text
        y="3.5"
        textAnchor="middle"
        fontSize="10"
        fontFamily="'Bricolage Grotesque', sans-serif"
        fill={completed ? '#2a130c' : unlocked ? '#e8e4f2' : '#55577e'}
      >
        {i + 1}
      </text>
      <text
        className="map-label"
        y={above ? -20 : 28}
        textAnchor="middle"
        fontSize="12"
        fontFamily="'Bricolage Grotesque', sans-serif"
        fill={unlocked ? '#e8e4f2' : '#55577e'}
        letterSpacing=".5"
      >
        {stop.short}
      </text>
      {completed && (
        <text
          y={above ? -32 : 40}
          textAnchor="middle"
          fontSize="8.5"
          fontFamily="'Instrument Sans', sans-serif"
          fill="#ffc46b"
        >
          {best.bestRank} · {fmtTime(best.bestTime)}
        </text>
      )}
    </g>
  );
}

// Tiny west-bound van parked just off the marker it's headed to.
function Van({ at }) {
  return (
    <g transform={`translate(${at.x + 20} ${at.y - 22})`} aria-hidden="true" pointerEvents="none">
      <path d="M22 10 v-7 q0 -2 -2 -2 h-10 q-4 0 -6.5 3 l-2.5 3.5 q-1 1.5 -1 2.5 z" fill="#e85d43" />
      <path d="M3.5 7 l2.2 -3 q1.6 -2 4.3 -2 v5 z" fill="#b7a8e0" />
      <rect x="12" y="2.5" width="5" height="4" rx="1" fill="#b7a8e0" />
      <rect x="4" y="7.5" width="18" height="1.6" fill="#ffc46b" opacity=".9" />
      <circle cx="7" cy="10.5" r="2.4" fill="#241f33" stroke="#55506e" strokeWidth="1" />
      <circle cx="18" cy="10.5" r="2.4" fill="#241f33" stroke="#55506e" strokeWidth="1" />
    </g>
  );
}
