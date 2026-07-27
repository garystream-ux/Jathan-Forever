import { burlingtonPainted } from '../scenes/burlingtonPainted.jsx';
import {
  niagaraPainted,
  detroitPainted,
  chicagoPainted,
  stpaulPainted,
  badlandsPainted,
  rockyPainted,
  zionPainted,
  vegasPainted,
  bigsurPainted,
} from '../scenes/paintedScenes.jsx';

// All ten stops now use painted (raster) backgrounds. The original SVG scene
// modules (burlington.jsx, niagara.jsx, detroit.jsx, chicago.jsx) remain in
// the repo for reference but are no longer wired in.

// Diary-entry URLs on jathanforever.com. The game ships to the same origin
// (jathanforever.com/game/), so these root-relative /journal/<slug> paths open
// the live entry from within the game. Slugs are the frontmatter `slug` values
// in content/journal/*.mdx, matched to each stop by route order.
const DIARY_URL_BURLINGTON = '/journal/burlington-leaving-home';
const DIARY_URL_NIAGARA = '/journal/niagara-falls';
const DIARY_URL_DETROIT = '/journal/detroit-motown';
const DIARY_URL_CHICAGO = '/journal/chicago-deep-dish';
const DIARY_URL_STPAUL = '/journal/st-paul';
const DIARY_URL_BADLANDS = '/journal/badlands-dawn';
const DIARY_URL_ROCKY = '/journal/rocky-mountain-stars';
const DIARY_URL_ZION = '/journal/zion-red-rock';
const DIARY_URL_VEGAS = '/journal/vegas-fourth-of-july';
const DIARY_URL_BIGSUR = '/journal/big-sur-end-of-the-road';

// Rank thresholds scale with how many objects a scene hides, so a 6-object
// stop and an 11-object stop are judged on a comparable pace rather than a
// flat clock. `labels` is [gold, silver, bronze, finished].
function ranksFor(count, labels) {
  return [
    { under: Math.round(count * 13) + 15, label: labels[0] },
    { under: Math.round(count * 22) + 25, label: labels[1] },
    { under: Math.round(count * 34) + 40, label: labels[2] },
    { under: Infinity, label: labels[3] },
  ];
}

// Route metadata. Narration alternates by route position, matching each
// journal entry's author (Ethan on odd stops, Jacob on even). `map` positions
// each stop's marker on the route-map SVG (viewBox 0 0 1000 470); `label`
// picks which side the name renders on.
export const STOPS = [
  {
    slug: 'burlington',
    title: 'Burlington, VT',
    short: 'Burlington',
    subtitle: 'the waterfront · golden hour',
    narrator: 'Ethan',
    map: { x: 868, y: 155, label: 'above' },
    // Painted prototype (raster background). The original SVG scene is kept in
    // burlington.jsx for comparison / easy revert.
    scene: burlingtonPainted,
    diaryUrl: DIARY_URL_BURLINGTON,
    intro:
      "Jacob swears everything's packed. The cooler is on the porch. *Everything*, he says.",
    // v2 painting restored the original spec souvenir: the syrup jug by the kiosk.
    souvenir: { id: 'jug', name: 'Maple syrup jug', icon: '🍁' },
    rankNoun: 'harbor rank',
    ranks: ranksFor(burlingtonPainted.registry.length, [
      'HARBOR MASTER',
      'DOCK CAPTAIN',
      'FIRST MATE',
      'LANDLUBBER (PROMISING)',
    ]),
    hintLine: 'Something glinted over there...',
    legend: "Misclicks add +5s. Spots are limited — the sun won't wait.",
    quips: {
      found: [
        'Logged it. Jacob owes me one.',
        'Found before sundown. Barely.',
        'The lake gives things back if you ask nice.',
        "One less thing Jacob 'definitely packed.'",
        'Eagle eyes. Or gull eyes.',
        'Recovered. No questions asked.',
        '*This* is why we make lists, Jacob.',
      ],
      miss: [
        "That's a shadow with confidence.",
        'Just dock planks.',
        'Nope — ask the gulls.',
        'The lake keeps its secrets. (+5s)',
        "Squint harder. The sun won't wait.",
        'Jacob says warmer. Jacob is guessing.',
      ],
    },
  },
  {
    slug: 'niagara',
    title: 'Niagara Falls, ON',
    short: 'Niagara',
    subtitle: 'the falls overlook · mist and ponchos',
    narrator: 'Jacob',
    map: { x: 780, y: 182, label: 'below' },
    souvenir: { id: 'barrel', name: 'Barrel keychain', icon: '🛢️' },
    scene: niagaraPainted,
    diaryUrl: DIARY_URL_NIAGARA,
    intro:
      "Ethan read that the mist 'really gets you.' The mist really got us. *Everything we own is damp now.*",
    rankNoun: 'overlook rank',
    ranks: ranksFor(niagaraPainted.registry.length, [
      'BARREL LEGEND',
      'PONCHO CAPTAIN',
      'SPRAY CADET',
      'THOROUGHLY SOAKED (PROMISING)',
    ]),
    hintLine: 'Something glinted through the mist...',
    legend: 'Misclicks add +5s. The mist rolls in fast.',
    quips: {
      found: [
        "Found it. Still damp. Everything's damp.",
        'One point for team dry-ish.',
        "Ethan says he 'was about to find that.' Sure.",
        'Logged before the mist eats it.',
        "The falls can't have this one.",
        'Recovered. Squeegee not included.',
        '*This* is why we zip the pockets, Ethan.',
      ],
      miss: [
        'That was mist. You clicked mist.',
        'Nope. Wet rock.',
        'The falls keep their tips. (+5s)',
        'A poncho, but not our poncho.',
        'Squint through the spray.',
        'Ethan swears it was there. It was not.',
      ],
    },
  },
  {
    slug: 'detroit',
    title: 'Detroit, MI',
    short: 'Detroit',
    subtitle: 'the theater block · evening neon',
    narrator: 'Ethan',
    map: { x: 716, y: 200, label: 'above' },
    // Window is full of near-identical records, so no single "vinyl" is
    // findable; the unique record crate is the souvenir instead.
    souvenir: { id: 'crate', name: 'Record crate', icon: '📦' },
    scene: detroitPainted,
    diaryUrl: DIARY_URL_DETROIT,
    intro:
      'Jacob came for one record. We now own a crate. The crate has a name. *The crate is Gerald.*',
    rankNoun: 'marquee rank',
    ranks: ranksFor(detroitPainted.registry.length, [
      'CHART TOPPER',
      'HEADLINER',
      'OPENING ACT',
      'SOUNDCHECK (PROMISING)',
    ]),
    hintLine: 'Something glinted under the neon...',
    legend: 'Misclicks add +5s. The show starts soon.',
    quips: {
      found: [
        'Logged. Gerald approves.',
        'Found it on the one. Very Motown.',
        "Jacob claims he 'left that there on purpose.'",
        'Smooth recovery. No scratches.',
        'Another one for the liner notes.',
        "That's rhythm, is what that is.",
        '*This* city hides things in plain sight.',
      ],
      miss: [
        'Just brick. Soulful brick, but brick.',
        "The neon's messing with you. (+5s)",
        'Nope — ask the pigeons on the marquee.',
        "That's a shadow doing its best.",
        'Off beat. Try the downbeat.',
        'Gerald says colder.',
      ],
    },
  },
  {
    slug: 'chicago',
    title: 'Chicago, IL',
    short: 'Chicago',
    subtitle: 'the riverwalk · dusk',
    narrator: 'Jacob',
    map: { x: 660, y: 222, label: 'below' },
    souvenir: { id: 'deepdish', name: 'Deep-dish slice', icon: '🍕' },
    scene: chicagoPainted,
    diaryUrl: DIARY_URL_CHICAGO,
    intro:
      'Ethan asked for ketchup on his hot dog. Out loud. In public. *We can never come back.*',
    rankNoun: 'riverwalk rank',
    ranks: ranksFor(chicagoPainted.registry.length, [
      'SKYLINE LEGEND',
      'RIVERWALK REGULAR',
      'LOOP TOURIST',
      'LOST ON THE LOOP (PROMISING)',
    ]),
    hintLine: 'Something glinted by the river...',
    legend: "Misclicks add +5s. Dusk doesn't linger.",
    quips: {
      found: [
        'Found it. The city forgives us a little.',
        'Logged between bites.',
        'Deep dish, deep focus.',
        "Ethan didn't see it first. Noted for the record.",
        'One more for the river ledger.',
        'The pigeons were guarding that.',
        "*This* is architecture, technically.",
      ],
      miss: [
        "That's a pigeon. A regular one.",
        'Just dusk doing dusk things. (+5s)',
        'The river keeps its change.',
        'Nope. Decorative bollard.',
        'Ethan says warmer. Ethan is on his second slice.',
        'Squint at the skyline later.',
      ],
    },
  },
  {
    slug: 'stpaul',
    title: 'St. Paul, MN',
    short: 'St. Paul',
    subtitle: 'the riverfront · summer-fair evening',
    narrator: 'Ethan',
    map: { x: 566, y: 182, label: 'above' },
    souvenir: { id: 'corndog', name: 'Corn dog', icon: '🌭' },
    scene: stpaulPainted,
    diaryUrl: DIARY_URL_STPAUL,
    intro:
      "Jacob found a corn dog the size of my forearm. He's calling it dinner. *He's calling it a personality.*",
    rankNoun: 'riverfront rank',
    ranks: ranksFor(stpaulPainted.registry.length, [
      'FAIR ROYALTY',
      'MIDWAY REGULAR',
      'FUNNEL-CAKE ROOKIE',
      'LOST BY THE TILT-A-WHIRL (PROMISING)',
    ]),
    hintLine: 'Something glinted by the water...',
    legend: "Misclicks add +5s. The fair won't stay lit forever.",
    quips: {
      found: [
        'Logged it. The corn dog stays, though.',
        'Found before the boat pulls out.',
        'One for the ledger, one for Jacob.',
        'Ethan-brand eagle eyes.',
        'The river almost kept that one.',
        'Nothing gets past a full stomach.',
      ],
      miss: [
        'That was a string light. (+5s)',
        'Nope — just fair glow.',
        'The river keeps its change.',
        'Jacob says warmer. Jacob is on the Ferris wheel.',
        'Squint past the popcorn.',
      ],
    },
  },
  {
    slug: 'badlands',
    title: 'Badlands NP, SD',
    short: 'Badlands',
    subtitle: 'the buttes · pink dawn',
    narrator: 'Jacob',
    map: { x: 452, y: 198, label: 'below' },
    // Painting rendered no clear fossil, so the canteen is the findable souvenir.
    souvenir: { id: 'canteen', name: 'Canteen', icon: '🧴' },
    scene: badlandsPainted,
    diaryUrl: DIARY_URL_BADLANDS,
    intro:
      "We got up before the sun to see the sun. Ethan didn't complain once. *That's how I knew it mattered.*",
    rankNoun: 'overlook rank',
    ranks: ranksFor(badlandsPainted.registry.length, [
      'DAWN CHASER',
      'RIDGE WALKER',
      'TRAIL ROOKIE',
      'STILL FINDING THE TRAILHEAD (PROMISING)',
    ]),
    hintLine: 'Something caught the dawn light...',
    legend: 'Misclicks add +5s. The light changes fast at dawn.',
    quips: {
      found: [
        'Found it. The quiet helps.',
        'Logged, soft as the light.',
        'Ethan spotted the sky; I spotted this.',
        "One more before the sun's all the way up.",
        'The prairie gives it back.',
        'Good eyes for this hour.',
      ],
      miss: [
        'Just a shadow on the rock. (+5s)',
        'Nope — morning playing tricks.',
        'The buttes keep their secrets.',
        "That's grass being dramatic.",
        'Look again, slower.',
      ],
    },
  },
  {
    slug: 'rocky',
    title: 'Rocky Mountain NP, CO',
    short: 'Rockies',
    subtitle: 'the campsite · under the starfield',
    narrator: 'Ethan',
    map: { x: 370, y: 254, label: 'above' },
    // Painting rendered no constellation card, so the thermos is the souvenir.
    souvenir: { id: 'thermos', name: 'Thermos', icon: '🥤' },
    scene: rockyPainted,
    diaryUrl: DIARY_URL_ROCKY,
    intro:
      'Jacob swears he knows three constellations. He knows one. *He points at it a lot.*',
    rankNoun: 'campsite rank',
    ranks: ranksFor(rockyPainted.registry.length, [
      'STAR NAVIGATOR',
      'CAMP CAPTAIN',
      'TENT ROOKIE',
      'STILL SETTING UP CAMP (PROMISING)',
    ]),
    hintLine: 'Something glinted by the firelight...',
    legend: 'Misclicks add +5s. The fire only throws so much light.',
    quips: {
      found: [
        'Logged by firelight.',
        'Found it. Jacob takes credit anyway.',
        'Warm win, cold night.',
        'One for the trip ledger.',
        'The dark almost had that.',
        'Sharp eyes, marshmallow brain.',
      ],
      miss: [
        'Just a shadow the fire made. (+5s)',
        'Nope — ask the pines.',
        'The night keeps that one.',
        "That's a star, Jacob. Not a clue.",
        'Squint past the smoke.',
      ],
    },
  },
  {
    slug: 'zion',
    title: 'Zion NP, UT',
    short: 'Zion',
    subtitle: 'the canyon trail · midday',
    narrator: 'Jacob',
    map: { x: 274, y: 296, label: 'above' },
    // Painting rendered no permit tag, so the hiking pole is the souvenir.
    souvenir: { id: 'hikingpole', name: 'Hiking pole', icon: '🥾' },
    scene: zionPainted,
    diaryUrl: DIARY_URL_ZION,
    intro:
      'Ethan read the whole trail sign out loud. Twice. *I have not seen him drink water since Tuesday.*',
    rankNoun: 'canyon rank',
    ranks: ranksFor(zionPainted.registry.length, [
      'CANYON LEGEND',
      'TRAIL BOSS',
      'SWITCHBACK ROOKIE',
      'STILL AT THE TRAILHEAD (PROMISING)',
    ]),
    hintLine: 'Something glinted on the red rock...',
    legend: 'Misclicks add +5s. Midday sun is not patient.',
    quips: {
      found: [
        'Found it. Hydrate, Ethan.',
        'Logged against the red rock.',
        'Cool win, hot trail.',
        "Ethan didn't see it. Noted.",
        'The canyon gives it up.',
        'Good eyes in this glare.',
      ],
      miss: [
        'Just red rock being red. (+5s)',
        'Nope — sun in your eyes.',
        'The river keeps it.',
        "That's a lizard's problem now.",
        'Squint past the shimmer.',
      ],
    },
  },
  {
    slug: 'vegas',
    title: 'Las Vegas, NV',
    short: 'Vegas',
    subtitle: 'the strip · Fourth of July night',
    // Narrator matches the site's journal canon: Ethan on odd stops (9).
    narrator: 'Ethan',
    map: { x: 232, y: 326, label: 'below' },
    souvenir: { id: 'chip', name: 'Poker chip', icon: '🪙' },
    scene: vegasPainted,
    diaryUrl: DIARY_URL_VEGAS,
    intro:
      'I budgeted for fireworks. I did not budget for me, near a claw machine. *Jacob is keeping the receipts.*',
    rankNoun: 'strip rank',
    ranks: ranksFor(vegasPainted.registry.length, [
      'HIGH ROLLER',
      'STRIP REGULAR',
      'PENNY-SLOT ROOKIE',
      'STILL COUNTING QUARTERS (PROMISING)',
    ]),
    hintLine: 'Something flashed in the neon...',
    legend: "Misclicks add +5s. The fireworks won't wait.",
    quips: {
      found: [
        "Logged. The house doesn't get this one.",
        'Found it under all that neon.',
        "Cash in — that's a win.",
        'Jacob blinked; I found it.',
        'The strip gives one back.',
        "Neon can't hide everything.",
      ],
      miss: [
        'That was a neon sign. (+5s)',
        'Nope — just glare.',
        'The house keeps it.',
        "That's a firework, not a clue.",
        'Squint through the sparkle.',
      ],
    },
  },
  {
    slug: 'bigsur',
    title: 'Big Sur, CA',
    short: 'Big Sur',
    subtitle: 'end of the road · Pacific sunset',
    // Narrator matches the site's journal canon: Jacob on even stops (10).
    narrator: 'Jacob',
    map: { x: 112, y: 306, label: 'above' },
    souvenir: { id: 'postcard', name: 'Postcard', icon: '💌' },
    scene: bigsurPainted,
    diaryUrl: DIARY_URL_BIGSUR,
    intro:
      "End of the road. Neither of us wants to say it like that. *So we just watch the water instead.*",
    rankNoun: 'coast rank',
    ranks: ranksFor(bigsurPainted.registry.length, [
      'PACIFIC LEGEND',
      'COAST CAPTAIN',
      'CLIFFSIDE ROOKIE',
      'STILL PARKED AT THE OVERLOOK (PROMISING)',
    ]),
    hintLine: 'Something caught the last light...',
    legend: 'Misclicks add +5s. The sun is almost down.',
    quips: {
      found: [
        'Found it. One more for the road.',
        'Logged, last stop.',
        'Ethan smiled at that one.',
        'The coast gives it back, gentle.',
        'Good eyes, end of the road.',
        'That one felt like keeping.',
      ],
      miss: [
        'Just the tide moving. (+5s)',
        'Nope — sunset glare.',
        'The Pacific keeps it.',
        "That's a gull, not a clue.",
        "Look again, we've got a minute.",
      ],
    },
  },
];

export function getStop(slug) {
  return STOPS.find((s) => s.slug === slug) || null;
}

export function stopIndex(slug) {
  return STOPS.findIndex((s) => s.slug === slug);
}

// The trip is complete once every stop has been swept (which means every
// souvenir and every coral paperback has been collected).
export function tripComplete(progress) {
  return STOPS.every((s) => !!progress.levels[s.slug]);
}
