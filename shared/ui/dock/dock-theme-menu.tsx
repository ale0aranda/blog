'use client';

import { useTheme } from 'next-themes';
import { useEffect, useRef, useState } from 'react';

import { BookOpen, Check, Ghost, Moon, Sun } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { cn } from '@/shared/lib/cn';
import { THEMES } from '@/shared/providers/theme-provider';

import { THEME_META } from './constants';
import { DockTooltip } from './dock-tooltip';
import { dockButtonClass, dockMenuClass } from './styles';
import type { DockPlacement, DockTheme } from './types';
import { isCurrentValue } from './utils';

interface DockThemeMenuProps {
  placement?: DockPlacement;
}

export function DockThemeMenu({ placement = 'top' }: DockThemeMenuProps) {
  const { theme, setTheme } = useTheme();

  const t = useTranslations('shared.dock');

  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: PointerEvent) {
      const target = event.target as Node;

      if (!containerRef.current?.contains(target)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    }

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  if (!mounted || !theme) {
    return <span aria-hidden className="size-9 shrink-0 rounded-full" />;
  }

  const currentTheme = (theme as DockTheme) in THEME_META ? (theme as DockTheme) : THEMES[0];

  const currentMeta = THEME_META[currentTheme];
  const CurrentIcon = currentMeta.Icon;

  const menuPosition =
    placement === 'left'
      ? 'right-full top-1/2 mr-3 -translate-y-1/2 origin-right'
      : 'bottom-full left-1/2 mb-3 -translate-x-1/2 origin-bottom';

  const openTransform = placement === 'left' ? 'translate-x-0' : 'translate-y-0';

  const closedTransform = placement === 'left' ? 'translate-x-1' : 'translate-y-1';

  return (
    <div ref={containerRef} className="relative">
      <DockTooltip label={currentMeta.label} placement={placement}>
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-haspopup="menu"
          aria-expanded={open}
          aria-label={t('aria.chooseTheme')}
          className={cn(dockButtonClass, open && 'scale-105 bg-bg/80')}
        >
          <CurrentIcon size={17} strokeWidth={1.6} />
        </button>
      </DockTooltip>

      <div
        role="menu"
        aria-label={t('aria.chooseTheme')}
        className={cn(
          'absolute w-36 p-1.5',
          dockMenuClass,
          'transition-[opacity,transform]',
          'duration-150 ease-out',
          menuPosition,
          open
            ? cn(openTransform, 'scale-100 opacity-100')
            : cn(closedTransform, 'pointer-events-none scale-95 opacity-0')
        )}
      >
        {THEMES.map((item) => {
          const meta = THEME_META[item];

          const Icon =
            meta.Icon === Sun
              ? Sun
              : meta.Icon === Moon
                ? Moon
                : meta.Icon === Ghost
                  ? Ghost
                  : BookOpen;

          const active = isCurrentValue(item, currentTheme);

          return (
            <button
              key={item}
              type="button"
              role="menuitemradio"
              aria-checked={active}
              onClick={() => {
                setTheme(item);
                setOpen(false);
              }}
              className={cn(
                'group flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2',
                'font-mono text-xs uppercase tracking-wide',
                'transition-colors duration-150',
                active ? 'bg-accent/10 text-accent' : 'text-muted hover:bg-bg hover:text-fg'
              )}
            >
              <Icon size={14} strokeWidth={1.6} />

              <span className="flex-1">{meta.label}</span>

              {active ? (
                <Check size={13} strokeWidth={2} />
              ) : (
                <span
                  aria-hidden
                  className="size-1.5 rounded-full"
                  style={{ background: meta.accent }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
