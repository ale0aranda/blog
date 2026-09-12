'use client';

import { useTranslations } from 'next-intl';

import type { ContentItem } from '@/shared/ui/content-list';
import { ListPage } from '@/shared/ui/list-page/list-page';

type WritingViewProps = {
  items: ContentItem[];
};

export function WritingView({ items }: WritingViewProps) {
  const t = useTranslations('domains.writing');

  return (
    <ListPage
      title={t('title')}
      description={t('description')}
      emptyLabel={t('empty')}
      items={items}
    />
  );
}
