'use client';

import { useTheme } from 'next-themes';
import { useEffect, useId, useRef, useState } from 'react';

import { Check, Sun } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { cn } from '@/shared/lib/cn';
import { THEMES } from '@/shared/providers/theme-provider';

import { THEME_META } from './constants';
import { DockTooltip } from './dock-tooltip';
import { dockButtonClass, dockMenuClass } from './styles';
import type { DockPlacement } from './types';

interface DockThemeMenuProps {
  placement?: DockPlacement;
}

export function DockThemeMenu({ placement = 'top' }: DockThemeMenuProps) {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const t = useTranslations('shared.dock');

  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLFieldSetElement>(null);

  const panelId = useId();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    function handleOutsideInteraction(event: Event) {
      if (event.target instanceof Node && !containerRef.current?.contains(event.target)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault();
        setOpen(false);
        triggerRef.current?.focus();
      }
    }

    document.addEventListener('pointerdown', handleOutsideInteraction);
    document.addEventListener('focusin', handleOutsideInteraction);
    document.addEventListener('keydown', handleKeyDown);

    const selected = panelRef.current?.querySelector<HTMLButtonElement>(
      'button[aria-pressed="true"]'
    );

    const first = panelRef.current?.querySelector<HTMLButtonElement>('button');

    (selected ?? first)?.focus();

    return () => {
      document.removeEventListener('pointerdown', handleOutsideInteraction);
      document.removeEventListener('focusin', handleOutsideInteraction);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  const currentTheme = mounted ? THEMES.find((item) => item === resolvedTheme) : undefined;

  const CurrentIcon = currentTheme ? THEME_META[currentTheme].Icon : Sun;

  const menuPosition =
    placement === 'left' ? 'top-1/2 right-full mr-3 -translate-y-1/2' : 'right-0 bottom-full mb-4';

  return (
    <div
      className="relative"
      ref={containerRef}
    >
      <DockTooltip
        disabled={open}
        label={t('aria.chooseTheme')}
        placement={placement}
      >
        <button
          aria-controls={open ? panelId : undefined}
          aria-expanded={open}
          aria-label={t('aria.chooseTheme')}
          className={cn(dockButtonClass, open && 'bg-surface text-fg')}
          disabled={!mounted}
          onClick={() => setOpen((value) => !value)}
          ref={triggerRef}
          type="button"
        >
          <CurrentIcon
            aria-hidden="true"
            size={19}
            strokeWidth={1.6}
          />
        </button>
      </DockTooltip>

      {open && (
        <fieldset
          className={cn('absolute m-0 min-w-0 w-40 p-1.5', dockMenuClass, menuPosition)}
          id={panelId}
          ref={panelRef}
        >
          <legend className="sr-only">{t('aria.chooseTheme')}</legend>

          {THEMES.map((item) => {
            const meta = THEME_META[item];
            const Icon = meta.Icon;
            const active = theme === item;

            return (
              <button
                aria-pressed={active}
                className={cn(
                  'flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5',
                  'text-left text-sm transition-colors duration-150',
                  'hover:bg-surface hover:text-fg',
                  'focus-visible:bg-surface focus-visible:outline-none',
                  'focus-visible:ring-2 focus-visible:ring-accent',
                  active ? 'bg-surface text-fg' : 'text-muted'
                )}
                key={item}
                onClick={() => {
                  setTheme(item);
                  setOpen(false);
                  triggerRef.current?.focus();
                }}
                type="button"
              >
                <Icon
                  aria-hidden="true"
                  size={16}
                  strokeWidth={1.6}
                />

                <span className="flex-1">{meta.label}</span>

                {active && (
                  <Check
                    aria-hidden="true"
                    size={14}
                    strokeWidth={1.8}
                  />
                )}
              </button>
            );
          })}
        </fieldset>
      )}
    </div>
  );
}
