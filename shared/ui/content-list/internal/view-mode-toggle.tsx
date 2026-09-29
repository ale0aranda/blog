'use client';

import { useTranslations } from 'next-intl';

import { cn } from '@/shared/lib/cn';

import { VIEW_MODE_OPTIONS } from '../constants';
import type { ViewMode } from '../types';

type Props = {
  value: ViewMode;
  onChange: (mode: ViewMode) => void;
};

export function ViewModeToggle({ value, onChange }: Props) {
  const t = useTranslations('shared.contentList');

  return (
    <fieldset className="flex items-center gap-1 border-0 p-0">
      <legend className="sr-only">{t('view.label')}</legend>

      {VIEW_MODE_OPTIONS.map(({ value: option, icon: Icon, messageKey }) => (
        <label
          key={option}
          className={cn(
            'flex size-7 cursor-pointer items-center justify-center rounded-md transition-all duration-200',
            value === option
              ? 'bg-surface text-accent shadow-sm'
              : 'text-muted hover:bg-surface hover:text-fg'
          )}
        >
          <input
            type="radio"
            name="content-view-mode"
            value={option}
            checked={value === option}
            onChange={() => onChange(option)}
            className="sr-only"
          />

          <Icon
            aria-hidden
            size={16}
            strokeWidth={2}
          />

          <span className="sr-only">{t(messageKey)}</span>
        </label>
      ))}
    </fieldset>
  );
}
