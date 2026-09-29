'use client';

import { Languages } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useLocaleSwitcher } from '@/shared/hooks/use-locale-switcher';

import { CornerBadge } from './corner-badge';
import { DockTooltip } from './dock-tooltip';
import { dockButtonClass } from './styles';
import type { DockPlacement } from './types';

interface DockLocaleToggleProps {
  placement?: DockPlacement;
}

export function DockLocaleToggle({ placement = 'top' }: DockLocaleToggleProps) {
  const { nextLocale, switchLocale } = useLocaleSwitcher();

  const t = useTranslations('shared.dock');

  return (
    <DockTooltip
      label={t('language.switch', { locale: nextLocale })}
      placement={placement}
    >
      <button
        type="button"
        onClick={() => switchLocale(nextLocale)}
        aria-label={t('language.switch', { locale: nextLocale })}
        className={dockButtonClass}
      >
        <Languages
          size={17}
          strokeWidth={1.6}
        />
        <CornerBadge>{nextLocale}</CornerBadge>
      </button>
    </DockTooltip>
  );
}
