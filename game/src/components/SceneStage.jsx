import { useEffect, useMemo, useRef, useState } from 'react';

// Minimum effective tap-target size on screen, in CSS px (engine req. #5).
const MIN_HIT_PX = 28;

// Authored size of a hit zone, used only to order overlapping zones so the
// smaller (more specific) target paints on top and wins the click.
function hitArea(o) {
  const h = o.hit;
  if (h.type === 'rect') return h.w * h.h;
  if (h.type === 'line') return Math.hypot(h.x2 - h.x1, h.y2 - h.y1) * h.w;
  return Math.PI * h.r * h.r; // circle
}

// Renders scene art, the invisible hit layer, and the FX overlay.
// Rule learned the hard way: hit shapes are ALWAYS the top layer with
// pointer-events: all — artwork never receives clicks, so visual occlusion
// can never swallow a click.
export default function SceneStage({ scene, game }) {
  const svgRef = useRef(null);
  const visible = useMemo(
    () => new Set(game.selected.map((o) => o.id)),
    [game.selected]
  );

  // Scale hit shapes so their on-screen size never drops below MIN_HIT_PX,
  // no matter how small the scene renders (e.g. 375px-wide phones).
  const vbWidth = Number(scene.viewBox.split(' ')[2]) || 1000;
  const [minUnits, setMinUnits] = useState(0);
  useEffect(() => {
    const svg = svgRef.current;
    const measure = () => {
      const w = svg.getBoundingClientRect().width;
      setMinUnits(w ? (MIN_HIT_PX * vbWidth) / w : 0);
    };
    measure();
    window.addEventListener('resize', measure);
    let ro;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(measure);
      ro.observe(svg);
    }
    return () => {
      window.removeEventListener('resize', measure);
      if (ro) ro.disconnect();
    };
  }, [vbWidth]);

  const onSvgClick = (ev) => {
    const svg = svgRef.current;
    const pt = svg.createSVGPoint();
    pt.x = ev.clientX;
    pt.y = ev.clientY;
    const p = pt.matrixTransform(svg.getScreenCTM().inverse());
    game.handleMiss(p.x, p.y);
  };

  return (
    <svg
      ref={svgRef}
      viewBox={scene.viewBox}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={scene.ariaLabel}
      onClick={onSvgClick}
    >
      <scene.Art visible={visible} />
      <g id="hits">
        {/* Render largest hit zones first so smaller ones paint on top and stay
            clickable when they overlap (e.g. the paperback resting on a bench). */}
        {[...game.selected]
          .sort((a, b) => hitArea(b) - hitArea(a))
          .map((o) => (
            <HitShape key={o.id} obj={o} game={game} minUnits={minUnits} />
          ))}
      </g>
      <g pointerEvents="none">
        {game.selected
          .filter((o) => game.found.has(o.id))
          .map((o) => (
            <g
              key={o.id}
              className="fx-found"
              style={{ transformOrigin: `${o.x}px ${o.y}px` }}
            >
              <circle cx={o.x} cy={o.y} r="20" fill="none" stroke="#ffffff" strokeWidth="3" />
              <circle cx={o.x} cy={o.y} r="20" fill="none" stroke="#ffc46b" strokeWidth="1.8" />
            </g>
          ))}
        {game.effects.map((fx) => (
          <Effect key={fx.key} fx={fx} />
        ))}
      </g>
    </svg>
  );
}

function HitShape({ obj, game, minUnits }) {
  const isFound = game.found.has(obj.id);
  const common = {
    className: 'hit',
    tabIndex: 0,
    role: 'button',
    'aria-label': `hidden ${obj.name.toLowerCase()}`,
    'aria-disabled': isFound || undefined,
    pointerEvents: 'all',
    onClick: (ev) => {
      ev.stopPropagation();
      game.handleHit(obj.id);
    },
    onKeyDown: (ev) => {
      if (ev.key === 'Enter' || ev.key === ' ') {
        ev.preventDefault();
        game.handleHit(obj.id);
      }
    },
  };
  const h = obj.hit;
  if (h.type === 'line') {
    return (
      <line
        {...common}
        x1={h.x1}
        y1={h.y1}
        x2={h.x2}
        y2={h.y2}
        stroke="#fff"
        strokeOpacity="0"
        strokeWidth={Math.max(h.w, minUnits)}
      />
    );
  }
  if (h.type === 'rect') {
    const w = Math.max(h.w, minUnits);
    const hh = Math.max(h.h, minUnits);
    return (
      <rect
        {...common}
        x={h.x - (w - h.w) / 2}
        y={h.y - (hh - h.h) / 2}
        width={w}
        height={hh}
        fill="#fff"
        fillOpacity="0"
      />
    );
  }
  return (
    <circle
      {...common}
      cx={obj.x}
      cy={obj.y}
      r={Math.max(h.r, minUnits / 2)}
      fill="#fff"
      fillOpacity="0"
    />
  );
}

function Effect({ fx }) {
  if (fx.type === 'ripple') {
    return (
      <g className="fx-ripple" style={{ transformOrigin: `${fx.x}px ${fx.y}px` }}>
        <circle cx={fx.x} cy={fx.y} r="7" fill="none" stroke="#e2564f" strokeWidth="2" />
      </g>
    );
  }
  if (fx.type === 'float') {
    return (
      <text className="fx-float" x={fx.x} y={fx.y} fill="#e2564f" fontSize="15" textAnchor="middle">
        {fx.text}
      </text>
    );
  }
  if (fx.type === 'pulse') {
    return (
      <circle className="fx-pulse" cx={fx.x} cy={fx.y} r="30" fill="none" stroke="#ff7a5c" strokeWidth="3" />
    );
  }
  return null;
}
