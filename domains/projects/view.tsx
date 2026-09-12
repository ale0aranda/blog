'use client';

import { useTranslations } from 'next-intl';

import { ListPage } from '@/shared/ui/list-page/list-page';

import { projects } from './content/projects';

export function ProjectsView() {
  const t = useTranslations('domains.projects');

  return (
    <ListPage
      title={t('title')}
      description={t('description')}
      emptyLabel={t('empty')}
      items={projects}
    />
  );
}
