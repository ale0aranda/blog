'use client';

import { useLocale } from 'next-intl';

import { Link } from '@/i18n/navigation';

import type { ContentItem } from '@/shared/types/content-item';

type WritingItemProps = {
  item: ContentItem;
};

function formatDate(date: string, locale: string) {
  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  return new Intl.DateTimeFormat(locale, {
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC'
  }).format(parsed);
}

export function WritingItem({ item }: WritingItemProps) {
  const locale = useLocale();
  const tag = item.tags?.[0];

  return (
    <Link
      className="group flex items-center gap-3 rounded-lg px-2 py-3 transition-colors duration-200 hover:bg-surface focus-visible:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg/20 sm:gap-4"
      href={{
        pathname: '/writing/[slug]',
        params: { slug: item.id }
      }}
    >
      <time
        className="w-16 shrink-0 font-mono text-muted text-xs tabular-nums"
        dateTime={item.date}
      >
        {formatDate(item.date, locale)}
      </time>

      <span className="min-w-0 flex-1 text-fg text-sm leading-snug">{item.title}</span>

      <span
        aria-hidden="true"
        className="shrink-0 -translate-x-1 font-mono text-muted text-sm opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 motion-reduce:transform-none motion-reduce:transition-none"
      >
        /
      </span>

      {tag && (
        <span className="hidden max-w-24 shrink-0 truncate rounded-md bg-surface px-2 py-1 font-mono text-muted text-xs sm:block">
          {tag}
        </span>
      )}
    </Link>
  );
}
