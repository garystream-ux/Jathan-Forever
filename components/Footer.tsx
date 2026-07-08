import Link from 'next/link';
import { navLinks, site } from '@/lib/site';
import { getHomeCopy } from '@/lib/homepage';

/**
 * Warm footer with a short in-character sign-off and social links.
 */
export default function Footer() {
  const year = new Date().getFullYear();
  const { footerSignoff } = getHomeCopy();

  return (
    <footer className="mt-24 border-t border-clay/20 bg-bone">
      <div className="shell grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="max-w-sm">
          <p className="font-display text-2xl text-ink">Jathan Forever</p>
          <p className="mt-3 font-sans text-sm leading-relaxed text-ink/60">
            A travel journal kept by Ethan &amp; Jacob, somewhere between the last
            town and the next one. Thanks for riding along.
          </p>
          <p className="mt-6 font-display text-lg italic text-clay">
            {footerSignoff.join(' ')}
          </p>
        </div>

        <nav aria-label="Footer">
          <p className="eyebrow mb-4">Explore</p>
          <ul className="space-y-2">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="link-underline font-sans text-sm text-ink/70 hover:text-ink"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="eyebrow mb-4">Follow along</p>
          <ul className="space-y-2">
            {site.social.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  className="link-underline font-sans text-sm text-ink/70 hover:text-ink"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="shell flex flex-col gap-2 border-t border-clay/15 py-6 text-xs text-ink/45 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {site.name}. A companion to the novel{' '}
          <span className="italic">{site.bookTitle}</span>.
        </p>
        <p>Made with long drives and good coffee.</p>
      </div>
    </footer>
  );
}
