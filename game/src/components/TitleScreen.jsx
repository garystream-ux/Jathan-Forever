export default function TitleScreen({ progress }) {
  const started = Object.keys(progress.levels).length > 0;
  return (
    <div className="wrap title-screen">
      <svg className="title-van" viewBox="0 0 230 92" aria-hidden="true">
        {/* road */}
        <line x1="0" y1="80" x2="230" y2="80" stroke="#323463" strokeWidth="2" strokeDasharray="10 8" />
        {/* motion lines (van faces west/left) */}
        <g stroke="#4a4c7e" strokeWidth="2" strokeLinecap="round">
          <path d="M196 38 h16 M202 48 h18 M198 58 h14" />
        </g>
        {/* body */}
        <path d="M190 68 v-27 q0 -4 -4 -4 h-90 q-19 0 -31 13 l-10 11 q-3 3 -3 7 z" fill="#e85d43" />
        {/* windshield */}
        <path d="M60 64 l9 -10 q9 -10 21 -11 v21 z" fill="#b7a8e0" />
        {/* side windows */}
        <rect x="98" y="43" width="24" height="14" rx="2" fill="#b7a8e0" />
        <rect x="130" y="43" width="24" height="14" rx="2" fill="#b7a8e0" />
        {/* stripe */}
        <rect x="54" y="60" width="136" height="4.5" fill="#ffc46b" opacity=".9" />
        {/* roof box */}
        <rect x="100" y="28" width="56" height="9" rx="3" fill="#7a5a40" />
        <path d="M112 28 v9 M132 28 v9 M148 28 v9" stroke="#5c4430" strokeWidth="1.5" />
        {/* wheels */}
        <circle cx="80" cy="70" r="9" fill="#241f33" stroke="#55506e" strokeWidth="3" />
        <circle cx="162" cy="70" r="9" fill="#241f33" stroke="#55506e" strokeWidth="3" />
      </svg>
      <h1 className="game-logo">
        Lost &amp; Found
        <span>on the Road</span>
      </h1>
      <p className="tagline">
        Ten stops between Burlington and Big Sur. Ethan and Jacob keep losing
        things. Sweep each stop before the van pulls out.
      </p>
      <a className="btn-hint btn-big" href="#/map">
        {started ? 'CONTINUE THE TRIP' : 'START THE TRIP'}
      </a>
      <p className="credit">
        A companion game to <em>Jathan Forever</em> — the shared travel journal
        of Ethan Highfield &amp; Jacob Monroe.
      </p>
    </div>
  );
}
