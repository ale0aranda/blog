'use client';

import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';

interface ProjectsHeaderProps {
  headingId: string;
}

export function ProjectsHeader({ headingId }: ProjectsHeaderProps) {
  const t = useTranslations('home.projects');

  return (
    <div className="flex items-center justify-between gap-4">
      <h2
        className="font-mono font-semibold text-fg text-xs uppercase tracking-widest"
        id={headingId}
      >
        {t('title')}
      </h2>

      <Link
        className="group -mx-1 inline-flex items-center gap-1 rounded px-1 font-mono text-muted text-xs outline-offset-4 transition-colors duration-200 hover:text-accent focus-visible:text-accent focus-visible:outline motion-reduce:transition-none"
        href="/projects"
      >
        <span
          aria-hidden="true"
          className="-translate-x-1 opacity-0 transition duration-150 ease-out group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 motion-reduce:transform-none motion-reduce:transition-none"
        >
          /
        </span>

        {t('all')}
      </Link>
    </div>
  );
}
