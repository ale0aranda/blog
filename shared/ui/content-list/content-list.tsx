'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';

import { DividerReveal } from '@/shared/motion/components/divider-reveal';
import { FadeIn } from '@/shared/motion/components/fade-in';
import { StaggerGroup } from '@/shared/motion/components/stagger-group';

import { ContentCompactItem } from './content-compact-item';
import { ContentItem } from './content-item';
import { CategoryTabs } from './internal/category-tabs';
import { ViewAllLink } from './internal/view-all-link';
import { ViewModeToggle } from './internal/view-mode-toggle';
import { contentListStyles } from './styles';
import type { ContentListProps } from './types';

export function ContentList({
  categories,
  itemsByCategory,
  defaultCategory,
  defaultViewMode = 'default'
}: ContentListProps) {
  const t = useTranslations('shared.contentList');

  const [activeCategory, setActiveCategory] = useState(defaultCategory ?? categories[0]?.id ?? '');

  const [viewMode, setViewMode] = useState(defaultViewMode);

  const items = itemsByCategory[activeCategory] ?? [];

  const activeCategoryData = categories.find((category) => category.id === activeCategory);

  return (
    <section
      className="mt-10"
      aria-label={t('categories.label')}
    >
      <FadeIn
        as="header"
        animate="mount"
      >
        <header className="mb-4 flex items-center justify-between">
          <CategoryTabs
            categories={categories}
            active={activeCategory}
            onChange={setActiveCategory}
          />

          <div className="flex items-center gap-4">
            <ViewAllLink href={activeCategoryData?.href ?? '#'} />

            <ViewModeToggle
              value={viewMode}
              onChange={setViewMode}
            />
          </div>
        </header>
      </FadeIn>

      <DividerReveal className="mb-0 h-px bg-border" />

      <StaggerGroup
        as="ul"
        animate="mount"
        className={contentListStyles.list}
        key={`${activeCategory}-${viewMode}`}
      >
        {items.length > 0 ? (
          items.map((item) => (
            <FadeIn
              as="li"
              animate="mount"
              key={item.id}
            >
              {viewMode === 'default' ? (
                <ContentItem item={item} />
              ) : (
                <ContentCompactItem item={item} />
              )}
            </FadeIn>
          ))
        ) : (
          <FadeIn
            as="li"
            animate="mount"
            className="py-6 text-muted text-sm"
          >
            {t('empty.label')}
          </FadeIn>
        )}
      </StaggerGroup>
    </section>
  );
}
