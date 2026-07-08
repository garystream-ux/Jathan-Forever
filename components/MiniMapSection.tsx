'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

const MiniMap = dynamic(() => import('./MiniMap'), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse bg-ink/5" />,
});

/**
 * Defers the Leaflet chunk (and its tile requests) until the inset actually
 * approaches the viewport — most readers never scroll this far, so they never
 * pay for the map at all.
 */
export default function MiniMapSection(props: {
  lat: number;
  lng: number;
  color: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || near) return;
    if (!('IntersectionObserver' in window)) {
      setNear(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true);
          observer.disconnect();
        }
      },
      // Start loading a comfortable distance before it scrolls into view.
      { rootMargin: '600px 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [near]);

  return (
    <div
      ref={ref}
      className="h-64 overflow-hidden rounded-xl border border-clay/20 shadow-soft"
    >
      {near ? (
        <MiniMap {...props} />
      ) : (
        <div className="h-full w-full animate-pulse bg-ink/5" />
      )}
    </div>
  );
}
