/*
 * Stop 4 — Chicago, IL. The riverwalk at dusk: skyline, a bascule bridge,
 * and a deep-dish pizzeria storefront. 18-object pool; souvenir = the
 * deep-dish slice. The "pigeon among pigeons" is a hidden object: three
 * ordinary pigeons on the railing are decoys, one Slightly Different pigeon
 * is findable. No real landmarks — generic towers, invented signage.
 */

export const chicago = {
  slug: 'chicago',
  viewBox: '0 0 1000 620',
  ariaLabel:
    'The Chicago riverwalk at dusk: skyline silhouettes with lit windows, a bridge over the teal river, and a deep-dish pizzeria storefront. Fourteen objects are hidden in the scene.',
  Art: ChicagoArt,
  registry: [
    { id: 'book', name: 'Paperback book', icon: '📕', x: 520, y: 372, hit: { type: 'circle', r: 16 }, always: true },
    { id: 'slice', name: 'Deep-dish slice', icon: '🍕', x: 150, y: 424, hit: { type: 'circle', r: 15 }, always: true, souvenir: true },
    { id: 'token', name: 'Transit token', icon: '🪙', x: 300, y: 565, hit: { type: 'circle', r: 13 } },
    { id: 'brochure', name: 'Architecture brochure', icon: '🏙️', x: 700, y: 492, hit: { type: 'circle', r: 15 } },
    { id: 'hotdog', name: 'Hot dog (no ketchup)', icon: '🌭', x: 420, y: 468, hit: { type: 'circle', r: 15 } },
    { id: 'umbrella', name: 'Umbrella', icon: '☂️', x: 614, y: 486, hit: { type: 'line', x1: 602, y1: 518, x2: 626, y2: 452, w: 18 } },
    { id: 'pigeon', name: 'That one pigeon', icon: '🐦', x: 858, y: 362, hit: { type: 'circle', r: 15 } },
    { id: 'sunglasses', name: 'Dropped sunglasses', icon: '🕶️', x: 480, y: 585, hit: { type: 'circle', r: 15 } },
    { id: 'caramelcorn', name: 'Caramel corn bag', icon: '🍿', x: 752, y: 498, hit: { type: 'circle', r: 14 } },
    { id: 'selfiestick', name: 'Selfie stick', icon: '🤳', x: 560, y: 412, hit: { type: 'line', x1: 548, y1: 438, x2: 572, y2: 386, w: 18 } },
    { id: 'penny', name: 'Pressed penny', icon: '🥉', x: 200, y: 592, hit: { type: 'circle', r: 13 } },
    { id: 'snowglobe', name: 'Snow globe', icon: '🔮', x: 110, y: 450, hit: { type: 'circle', r: 14 } },
    { id: 'cap', name: 'Ball cap', icon: '🧢', x: 890, y: 486, hit: { type: 'circle', r: 14 } },
    { id: 'pizzacutter', name: 'Pizza cutter', icon: '🔪', x: 235, y: 545, hit: { type: 'circle', r: 15 } },
    { id: 'ovenmitt', name: 'Oven mitt', icon: '🧤', x: 228, y: 512, hit: { type: 'circle', r: 14 } },
    { id: 'cable', name: 'Charger cable', icon: '🔌', x: 795, y: 478, hit: { type: 'circle', r: 14 } },
    { id: 'earbud', name: 'Lone earbud', icon: '🎧', x: 650, y: 600, hit: { type: 'circle', r: 13 } },
    { id: 'pencil', name: 'Souvenir pencil', icon: '✏️', x: 430, y: 374, hit: { type: 'circle', r: 14 } },
  ],
};

function ChicagoArt({ visible }) {
  const v = (id) => visible.has(id);
  return (
    <>
      <defs>
        <linearGradient id="ch-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1b1d3f" />
          <stop offset=".5" stopColor="#3a3566" />
          <stop offset=".8" stopColor="#8c5470" />
          <stop offset="1" stopColor="#e8825c" />
        </linearGradient>
        <linearGradient id="ch-river" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4d7a86" />
          <stop offset="1" stopColor="#28294f" />
        </linearGradient>
        <linearGradient id="ch-walk" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4a4364" />
          <stop offset="1" stopColor="#2e2a46" />
        </linearGradient>
      </defs>

      {/* ===== SKY ===== */}
      <rect x="0" y="0" width="1000" height="300" fill="url(#ch-sky)" />
      {/* far skyline */}
      <g fill="#33305c">
        <rect x="0" y="170" width="60" height="130" />
        <rect x="70" y="140" width="46" height="160" />
        <rect x="240" y="150" width="60" height="150" />
        <rect x="310" y="185" width="44" height="115" />
        <rect x="420" y="128" width="54" height="172" />
        <rect x="484" y="165" width="40" height="135" />
        <rect x="590" y="145" width="58" height="155" />
        <rect x="660" y="175" width="42" height="125" />
        <rect x="770" y="120" width="60" height="180" />
        <rect x="840" y="158" width="46" height="142" />
        <rect x="930" y="140" width="52" height="160" />
        <rect x="790" y="100" width="8" height="24" />
        <rect x="812" y="100" width="8" height="24" />
        <rect x="438" y="112" width="6" height="18" />
      </g>
      {/* near skyline */}
      <g fill="#262450">
        <rect x="120" y="95" width="70" height="205" />
        <rect x="200" y="130" width="46" height="170" />
        <rect x="360" y="110" width="56" height="190" />
        <rect x="530" y="90" width="64" height="210" />
        <rect x="710" y="135" width="52" height="165" />
        <rect x="886" y="118" width="48" height="182" />
        <rect x="145" y="75" width="10" height="22" />
        <rect x="555" y="70" width="10" height="22" />
      </g>
      {/* lit windows (twinkling) */}
      <g className="fx-twinkle" fill="#ffc46b" opacity=".85">
        <rect x="132" y="120" width="5" height="7" /><rect x="150" y="140" width="5" height="7" />
        <rect x="168" y="112" width="5" height="7" /><rect x="140" y="176" width="5" height="7" />
        <rect x="372" y="132" width="5" height="7" /><rect x="392" y="158" width="5" height="7" />
        <rect x="380" y="196" width="5" height="7" /><rect x="544" y="112" width="5" height="7" />
        <rect x="566" y="140" width="5" height="7" /><rect x="552" y="180" width="5" height="7" />
        <rect x="576" y="210" width="5" height="7" /><rect x="722" y="158" width="5" height="7" />
        <rect x="740" y="186" width="5" height="7" /><rect x="898" y="140" width="5" height="7" />
        <rect x="914" y="172" width="5" height="7" />
      </g>
      <g fill="#ffc46b" opacity=".5">
        <rect x="212" y="150" width="4" height="6" /><rect x="228" y="180" width="4" height="6" />
        <rect x="86" y="160" width="4" height="6" /><rect x="256" y="170" width="4" height="6" />
        <rect x="436" y="150" width="4" height="6" /><rect x="606" y="170" width="4" height="6" />
        <rect x="782" y="140" width="4" height="6" /><rect x="852" y="180" width="4" height="6" />
      </g>

      {/* ===== BRIDGE (upper right, over the river) ===== */}
      <g>
        <rect x="620" y="288" width="380" height="8" fill="#241f33" />
        <path d="M640 288 l40 -34 l40 34 M720 288 l40 -34 l40 34 M800 288 l40 -34 l40 34 M880 288 l40 -34 l40 34" stroke="#241f33" strokeWidth="4" fill="none" />
        <path d="M640 288 h320" stroke="#171326" strokeWidth="2" />
        <rect x="648" y="250" width="12" height="38" fill="#2c2846" />
        <rect x="952" y="250" width="12" height="38" fill="#2c2846" />
        <g className="fx-twinkle" fill="#ffc46b">
          <circle cx="680" cy="256" r="2" /><circle cx="760" cy="256" r="2" />
          <circle cx="840" cy="256" r="2" /><circle cx="920" cy="256" r="2" />
        </g>
      </g>

      {/* ===== RIVER ===== */}
      <rect x="0" y="296" width="1000" height="60" fill="url(#ch-river)" />
      <g stroke="#6a94a0" strokeWidth="1.5" opacity=".35">
        <path d="M0 312 h1000 M0 328 h1000 M0 344 h1000" />
      </g>
      {/* reflections */}
      <g fill="#ffc46b" opacity=".25">
        <rect x="140" y="304" width="4" height="14" /><rect x="380" y="308" width="4" height="12" />
        <rect x="556" y="304" width="4" height="16" /><rect x="726" y="306" width="4" height="12" />
        <rect x="900" y="304" width="4" height="14" />
      </g>
      {/* water-taxi decoy */}
      <g>
        <path d="M320 338 h64 l-8 10 h-48 z" fill="#d9a94e" />
        <rect x="334" y="330" width="36" height="9" rx="3" fill="#b98a3e" />
      </g>

      {/* ===== RAILING along the river ===== */}
      <g fill="#241f33">
        <rect x="0" y="366" width="1000" height="5" />
        <rect x="0" y="384" width="1000" height="4" />
      </g>
      <g fill="#1e1b33">
        <rect x="40" y="366" width="7" height="46" />
        <rect x="180" y="366" width="7" height="46" />
        <rect x="320" y="366" width="7" height="46" />
        <rect x="460" y="366" width="7" height="46" />
        <rect x="600" y="366" width="7" height="46" />
        <rect x="740" y="366" width="7" height="46" />
        <rect x="900" y="366" width="7" height="46" />
      </g>
      {/* life ring decoy on the railing */}
      <circle cx="668" cy="380" r="11" fill="#d8d0dc" />
      <circle cx="668" cy="380" r="11" fill="none" stroke="#a34a44" strokeWidth="3.5" strokeDasharray="5 7" />
      <circle cx="668" cy="380" r="4.5" fill="#3a3566" />
      {/* HIDDEN: the coral paperback on the top rail */}
      {v('book') && (
        <g aria-hidden="true" transform="rotate(-3 520 368)">
          <rect x="507" y="363" width="26" height="9" rx="1.5" fill="#e85d43" />
          <rect x="530" y="364" width="3" height="7" fill="#e8d9c2" />
          <rect x="510" y="366" width="12" height="1.5" fill="#8f3526" opacity=".8" />
        </g>
      )}
      {/* HIDDEN: souvenir pencil lying on the rail */}
      {v('pencil') && (
        <g aria-hidden="true" transform="rotate(2 430 368)">
          <rect x="416" y="365" width="26" height="4" rx="1" fill="#d9a94e" />
          <path d="M442 365 l5 2 l-5 2 z" fill="#e8d9c2" />
          <rect x="414" y="365" width="4" height="4" fill="#c4766a" />
        </g>
      )}
      {/* pigeons on the railing: three decoys + HIDDEN: the Slightly Different one */}
      <g>
        <ellipse cx="806" cy="360" rx="8" ry="5.5" fill="#8a84b0" />
        <circle cx="813" cy="355" r="3.5" fill="#8a84b0" />
        <path d="M816.5 355 l4 1 l-4 1.2 z" fill="#d99a4e" />
        <ellipse cx="832" cy="360" rx="8" ry="5.5" fill="#9a94b8" />
        <circle cx="839" cy="355" r="3.5" fill="#9a94b8" />
        <path d="M842.5 355 l4 1 l-4 1.2 z" fill="#d99a4e" />
        <ellipse cx="884" cy="360" rx="8" ry="5.5" fill="#8a84b0" />
        <circle cx="891" cy="355" r="3.5" fill="#8a84b0" />
        <path d="M894.5 355 l4 1 l-4 1.2 z" fill="#d99a4e" />
      </g>
      {v('pigeon') && (
        <g aria-hidden="true">
          {/* facing the wrong way, lavender-tinted, a little rounder */}
          <ellipse cx="858" cy="359" rx="9" ry="6" fill="#b7a8e0" />
          <circle cx="850" cy="354" r="3.8" fill="#b7a8e0" />
          <path d="M846.5 354 l-4 1 l4 1.2 z" fill="#d99a4e" />
          <circle cx="849" cy="353" r=".8" fill="#241f33" />
        </g>
      )}

      {/* ===== ESPLANADE ===== */}
      <rect x="0" y="412" width="1000" height="208" fill="url(#ch-walk)" />
      <g stroke="#26223c" strokeWidth="2">
        <path d="M0 446 h1000 M0 484 h1000 M0 528 h1000 M0 576 h1000" />
      </g>
      <g stroke="#26223c" strokeWidth="1.5" opacity=".7">
        <path d="M160 412 L130 620 M340 412 L325 620 M520 412 L520 620 M690 412 L710 620 M860 412 L888 620" />
      </g>

      {/* ===== PIZZERIA (left) ===== */}
      <g>
        <rect x="30" y="230" width="240" height="240" fill="#5c3a44" />
        <g stroke="#4c303a" strokeWidth="1.5" opacity=".8">
          <path d="M30 260 h240 M30 290 h240 M30 320 h240" />
          <path d="M90 230 v90 M150 230 v90 M210 230 v90" />
        </g>
        {/* sign */}
        <rect x="48" y="288" width="204" height="34" rx="4" fill="#241f33" stroke="#6e4550" strokeWidth="2" />
        <text x="150" y="311" textAnchor="middle" fontSize="17" letterSpacing="4" fontFamily="'Bricolage Grotesque', sans-serif" fill="#ffc46b">
          DEEP DISH
        </text>
        {/* window */}
        <rect x="44" y="336" width="150" height="106" fill="#2c2340" stroke="#6e4550" strokeWidth="3" />
        <rect x="50" y="342" width="138" height="94" fill="#ffc46b" opacity=".16" />
        {/* pies on stands in the window (decoys) */}
        <ellipse cx="90" cy="408" rx="22" ry="8" fill="#b98a3e" />
        <ellipse cx="90" cy="404" rx="18" ry="6" fill="#c4766a" />
        <rect x="86" y="416" width="8" height="10" fill="#241f33" />
        {/* window shelf */}
        <rect x="44" y="440" width="150" height="5" fill="#241f33" />
        {/* door */}
        <rect x="206" y="360" width="52" height="110" fill="#241f33" stroke="#6e4550" strokeWidth="2" />
        <rect x="213" y="370" width="38" height="56" fill="#3a3164" />
        <circle cx="248" cy="428" r="3" fill="#8a84b0" />
        {/* awning */}
        <path d="M36 340 h170 l-8 -18 h-154 z" fill="#a34a44" />
        <path d="M52 324 l5 16 M84 323 l4 17 M116 322 l3 18 M148 322 l2 18 M180 323 l0 17" stroke="#7d3a38" strokeWidth="4" />
      </g>
      {/* HIDDEN: deep-dish slice on a stand in the window — the souvenir */}
      {v('slice') && (
        <g aria-hidden="true">
          <path d="M138 418 l24 -10 l-2 14 q-11 6 -22 -4 z" fill="#d9a94e" />
          <path d="M140 417 l19 -8 l-1.5 10 q-9 4 -17.5 -2 z" fill="#c4574a" />
          <circle cx="150" cy="416" r="1.8" fill="#e8d9c2" />
          <circle cx="156" cy="413" r="1.5" fill="#e8d9c2" />
          <rect x="144" y="426" width="7" height="8" fill="#241f33" />
        </g>
      )}
      {/* HIDDEN: snow globe on the windowsill */}
      {v('snowglobe') && (
        <g aria-hidden="true">
          <circle cx="110" cy="448" r="8" fill="#8ac0d0" opacity=".55" stroke="#e8e4f2" strokeWidth="1" />
          <rect x="106" y="440" width="3" height="9" fill="#33305c" />
          <rect x="111" y="443" width="2.5" height="6" fill="#33305c" />
          <rect x="103" y="455" width="14" height="5" rx="2" fill="#6e4550" />
        </g>
      )}
      {/* HIDDEN: oven mitt on the doorstep */}
      {v('ovenmitt') && (
        <g aria-hidden="true" transform="rotate(-12 228 512)">
          <path d="M220 504 q0 -6 6 -6 q7 0 7 6 l-1 13 h-11 z" fill="#c4574a" />
          <path d="M220 508 q-5 -1 -4 4 l4 2" fill="#c4574a" />
          <path d="M222 514 h9" stroke="#a34038" strokeWidth="1.2" />
        </g>
      )}
      {/* A-frame sidewalk sign decoy */}
      <g>
        <path d="M288 520 l14 -44 l14 44 z" fill="#37305a" stroke="#241f33" strokeWidth="2" />
        <path d="M295 500 h14 M293 508 h18" stroke="#ffc46b" strokeWidth="2" opacity=".7" />
      </g>
      {/* HIDDEN: pizza cutter dropped outside */}
      {v('pizzacutter') && (
        <g aria-hidden="true" transform="rotate(18 235 545)">
          <circle cx="228" cy="543" r="7" fill="#b8b4cc" stroke="#8a86a8" strokeWidth="1" />
          <rect x="234" y="541" width="15" height="4" rx="2" fill="#6e4550" />
        </g>
      )}

      {/* ===== PLANTERS ===== */}
      <g>
        <rect x="378" y="472" width="84" height="26" rx="3" fill="#37305a" />
        <path d="M390 472 q-3 -12 3 -17 M406 472 q0 -14 6 -18 M424 472 q3 -12 -2 -18 M442 472 q-2 -11 3 -15" stroke="#5f7a5c" strokeWidth="3" fill="none" />
        <rect x="574" y="486" width="76" height="24" rx="3" fill="#37305a" />
        <path d="M586 486 q-3 -11 3 -15 M602 486 q0 -12 5 -16 M620 486 q3 -11 -2 -16" stroke="#5f7a5c" strokeWidth="3" fill="none" />
      </g>
      {/* HIDDEN: hot dog balanced on the planter edge (mustard only — obviously) */}
      {v('hotdog') && (
        <g aria-hidden="true" transform="rotate(-6 420 468)">
          <ellipse cx="420" cy="468" rx="13" ry="5" fill="#d9a94e" />
          <ellipse cx="420" cy="465.5" rx="11" ry="3" fill="#a35a42" />
          <path d="M411 465.5 q4 2 9 0 q5 -2 9 0" stroke="#ffc46b" strokeWidth="1.5" fill="none" />
        </g>
      )}
      {/* HIDDEN: umbrella leaning on the second planter */}
      {v('umbrella') && (
        <g aria-hidden="true">
          <path d="M602 518 L624 455" stroke="#37345e" strokeWidth="6" strokeLinecap="round" />
          <path d="M624 455 q4 -6 8 -4" stroke="#37345e" strokeWidth="3" fill="none" />
          <path d="M606 510 q-4 4 -1 8" stroke="#2a2748" strokeWidth="3" fill="none" />
          <path d="M608 500 l8 3 M614 484 l8 3" stroke="#2a2748" strokeWidth="2" />
        </g>
      )}
      {/* HIDDEN: selfie stick against the railing */}
      {v('selfiestick') && (
        <g aria-hidden="true">
          <path d="M548 438 L570 390" stroke="#55506e" strokeWidth="4" strokeLinecap="round" />
          <rect x="565" y="382" width="12" height="8" rx="2" fill="#241f33" stroke="#55506e" strokeWidth="1" />
          <path d="M550 434 q-3 3 -1 6" stroke="#3f3a58" strokeWidth="2.5" fill="none" />
        </g>
      )}

      {/* ===== BENCH ===== */}
      <g>
        <ellipse cx="740" cy="540" rx="72" ry="8" fill="#1a1626" opacity=".5" />
        <rect x="668" y="472" width="7" height="60" fill="#241f33" />
        <rect x="806" y="472" width="7" height="60" fill="#241f33" />
        <rect x="662" y="476" width="158" height="6" rx="2" fill="#3f3a58" />
        <rect x="662" y="486" width="158" height="6" rx="2" fill="#3f3a58" />
        <rect x="658" y="498" width="166" height="7" rx="2" fill="#4a4468" />
        <rect x="666" y="508" width="7" height="26" fill="#241f33" />
        <rect x="808" y="508" width="7" height="26" fill="#241f33" />
      </g>
      {/* HIDDEN: architecture brochure on the bench */}
      {v('brochure') && (
        <g aria-hidden="true" transform="rotate(5 700 494)">
          <rect x="689" y="488" width="22" height="14" rx="1" fill="#cfc4e6" />
          <path d="M696 488 v14 M703 488 v14" stroke="#8a84b0" strokeWidth="1" />
          <path d="M691 497 l4 -6 l3 6 M700 497 l3 -4 l3 4" stroke="#55516e" strokeWidth="1" fill="none" />
        </g>
      )}
      {/* HIDDEN: caramel corn bag on the bench slats */}
      {v('caramelcorn') && (
        <g aria-hidden="true" transform="rotate(-7 752 496)">
          <path d="M744 486 h16 l2 18 h-20 z" fill="#d9a94e" />
          <path d="M746 486 v18 M752 486 v18 M758 486 v18" stroke="#b98a3e" strokeWidth="1.5" />
          <circle cx="750" cy="484" r="2" fill="#e8d9c2" />
          <circle cx="756" cy="483" r="1.8" fill="#e8d9c2" />
        </g>
      )}
      {/* HIDDEN: charger cable coiled on the bench arm */}
      {v('cable') && (
        <g aria-hidden="true">
          <ellipse cx="795" cy="478" rx="8" ry="5" fill="none" stroke="#e8e4f2" strokeWidth="2" />
          <ellipse cx="795" cy="478" rx="4" ry="2.5" fill="none" stroke="#e8e4f2" strokeWidth="1.5" />
          <rect x="802" y="474" width="7" height="5" rx="1" fill="#e8e4f2" />
        </g>
      )}

      {/* ===== BOLLARDS + BIKE (right) ===== */}
      <g>
        <rect x="884" y="470" width="12" height="34" rx="4" fill="#37345e" />
        <rect x="944" y="492" width="12" height="34" rx="4" fill="#37345e" />
      </g>
      {/* HIDDEN: ball cap on the bollard */}
      {v('cap') && (
        <g aria-hidden="true">
          <path d="M879 470 q0 -9 11 -9 q11 0 11 9 z" fill="#37567a" />
          <path d="M879 470 h-8 q-2 0 -1 -3 l9 -2 z" fill="#2c4560" />
          <circle cx="890" cy="463" r="1.5" fill="#2c4560" />
        </g>
      )}
      {/* bike decoy */}
      <g stroke="#241f33" strokeWidth="2.5" fill="none">
        <circle cx="924" cy="580" r="16" />
        <circle cx="972" cy="580" r="16" />
        <path d="M924 580 L944 556 L972 580 M944 556 L938 580 M938 580 h34 M942 550 h10 M968 559 l8 -5" />
      </g>

      {/* ===== SMALL SCATTERED OBJECTS ===== */}
      {/* HIDDEN: transit token */}
      {v('token') && (
        <g aria-hidden="true">
          <circle cx="300" cy="565" r="5.5" fill="#c9a84c" stroke="#a8893c" strokeWidth="1.5" />
          <path d="M298 563 l4 4 M302 563 l-4 4" stroke="#a8893c" strokeWidth="1.2" />
        </g>
      )}
      {/* HIDDEN: dropped sunglasses (they will lose these again in Vegas) */}
      {v('sunglasses') && (
        <g aria-hidden="true" transform="rotate(-8 480 585)">
          <circle cx="474" cy="585" r="4.5" fill="#241f33" />
          <circle cx="485" cy="585" r="4.5" fill="#241f33" />
          <path d="M478 585 h3.5 M469 584 l-8 -2" stroke="#241f33" strokeWidth="2" fill="none" />
        </g>
      )}
      {/* HIDDEN: pressed penny */}
      {v('penny') && (
        <g aria-hidden="true" transform="rotate(20 200 592)">
          <ellipse cx="200" cy="592" rx="6" ry="4.5" fill="#b06a48" stroke="#8f5438" strokeWidth="1" />
          <path d="M197 592 h6" stroke="#8f5438" strokeWidth="1" />
        </g>
      )}
      {/* HIDDEN: lone earbud */}
      {v('earbud') && (
        <g aria-hidden="true" transform="rotate(-24 650 600)">
          <circle cx="650" cy="598" r="3.5" fill="#e8e4f2" />
          <rect x="648.5" y="600" width="3" height="8" rx="1.5" fill="#e8e4f2" />
        </g>
      )}
    </>
  );
}
