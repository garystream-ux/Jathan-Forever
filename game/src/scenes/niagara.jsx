/*
 * Stop 2 — Niagara Falls, ON. The falls overlook: mist, a rainbow, and
 * poncho-clad tourists. 18-object pool; souvenir = the barrel keychain.
 * Decoys: two poncho tourists, the coin-op viewer, the tour boat, the gulls.
 */

export const niagara = {
  slug: 'niagara',
  viewBox: '0 0 1000 620',
  ariaLabel:
    'Niagara Falls overlook on a misty morning. A rainbow arcs over the horseshoe falls; a viewing platform in the foreground has a bench, a coin-operated viewer, and a souvenir cart. Fourteen objects are hidden in the scene.',
  Art: NiagaraArt,
  registry: [
    { id: 'book', name: 'Paperback book', icon: '📕', x: 350, y: 494, hit: { type: 'circle', r: 16 }, always: true },
    { id: 'barrel', name: 'Barrel keychain', icon: '🛢️', x: 782, y: 452, hit: { type: 'circle', r: 14 }, always: true, souvenir: true },
    { id: 'poncho', name: 'Rain poncho', icon: '🧥', x: 180, y: 428, hit: { type: 'circle', r: 16 } },
    { id: 'candytin', name: 'Maple candy tin', icon: '🍬', x: 872, y: 505, hit: { type: 'circle', r: 14 } },
    { id: 'lenscap', name: 'Lens cap', icon: '⚫', x: 560, y: 556, hit: { type: 'circle', r: 14 } },
    { id: 'loonie', name: 'Loonie coin', icon: '🪙', x: 452, y: 572, hit: { type: 'circle', r: 13 } },
    { id: 'umbrella', name: 'Folded umbrella', icon: '☂️', x: 258, y: 512, hit: { type: 'line', x1: 246, y1: 545, x2: 270, y2: 478, w: 18 } },
    { id: 'fogglasses', name: 'Fogged-up glasses', icon: '👓', x: 610, y: 408, hit: { type: 'circle', r: 14 } },
    { id: 'dispcam', name: 'Disposable camera', icon: '📸', x: 95, y: 462, hit: { type: 'circle', r: 15 } },
    { id: 'pennant', name: 'Souvenir pennant', icon: '🚩', x: 932, y: 362, hit: { type: 'circle', r: 15 } },
    { id: 'ticket', name: 'Boat-tour ticket', icon: '🎟️', x: 680, y: 585, hit: { type: 'circle', r: 15 } },
    { id: 'brochure', name: 'Falls brochure', icon: '🗞️', x: 800, y: 588, hit: { type: 'circle', r: 15 } },
    { id: 'duck', name: 'Rubber duck', icon: '🦆', x: 585, y: 222, hit: { type: 'circle', r: 14 } },
    { id: 'mug', name: 'Travel mug', icon: '🥤', x: 502, y: 545, hit: { type: 'circle', r: 14 } },
    { id: 'mitten', name: 'Lone mitten', icon: '🧤', x: 720, y: 405, hit: { type: 'circle', r: 14 } },
    { id: 'ziplock', name: 'Phone in a ziplock', icon: '📱', x: 390, y: 600, hit: { type: 'circle', r: 15 } },
    { id: 'pin', name: 'Enamel pin', icon: '📍', x: 285, y: 560, hit: { type: 'circle', r: 13 } },
    { id: 'spoon', name: 'Souvenir spoon', icon: '🥄', x: 900, y: 470, hit: { type: 'circle', r: 13 } },
  ],
};

function NiagaraArt({ visible }) {
  const v = (id) => visible.has(id);
  return (
    <>
      <defs>
        <linearGradient id="ni-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3f3d72" />
          <stop offset=".55" stopColor="#7a6aa2" />
          <stop offset="1" stopColor="#b7a8e0" />
        </linearGradient>
        <linearGradient id="ni-falls" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f0ecfa" />
          <stop offset="1" stopColor="#bfb4dd" />
        </linearGradient>
        <linearGradient id="ni-gorge" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5f7d94" />
          <stop offset="1" stopColor="#2e3a5e" />
        </linearGradient>
        <linearGradient id="ni-stone" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#514d6e" />
          <stop offset="1" stopColor="#37344f" />
        </linearGradient>
      </defs>

      {/* ===== SKY ===== */}
      <rect x="0" y="0" width="1000" height="320" fill="url(#ni-sky)" />
      <g opacity=".55">
        <ellipse cx="180" cy="70" rx="80" ry="12" fill="#8a7ab0" />
        <ellipse cx="230" cy="60" rx="50" ry="9" fill="#9c8cc0" />
        <ellipse cx="760" cy="90" rx="90" ry="13" fill="#8a7ab0" />
        <ellipse cx="820" cy="80" rx="55" ry="9" fill="#a394c8" />
      </g>
      {/* gulls */}
      <g stroke="#e8e4f2" strokeWidth="2" fill="none" opacity=".7">
        <path d="M300 120 q6 -7 12 0 q6 -7 12 0" />
        <path d="M740 150 q5 -6 10 0 q5 -6 10 0" />
      </g>

      {/* ===== FAR BANKS (tree lines) ===== */}
      <path d="M0 250 q60 -34 130 -26 q80 8 150 -10 q60 -14 110 -4 l0 90 L0 300 z" fill="#4a4468" />
      <path d="M1000 240 q-50 -28 -110 -20 q-60 8 -90 -6 l0 86 l200 0 z" fill="#4a4468" />
      <path d="M0 280 q80 -20 180 -12 q100 8 210 -6 l0 60 L0 322 z" fill="#3a3760" />
      <path d="M1000 272 q-70 -16 -150 -8 q-40 4 -70 -4 l0 60 l220 0 z" fill="#3a3760" />

      {/* ===== UPPER RIVER + FALLS ===== */}
      <path d="M380 205 h450 v25 h-450 z" fill="#7a92b0" />
      <g stroke="#93a8c2" strokeWidth="1.5" opacity=".5">
        <path d="M395 212 h420 M405 220 h400" />
      </g>
      {/* HIDDEN: rubber duck at the brink of the falls */}
      {v('duck') && (
        <g aria-hidden="true">
          <ellipse cx="585" cy="224" rx="7" ry="5" fill="#ffc46b" />
          <circle cx="591" cy="219" r="3.5" fill="#ffc46b" />
          <path d="M594.5 219 l4 1 l-4 1.5 z" fill="#e8825c" />
          <circle cx="592" cy="218" r=".8" fill="#241f33" />
        </g>
      )}
      {/* the curtain */}
      <path d="M380 228 q225 10 450 0 l0 160 q-225 16 -450 0 z" fill="url(#ni-falls)" />
      <g stroke="#d3c9ea" strokeWidth="2.5" opacity=".7">
        <path d="M410 234 v148 M460 237 v148 M515 239 v150 M570 240 v150 M625 240 v150 M680 239 v150 M735 237 v149 M790 234 v148" />
      </g>
      <g stroke="#ffffff" strokeWidth="1.5" opacity=".5">
        <path d="M435 236 v146 M540 240 v148 M655 240 v148 M762 236 v147" />
      </g>
      <path d="M380 228 q225 10 450 0" stroke="#ffffff" strokeWidth="3" fill="none" opacity=".8" />

      {/* ===== RAINBOW ===== */}
      <g fill="none" opacity=".32">
        <path d="M 355 385 A 250 250 0 0 1 845 385" stroke="#ff7a5c" strokeWidth="9" />
        <path d="M 368 385 A 237 237 0 0 1 832 385" stroke="#ffc46b" strokeWidth="9" />
        <path d="M 381 385 A 224 224 0 0 1 819 385" stroke="#b7a8e0" strokeWidth="9" />
      </g>

      {/* ===== GORGE ===== */}
      <rect x="0" y="385" width="1000" height="60" fill="url(#ni-gorge)" />
      <g fill="#e8e4f2" opacity=".55">
        <ellipse cx="450" cy="392" rx="46" ry="7" />
        <ellipse cx="560" cy="396" rx="60" ry="8" />
        <ellipse cx="690" cy="392" rx="44" ry="6" />
        <ellipse cx="360" cy="398" rx="30" ry="5" />
      </g>
      <g stroke="#7d92ac" strokeWidth="1.5" opacity=".4">
        <path d="M0 412 h1000 M0 428 h1000" />
      </g>
      {/* tour boat decoy */}
      <g>
        <path d="M480 428 h56 l-7 10 h-42 z" fill="#e8e4f2" />
        <rect x="492" y="420" width="32" height="8" rx="2" fill="#cfc4e6" />
        <rect x="502" y="413" width="12" height="7" rx="2" fill="#a34a44" />
      </g>

      {/* ===== MIST (atmosphere FX) ===== */}
      <g className="fx-mist" fill="#f0ecfa">
        <ellipse cx="430" cy="380" rx="90" ry="26" opacity=".3" />
        <ellipse cx="530" cy="360" rx="70" ry="20" opacity=".22" />
      </g>
      <g className="fx-mist" style={{ animationDuration: '12s', animationDelay: '-4s' }} fill="#f0ecfa">
        <ellipse cx="680" cy="372" rx="100" ry="28" opacity=".26" />
        <ellipse cx="770" cy="352" rx="60" ry="18" opacity=".2" />
      </g>

      {/* ===== RAILING ===== */}
      <g fill="#2e2b48">
        <rect x="0" y="415" width="1000" height="6" />
        <rect x="0" y="440" width="1000" height="4" />
      </g>
      <g fill="#26233e">
        <rect x="60" y="415" width="8" height="58" />
        <rect x="200" y="415" width="8" height="58" />
        <rect x="340" y="415" width="8" height="58" />
        <rect x="480" y="415" width="8" height="58" />
        <rect x="620" y="415" width="8" height="58" />
        <rect x="716" y="415" width="8" height="58" />
        <rect x="860" y="415" width="8" height="58" />
      </g>
      {/* HIDDEN: folded poncho draped on the railing (matches the tourists') */}
      {v('poncho') && (
        <g aria-hidden="true">
          <path d="M162 418 h36 l-3 20 h-30 z" fill="#cfc4e6" />
          <path d="M166 424 h28 M168 431 h24" stroke="#b3a6d6" strokeWidth="1.5" />
        </g>
      )}
      {/* HIDDEN: fogged-up glasses resting on the top rail */}
      {v('fogglasses') && (
        <g aria-hidden="true" transform="rotate(-5 610 408)">
          <circle cx="603" cy="408" r="5" fill="#e8e4f2" opacity=".85" stroke="#55516e" strokeWidth="1.5" />
          <circle cx="617" cy="408" r="5" fill="#e8e4f2" opacity=".85" stroke="#55516e" strokeWidth="1.5" />
          <path d="M608 408 h4 M598 407 l-6 -2" stroke="#55516e" strokeWidth="1.5" fill="none" />
        </g>
      )}
      {/* HIDDEN: lone mitten on a railing post */}
      {v('mitten') && (
        <g aria-hidden="true">
          <path d="M714 398 q0 -7 6 -7 q7 0 7 7 l-1 12 h-11 z" fill="#c4766a" />
          <path d="M714 402 q-5 -1 -4 4 l4 2" fill="#c4766a" />
        </g>
      )}

      {/* poncho tourists (decoys) at the railing */}
      <g>
        <path d="M628 392 q14 -26 28 0 l4 46 h-36 z" fill="#cfc4e6" />
        <circle cx="642" cy="378" r="10" fill="#cfc4e6" />
        <circle cx="642" cy="380" r="6" fill="#8a6b5a" />
        <path d="M636 438 v14 M648 438 v14" stroke="#37344f" strokeWidth="5" />
      </g>
      <g>
        <path d="M672 404 q11 -20 22 0 l3 34 h-28 z" fill="#c3b6dd" />
        <circle cx="683" cy="393" r="8" fill="#c3b6dd" />
        <circle cx="683" cy="395" r="4.5" fill="#a3785a" />
        <path d="M678 438 v10 M688 438 v10" stroke="#37344f" strokeWidth="4" />
      </g>

      {/* ===== PLATFORM ===== */}
      <rect x="0" y="470" width="1000" height="150" fill="url(#ni-stone)" />
      <g stroke="#2c2944" strokeWidth="2">
        <path d="M0 500 h1000 M0 536 h1000 M0 576 h1000" />
      </g>
      <g stroke="#2c2944" strokeWidth="1.5" opacity=".7">
        <path d="M140 470 L110 620 M320 470 L305 620 M500 470 L500 620 M680 470 L700 620 M870 470 L900 620" />
      </g>
      {/* wet sheen + puddles */}
      <g fill="#8a7ab0" opacity=".18">
        <ellipse cx="240" cy="590" rx="70" ry="9" />
        <ellipse cx="620" cy="605" rx="90" ry="10" />
        <ellipse cx="520" cy="520" rx="50" ry="6" />
      </g>
      <g stroke="#9c8cc0" strokeWidth="1" opacity=".3">
        <path d="M60 510 h80 M420 545 h70 M760 512 h60 M180 605 h90" />
      </g>

      {/* stone ledge (left) */}
      <rect x="40" y="470" width="110" height="16" rx="3" fill="#5f5a7c" />
      <rect x="52" y="486" width="86" height="40" fill="#454063" />
      {/* HIDDEN: disposable camera on the ledge */}
      {v('dispcam') && (
        <g aria-hidden="true" transform="rotate(-4 95 462)">
          <rect x="83" y="456" width="24" height="13" rx="2" fill="#d9a94e" />
          <circle cx="95" cy="462" r="4" fill="#37344f" stroke="#b98a3e" strokeWidth="1" />
          <rect x="100" y="458" width="5" height="4" fill="#37344f" />
        </g>
      )}

      {/* ===== BENCH ===== */}
      <g>
        <ellipse cx="315" cy="548" rx="70" ry="8" fill="#1a1626" opacity=".5" />
        <rect x="248" y="482" width="7" height="60" fill="#4c3826" />
        <rect x="380" y="482" width="7" height="60" fill="#4c3826" />
        <rect x="242" y="486" width="150" height="7" rx="2" fill="#6e5138" />
        <rect x="242" y="497" width="150" height="7" rx="2" fill="#6e5138" />
        <rect x="238" y="510" width="158" height="8" rx="2" fill="#7d5f42" />
        <rect x="246" y="520" width="7" height="26" fill="#4c3826" />
        <rect x="382" y="520" width="7" height="26" fill="#4c3826" />
      </g>
      {/* HIDDEN: the coral paperback on the bench slats */}
      {v('book') && (
        <g aria-hidden="true">
          <g transform="rotate(3 350 494)">
            <rect x="337" y="489" width="26" height="9" rx="1.5" fill="#e85d43" />
            <rect x="360" y="490" width="3" height="7" fill="#e8d9c2" />
            <rect x="340" y="492" width="12" height="1.5" fill="#8f3526" opacity=".8" />
          </g>
        </g>
      )}
      {/* HIDDEN: folded umbrella against the bench end */}
      {v('umbrella') && (
        <g aria-hidden="true">
          <path d="M246 545 L268 482" stroke="#37345e" strokeWidth="6" strokeLinecap="round" />
          <path d="M268 482 q4 -6 8 -4" stroke="#37345e" strokeWidth="3" fill="none" />
          <path d="M250 538 q-4 4 -1 8" stroke="#2a2748" strokeWidth="3" fill="none" />
          <path d="M252 528 l8 3 M258 512 l8 3" stroke="#2a2748" strokeWidth="2" />
        </g>
      )}
      {/* HIDDEN: enamel pin dropped near the bench */}
      {v('pin') && (
        <g aria-hidden="true">
          <circle cx="285" cy="560" r="4.5" fill="#e85d43" stroke="#ffc46b" strokeWidth="1.2" />
          <path d="M285 558 l1.5 2.5 h-3 z" fill="#ffc46b" />
        </g>
      )}

      {/* ===== COIN-OP VIEWER (decoy) ===== */}
      <g>
        <ellipse cx="470" cy="560" rx="34" ry="6" fill="#1a1626" opacity=".5" />
        <rect x="462" y="490" width="14" height="66" rx="3" fill="#3f3a58" />
        <rect x="455" y="552" width="28" height="8" rx="3" fill="#2e2b48" />
        <g transform="rotate(-8 470 480)">
          <rect x="448" y="468" width="44" height="22" rx="8" fill="#a34a44" />
          <circle cx="452" cy="479" r="7" fill="#241f33" />
          <circle cx="488" cy="479" r="7" fill="#241f33" />
          <rect x="464" y="462" width="12" height="8" rx="2" fill="#8f3d38" />
        </g>
      </g>
      {/* HIDDEN: loonie by the viewer base */}
      {v('loonie') && (
        <g aria-hidden="true">
          <circle cx="452" cy="572" r="5" fill="#c9a84c" stroke="#a8893c" strokeWidth="1.5" />
          <circle cx="452" cy="572" r="2.2" fill="none" stroke="#a8893c" strokeWidth=".8" />
        </g>
      )}
      {/* HIDDEN: travel mug beside the viewer */}
      {v('mug') && (
        <g aria-hidden="true">
          <path d="M495 534 h14 l-2 20 h-10 z" fill="#37345e" />
          <rect x="494" y="531" width="16" height="4" rx="2" fill="#ffc46b" />
          <path d="M509 538 q6 2 2 9" stroke="#2a2748" strokeWidth="2.5" fill="none" />
        </g>
      )}
      {/* HIDDEN: lens cap posing as a puddle */}
      {v('lenscap') && (
        <g aria-hidden="true">
          <circle cx="560" cy="556" r="7" fill="#241f33" />
          <circle cx="560" cy="556" r="4" fill="none" stroke="#3f3a58" strokeWidth="1.5" />
        </g>
      )}

      {/* ===== SOUVENIR CART ===== */}
      <g>
        <ellipse cx="860" cy="566" rx="105" ry="10" fill="#1a1626" opacity=".5" />
        {/* awning */}
        <path d="M756 402 h208 l-10 -24 h-188 z" fill="#c4766a" />
        <path d="M770 380 l4 22 M796 379 l3 23 M822 378 l2 24 M848 378 l1 24 M874 378 l0 24 M900 379 l-1 23 M926 380 l-3 22" stroke="#8f4a44" strokeWidth="4" />
        {/* body */}
        <rect x="768" y="402" width="184" height="118" fill="#4a4272" />
        <path d="M768 402 v118 M814 402 v118 M860 402 v118 M906 402 v118 M952 402 v118" stroke="#3c3560" strokeWidth="2" />
        {/* shelves */}
        <rect x="780" y="462" width="160" height="5" fill="#37305a" />
        <rect x="780" y="497" width="160" height="5" fill="#37305a" />
        {/* wheels */}
        <circle cx="800" cy="540" r="13" fill="#241f33" stroke="#55506e" strokeWidth="3" />
        <circle cx="915" cy="540" r="13" fill="#241f33" stroke="#55506e" strokeWidth="3" />
        {/* hook rail w/ keychains */}
        <rect x="772" y="440" width="80" height="3" fill="#37305a" />
        <path d="M790 443 v6 M810 443 v6 M830 443 v6" stroke="#37305a" strokeWidth="2" />
        <circle cx="810" cy="452" r="4" fill="#8a84b0" />
        <circle cx="830" cy="452" r="4" fill="#c4766a" />
        {/* trinkets on shelves (decoys) */}
        <rect x="790" y="486" width="14" height="11" rx="2" fill="#8a84b0" />
        <rect x="820" y="484" width="10" height="13" rx="2" fill="#c4766a" />
        <circle cx="852" cy="491" r="6" fill="#9c8cc0" />
        {/* pennant pole */}
        <rect x="922" y="340" width="4" height="40" fill="#37305a" />
      </g>
      {/* HIDDEN: barrel keychain on the hook rail — the souvenir */}
      {v('barrel') && (
        <g aria-hidden="true">
          <path d="M790 447 v3" stroke="#8a84b0" strokeWidth="1.5" />
          <circle cx="790" cy="446" r="1.5" fill="none" stroke="#8a84b0" strokeWidth="1" />
          <path d="M786 450 q-1 6 0 10 q4 2 8 0 q1 -4 0 -10 q-4 -2 -8 0 z" fill="#8a6b4a" />
          <path d="M785.5 453 h9 M785.5 457 h9" stroke="#6b4f35" strokeWidth="1.2" />
        </g>
      )}
      {/* HIDDEN: souvenir pennant on the cart's pole */}
      {v('pennant') && (
        <g aria-hidden="true">
          <path d="M926 344 l26 7 l-26 7 z" fill="#e85d43" />
          <path d="M929 347.5 l14 3.5 l-14 3.5 z" fill="#ffc46b" opacity=".7" />
        </g>
      )}
      {/* HIDDEN: maple candy tin on the low shelf */}
      {v('candytin') && (
        <g aria-hidden="true">
          <rect x="862" y="498" width="20" height="12" rx="2" fill="#d9a94e" />
          <path d="M872 501 l2.5 3 l-2.5 .8 l-2.5 -.8 z" fill="#a34a44" />
          <rect x="862" y="498" width="20" height="3" rx="1.5" fill="#b98a3e" />
        </g>
      )}
      {/* HIDDEN: souvenir spoon on the upper shelf */}
      {v('spoon') && (
        <g aria-hidden="true" transform="rotate(12 900 470)">
          <ellipse cx="893" cy="468" rx="4" ry="5.5" fill="#b8b4cc" />
          <rect x="895" y="470" width="14" height="2.5" rx="1" fill="#b8b4cc" />
        </g>
      )}

      {/* ===== SCATTERED ON THE PAVEMENT ===== */}
      {/* HIDDEN: wet boat-tour ticket */}
      {v('ticket') && (
        <g aria-hidden="true" transform="rotate(-10 680 585)">
          <rect x="669" y="580" width="22" height="10" rx="1.5" fill="#cfc4e6" opacity=".9" />
          <path d="M683 580 v10" stroke="#a394c8" strokeWidth="1" strokeDasharray="2 2" />
          <circle cx="676" cy="585" r="2" fill="none" stroke="#a394c8" strokeWidth="1" />
        </g>
      )}
      {/* HIDDEN: falls brochure near the cart wheel */}
      {v('brochure') && (
        <g aria-hidden="true" transform="rotate(7 800 588)">
          <rect x="789" y="581" width="22" height="14" rx="1" fill="#e8e4f2" />
          <path d="M796 581 v14 M803 581 v14" stroke="#b3a6d6" strokeWidth="1" />
          <path d="M791 586 q3 -3 5 0" stroke="#7a6aa2" strokeWidth="1" fill="none" />
        </g>
      )}
      {/* HIDDEN: phone in a ziplock bag */}
      {v('ziplock') && (
        <g aria-hidden="true" transform="rotate(-6 390 600)">
          <rect x="376" y="590" width="28" height="19" rx="2" fill="#e8e4f2" opacity=".55" />
          <rect x="381" y="594" width="14" height="12" rx="2" fill="#241f33" />
          <rect x="376" y="590" width="28" height="3" fill="#b7a8e0" opacity=".8" />
        </g>
      )}

      {/* small gull decoy on the platform */}
      <g>
        <ellipse cx="128" cy="586" rx="9" ry="6" fill="#d8d4e6" />
        <circle cx="136" cy="579" r="4" fill="#d8d4e6" />
        <path d="M140 579 l5 1 l-5 1.5 z" fill="#d99a4e" />
        <path d="M128 592 v5 M132 592 v5" stroke="#d99a4e" strokeWidth="1.5" />
      </g>
    </>
  );
}
