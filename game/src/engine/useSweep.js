import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { pickRun } from './shuffle.js';

let fxKey = 0;

// The engine core: shuffle selection, count-up timer, hint budget,
// misclick penalty, found state, transient FX, win detection.
// Scenes are pure data + art; nothing here knows about any specific stop.
export function useSweep(scene, stop) {
  const [runId, setRunId] = useState(0);
  const selected = useMemo(() => pickRun(scene.registry), [scene, runId]);
  const totalHints = stop.hints ?? 4;

  const [found, setFound] = useState(() => new Set());
  const [seconds, setSeconds] = useState(0);
  const [misclicks, setMisclicks] = useState(0);
  const [hintsLeft, setHintsLeft] = useState(totalHints);
  const [effects, setEffects] = useState([]);
  const [message, setMessage] = useState('');
  const [done, setDone] = useState(false);

  const timerRef = useRef(null);
  const doneRef = useRef(false);
  const timeoutsRef = useRef(new Set());
  // Mirror of `found` so rapid clicks batched into one render can't lose a
  // find to a stale state snapshot.
  const foundRef = useRef(found);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    if (!timerRef.current && !doneRef.current) {
      timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    }
  }, []);

  useEffect(() => {
    const timeouts = timeoutsRef.current;
    return () => {
      stopTimer();
      timeouts.forEach(clearTimeout);
    };
  }, [stopTimer]);

  const addEffect = useCallback((fx, ttl) => {
    const key = ++fxKey;
    setEffects((list) => [...list, { ...fx, key }]);
    const t = setTimeout(() => {
      setEffects((list) => list.filter((e) => e.key !== key));
      timeoutsRef.current.delete(t);
    }, ttl);
    timeoutsRef.current.add(t);
  }, []);

  const quip = (lines) => lines[Math.floor(Math.random() * lines.length)];

  const handleHit = useCallback(
    (id) => {
      if (doneRef.current || foundRef.current.has(id)) return;
      startTimer();
      const next = new Set(foundRef.current);
      next.add(id);
      foundRef.current = next;
      setFound(next);
      setMessage(quip(stop.quips.found));
      if (next.size === selected.length) {
        doneRef.current = true;
        stopTimer();
        setDone(true);
      }
    },
    [selected, stop, startTimer, stopTimer]
  );

  const handleMiss = useCallback(
    (x, y) => {
      if (doneRef.current) return;
      startTimer();
      setMisclicks((m) => m + 1);
      setSeconds((s) => s + 5);
      addEffect({ type: 'ripple', x, y }, 900);
      addEffect({ type: 'float', x, y: Math.max(y - 14, 16), text: '+5s' }, 1200);
      setMessage(quip(stop.quips.miss));
    },
    [stop, startTimer, addEffect]
  );

  const useHint = useCallback(() => {
    if (doneRef.current || hintsLeft <= 0) return;
    const remaining = selected.filter((o) => !foundRef.current.has(o.id));
    if (!remaining.length) return;
    startTimer();
    setHintsLeft((h) => h - 1);
    const target = remaining[Math.floor(Math.random() * remaining.length)];
    addEffect({ type: 'pulse', x: target.x, y: target.y }, 1900);
    setMessage(stop.hintLine);
  }, [hintsLeft, selected, found, stop, startTimer, addEffect]);

  const reset = useCallback(() => {
    stopTimer();
    doneRef.current = false;
    setDone(false);
    foundRef.current = new Set();
    setFound(foundRef.current);
    setSeconds(0);
    setMisclicks(0);
    setHintsLeft(totalHints);
    setEffects([]);
    setMessage('');
    setRunId((r) => r + 1); // reshuffle: a new 14 every run
  }, [stopTimer, totalHints]);

  return {
    selected,
    found,
    seconds,
    misclicks,
    hintsLeft,
    totalHints,
    effects,
    message,
    done,
    runId,
    handleHit,
    handleMiss,
    useHint,
    reset,
  };
}

export function fmtTime(s) {
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m < 10 ? '0' : ''}${m}:${r < 10 ? '0' : ''}${r}`;
}

export function rankFor(ranks, seconds) {
  return ranks.find((r) => seconds < r.under).label;
}
