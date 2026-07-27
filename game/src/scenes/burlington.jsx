/*
 * Stop 1 — Burlington, VT. Ported from waterfront-sweep.html (the reference
 * implementation) and expanded from 14 to a 19-object shuffle pool.
 *
 * Scene contract:
 *  - Art: SVG artwork component; receives `visible` (Set of selected ids) and
 *    only renders the hidden-object art for selected objects. Decoys and
 *    scenery always render.
 *  - registry: one entry per hidden object — { id, name, icon, x, y, hit,
 *    always?, souvenir? }. x/y anchor the found rings and hint pulses; `hit`
 *    describes the generous invisible hit shape the engine renders on top.
 */

export const burlington = {
  slug: 'burlington',
  viewBox: '0 0 1000 620',
  ariaLabel:
    'Burlington waterfront boardwalk at sunset. Lake Champlain and the Adirondacks in the distance, with a bench, tree, snack kiosk, picnic table, and Adirondack chairs. Fourteen objects are hidden in the scene.',
  Art: BurlingtonArt,
  registry: [
    // The coral paperback: in every scene, always selected. The game's signature.
    { id: 'book', name: 'Paperback book', icon: '📕', x: 370, y: 354, hit: { type: 'circle', r: 16 }, always: true },
    // Souvenir: always selected so completing the stop always earns it.
    { id: 'syrup', name: 'Maple syrup jug', icon: '🍁', x: 640, y: 416, hit: { type: 'circle', r: 15 }, always: true, souvenir: true },
    { id: 'cone', name: 'Dropped ice cream', icon: '🍦', x: 750, y: 524, hit: { type: 'circle', r: 18 } },
    { id: 'shades', name: 'Sunglasses', icon: '🕶️', x: 680, y: 424, hit: { type: 'circle', r: 15 } },
    { id: 'rod', name: 'Fishing rod', icon: '🎣', x: 736, y: 363, hit: { type: 'line', x1: 700, y1: 392, x2: 772, y2: 334, w: 18 } },
    { id: 'boat', name: 'Toy sailboat', icon: '⛵', x: 366, y: 292, hit: { type: 'circle', r: 15 } },
    { id: 'duck', name: 'Mallard duck', icon: '🦆', x: 704, y: 329, hit: { type: 'circle', r: 16 } },
    { id: 'skate', name: 'Skateboard', icon: '🛹', x: 345, y: 399, hit: { type: 'rect', x: 316, y: 388, w: 58, h: 22 } },
    { id: 'cup', name: 'Coffee cup', icon: '☕', x: 253, y: 373, hit: { type: 'circle', r: 14 } },
    { id: 'key', name: 'Brass key', icon: '🔑', x: 782, y: 360, hit: { type: 'circle', r: 14 } },
    { id: 'frisbee', name: 'Frisbee', icon: '🥏', x: 150, y: 190, hit: { type: 'circle', r: 15 } },
    { id: 'camera', name: 'Camera', icon: '📷', x: 138, y: 341, hit: { type: 'circle', r: 14 } },
    { id: 'map', name: 'Folded map', icon: '🗺️', x: 590, y: 481, hit: { type: 'circle', r: 15 } },
    { id: 'rope', name: 'Rope coil', icon: '🪢', x: 64, y: 470, hit: { type: 'circle', r: 18 } },
    { id: 'feather', name: 'Gull feather', icon: '🪶', x: 476, y: 402, hit: { type: 'circle', r: 13 } },
    // Pool expansion (new for the port):
    { id: 'flipflop', name: 'Lone flip-flop', icon: '🩴', x: 196, y: 505, hit: { type: 'circle', r: 16 } },
    { id: 'ball', name: 'Tennis ball', icon: '🎾', x: 444, y: 549, hit: { type: 'circle', r: 14 } },
    { id: 'watch', name: 'Wristwatch', icon: '⌚', x: 664, y: 356, hit: { type: 'circle', r: 14 } },
    { id: 'ticket', name: 'Ferry ticket stub', icon: '🎟️', x: 196, y: 424, hit: { type: 'circle', r: 15 } },
  ],
};

function BurlingtonArt({ visible }) {
  const v = (id) => visible.has(id);
  return (
    <>
      <defs>
        <linearGradient id="bl-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1b1d3f" />
          <stop offset=".45" stopColor="#3a3566" />
          <stop offset=".75" stopColor="#8c5470" />
          <stop offset=".95" stopColor="#e8825c" />
        </linearGradient>
        <linearGradient id="bl-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7c5a7e" />
          <stop offset=".3" stopColor="#4d4574" />
          <stop offset="1" stopColor="#28294f" />
        </linearGradient>
        <linearGradient id="bl-wood" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6e5138" />
          <stop offset="1" stopColor="#463323" />
        </linearGradient>
        <radialGradient id="bl-sunglow" cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#ffd9a0" stopOpacity=".9" />
          <stop offset=".4" stopColor="#ffb56b" stopOpacity=".35" />
          <stop offset="1" stopColor="#ffb56b" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="bl-lampglow" cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#ffc46b" stopOpacity=".5" />
          <stop offset="1" stopColor="#ffc46b" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ===== SKY ===== */}
      <rect x="0" y="0" width="1000" height="320" fill="url(#bl-sky)" />
      <circle cx="380" cy="212" r="86" fill="url(#bl-sunglow)" />
      <circle cx="380" cy="212" r="29" fill="#ffd9a0" />
      {/* clouds */}
      <g opacity=".8">
        <ellipse cx="180" cy="90" rx="70" ry="12" fill="#4a4070" />
        <ellipse cx="205" cy="82" rx="45" ry="9" fill="#5c4a78" />
        <ellipse cx="640" cy="70" rx="90" ry="13" fill="#4a4070" />
        <ellipse cx="680" cy="62" rx="55" ry="9" fill="#6b5480" />
        <ellipse cx="560" cy="150" rx="75" ry="9" fill="#8c5a72" opacity=".8" />
        <ellipse cx="850" cy="120" rx="60" ry="10" fill="#5c4a78" />
      </g>
      {/* flying gulls */}
      <g stroke="#d8d4e6" strokeWidth="2" fill="none" opacity=".75">
        <path d="M498 118 q6 -7 12 0 q6 -7 12 0" />
        <path d="M545 142 q5 -6 10 0 q5 -6 10 0" />
      </g>

      {/* ===== ADIRONDACKS ===== */}
      <polygon
        points="0,238 60,205 140,228 230,196 320,226 420,204 520,230 610,200 720,228 820,206 920,230 1000,212 1000,240 0,240"
        fill="#4a3f6b"
      />
      <polygon
        points="0,240 90,222 190,240 300,220 400,238 500,222 620,240 740,220 860,238 1000,226 1000,242 0,242"
        fill="#33305c"
      />

      {/* ===== LAKE ===== */}
      <rect x="0" y="240" width="1000" height="150" fill="url(#bl-water)" />
      <g stroke="#8a76a0" strokeWidth="1.5" opacity=".22">
        <path d="M0 262 h1000" />
        <path d="M0 285 h1000" />
        <path d="M0 310 h1000" />
        <path d="M0 336 h1000" />
        <path d="M0 362 h1000" />
      </g>
      {/* sun glitter path */}
      <g fill="#ffc46b">
        <rect x="362" y="252" width="34" height="3" opacity=".8" rx="1.5" />
        <rect x="370" y="262" width="22" height="3" opacity=".65" rx="1.5" />
        <rect x="356" y="273" width="40" height="3" opacity=".55" rx="1.5" />
        <rect x="372" y="285" width="20" height="3" opacity=".5" rx="1.5" />
        <rect x="360" y="297" width="36" height="3" opacity=".4" rx="1.5" />
        <rect x="368" y="311" width="26" height="3" opacity=".35" rx="1.5" />
        <rect x="354" y="326" width="44" height="3" opacity=".28" rx="1.5" />
        <rect x="366" y="344" width="30" height="3" opacity=".22" rx="1.5" />
      </g>

      {/* breakwater lighthouse */}
      <rect x="130" y="234" width="70" height="6" fill="#2a2648" />
      <rect x="156" y="210" width="12" height="26" fill="#d8d0dc" />
      <rect x="154" y="206" width="16" height="6" fill="#a34a44" />
      <rect x="159" y="199" width="6" height="8" fill="#241f33" />
      <circle cx="162" cy="203" r="2" fill="#ffc46b" />

      {/* sailboats */}
      <g>
        <path d="M600 268 l22 -46 l4 46 z" fill="#e8e0ea" />
        <path d="M632 268 l-2 -34 l18 34 z" fill="#cfc4d8" />
        <rect x="596" y="268" width="58" height="9" rx="4" fill="#2a2648" />
        <path
          d="M622 282 q2 14 -2 26 M630 282 q-1 12 2 22"
          stroke="#d8d4e6"
          strokeWidth="1.5"
          opacity=".2"
          fill="none"
        />
      </g>
      <g opacity=".85">
        <path d="M252 254 l10 -20 l2 20 z" fill="#cfc4d8" />
        <rect x="248" y="254" width="24" height="5" rx="2.5" fill="#2a2648" />
      </g>

      {/* HIDDEN: toy sailboat adrift in the sun glitter */}
      {v('boat') && (
        <g aria-hidden="true">
          <path d="M362 296 l7 -13 l1.5 13 z" fill="#f0e0d0" />
          <path d="M358 296 h16 l-3 5 h-10 z" fill="#7a4a52" />
        </g>
      )}

      {/* HIDDEN: mallard duck in the dark water */}
      {v('duck') && (
        <g aria-hidden="true">
          <ellipse cx="702" cy="332" rx="12" ry="7" fill="#2f3158" />
          <circle cx="712" cy="324" r="5" fill="#33355e" />
          <path d="M717 324 l7 1.5 l-7 2 z" fill="#5c5040" />
          <path d="M686 334 a18 6 0 0 0 34 3" stroke="#8a76a0" strokeWidth="1" fill="none" opacity=".3" />
        </g>
      )}

      {/* ===== BOARDWALK ===== */}
      <rect x="0" y="388" width="1000" height="232" fill="url(#bl-wood)" />
      <g stroke="#3a2b1e" strokeWidth="2">
        <path d="M0 412 h1000 M0 440 h1000 M0 472 h1000 M0 508 h1000 M0 548 h1000 M0 590 h1000" />
      </g>
      <g stroke="#3a2b1e" strokeWidth="1.5" opacity=".7">
        <path d="M160 388 L120 620 M330 388 L310 620 M500 388 L500 620 M670 388 L692 620 M840 388 L880 620" />
      </g>
      <g stroke="#7d5f42" strokeWidth="1" opacity=".4">
        <path d="M40 424 h70 M210 456 h90 M420 492 h80 M560 424 h60 M760 460 h90 M120 530 h100 M620 570 h120 M300 600 h90" />
      </g>

      {/* HIDDEN: ferry ticket stub dropped near the lamppost */}
      {v('ticket') && (
        <g aria-hidden="true" transform="rotate(-8 196 424)">
          <rect x="185" y="419" width="22" height="10" rx="1.5" fill="#c9a97c" />
          <path d="M199 419 v10" stroke="#a3854f" strokeWidth="1" strokeDasharray="2 2" />
          <circle cx="192" cy="424" r="2" fill="none" stroke="#a3854f" strokeWidth="1" />
        </g>
      )}

      {/* HIDDEN: lone flip-flop on the shaded planks */}
      {v('flipflop') && (
        <g aria-hidden="true" transform="rotate(-18 196 505)">
          <ellipse cx="196" cy="505" rx="7" ry="14" fill="#7c5a7e" />
          <path d="M196 512 q-4 -6 -6 -10 M196 512 q4 -6 6 -10" stroke="#524b6e" strokeWidth="1.5" fill="none" />
          <circle cx="196" cy="510" r="1" fill="#524b6e" />
        </g>
      )}

      {/* ===== RAILING (along the water) ===== */}
      <g fill="#503c2b">
        <rect x="34" y="350" width="9" height="44" />
        <rect x="134" y="350" width="9" height="44" />
        <rect x="234" y="350" width="9" height="44" />
        <rect x="434" y="350" width="9" height="44" />
        <rect x="534" y="350" width="9" height="44" />
        <rect x="634" y="350" width="9" height="44" />
        <rect x="734" y="350" width="9" height="44" />
      </g>
      <rect x="0" y="354" width="770" height="6" fill="#5c4430" />
      <rect x="0" y="374" width="770" height="5" fill="#54402c" />
      <g fill="#5c4430">
        <rect x="30" y="346" width="17" height="5" rx="2" />
        <rect x="130" y="346" width="17" height="5" rx="2" />
        <rect x="230" y="346" width="17" height="5" rx="2" />
        <rect x="430" y="346" width="17" height="5" rx="2" />
        <rect x="530" y="346" width="17" height="5" rx="2" />
        <rect x="630" y="346" width="17" height="5" rx="2" />
        <rect x="730" y="346" width="17" height="5" rx="2" />
      </g>

      {/* HIDDEN: camera resting on a railing post cap */}
      {v('camera') && (
        <g aria-hidden="true">
          <rect x="130" y="336" width="17" height="11" rx="2" fill="#2a2440" />
          <circle cx="138" cy="341" r="3.5" fill="#171326" stroke="#4a4068" strokeWidth="1" />
          <rect x="133" y="333" width="6" height="4" rx="1" fill="#2a2440" />
        </g>
      )}

      {/* HIDDEN: wristwatch draped over the top rail */}
      {v('watch') && (
        <g aria-hidden="true">
          <path d="M658 352 q6 -3 12 0 v8 q-6 3 -12 0 z" fill="#3a2c33" />
          <circle cx="664" cy="356" r="4" fill="#ffc46b" opacity=".9" />
          <circle cx="664" cy="356" r="4" fill="none" stroke="#241f33" strokeWidth="1.5" />
        </g>
      )}

      {/* life ring decoy on railing */}
      <circle cx="520" cy="364" r="12" fill="#d8d0dc" />
      <circle cx="520" cy="364" r="12" fill="none" stroke="#a34a44" strokeWidth="4" strokeDasharray="6 8" />
      <circle cx="520" cy="364" r="5" fill="#3a3566" />

      {/* standing gull decoy */}
      <g>
        <ellipse cx="600" cy="342" rx="9" ry="6" fill="#d8d4e6" />
        <circle cx="608" cy="335" r="4" fill="#d8d4e6" />
        <path d="M612 335 l5 1 l-5 1.5 z" fill="#d99a4e" />
        <path d="M600 348 v6 M604 348 v6" stroke="#d99a4e" strokeWidth="1.5" />
      </g>

      {/* HIDDEN: fishing rod leaning along the railing */}
      {v('rod') && (
        <g aria-hidden="true">
          <path d="M700 392 L772 334" stroke="#5a4430" strokeWidth="3" strokeLinecap="round" />
          <path d="M772 334 q6 -4 10 -2" stroke="#5a4430" strokeWidth="2" fill="none" />
          <circle cx="712" cy="384" r="4.5" fill="none" stroke="#4a3626" strokeWidth="2.5" />
          <path d="M770 336 q3 10 -1 18" stroke="#8a76a0" strokeWidth=".8" fill="none" opacity=".6" />
        </g>
      )}

      {/* bicycle decoy leaning on railing */}
      <g stroke="#241f33" strokeWidth="2.5" fill="none">
        <circle cx="72" cy="372" r="15" />
        <circle cx="116" cy="372" r="15" />
        <path d="M72 372 L90 350 L116 372 M90 350 L84 372 M84 372 h32 M88 344 h10 M112 352 l8 -5" />
      </g>

      {/* ===== TREE (left) ===== */}
      <rect x="74" y="384" width="56" height="13" fill="#241f33" />
      <path d="M98 392 C96 350 100 300 102 258 L112 258 C112 300 108 350 110 392 z" fill="#3a2c33" />
      <path d="M104 300 L82 268 M106 280 L132 252 M103 320 L84 300" stroke="#3a2c33" strokeWidth="5" strokeLinecap="round" />
      <circle cx="85" cy="215" r="48" fill="#4a4468" />
      <circle cx="60" cy="180" r="36" fill="#524b6e" />
      <circle cx="105" cy="160" r="45" fill="#5f5578" />
      <circle cx="140" cy="195" r="52" fill="#575070" />
      <circle cx="160" cy="230" r="38" fill="#4a4468" />
      <circle cx="168" cy="172" r="30" fill="#8a5f6d" />
      <circle cx="178" cy="208" r="24" fill="#9c6a6b" />
      {/* HIDDEN: frisbee lodged in the sunset-lit leaves (partially occluded by canopy) */}
      {v('frisbee') && (
        <g aria-hidden="true">
          <circle cx="150" cy="190" r="11" fill="#c4766a" />
          <circle cx="150" cy="190" r="6.5" fill="none" stroke="#a35a52" strokeWidth="2" />
        </g>
      )}
      <circle cx="133" cy="206" r="25" fill="#575070" />
      <circle cx="120" cy="240" r="26" fill="#443e60" />

      {/* ===== LAMPPOST ===== */}
      <circle cx="238" cy="248" r="30" fill="url(#bl-lampglow)" />
      <rect x="226" y="388" width="24" height="10" rx="2" fill="#241f33" />
      <rect x="234" y="262" width="7" height="128" fill="#2f2b45" />
      <rect x="229" y="378" width="17" height="5" rx="1" fill="#2f2b45" />
      <polygon points="226,262 250,262 246,240 230,240" fill="#2f2b45" />
      <rect x="231" y="244" width="14" height="15" fill="#ffc46b" opacity=".9" />
      <rect x="228" y="236" width="20" height="5" rx="2" fill="#241f33" />
      {/* HIDDEN: coffee cup on the lamppost ledge */}
      {v('cup') && (
        <g aria-hidden="true">
          <path d="M247 366 h12 l-1.5 14 h-9 z" fill="#4c3826" />
          <rect x="248" y="371" width="10" height="5" fill="#6b5138" />
          <rect x="245.5" y="364" width="15" height="3" rx="1.5" fill="#3a2b1e" />
        </g>
      )}

      {/* ===== BENCH ===== */}
      <g>
        <rect x="300" y="328" width="8" height="72" fill="#5c4430" />
        <rect x="384" y="328" width="8" height="72" fill="#5c4430" />
        <rect x="296" y="332" width="100" height="7" rx="2" fill="#7a5a40" />
        <rect x="296" y="343" width="100" height="7" rx="2" fill="#7a5a40" />
        <rect x="292" y="358" width="108" height="8" rx="2" fill="#8f6b4b" />
        <rect x="292" y="356.5" width="108" height="2" fill="#c4766a" opacity=".55" />
        <rect x="292" y="369" width="108" height="7" rx="2" fill="#7a5a40" />
        <rect x="302" y="378" width="7" height="24" fill="#5c4430" />
        <rect x="384" y="378" width="7" height="24" fill="#5c4430" />
      </g>
      {/* HIDDEN: the coral paperback left on the bench (Ethan's own book — wink) */}
      {v('book') && (
        <g aria-hidden="true">
          <g transform="rotate(-4 370 354)">
            <rect x="357" y="349" width="26" height="9" rx="1.5" fill="#e85d43" />
            <rect x="380" y="350" width="3" height="7" fill="#e8d9c2" />
            <rect x="360" y="352" width="12" height="1.5" fill="#8f3526" opacity=".8" />
          </g>
        </g>
      )}
      {/* bench shadow */}
      <ellipse cx="345" cy="405" rx="32" ry="7" fill="#1a1626" opacity=".8" />
      {/* HIDDEN: skateboard tucked under the bench */}
      {v('skate') && (
        <g aria-hidden="true">
          <rect x="322" y="394" width="46" height="6" rx="3" fill="#3a2e3f" />
          <rect x="328" y="399" width="4" height="3" fill="#241f33" />
          <rect x="356" y="399" width="4" height="3" fill="#241f33" />
          <circle cx="330" cy="403" r="4" fill="#55506e" />
          <circle cx="358" cy="403" r="4" fill="#55506e" />
        </g>
      )}

      {/* ===== ADIRONDACK CHAIRS ===== */}
      <g>
        <ellipse cx="452" cy="486" rx="40" ry="8" fill="#1a1626" opacity=".6" />
        <path d="M428 420 q24 -10 48 0 l-4 52 h-40 z" fill="#46617a" />
        <path d="M438 421 v48 M450 418 v51 M462 418 v51 M474 421 v48" stroke="#334a5e" strokeWidth="2" />
        <rect x="418" y="450" width="18" height="7" rx="3" fill="#527089" />
        <rect x="468" y="450" width="18" height="7" rx="3" fill="#527089" />
        <rect x="424" y="470" width="7" height="20" fill="#334a5e" />
        <rect x="472" y="470" width="7" height="20" fill="#334a5e" />
      </g>
      <g>
        <ellipse cx="530" cy="500" rx="40" ry="8" fill="#1a1626" opacity=".6" />
        <path d="M506 432 q24 -10 48 0 l-4 54 h-40 z" fill="#3f5870" />
        <path d="M516 433 v50 M528 430 v53 M540 430 v53 M552 433 v50" stroke="#2e4356" strokeWidth="2" />
        <rect x="496" y="464" width="18" height="7" rx="3" fill="#4b667e" />
        <rect x="546" y="464" width="18" height="7" rx="3" fill="#4b667e" />
        <rect x="502" y="484" width="7" height="20" fill="#2e4356" />
        <rect x="550" y="484" width="7" height="20" fill="#2e4356" />
      </g>
      {/* dog decoy */}
      <g>
        <ellipse cx="398" cy="528" rx="26" ry="11" fill="#a3785a" />
        <circle cx="376" cy="522" r="9" fill="#a3785a" />
        <polygon points="370,515 371,507 376,514" fill="#8a6248" />
        <path d="M420 528 q12 -3 10 -14" stroke="#a3785a" strokeWidth="5" fill="none" strokeLinecap="round" />
        <circle cx="373" cy="521" r="1.3" fill="#241f33" />
      </g>
      {/* HIDDEN: tennis ball the dog is pretending not to see */}
      {v('ball') && (
        <g aria-hidden="true">
          <ellipse cx="444" cy="554" rx="8" ry="2.5" fill="#1a1626" opacity=".5" />
          <circle cx="444" cy="549" r="6.5" fill="#a3a05a" />
          <path d="M438.5 547 q5.5 -3 11 0 M438.5 551 q5.5 3 11 0" stroke="#8a874a" strokeWidth="1.2" fill="none" />
        </g>
      )}

      {/* ===== PICNIC TABLE ===== */}
      <g>
        <ellipse cx="632" cy="510" rx="85" ry="10" fill="#1a1626" opacity=".55" />
        <path d="M578 452 L560 500 M688 452 L706 500 M596 452 L586 476 M670 452 L680 476" stroke="#4c3826" strokeWidth="5" />
        <rect x="560" y="428" width="146" height="22" rx="3" fill="#8f6b4b" />
        <path d="M560 435 h146 M560 442 h146" stroke="#6e5138" strokeWidth="1.5" />
        <rect x="560" y="427" width="146" height="2" fill="#c4766a" opacity=".45" />
        <rect x="544" y="478" width="80" height="10" rx="2" fill="#7a5a40" />
        <rect x="644" y="478" width="80" height="10" rx="2" fill="#7a5a40" />
      </g>
      {/* HIDDEN: maple syrup jug on the table — Burlington's souvenir */}
      {v('syrup') && (
        <g aria-hidden="true" transform="rotate(2 640 418)">
          <path d="M634 428 v-12 q0 -4 4 -4 h5 q4 0 4 4 v12 z" fill="#a97e4f" />
          <rect x="637" y="407" width="6" height="5" fill="#8a6b3a" />
          <rect x="635.5" y="404.5" width="9" height="3" rx="1.5" fill="#4c3826" />
          <path d="M647 415 q5 2 1.5 8" stroke="#8a6b3a" strokeWidth="2" fill="none" />
          <rect x="636.5" y="417" width="8" height="6" rx="1" fill="#c9a97c" opacity=".9" />
        </g>
      )}
      {/* HIDDEN: folded sunglasses at the shaded end of the table */}
      {v('shades') && (
        <g aria-hidden="true">
          <g transform="rotate(-6 682 424)">
            <circle cx="676" cy="424" r="4.5" fill="#241f33" />
            <circle cx="687" cy="424" r="4.5" fill="#241f33" />
            <path d="M680 424 h3.5 M671 423 l-8 -2" stroke="#241f33" strokeWidth="2" fill="none" />
          </g>
        </g>
      )}
      {/* HIDDEN: folded trail map on the picnic bench */}
      {v('map') && (
        <g aria-hidden="true">
          <g transform="rotate(7 588 480)">
            <rect x="578" y="474" width="21" height="13" rx="1" fill="#c9b28a" />
            <path d="M585 474 v13 M592 474 v13" stroke="#a38f6b" strokeWidth="1" />
            <circle cx="595" cy="478" r="1.5" fill="#a34a44" />
          </g>
        </g>
      )}
      {/* cooler decoy */}
      <rect x="626" y="524" width="36" height="24" rx="3" fill="#6b3f4d" />
      <rect x="626" y="524" width="36" height="7" rx="3" fill="#7d4c5c" />
      <rect x="638" y="520" width="12" height="4" rx="2" fill="#54303c" />

      {/* ===== SNACK KIOSK (right) ===== */}
      <g>
        <ellipse cx="868" cy="434" rx="110" ry="12" fill="#1a1626" opacity=".55" />
        <rect x="765" y="298" width="200" height="134" fill="#574a72" />
        <path d="M765 298 v134 M805 298 v134 M845 298 v134 M885 298 v134 M925 298 v134 M965 298 v134" stroke="#4a3f63" strokeWidth="2" />
        <polygon points="753,300 977,300 955,258 775,258" fill="#2f2b45" />
        <rect x="810" y="268" width="118" height="24" rx="3" fill="#241f33" />
        <text
          x="869"
          y="285"
          textAnchor="middle"
          fontFamily="'Bricolage Grotesque', sans-serif"
          fontSize="15"
          letterSpacing="4"
          fill="#ff7a5c"
        >
          SCOOPS
        </text>
        {/* service window w/ awning */}
        <rect x="800" y="330" width="92" height="56" fill="#241f33" />
        <path d="M796 330 h100 l-6 -16 h-88 z" fill="#c4766a" />
        <path d="M808 315 l4 15 M824 315 l3 15 M840 314 l2 16 M856 314 l1 16 M872 315 l-1 15" stroke="#8f4a44" strokeWidth="3" />
        <rect x="800" y="382" width="92" height="6" fill="#3a3258" />
        {/* menu board */}
        <rect x="928" y="336" width="28" height="40" rx="2" fill="#241f33" />
        <path d="M932 344 h20 M932 352 h16 M932 360 h20 M932 368 h13" stroke="#6b668c" strokeWidth="2" />
        {/* planter */}
        <rect x="770" y="410" width="52" height="20" rx="2" fill="#3a3258" />
        <path d="M778 410 q-2 -10 3 -14 M790 410 q0 -12 5 -15 M804 410 q2 -10 -2 -15" stroke="#5f7a5c" strokeWidth="2.5" fill="none" />
        {/* string lights */}
        <path d="M765 302 q50 14 100 2 q50 -12 100 4" stroke="#3a3258" strokeWidth="1.5" fill="none" />
        <g fill="#ffc46b">
          <circle cx="785" cy="306" r="2.5" />
          <circle cx="815" cy="310" r="2.5" />
          <circle cx="845" cy="309" r="2.5" />
          <circle cx="875" cy="304" r="2.5" />
          <circle cx="905" cy="302" r="2.5" />
          <circle cx="935" cy="305" r="2.5" />
        </g>
        <g fill="#ffc46b" opacity=".25">
          <circle cx="785" cy="306" r="5.5" />
          <circle cx="815" cy="310" r="5.5" />
          <circle cx="845" cy="309" r="5.5" />
          <circle cx="875" cy="304" r="5.5" />
          <circle cx="905" cy="302" r="5.5" />
          <circle cx="935" cy="305" r="5.5" />
        </g>
      </g>
      {/* HIDDEN: brass key on a nail beside the service window */}
      {v('key') && (
        <g aria-hidden="true">
          <circle cx="782" cy="352" r="1.5" fill="#6b668c" />
          <circle cx="782" cy="357" r="4" fill="none" stroke="#8a7a4e" strokeWidth="2" />
          <path d="M782 361 v9 M782 368 h3.5 M782 364.5 h2.5" stroke="#8a7a4e" strokeWidth="2" />
        </g>
      )}
      {/* HIDDEN: dropped ice-cream cone on the boardwalk */}
      {v('cone') && (
        <g aria-hidden="true">
          <ellipse cx="744" cy="530" rx="14" ry="4.5" fill="#9c8ab8" opacity=".85" />
          <ellipse cx="740" cy="527" rx="7" ry="4" fill="#b7a8e0" />
          <polygon points="746,526 768,514 754,532" fill="#b98a5a" />
          <path d="M752 524 l10 -5 M750 528 l12 -4" stroke="#96683e" strokeWidth="1" />
        </g>
      )}

      {/* HIDDEN: rope coil on the dock planks */}
      {v('rope') && (
        <g aria-hidden="true">
          <ellipse cx="62" cy="470" rx="16" ry="7" fill="none" stroke="#8a6b4a" strokeWidth="3" />
          <ellipse cx="62" cy="470" rx="10.5" ry="4.5" fill="none" stroke="#8a6b4a" strokeWidth="3" />
          <ellipse cx="62" cy="470" rx="5" ry="2" fill="none" stroke="#8a6b4a" strokeWidth="2.5" />
          <path d="M76 474 q10 3 14 1" stroke="#8a6b4a" strokeWidth="3" fill="none" />
        </g>
      )}

      {/* cleat */}
      <g>
        <rect x="440" y="396" width="22" height="5" rx="2.5" fill="#9a94ad" />
        <rect x="448" y="392" width="6" height="9" fill="#9a94ad" />
      </g>
      {/* HIDDEN: gull feather beside the cleat */}
      {v('feather') && (
        <g aria-hidden="true">
          <path d="M468 402 q10 -6 16 2 q-8 6 -16 -2 z" fill="#cfc9da" />
          <path d="M468 402 q9 -2 15 3" stroke="#a8a2ba" strokeWidth="1" fill="none" />
        </g>
      )}
    </>
  );
}
