'use client';

import { Globe } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useLocaleSwitcher } from '@/shared/hooks/use-locale-switcher';

import { DockTooltip } from './dock-tooltip';
import { dockButtonClass } from './styles';
import type { DockPlacement } from './types';

interface DockLocaleToggleProps {
  placement?: DockPlacement;
}

export function DockLocaleToggle({ placement = 'top' }: DockLocaleToggleProps) {
  const { nextLocale, switchLocale } = useLocaleSwitcher();
  const t = useTranslations('shared.dock');

  const label = t('language.switch', { locale: nextLocale });

  return (
    <DockTooltip
      label={label}
      placement={placement}
    >
      <button
        aria-label={label}
        className={dockButtonClass}
        onClick={() => switchLocale(nextLocale)}
        type="button"
      >
        <Globe
          aria-hidden="true"
          size={19}
          strokeWidth={1.6}
        />
      </button>
    </DockTooltip>
  );
}
