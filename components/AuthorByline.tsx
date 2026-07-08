import { authorMeta, type Author } from '@/lib/authors';

/**
 * Color-coded byline that subtly signals whose entry this is.
 * Jacob reads in deep blue, Ethan in warm clay (per the brief).
 */
export default function AuthorByline({
  author,
  date,
  size = 'sm',
  className = '',
}: {
  author: Author;
  date?: string;
  size?: 'sm' | 'lg';
  className?: string;
}) {
  const meta = authorMeta[author];
  const text = size === 'lg' ? 'text-sm' : 'text-xs';

  return (
    <span className={`inline-flex items-center gap-2 font-sans ${text} ${className}`}>
      <span
        aria-hidden="true"
        className="inline-block h-2 w-2 shrink-0 rounded-full"
        style={{ backgroundColor: meta.color }}
      />
      <span className="font-medium tracking-wide" style={{ color: meta.color }}>
        {meta.first}
      </span>
      {date && (
        <>
          <span className="text-ink/30" aria-hidden="true">
            ·
          </span>
          <span className="text-ink/50">{date}</span>
        </>
      )}
    </span>
  );
}
