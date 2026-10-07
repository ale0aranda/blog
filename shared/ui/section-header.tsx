'use client';

import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';

type SectionHeaderProps = {
  translationNamespace: 'home.projects' | 'home.writing';
  headingId: string;
  href: '/projects' | '/writing';
  count: number;
};

export function SectionHeader({
  count,
  translationNamespace,
  headingId,
  href
}: SectionHeaderProps) {
  const t = useTranslations(translationNamespace);

  return (
    <div className="mb-3 flex items-center gap-4">
      <h2
        className="shrink-0 font-mono font-semibold text-fg text-xs uppercase tracking-widest"
        id={headingId}
      >
        {t('title')}
      </h2>

      <div
        aria-hidden="true"
        className="h-px min-w-0 flex-1 bg-border"
      />

      <Link
        className="group inline-flex shrink-0 items-center gap-1.5 rounded-md font-mono text-muted text-xs transition-colors hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg/20"
        href={href}
      >
        {t('all')}

        <span
          aria-hidden="true"
          className="font-mono text-xs tabular-nums opacity-60"
        >
          {count}
        </span>

        <span
          aria-hidden="true"
          className="-translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 motion-reduce:transform-none motion-reduce:transition-none"
        >
          /
        </span>
      </Link>
    </div>
  );
}
