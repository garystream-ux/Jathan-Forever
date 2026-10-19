'use client';

import { useRef, useState, type CSSProperties } from 'react';

interface StopVideoProps {
  src: string;
  poster: string;
  /** accessible name, e.g. "Badlands at Dawn, narrated by Jacob" */
  label: string;
  /** narrator's voice color (the entry's ink) for the play button */
  color: string;
  /** small line under the frame, e.g. "Jacob · 1:17" */
  caption?: string;
}

/**
 * A vertical (9:16) clip from the stop. Nothing loads but the poster until
 * the reader presses play (preload="none"): no autoplay, no reliance on
 * lazy-loading or IntersectionObserver, so it can't strand a blank frame.
 * Native controls take over once playing; plays inline on phones.
 */
export default function StopVideo({ src, poster, label, color, caption }: StopVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  const play = () => {
    const v = ref.current;
    if (!v) return;
    setStarted(true);
    v.play().catch(() => {
      // Playback refused (rare after a click): leave the native controls up.
    });
  };

  return (
    // Width capped by viewport height too, so the whole 9:16 frame (and its
    // play button) fits on a phone screen and on short laptop screens.
    <figure className="mx-auto w-full" style={{ maxWidth: 'min(22rem, calc(64svh * 9 / 16))' }}>
      <div className="relative aspect-[9/16] w-full overflow-hidden rounded-2xl bg-ink shadow-soft">
        <video
          ref={ref}
          src={src}
          poster={poster}
          preload="none"
          playsInline
          controls={started}
          controlsList="nodownload"
          onEnded={() => setStarted(false)}
          aria-label={label}
          className="absolute inset-0 h-full w-full object-cover"
        />
        {!started && (
          <button
            type="button"
            onClick={play}
            aria-label={`Play: ${label}`}
            className="group absolute inset-0 flex items-center justify-center bg-ink/10 transition-colors duration-300 ease-physical hover:bg-ink/0 focus-visible:outline-none"
          >
            <span
              className="flex h-16 w-16 items-center justify-center rounded-full text-bone shadow-lift ring-4 ring-bone/80 transition-transform duration-300 ease-physical group-hover:scale-105 group-focus-visible:ring-atlantic motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              style={{ backgroundColor: color } as CSSProperties}
            >
              <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7" fill="currentColor" aria-hidden="true">
                <path d="M7 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5z" />
              </svg>
            </span>
          </button>
        )}
      </div>
      {caption && (
        <figcaption className="mt-3 text-center font-sans text-sm tabular-nums text-ink/55">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
