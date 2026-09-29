'use client';

import { useLocale } from 'next-intl';

import { ContentListIcon } from './content-list-icon';
import { contentListStyles } from './styles';
import type { ContentItem as Item } from './types';
import { formatItemDate } from './utils';

type ContentItemProps = {
  item: Item;
};

export function ContentItem({ item }: ContentItemProps) {
  const locale = useLocale();

  return (
    <a
      href={item.href}
      className={contentListStyles.item}
    >
      <ContentListIcon
        icon={item.icon}
        type={item.type}
        alt={item.title}
      />

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className={contentListStyles.title}>{item.title}</p>

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
        </div>

        {item.description && <p className={contentListStyles.description}>{item.description}</p>}
      </div>

      <time
        dateTime={item.date}
        className={contentListStyles.metadata}
      >
        {formatItemDate(item.date, locale)}
      </time>
    </a>
  );
}
