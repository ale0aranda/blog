'use client';

import { useEffect } from 'react';

import { Command } from 'lucide-react';
import { useTranslations } from 'next-intl';

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
      if (!event.repeat && (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
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
        aria-label={t('aria.openCommand')}
        className={dockButtonClass}
        onClick={onOpen}
        type="button"
      >
        <Command
          aria-hidden="true"
          size={19}
          strokeWidth={1.6}
        />
      </button>
    </DockTooltip>
  );
}
