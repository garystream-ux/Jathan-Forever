import { makePaintedScene } from './paintedScene.jsx';

// Coordinates are in each background's 1600x900 space. Rules learned from
// playtesting: (1) every listed object is one-of-a-kind in its scene — no
// "pick which of five stone pillars"; (2) wide/large objects use w/h rect hit
// zones so the whole object is clickable, compact ones use r circles;
// (3) the coral paperback (object 1) and the souvenir are always present.

export const niagaraPainted = makePaintedScene({
  slug: 'niagara',
  ariaLabel:
    'Painted Niagara Falls overlook at morning: a stone platform with a telescope, a bench, a souvenir cart, and a rainbow over the misty falls. Eight objects are hidden.',
  objects: [
    { id: 'paperback', name: 'Paperback book', icon: '📕', x: 224, y: 548, r: 42 },
    { id: 'telescope', name: 'Telescope', icon: '🔭', x: 352, y: 610, r: 58 },
    { id: 'bench', name: 'Wooden bench', icon: '🪑', x: 360, y: 545, w: 430, h: 130 },
    { id: 'rainbow', name: 'Rainbow', icon: '🌈', x: 565, y: 165, r: 64 },
    { id: 'steps', name: 'Stone steps', icon: '🪜', x: 1320, y: 395, w: 180, h: 200 },
    { id: 'awning', name: 'Striped awning', icon: '⛱️', x: 1510, y: 450, w: 250, h: 100 },
    { id: 'keychain', name: 'Barrel keychain', icon: '🛢️', x: 1478, y: 650, r: 42, souvenir: true },
  ],
});

export const detroitPainted = makePaintedScene({
  slug: 'detroit',
  ariaLabel:
    'Painted Detroit theater block at evening: a record shop with a neon sign, a lamppost, and a crate of records. Six objects are hidden.',
  objects: [
    { id: 'paperback', name: 'Paperback book', icon: '📕', x: 640, y: 556, r: 40 },
    { id: 'crate', name: 'Record crate', icon: '📦', x: 1064, y: 700, w: 180, h: 110, souvenir: true },
    { id: 'lamppost', name: 'Lamppost', icon: '🏮', x: 1296, y: 450, w: 90, h: 560 },
    { id: 'awning', name: 'Green awning', icon: '⛱️', x: 1484, y: 448, w: 180, h: 90 },
    { id: 'neon', name: 'Neon sign', icon: '🎵', x: 512, y: 312, w: 190, h: 290 },
    { id: 'neonstar', name: 'Neon star', icon: '⭐', x: 828, y: 300, r: 42 },
  ],
});

export const chicagoPainted = makePaintedScene({
  slug: 'chicago',
  ariaLabel:
    'Painted Chicago riverwalk at dusk: a bridge, a pizzeria with a striped awning, a green bench, and a planter. Eight objects are hidden.',
  objects: [
    { id: 'paperback', name: 'Paperback book', icon: '📕', x: 1011, y: 621, r: 40 },
    { id: 'pizza', name: 'Deep-dish slice', icon: '🍕', x: 1425, y: 539, r: 48, souvenir: true },
    { id: 'bench', name: 'Green bench', icon: '🪑', x: 1042, y: 645, w: 200, h: 160 },
    { id: 'awning', name: 'Striped awning', icon: '⛱️', x: 1300, y: 250, w: 510, h: 120 },
    { id: 'planter', name: 'Planter', icon: '🪴', x: 905, y: 555, w: 180, h: 130 },
    { id: 'bridge', name: 'Bridge', icon: '🌉', x: 780, y: 245, w: 400, h: 200 },
    { id: 'door', name: 'Shop door', icon: '🚪', x: 1265, y: 550, w: 150, h: 250 },
    { id: 'boat', name: 'River boat', icon: '⛵', x: 895, y: 425, r: 48 },
  ],
});

export const stpaulPainted = makePaintedScene({
  slug: 'stpaul',
  ariaLabel:
    'Painted St. Paul riverfront at a summer-fair evening: a paddlewheel riverboat, string lights, a popcorn cart, and a bench. Six objects are hidden.',
  objects: [
    { id: 'paperback', name: 'Paperback book', icon: '📕', x: 944, y: 696, r: 40 },
    { id: 'corndog', name: 'Corn dog', icon: '🌭', x: 528, y: 632, r: 44, souvenir: true },
    { id: 'bench', name: 'Wooden bench', icon: '🪑', x: 720, y: 700, w: 700, h: 300 },
    { id: 'riverboat', name: 'Paddlewheel boat', icon: '🚢', x: 630, y: 360, w: 560, h: 360 },
    { id: 'stringlights', name: 'String lights', icon: '✨', x: 960, y: 215, w: 340, h: 110 },
    { id: 'popcorn', name: 'Popcorn cart', icon: '🍿', x: 1272, y: 384, r: 52 },
  ],
});

export const badlandsPainted = makePaintedScene({
  slug: 'badlands',
  ariaLabel:
    'Painted Badlands overlook at dawn: a trail signpost, an overlook bench, a backpack on a rock, and a big grey boulder under a pink sky. Six objects are hidden.',
  objects: [
    { id: 'paperback', name: 'Paperback book', icon: '📕', x: 484, y: 716, r: 40 },
    { id: 'boulder', name: 'Boulder', icon: '🪨', x: 224, y: 632, w: 384, h: 200 },
    { id: 'signpost', name: 'Trail signpost', icon: '🪧', x: 1440, y: 400, w: 280, h: 640 },
    { id: 'backpack', name: 'Backpack', icon: '🎒', x: 1120, y: 576, r: 52 },
    { id: 'canteen', name: 'Canteen', icon: '🧴', x: 1162, y: 592, r: 34, souvenir: true },
    { id: 'bench', name: 'Overlook bench', icon: '🪑', x: 1510, y: 700, w: 180, h: 120 },
  ],
});

export const rockyPainted = makePaintedScene({
  slug: 'rocky',
  ariaLabel:
    'Painted Rocky Mountain campsite at night under the Milky Way: a tent, a campfire, camp chairs, and a lantern. Nine objects are hidden.',
  objects: [
    { id: 'paperback', name: 'Paperback book', icon: '📕', x: 792, y: 760, r: 42 },
    { id: 'campfire', name: 'Campfire', icon: '🔥', x: 160, y: 736, r: 58 },
    { id: 'tent', name: 'Tent', icon: '⛺', x: 136, y: 576, w: 270, h: 300 },
    { id: 'chairs', name: 'Camp chairs', icon: '🪑', x: 480, y: 680, w: 290, h: 210 },
    { id: 'lantern', name: 'Lantern', icon: '🏮', x: 384, y: 496, r: 44 },
    { id: 'cooler', name: 'Cooler', icon: '🧊', x: 408, y: 640, r: 42 },
    { id: 'thermos', name: 'Thermos', icon: '🥤', x: 736, y: 738, r: 40, souvenir: true },
    { id: 'log', name: 'Log', icon: '🪵', x: 864, y: 776, w: 160, h: 100 },
    { id: 'milkyway', name: 'Milky Way', icon: '🌌', x: 880, y: 240, r: 64 },
  ],
});

export const zionPainted = makePaintedScene({
  slug: 'zion',
  ariaLabel:
    'Painted Zion canyon trail at midday: red rock walls, a teal river, a trail marker, and hiking gear on a rock. Six objects are hidden.',
  objects: [
    { id: 'paperback', name: 'Paperback book', icon: '📕', x: 672, y: 752, r: 44 },
    { id: 'trailmarker', name: 'Trail marker', icon: '🪧', x: 1360, y: 560, w: 120, h: 210 },
    { id: 'waterbottle', name: 'Water bottle', icon: '🧴', x: 1216, y: 666, r: 40 },
    { id: 'hikingpole', name: 'Hiking pole', icon: '🥾', x: 1264, y: 626, r: 46, souvenir: true },
    { id: 'boulder', name: 'Big boulder', icon: '🪨', x: 920, y: 500, w: 230, h: 160 },
    { id: 'lonetree', name: 'Lone tree', icon: '🌲', x: 896, y: 96, r: 40 },
  ],
});

export const vegasPainted = makePaintedScene({
  slug: 'vegas',
  ariaLabel:
    'Painted Las Vegas strip on a Fourth of July night: an ornate lamppost, a neon star, a bench, and a newspaper box. Seven objects are hidden.',
  objects: [
    { id: 'paperback', name: 'Paperback book', icon: '📕', x: 1352, y: 632, r: 40 },
    { id: 'chip', name: 'Poker chip', icon: '🪙', x: 1176, y: 596, r: 38, souvenir: true },
    { id: 'bench', name: 'Bench', icon: '🪑', x: 1272, y: 608, w: 360, h: 180 },
    { id: 'newsbox', name: 'Newspaper box', icon: '🗞️', x: 344, y: 400, w: 120, h: 150 },
    { id: 'lamppost', name: 'Lamppost', icon: '🏮', x: 460, y: 340, w: 110, h: 360 },
    { id: 'trafficlight', name: 'Traffic light', icon: '🚦', x: 996, y: 384, r: 44 },
    { id: 'neonmarquee', name: 'Neon marquee', icon: '🎪', x: 992, y: 210, w: 500, h: 190 },
  ],
});

export const bigsurPainted = makePaintedScene({
  slug: 'bigsur',
  ariaLabel:
    'Painted Big Sur coastal overlook at sunset: ocean cliffs, an arched bridge, a bench, and the rear of a camper van. Seven objects are hidden.',
  objects: [
    { id: 'paperback', name: 'Paperback book', icon: '📕', x: 150, y: 452, r: 42 },
    { id: 'postcard', name: 'Postcard', icon: '💌', x: 556, y: 640, r: 44, souvenir: true },
    { id: 'bench', name: 'Bench', icon: '🪑', x: 340, y: 630, w: 500, h: 190 },
    { id: 'van', name: 'Camper van', icon: '🚐', x: 1490, y: 560, w: 230, h: 380 },
    { id: 'bridge', name: 'Arched bridge', icon: '🌉', x: 1120, y: 320, w: 320, h: 150 },
    { id: 'sun', name: 'Setting sun', icon: '🌅', x: 48, y: 148, r: 48 },
    { id: 'beach', name: 'Cove beach', icon: '🏖️', x: 1105, y: 388, r: 48 },
  ],
});
