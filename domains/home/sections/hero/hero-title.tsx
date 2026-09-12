'use client';

import { useTranslations } from 'next-intl';

export function HeroTitle() {
  const t = useTranslations('home.hero');

  return (
    <>
      <h1 className="text-4xl font-bold tracking-tight text-fg">{t('name')}</h1>

      <span aria-hidden="true" className="h-7 w-px bg-border" />
    </>
  );
}
