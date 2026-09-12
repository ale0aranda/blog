'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';

import { cn } from '@/shared/lib/cn';
import { FadeIn } from '@/shared/motion/components/fade-in';

import { CommandPalette } from './command-palette';
import { DockCommandButton } from './dock-command-button';
import { DockLocaleToggle } from './dock-locale-toggle';
import { DockThemeMenu } from './dock-theme-menu';

interface DockProps {
  className?: string;
}

export function Dock({ className }: DockProps) {
  const [commandOpen, setCommandOpen] = useState(false);

  const t = useTranslations('shared.dock');

  return (
    <>
      {/* Mobile */}
      <FadeIn
        as="nav"
        animate="mount"
        y={12}
        aria-label={t('aria.preferences')}
        className={cn(
          'fixed inset-x-0 bottom-0 z-50 flex items-center justify-evenly',
          'border-t border-border bg-surface/95 backdrop-blur-sm',
          'px-6 pt-2 pb-[calc(env(safe-area-inset-bottom)+0.375rem)]',
          'lg:hidden',
          className
        )}
      >
        <div className="flex flex-col items-center gap-1">
          <DockCommandButton onOpen={() => setCommandOpen(true)} placement="top" />
          <span className="font-mono text-xs text-muted">{t('command.search')}</span>
        </div>

        <div className="flex flex-col items-center gap-1">
          <DockLocaleToggle placement="top" />
          <span className="font-mono text-xs text-muted">{t('groups.language')}</span>
        </div>

        <div className="flex flex-col items-center gap-1">
          <DockThemeMenu placement="top" />
          <span className="font-mono text-xs text-muted">{t('groups.theme')}</span>
        </div>
      </FadeIn>

      {/* Desktop */}
      <FadeIn
        as="nav"
        animate="mount"
        y={18}
        delay={0.1}
        aria-label={t('aria.preferences')}
        className={cn(
          'fixed right-6 top-1/2 z-50 hidden -translate-y-1/2 lg:flex',
          'flex-col items-center gap-3.5',
          className
        )}
      >
        <DockCommandButton onOpen={() => setCommandOpen(true)} placement="left" />
        <span aria-hidden className="size-1 rounded-full bg-border" />
        <DockLocaleToggle placement="left" />
        <span aria-hidden className="size-1 rounded-full bg-border" />
        <DockThemeMenu placement="left" />
      </FadeIn>

      <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />
    </>
  );
}
