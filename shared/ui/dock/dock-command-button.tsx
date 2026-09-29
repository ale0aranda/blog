'use client';

import { useEffect } from 'react';

import { Command } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { CornerBadge } from './corner-badge';
import { DockTooltip } from './dock-tooltip';
import { dockButtonClass } from './styles';
import type { DockPlacement } from './types';

interface DockCommandButtonProps {
  onOpen?: () => void;
  placement?: DockPlacement;
}

export function DockCommandButton({ onOpen, placement = 'top' }: DockCommandButtonProps) {
  const t = useTranslations('shared.dock');

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const modifierPressed = event.metaKey || event.ctrlKey;

      if (modifierPressed && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        onOpen?.();
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onOpen]);

  return (
    <DockTooltip
      label={t('tooltip.search')}
      placement={placement}
    >
      <button
        type="button"
        onClick={onOpen}
        aria-label={t('aria.openCommand')}
        className={dockButtonClass}
      >
        <Command
          size={17}
          strokeWidth={1.6}
        />
        <CornerBadge>K</CornerBadge>
      </button>
    </DockTooltip>
  );
}
