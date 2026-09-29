'use client';

import { useTranslations } from 'next-intl';

import { cn } from '@/shared/lib/cn';

import type { ContentCategory } from '../types';

type Props = {
  categories: ContentCategory[];
  active: string;
  onChange: (id: string) => void;
};

export function CategoryTabs({ categories, active, onChange }: Props) {
  const t = useTranslations('shared.contentList');

  return (
    <nav aria-label={t('categories.label')}>
      <ul className="flex flex-wrap items-center gap-3">
        {categories.map((category, index) => (
          <li
            key={category.id}
            className="flex items-center gap-3"
          >
            {index > 0 && (
              <span
                aria-hidden
                className="text-muted"
              >
                /
              </span>
            )}

            <button
              type="button"
              onClick={() => onChange(category.id)}
              aria-current={active === category.id ? 'page' : undefined}
              className={cn(
                'rounded px-1 font-semibold text-xs uppercase tracking-widest transition-colors duration-200',
                active === category.id ? 'text-fg' : 'text-muted hover:text-fg'
              )}
            >
              {category.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
