/*
 * Stop 3 — Detroit, MI. Motown flavor: a brick theater block and a record
 * shop window under evening neon. 18-object pool; souvenir = the vinyl 45.
 * All signage invented. Decoys: pigeons, hydrant, parking meter, newspaper
 * box, milk crate, trash can, the alley cat.
 */

export const detroit = {
  slug: 'detroit',
  viewBox: '0 0 1000 620',
  ariaLabel:
    'A Detroit street at evening: a brick theater with a lit marquee, an alley, and a record shop with a glowing window and neon sign. Fourteen objects are hidden in the scene.',
  Art: DetroitArt,
  registry: [
    { id: 'book', name: 'Paperback book', icon: '📕', x: 750, y: 424, hit: { type: 'circle', r: 16 }, always: true },
    { id: 'vinyl', name: 'Vinyl 45', icon: '💿', x: 640, y: 545, hit: { type: 'circle', r: 16 }, always: true, souvenir: true },
    { id: 'pick', name: 'Guitar pick', icon: '🎸', x: 350, y: 585, hit: { type: 'circle', r: 13 } },
    { id: 'cassette', name: 'Cassette tape', icon: '📼', x: 148, y: 468, hit: { type: 'circle', r: 14 } },
    { id: 'ticketstub', name: 'Ticket stub', icon: '🎟️', x: 280, y: 565, hit: { type: 'circle', r: 14 } },
    { id: 'harmonica', name: 'Harmonica', icon: '🎵', x: 370, y: 452, hit: { type: 'circle', r: 14 } },
    { id: 'drumstick', name: 'Drumstick', icon: '🥁', x: 486, y: 556, hit: { type: 'line', x1: 472, y1: 574, x2: 500, y2: 538, w: 18 } },
    { id: 'neonletter', name: 'Neon letter, gone dark', icon: '🔤', x: 745, y: 305, hit: { type: 'circle', r: 15 } },
    { id: 'pass', name: 'Backstage pass', icon: '🪪', x: 408, y: 448, hit: { type: 'circle', r: 14 } },
    { id: 'sheetmusic', name: 'Sheet music', icon: '🎼', x: 105, y: 568, hit: { type: 'circle', r: 15 } },
    { id: 'drumkey', name: 'Drum key', icon: '🔧', x: 550, y: 592, hit: { type: 'circle', r: 13 } },
    { id: 'setlist', name: 'Taped-up setlist', icon: '📃', x: 255, y: 420, hit: { type: 'circle', r: 14 } },
    { id: 'capo', name: 'Guitar capo', icon: '🎚️', x: 665, y: 519, hit: { type: 'circle', r: 13 } },
    { id: 'flyer', name: 'Show flyer', icon: '📰', x: 210, y: 380, hit: { type: 'circle', r: 15 } },
    { id: 'adapter', name: '45 adapter', icon: '⭐', x: 860, y: 462, hit: { type: 'circle', r: 13 } },
    { id: 'bowtie', name: 'Bow tie', icon: '🎀', x: 300, y: 508, hit: { type: 'circle', r: 14 } },
    { id: 'earplug', name: 'Foam earplug', icon: '🟠', x: 720, y: 578, hit: { type: 'circle', r: 13 } },
    { id: 'strings', name: 'Guitar string pack', icon: '🎻', x: 905, y: 545, hit: { type: 'circle', r: 14 } },
  ],
};

function DetroitArt({ visible }) {
  const v = (id) => visible.has(id);
  return (
    <>
      <defs>
        <linearGradient id="dt-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#131427" />
          <stop offset=".7" stopColor="#272449" />
          <stop offset="1" stopColor="#3a3164" />
        </linearGradient>
        <radialGradient id="dt-glow" cx=".5" cy="1" r="1">
          <stop offset="0" stopColor="#ffc46b" stopOpacity=".22" />
          <stop offset="1" stopColor="#ffc46b" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="dt-walk" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3d3954" />
          <stop offset="1" stopColor="#282540" />
        </linearGradient>
      </defs>

      {/* ===== SKY ===== */}
      <rect x="0" y="0" width="1000" height="480" fill="url(#dt-sky)" />
      <rect x="0" y="240" width="1000" height="240" fill="url(#dt-glow)" />
      <g fill="#e8e4f2" opacity=".8">
        <circle cx="120" cy="60" r="1.5" />
        <circle cx="300" cy="40" r="1.2" />
        <circle cx="540" cy="70" r="1.5" />
        <circle cx="700" cy="35" r="1.2" />
        <circle cx="880" cy="55" r="1.5" />
        <circle cx="960" cy="110" r="1.2" />
      </g>
      {/* distant skyline */}
      <g fill="#211e40">
        <rect x="430" y="200" width="40" height="270" />
        <rect x="475" y="170" width="55" height="300" />
        <rect x="535" y="215" width="35" height="255" />
        <rect x="470" y="160" width="20" height="20" />
      </g>
      <g fill="#ffc46b" opacity=".5">
        <rect x="484" y="185" width="5" height="6" />
        <rect x="498" y="205" width="5" height="6" />
        <rect x="512" y="185" width="5" height="6" />
        <rect x="440" y="215" width="5" height="6" />
        <rect x="545" y="230" width="5" height="6" />
        <rect x="484" y="240" width="5" height="6" />
      </g>

      {/* ===== THEATER (left) ===== */}
      <rect x="60" y="130" width="360" height="340" fill="#4a3340" />
      <g stroke="#3d2a35" strokeWidth="1.5" opacity=".8">
        <path d="M60 160 h360 M60 190 h360 M60 220 h360 M60 250 h360 M60 280 h360" />
        <path d="M120 130 v150 M200 130 v150 M280 130 v150 M360 130 v150" />
      </g>
      {/* upper windows */}
      <g fill="#241f33" stroke="#5c4450" strokeWidth="2">
        <rect x="95" y="155" width="34" height="48" rx="3" />
        <rect x="165" y="155" width="34" height="48" rx="3" />
        <rect x="235" y="155" width="34" height="48" rx="3" />
        <rect x="305" y="155" width="34" height="48" rx="3" />
      </g>
      <rect x="169" y="160" width="12" height="16" fill="#ffc46b" opacity=".45" />
      <rect x="309" y="178" width="12" height="16" fill="#ffc46b" opacity=".35" />

      {/* blade sign */}
      <g className="fx-neon">
        <rect x="42" y="150" width="34" height="150" rx="4" fill="#241f33" stroke="#e85d43" strokeWidth="2" />
        <text x="59" y="174" textAnchor="middle" fontSize="19" fontFamily="'Bricolage Grotesque', sans-serif" fill="#ff7a5c">U</text>
        <text x="59" y="197" textAnchor="middle" fontSize="19" fontFamily="'Bricolage Grotesque', sans-serif" fill="#ff7a5c">P</text>
        <text x="59" y="220" textAnchor="middle" fontSize="19" fontFamily="'Bricolage Grotesque', sans-serif" fill="#ff7a5c">T</text>
        <text x="59" y="243" textAnchor="middle" fontSize="19" fontFamily="'Bricolage Grotesque', sans-serif" fill="#ff7a5c">O</text>
        <text x="59" y="266" textAnchor="middle" fontSize="19" fontFamily="'Bricolage Grotesque', sans-serif" fill="#ff7a5c">W</text>
        <text x="59" y="289" textAnchor="middle" fontSize="19" fontFamily="'Bricolage Grotesque', sans-serif" fill="#ff7a5c">N</text>
      </g>

      {/* marquee */}
      <g>
        <rect x="90" y="292" width="300" height="52" rx="5" fill="#241f33" stroke="#5c4450" strokeWidth="2" />
        <text x="240" y="315" textAnchor="middle" fontSize="15" letterSpacing="2" fontFamily="'Bricolage Grotesque', sans-serif" fill="#e8e4f2">
          TONIGHT · THE MIDNIGHT FOUR
        </text>
        <text x="240" y="334" textAnchor="middle" fontSize="10" letterSpacing="3" fontFamily="'Instrument Sans', sans-serif" fill="#9a94b8">
          DOORS AT EIGHT · SOLD OUT
        </text>
        <g className="fx-twinkle" fill="#ffc46b">
          <circle cx="100" cy="296" r="2.2" /><circle cx="128" cy="296" r="2.2" /><circle cx="156" cy="296" r="2.2" />
          <circle cx="184" cy="296" r="2.2" /><circle cx="212" cy="296" r="2.2" /><circle cx="240" cy="296" r="2.2" />
          <circle cx="268" cy="296" r="2.2" /><circle cx="296" cy="296" r="2.2" /><circle cx="324" cy="296" r="2.2" />
          <circle cx="352" cy="296" r="2.2" /><circle cx="380" cy="296" r="2.2" />
          <circle cx="100" cy="340" r="2.2" /><circle cx="128" cy="340" r="2.2" /><circle cx="156" cy="340" r="2.2" />
          <circle cx="184" cy="340" r="2.2" /><circle cx="212" cy="340" r="2.2" /><circle cx="240" cy="340" r="2.2" />
          <circle cx="268" cy="340" r="2.2" /><circle cx="296" cy="340" r="2.2" /><circle cx="324" cy="340" r="2.2" />
          <circle cx="352" cy="340" r="2.2" /><circle cx="380" cy="340" r="2.2" />
        </g>
      </g>
      {/* pigeons on the marquee (decoys) */}
      <g>
        <ellipse cx="150" cy="288" rx="8" ry="5" fill="#8a84b0" />
        <circle cx="157" cy="283" r="3.5" fill="#8a84b0" />
        <path d="M160.5 283 l4 1 l-4 1.2 z" fill="#d99a4e" />
        <ellipse cx="330" cy="288" rx="8" ry="5" fill="#9a94b8" />
        <circle cx="323" cy="283" r="3.5" fill="#9a94b8" />
        <path d="M319.5 283 l-4 1 l4 1.2 z" fill="#d99a4e" />
      </g>

      {/* theater doors */}
      <g>
        <rect x="150" y="380" width="44" height="90" fill="#241f33" stroke="#5c4450" strokeWidth="2" />
        <rect x="198" y="380" width="44" height="90" fill="#241f33" stroke="#5c4450" strokeWidth="2" />
        <circle cx="172" cy="410" r="7" fill="#3d3954" stroke="#5c4450" strokeWidth="1.5" />
        <circle cx="220" cy="410" r="7" fill="#3d3954" stroke="#5c4450" strokeWidth="1.5" />
        <rect x="186" y="425" width="6" height="14" rx="2" fill="#8a84b0" />
        <rect x="200" y="425" width="6" height="14" rx="2" fill="#8a84b0" />
      </g>
      {/* HIDDEN: setlist taped to the door glass */}
      {v('setlist') && (
        <g aria-hidden="true" transform="rotate(-3 255 420)">
          <rect x="248" y="408" width="14" height="24" fill="#e8e4f2" opacity=".9" />
          <path d="M250.5 413 h9 M250.5 418 h9 M250.5 423 h6" stroke="#55516e" strokeWidth="1" />
          <rect x="250" y="406" width="10" height="3" fill="#b7a8e0" opacity=".7" />
        </g>
      )}

      {/* poster cases + steps */}
      <g>
        <rect x="100" y="390" width="36" height="56" fill="#241f33" stroke="#5c4450" strokeWidth="2" />
        <rect x="105" y="396" width="26" height="36" fill="#3a3164" />
        <path d="M108 428 q10 -18 20 0" stroke="#ff7a5c" strokeWidth="1.5" fill="none" />
        <rect x="340" y="390" width="36" height="56" fill="#241f33" stroke="#5c4450" strokeWidth="2" />
        <rect x="345" y="396" width="26" height="36" fill="#3a3164" />
        <circle cx="358" cy="410" r="8" fill="none" stroke="#ffc46b" strokeWidth="1.5" />
      </g>
      {/* HIDDEN: harmonica on the poster-case ledge */}
      {v('harmonica') && (
        <g aria-hidden="true" transform="rotate(-4 370 452)">
          <rect x="358" y="448" width="26" height="8" rx="2" fill="#8a84b0" />
          <path d="M361 450 v4 M365 450 v4 M369 450 v4 M373 450 v4 M377 450 v4 M381 450 v4" stroke="#55516e" strokeWidth="1" />
        </g>
      )}
      {/* HIDDEN: show flyer pasted between cases */}
      {v('flyer') && (
        <g aria-hidden="true" transform="rotate(4 210 380)">
          <rect x="198" y="366" width="24" height="30" fill="#cfc4e6" opacity=".85" />
          <path d="M202 372 h16 M202 378 h16 M202 384 h10" stroke="#55516e" strokeWidth="1.2" />
          <circle cx="210" cy="391" r="2.5" fill="#e85d43" />
        </g>
      )}
      {/* steps */}
      <g>
        <rect x="140" y="470" width="180" height="10" fill="#3d3954" />
        <rect x="130" y="480" width="200" height="10" fill="#332f4c" />
        <rect x="120" y="490" width="220" height="12" fill="#2c2944" />
      </g>
      {/* HIDDEN: bow tie on the steps */}
      {v('bowtie') && (
        <g aria-hidden="true" transform="rotate(-8 300 508)">
          <path d="M300 508 l-10 -5 v10 z" fill="#7d3a5c" />
          <path d="M300 508 l10 -5 v10 z" fill="#7d3a5c" />
          <circle cx="300" cy="508" r="2.5" fill="#5c2a44" />
        </g>
      )}

      {/* stage door (right edge of theater) */}
      <g>
        <rect x="390" y="400" width="30" height="70" fill="#2c2340" stroke="#5c4450" strokeWidth="2" />
        <circle cx="412" cy="438" r="3" fill="#8a84b0" />
        <text x="405" y="418" textAnchor="middle" fontSize="6.5" letterSpacing="1" fontFamily="'Instrument Sans', sans-serif" fill="#9a94b8">STAGE</text>
      </g>
      {/* HIDDEN: backstage pass on the stage-door handle */}
      {v('pass') && (
        <g aria-hidden="true">
          <path d="M412 440 q-4 4 -5 10" stroke="#b7a8e0" strokeWidth="1.5" fill="none" />
          <rect x="401" y="450" width="13" height="17" rx="2" fill="#e8e4f2" />
          <rect x="401" y="450" width="13" height="5" rx="2" fill="#e85d43" />
          <path d="M404 459 h7 M404 462 h5" stroke="#55516e" strokeWidth="1" />
        </g>
      )}

      {/* ===== ALLEY ===== */}
      <rect x="420" y="230" width="160" height="240" fill="#1c1a33" />
      <g stroke="#282544" strokeWidth="2">
        <path d="M420 260 h160 M420 300 h160 M420 340 h160" />
      </g>
      {/* dumpster + cat decoys */}
      <rect x="435" y="410" width="70" height="45" rx="4" fill="#37345e" />
      <rect x="435" y="405" width="70" height="10" rx="4" fill="#413d6b" />
      <g>
        <ellipse cx="540" cy="452" rx="16" ry="7" fill="#241f33" />
        <circle cx="527" cy="446" r="6" fill="#241f33" />
        <path d="M523 441 l1 -5 l4 4 M530 441 l2 -5 l2 5" fill="#241f33" />
        <path d="M556 452 q8 -2 7 -10" stroke="#241f33" strokeWidth="4" fill="none" strokeLinecap="round" />
        <circle cx="525" cy="445" r="1" fill="#ffc46b" />
        <circle cx="529" cy="445" r="1" fill="#ffc46b" />
      </g>

      {/* ===== RECORD SHOP (right) ===== */}
      <rect x="580" y="180" width="380" height="290" fill="#3c3050" />
      <g stroke="#332944" strokeWidth="1.5" opacity=".8">
        <path d="M580 210 h380 M580 240 h380 M580 270 h380" />
        <path d="M660 180 v90 M740 180 v90 M820 180 v90 M900 180 v90" />
      </g>
      {/* neon sign — one letter is dark (that's the hidden object) */}
      <g>
        <rect x="614" y="286" width="292" height="42" rx="6" fill="#241f33" stroke="#413d6b" strokeWidth="2" />
        <g className="fx-neon" fontFamily="'Bricolage Grotesque', sans-serif" fontSize="26" letterSpacing="6">
          <text x="640" y="316" fill="#ff7a5c">R</text>
          <text x="668" y="316" fill="#ff7a5c">E</text>
          <text x="696" y="316" fill="#ff7a5c">C</text>
          <text x="758" y="316" fill="#ff7a5c">R</text>
          <text x="786" y="316" fill="#ff7a5c">D</text>
          <text x="814" y="316" fill="#ff7a5c">S</text>
        </g>
        {/* HIDDEN: the dark O — no glow, barely there */}
        {v('neonletter') && (
          <text x="726" y="316" fontFamily="'Bricolage Grotesque', sans-serif" fontSize="26" letterSpacing="6" fill="#4a3a48" aria-hidden="true">
            O
          </text>
        )}
      </g>
      {/* shop window */}
      <g>
        <rect x="614" y="342" width="260" height="118" fill="#2c2340" stroke="#413d6b" strokeWidth="3" />
        <rect x="620" y="348" width="248" height="106" fill="#ffc46b" opacity=".14" />
        {/* records in the window (decoys) */}
        <g>
          <rect x="640" y="396" width="30" height="30" rx="1" fill="#55506e" transform="rotate(-6 655 411)" />
          <rect x="676" y="394" width="30" height="30" rx="1" fill="#6b5480" transform="rotate(4 691 409)" />
          <rect x="712" y="396" width="30" height="30" rx="1" fill="#4a4468" transform="rotate(-3 727 411)" />
          <rect x="790" y="394" width="30" height="30" rx="1" fill="#5c4a78" transform="rotate(5 805 409)" />
          <rect x="826" y="396" width="30" height="30" rx="1" fill="#55506e" transform="rotate(-5 841 411)" />
          <circle cx="691" cy="409" r="8" fill="#241f33" opacity=".6" />
          <circle cx="805" cy="409" r="8" fill="#241f33" opacity=".6" />
        </g>
        {/* window shelf */}
        <rect x="614" y="430" width="260" height="5" fill="#241f33" />
        <path d="M640 452 h60 M720 452 h80" stroke="#241f33" strokeWidth="2" opacity=".6" />
      </g>
      {/* HIDDEN: the coral paperback shelved flat among the sleeves */}
      {v('book') && (
        <g aria-hidden="true" transform="rotate(-2 750 424)">
          <rect x="737" y="420" width="26" height="9" rx="1.5" fill="#e85d43" />
          <rect x="760" y="421" width="3" height="7" fill="#e8d9c2" />
          <rect x="740" y="423" width="12" height="1.5" fill="#8f3526" opacity=".8" />
        </g>
      )}
      {/* HIDDEN: 45 adapter on the window ledge */}
      {v('adapter') && (
        <g aria-hidden="true">
          <circle cx="860" cy="462" r="5.5" fill="none" stroke="#d9a94e" strokeWidth="2.5" />
          <path d="M860 456.5 v-3 M855 465 l-2.5 2.5 M865 465 l2.5 2.5" stroke="#d9a94e" strokeWidth="2" />
        </g>
      )}
      {/* shop door */}
      <g>
        <rect x="886" y="360" width="58" height="100" fill="#241f33" stroke="#413d6b" strokeWidth="2" />
        <rect x="893" y="370" width="44" height="52" fill="#3a3164" />
        <circle cx="934" cy="425" r="3" fill="#8a84b0" />
      </g>
      {/* HIDDEN: guitar string pack at the doorstep */}
      {v('strings') && (
        <g aria-hidden="true" transform="rotate(6 905 545)">
          <rect x="895" y="538" width="20" height="14" rx="1.5" fill="#cfc4e6" />
          <circle cx="905" cy="545" r="4" fill="none" stroke="#7a6aa2" strokeWidth="1.2" />
          <path d="M897 540 h16" stroke="#7a6aa2" strokeWidth="1" />
        </g>
      )}

      {/* ===== SIDEWALK ===== */}
      <rect x="0" y="470" width="1000" height="150" fill="url(#dt-walk)" />
      <g stroke="#232038" strokeWidth="2">
        <path d="M0 502 h1000 M0 540 h1000 M0 582 h1000" />
      </g>
      <g stroke="#232038" strokeWidth="1.5" opacity=".7">
        <path d="M150 470 L120 620 M330 470 L315 620 M520 470 L520 620 M700 470 L720 620 M880 470 L905 620" />
      </g>
      <rect x="0" y="612" width="1000" height="8" fill="#1c1a30" />
      {/* lamppost pools of light */}
      <ellipse cx="500" cy="560" rx="120" ry="26" fill="#ffc46b" opacity=".07" />

      {/* ===== STREET FURNITURE ===== */}
      {/* hydrant */}
      <g>
        <ellipse cx="95" cy="588" rx="20" ry="5" fill="#1a1626" opacity=".6" />
        <path d="M85 586 v-26 q0 -12 10 -12 q10 0 10 12 v26 z" fill="#7d3a44" />
        <rect x="81" y="584" width="28" height="6" rx="2" fill="#5c2a35" />
        <rect x="92" y="542" width="6" height="8" rx="2" fill="#5c2a35" />
        <circle cx="85" cy="566" r="4" fill="#5c2a35" />
        <circle cx="105" cy="566" r="4" fill="#5c2a35" />
      </g>
      {/* HIDDEN: sheet music blown against the hydrant */}
      {v('sheetmusic') && (
        <g aria-hidden="true" transform="rotate(-14 105 568)">
          <path d="M96 556 q10 -3 18 2 l-2 22 q-8 -4 -16 -1 z" fill="#e8e4f2" opacity=".92" />
          <path d="M99 562 l13 1 M99 567 l13 1 M99 572 l13 1" stroke="#55516e" strokeWidth="1" />
          <circle cx="104" cy="565" r="1.3" fill="#37344f" />
        </g>
      )}
      {/* newspaper box */}
      <g>
        <rect x="128" y="474" width="40" height="52" rx="3" fill="#37345e" />
        <rect x="134" y="480" width="28" height="22" rx="2" fill="#241f33" />
        <rect x="140" y="526" width="16" height="14" fill="#2c2944" />
      </g>
      {/* HIDDEN: cassette on the newspaper box */}
      {v('cassette') && (
        <g aria-hidden="true" transform="rotate(-5 148 468)">
          <rect x="135" y="463" width="26" height="12" rx="2" fill="#241f33" stroke="#55506e" strokeWidth="1" />
          <rect x="139" y="466" width="18" height="4" rx="1" fill="#cfc4e6" />
          <circle cx="142" cy="472" r="1.6" fill="none" stroke="#55506e" strokeWidth="1" />
          <circle cx="154" cy="472" r="1.6" fill="none" stroke="#55506e" strokeWidth="1" />
        </g>
      )}

      {/* lamppost */}
      <g>
        <circle cx="500" cy="360" r="30" fill="url(#dt-glow)" />
        <rect x="495" y="352" width="8" height="188" fill="#241f33" />
        <rect x="490" y="536" width="18" height="8" rx="2" fill="#241f33" />
        <polygon points="490,352 508,352 505,334 493,334" fill="#241f33" />
        <rect x="494" y="338" width="10" height="12" fill="#ffc46b" opacity=".9" />
      </g>
      {/* HIDDEN: drumstick against the lamppost base */}
      {v('drumstick') && (
        <g aria-hidden="true">
          <path d="M472 574 L500 538" stroke="#a3785a" strokeWidth="4" strokeLinecap="round" />
          <circle cx="500" cy="538" r="2.8" fill="#a3785a" />
        </g>
      )}
      {/* parking meter decoy */}
      <g>
        <rect x="586" y="486" width="5" height="54" fill="#37345e" />
        <rect x="579" y="470" width="19" height="22" rx="4" fill="#37345e" />
        <rect x="583" y="475" width="11" height="8" rx="1" fill="#241f33" />
      </g>

      {/* milk crate of records */}
      <g>
        <ellipse cx="650" cy="568" rx="42" ry="7" fill="#1a1626" opacity=".6" />
        <rect x="618" y="520" width="62" height="44" rx="3" fill="#6b3f4d" />
        <path d="M618 532 h62 M618 546 h62 M630 520 v44 M646 520 v44 M662 520 v44" stroke="#54303c" strokeWidth="2" />
        <rect x="622" y="508" width="10" height="14" fill="#55506e" transform="rotate(-8 627 515)" />
        <rect x="636" y="506" width="10" height="16" fill="#4a4468" transform="rotate(4 641 514)" />
        <rect x="652" y="507" width="10" height="15" fill="#6b5480" transform="rotate(-3 657 514)" />
      </g>
      {/* HIDDEN: the vinyl 45 leaning on the crate — the souvenir */}
      {v('vinyl') && (
        <g aria-hidden="true">
          <circle cx="640" cy="548" r="14" fill="#241f33" stroke="#171326" strokeWidth="1" />
          <circle cx="640" cy="548" r="5" fill="#ffc46b" />
          <circle cx="640" cy="548" r="2" fill="#241f33" />
          <path d="M640 534 a14 14 0 0 1 10 4" stroke="#55506e" strokeWidth="1" fill="none" opacity=".7" />
        </g>
      )}
      {/* HIDDEN: capo on the crate edge */}
      {v('capo') && (
        <g aria-hidden="true" transform="rotate(-10 665 519)">
          <rect x="658" y="514" width="15" height="6" rx="3" fill="#37345e" stroke="#55506e" strokeWidth="1" />
          <path d="M660 520 q-2 5 3 6" stroke="#d9a94e" strokeWidth="2" fill="none" />
        </g>
      )}

      {/* trash can decoy */}
      <g>
        <ellipse cx="965" cy="590" rx="24" ry="5" fill="#1a1626" opacity=".6" />
        <path d="M948 588 l4 -40 h26 l4 40 z" fill="#37345e" />
        <path d="M950 556 h30 M951 566 h28 M952 576 h27" stroke="#2c2944" strokeWidth="2" />
        <ellipse cx="965" cy="548" rx="17" ry="4" fill="#413d6b" />
      </g>

      {/* ===== SMALL SCATTERED OBJECTS ===== */}
      {/* HIDDEN: ticket stub under the marquee */}
      {v('ticketstub') && (
        <g aria-hidden="true" transform="rotate(9 280 565)">
          <rect x="269" y="560" width="22" height="10" rx="1.5" fill="#d9a94e" />
          <path d="M283 560 v10" stroke="#a8843c" strokeWidth="1" strokeDasharray="2 2" />
          <circle cx="276" cy="565" r="2" fill="none" stroke="#a8843c" strokeWidth="1" />
        </g>
      )}
      {/* HIDDEN: guitar pick */}
      {v('pick') && (
        <g aria-hidden="true" transform="rotate(-16 350 585)">
          <path d="M344 580 q6 -4 12 0 q-1 8 -6 11 q-5 -3 -6 -11 z" fill="#d9a94e" />
        </g>
      )}
      {/* HIDDEN: drum key in the sidewalk crack */}
      {v('drumkey') && (
        <g aria-hidden="true" transform="rotate(24 550 592)">
          <rect x="544" y="586" width="12" height="5" rx="2" fill="#8a84b0" />
          <rect x="548" y="590" width="4" height="9" fill="#8a84b0" />
          <rect x="546.5" y="597" width="7" height="4" rx="1" fill="#6f6a92" />
        </g>
      )}
      {/* HIDDEN: foam earplug — coral, like the neon reflections */}
      {v('earplug') && (
        <g aria-hidden="true" transform="rotate(-30 720 578)">
          <rect x="714" y="574" width="12" height="7" rx="3.5" fill="#ff7a5c" />
          <path d="M716 576 h8" stroke="#e85d43" strokeWidth="1" opacity=".7" />
        </g>
      )}
    </>
  );
}
