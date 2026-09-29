'use client';

import { useEffect, useState } from 'react';

import { Command } from 'cmdk';
import { CornerDownLeft, Search } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { cn } from '@/shared/lib/cn';

import { CommandGroupLanguage } from './internal/command-group-language';
import { CommandGroupNavigation } from './internal/command-group-navigation';
import { CommandGroupTheme } from './internal/command-group-theme';
import { dockKbdClass, dockSeparatorClass } from './styles';
import { runAndClose } from './utils';

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const t = useTranslations('shared.dock');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!open) {
      setVisible(false);
      return;
    }

    const frame = requestAnimationFrame(() => {
      setVisible(true);
    });

    document.body.style.overflow = 'hidden';

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onOpenChange(false);
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onOpenChange]);

  if (!open) {
    return null;
  }

  function execute(action: () => void) {
    runAndClose(action, onOpenChange);
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-center px-4 pt-32">
      <div
        aria-hidden
        className={cn(
          'fixed inset-0 bg-fg/30 backdrop-blur-sm',
          'transition-opacity duration-200',
          visible ? 'opacity-100' : 'opacity-0'
        )}
        onClick={() => onOpenChange(false)}
      />

      <Command
        label={t('command.label')}
        className={cn(
          'relative z-10 h-fit w-full max-w-xl',
          'overflow-hidden rounded-2xl',
          'border border-border bg-surface',
          'shadow-xl',
          'transition duration-200 ease-out',
          visible ? 'translate-y-0 scale-100 opacity-100' : '-translate-y-2 scale-95 opacity-0'
        )}
      >
        <div className="flex items-center gap-2.5 border-border border-b px-4">
          <Search
            size={15}
            strokeWidth={1.8}
            className="text-muted"
          />

          <Command.Input
            autoFocus
            placeholder={t('command.placeholder')}
            className={cn(
              'h-12 w-full bg-transparent',
              'text-fg text-sm outline-none',
              'placeholder:text-muted'
            )}
          />

          <kbd className={dockKbdClass}>esc</kbd>
        </div>

        <Command.List className="max-h-80 overflow-y-auto p-1.5">
          <Command.Empty className="py-10 text-center font-mono text-muted text-xs">
            {t('command.empty')}
          </Command.Empty>

          <CommandGroupNavigation execute={execute} />

          <Command.Separator className={dockSeparatorClass} />

          <CommandGroupTheme execute={execute} />

          <Command.Separator className={dockSeparatorClass} />

          <CommandGroupLanguage execute={execute} />
        </Command.List>

        <div className="flex items-center gap-4 border-border border-t px-4 py-2.5 font-mono text-muted text-xs">
          <span className="flex items-center gap-1.5">
            <kbd className={dockKbdClass}>↑↓</kbd>
            {t('footer.navigate')}
          </span>

          <span className="flex items-center gap-1.5">
            <kbd className="flex items-center rounded bg-bg px-1 py-0.5">
              <CornerDownLeft
                size={10}
                strokeWidth={2}
              />
            </kbd>

            {t('footer.select')}
          </span>
        </div>
      </Command>
    </div>
  );
}
