import Link from 'next/link';
import { getHomeCopy } from '@/lib/homepage';

export default function NotFound() {
  const { notFound } = getHomeCopy();

  return (
    <div className="shell flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-4 max-w-2xl font-display text-4xl tracking-tightish text-ink sm:text-6xl">
        {notFound.heading}
      </h1>
      <p className="mt-5 max-w-md font-sans text-lg text-ink/65">{notFound.body}</p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="rounded-full bg-ink px-6 py-3 font-sans text-sm font-medium text-bone transition-colors hover:bg-atlantic"
        >
          {notFound.button}
        </Link>
        <Link href="/journey" className="link-underline font-sans text-sm font-medium text-ink">
          See the map
        </Link>
      </div>
    </div>
  );
}
