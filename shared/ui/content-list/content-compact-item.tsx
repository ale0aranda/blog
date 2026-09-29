'use client';

import { useLocale } from 'next-intl';

import { contentListStyles } from './styles';
import type { ContentItem as Item } from './types';
import { formatItemDate } from './utils';

type ContentCompactItemProps = {
  item: Item;
};

export function ContentCompactItem({ item }: ContentCompactItemProps) {
  const locale = useLocale();

  return (
    <a
      href={item.href}
      className={contentListStyles.compactItem}
    >
      <time
        dateTime={item.date}
        className="w-14 shrink-0 font-mono text-muted text-xs tabular-nums"
      >
        {formatItemDate(item.date, locale)}
      </time>

      <p className="min-w-0 flex-1 truncate text-base text-fg">{item.title}</p>

      {item.tags && item.tags.length > 0 && (
        <div className="flex shrink-0 gap-2">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className={contentListStyles.tag}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </a>
  );
}
