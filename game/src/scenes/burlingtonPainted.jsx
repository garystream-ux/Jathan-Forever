import { makePaintedScene } from './paintedScene.jsx';

/*
 * Stop 1 — Burlington, VT. Painted scene (raster art pivot), v2.
 *
 * Regenerated so the coral paperback is painted into the scene (on the green
 * bench) like every other stop. All objects are one-of-a-kind; wide objects
 * use rect hit zones. Souvenir is the maple syrup jug by the kiosk — back to
 * the original spec souvenir for Burlington.
 */
export const burlingtonPainted = makePaintedScene({
  slug: 'burlington',
  ariaLabel:
    'Burlington waterfront boardwalk at golden hour, painted scene. A green bench with a coral paperback on it, a twin-lantern lamppost, a big leafy tree, a picnic table by the water, a snack kiosk with a striped awning, a red steamer trunk, and a distant lighthouse. Eleven objects are hidden.',
  objects: [
    { id: 'paperback', name: 'Paperback book', icon: '📕', x: 690, y: 596, r: 38 },
    { id: 'jug', name: 'Maple syrup jug', icon: '🍁', x: 1452, y: 798, r: 62, souvenir: true },
    { id: 'bench', name: 'Green bench', icon: '🪑', x: 750, y: 618, w: 240, h: 190 },
    { id: 'lamppost', name: 'Twin lamppost', icon: '🏮', x: 766, y: 342, w: 95, h: 250 },
    { id: 'picnictable', name: 'Picnic table', icon: '🧺', x: 1010, y: 452, w: 150, h: 75 },
    { id: 'lighthouse', name: 'Lighthouse', icon: '🗼', x: 1164, y: 340, r: 40 },
    { id: 'awning', name: 'Striped awning', icon: '⛱️', x: 1428, y: 210, w: 310, h: 150 },
    { id: 'trunk', name: 'Steamer trunk', icon: '🧳', x: 1356, y: 610, w: 210, h: 170 },
    { id: 'bucket', name: 'White pail', icon: '🪣', x: 1180, y: 762, w: 100, h: 145 },
    { id: 'birdbath', name: 'Bird bath', icon: '🐦', x: 243, y: 825, r: 52 },
    { id: 'tree', name: 'Old tree', icon: '🌳', x: 280, y: 190, w: 480, h: 370 },
  ],
});
