'use client';

import { SearchX } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useSearchFilter } from '@/shared/hooks/use-search-filter';
import { FadeIn } from '@/shared/motion/components/fade-in';
import { StaggerGroup } from '@/shared/motion/components/stagger-group';
import type { ContentItem } from '@/shared/ui/content-list';
import { ContentItem as ContentItemComponent } from '@/shared/ui/content-list/content-item';

import { ListPageHeader } from './internal/list-page-header';

type ListPageProps = {
  title: string;
  description: string;
  emptyLabel: string;
  items: ContentItem[];
};

export function ListPage({ title, description, emptyLabel, items }: ListPageProps) {
  const t = useTranslations('shared.listPage');
  const { search, setSearch, filtered, debouncedSearch } = useSearchFilter(items, [
    'title',
    'description',
    'tags'
  ]);

  return (
    <div className="mx-auto flex w-full max-w-xl flex-1 flex-col px-6 py-20">
      <FadeIn animate="mount">
        <ListPageHeader
          title={title}
          description={description}
          searchValue={search}
          onSearchChange={setSearch}
        />
      </FadeIn>

      {filtered.length > 0 ? (
        <StaggerGroup as="ul" animate="mount" key="results">
          {filtered.map((item) => (
            <FadeIn as="li" animate="mount" key={item.id}>
              <ContentItemComponent item={item} />
            </FadeIn>
          ))}
        </StaggerGroup>
      ) : (
        <FadeIn
          animate="mount"
          key="empty"
          className="flex flex-col items-center gap-3 py-20 text-center"
        >
          <SearchX aria-hidden size={32} strokeWidth={1.5} className="text-muted" />
          <div>
            <p className="text-sm text-fg">{emptyLabel}</p>
            {debouncedSearch.trim().length > 0 && (
              <p className="mt-0.5 text-sm text-muted">
                {t('noMatchFor', { query: debouncedSearch.trim() })}
              </p>
            )}
          </div>
        </FadeIn>
      )}
    </div>
  );
}
