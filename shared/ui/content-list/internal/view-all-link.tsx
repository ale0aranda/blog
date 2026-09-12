'use client';

import { useTranslations } from 'next-intl';

import { useHoverIntent } from '@/shared/hooks/use-hover-intent';
import { cn } from '@/shared/lib/cn';

type Props = {
  href: string;
  label?: string;
};

export function ViewAllLink({ href, label }: Props) {
  const t = useTranslations('shared.contentList');

  const resolvedLabel = label ?? t('viewAll.label');

  const { isActive, show, hide } = useHoverIntent({
    enterDelay: 50,
    leaveDelay: 50
  });

  return (
    <a
      href={href}
      aria-label={resolvedLabel}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
      className="group -mx-1 inline-flex items-center gap-1 rounded px-1 font-mono text-xs text-muted transition-colors duration-200 hover:text-fg"
    >
      <span
        aria-hidden
        className={cn(
          '-translate-x-1 transition-all duration-150',
          isActive ? 'translate-x-0 opacity-100' : 'opacity-0'
        )}
      >
        /
      </span>

      {resolvedLabel}
    </a>
  );
}
