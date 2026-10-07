'use client';

import { useTranslations } from 'next-intl';

import { cn } from '@/shared/lib/cn';

import type { ProjectCategory } from './content/projects';
import { projectCategories } from './content/projects';

type ProjectFiltersProps = {
  selected: ProjectCategory;
  onChange: (category: ProjectCategory) => void;
};

export function ProjectFilters({ selected, onChange }: ProjectFiltersProps) {
  const t = useTranslations('domains.projects');

  return (
    <fieldset className="m-0 min-w-0 border-0 border-border border-b p-0">
      <legend className="sr-only">{t('filterLabel')}</legend>

      <div className="flex flex-wrap gap-x-5 sm:gap-x-6">
        {projectCategories.map((category) => {
          const active = selected === category;

          return (
            <button
              aria-pressed={active}
              className={cn(
                'relative rounded-sm pt-1 pb-3',
                'font-mono text-xs outline-offset-4',
                'transition-colors duration-200',
                'hover:text-accent',
                'focus-visible:outline focus-visible:outline-accent',
                'motion-reduce:transition-none',
                active ? 'text-accent' : 'text-muted'
              )}
              key={category}
              onClick={() => onChange(category)}
              type="button"
            >
              {t(`categories.${category}`)}

              <span
                aria-hidden="true"
                className={cn(
                  'pointer-events-none absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-accent',
                  'transition-opacity duration-200',
                  'motion-reduce:transition-none',
                  active ? 'opacity-100' : 'opacity-0'
                )}
              />
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
