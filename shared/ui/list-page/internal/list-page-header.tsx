'use client';

import { useId } from 'react';

import { ArrowLeft, Search, X } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';

import { DividerReveal } from '@/shared/motion/components/divider-reveal';

type ListPageHeaderProps = {
  title: string;
  description: string;
  backHref?: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
};

export function ListPageHeader({
  title,
  description,
  backHref = '/',
  searchValue,
  onSearchChange
}: ListPageHeaderProps) {
  const t = useTranslations('shared.listPage');
  const searchId = useId();

  return (
    <>
      <header className="mb-10">
        <Link
          href={backHref}
          className="group mb-6 inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-widest text-muted transition-colors hover:text-fg"
        >
          <ArrowLeft aria-hidden size={12} strokeWidth={2} className="size-3" />
          {t('back')}
        </Link>

        <div className="flex items-start justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-fg">{title}</h1>
            <p className="mt-2 text-base text-muted">{description}</p>
          </div>

          <div className="relative w-56 shrink-0">
            <Search
              aria-hidden
              size={16}
              strokeWidth={2}
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted"
            />
            <label htmlFor={searchId} className="sr-only">
              {t('searchLabel')}
            </label>
            <input
              id={searchId}
              type="text"
              placeholder={t('searchPlaceholder')}
              value={searchValue}
              onChange={(event) => onSearchChange(event.target.value)}
              className="w-full rounded-lg border border-border bg-transparent py-2 pl-9 pr-9 text-sm text-fg placeholder:text-muted"
            />

            {searchValue.length > 0 && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                aria-label={t('clearLabel')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted transition-colors hover:text-fg"
              >
                <X aria-hidden size={16} strokeWidth={2} />
              </button>
            )}
          </div>
        </div>
      </header>

      <DividerReveal className="mb-0 h-px bg-border" />
    </>
  );
}
