'use client';

import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';

import { FadeIn } from '@/shared/motion/components/fade-in';

import { OrbitIllustration } from './orbit-illustration';

export function NotFoundView() {
  const t = useTranslations('domains.notFound');

  return (
    <main className="mx-auto flex min-h-svh w-full max-w-xl items-center px-6 pt-12 pb-28">
      <FadeIn
        animate="mount"
        as="section"
        className="w-full"
        y={6}
      >
        <div className="mb-6 w-full max-w-sm">
          <OrbitIllustration />
        </div>

        <p className="font-mono text-muted text-xs">404</p>

        <h1 className="mt-4 font-medium text-2xl tracking-tight">{t('title')}</h1>

        <p className="mt-3 max-w-sm text-muted text-sm leading-relaxed">{t('description')}</p>

        <Link
          className="group mt-7 inline-flex items-center gap-2 rounded-sm text-muted text-sm outline-offset-4 transition-colors duration-200 hover:text-accent focus-visible:text-accent focus-visible:outline motion-reduce:transition-none"
          href="/"
        >
          <span
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:-translate-x-1 group-focus-visible:-translate-x-1 motion-reduce:transform-none motion-reduce:transition-none"
          >
            ←
          </span>

          {t('back')}
        </Link>
      </FadeIn>
    </main>
  );
}
