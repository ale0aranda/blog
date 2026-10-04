'use client';

import { useCallback, useState } from 'react';

import { House } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

import { Link, usePathname } from '@/i18n/navigation';

import { cn } from '@/shared/lib/cn';
import { FadeIn } from '@/shared/motion/components/fade-in';

import { CommandPalette } from './command-palette';
import { DockCommandButton } from './dock-command-button';
import { DockLocaleToggle } from './dock-locale-toggle';
import { DockThemeMenu } from './dock-theme-menu';
import { DockTooltip } from './dock-tooltip';
import { dockButtonClass } from './styles';

interface DockProps {
  className?: string;
}

export function Dock({ className }: DockProps) {
  const [commandOpen, setCommandOpen] = useState(false);

  const t = useTranslations('shared.dock');
  const locale = useLocale();
  const pathname = usePathname();

  const homeLabel = locale === 'es' ? 'Inicio' : 'Home';
  const isHome = pathname === '/';

  const openCommand = useCallback(() => {
    setCommandOpen(true);
  }, []);

  return (
    <>
      <div
        className={cn(
          'pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center pb-safe',
          className
        )}
      >
        <FadeIn
          animate="mount"
          delay={0.1}
          y={12}
          className="pointer-events-auto"
        >
          <nav
            aria-label={t('aria.preferences')}
            className="flex items-center gap-2 rounded-full border border-border bg-bg/95 px-3 py-2 shadow-lg backdrop-blur-md"
          >
            <DockTooltip label={homeLabel}>
              <Link
                aria-current={isHome ? 'page' : undefined}
                aria-label={homeLabel}
                className={cn(dockButtonClass, isHome && 'text-accent')}
                href="/"
              >
                <House
                  aria-hidden="true"
                  size={19}
                  strokeWidth={1.6}
                />
              </Link>
            </DockTooltip>

            <DockCommandButton onOpen={openCommand} />
            <DockLocaleToggle />
            <DockThemeMenu />
          </nav>
        </FadeIn>
      </div>

      <CommandPalette
        open={commandOpen}
        onOpenChange={setCommandOpen}
      />
    </>
  );
}
