'use client';

import { SearchX } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useSearchFilter } from '@/shared/hooks/use-search-filter';
import { FadeIn } from '@/shared/motion/components/fade-in';
import type { ContentItem } from '@/shared/types/content-item';
import { ListPageHeader } from '@/shared/ui/list-page/internal/list-page-header';

import { WritingList } from './writing-list';

type WritingViewProps = {
  items: ContentItem[];
};

export function WritingView({ items }: WritingViewProps) {
  const t = useTranslations('home.writing');
  const listPageT = useTranslations('shared.listPage');

  const { search, setSearch, filtered, debouncedSearch } = useSearchFilter(items, [
    'title',
    'description',
    'tags'
  ]);

  return (
    <div className="mx-auto flex w-full max-w-xl flex-1 flex-col px-6 py-20">
      <FadeIn animate="mount">
        <ListPageHeader
          description={t('description')}
          onSearchChange={setSearch}
          searchValue={search}
          title={t('title')}
        />
      </FadeIn>

      {filtered.length > 0 ? (
        <WritingList items={filtered} />
      ) : (
        <FadeIn
          animate="mount"
          className="flex flex-col items-center gap-3 py-20 text-center"
          key="empty"
        >
          <SearchX
            aria-hidden="true"
            className="text-muted"
            size={32}
            strokeWidth={1.5}
          />

          <div>
            <p className="text-fg text-sm">{t('empty')}</p>

            {debouncedSearch.trim().length > 0 && (
              <p className="mt-0.5 text-muted text-sm">
                {listPageT('noMatchFor', {
                  query: debouncedSearch.trim()
                })}
              </p>
            )}
          </div>
        </FadeIn>
      )}
    </div>
  );
}
