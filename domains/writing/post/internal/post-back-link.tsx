'use client';

import { ArrowLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';

import { FadeIn } from '@/shared/motion/components/fade-in';

export function PostBackLink() {
  const t = useTranslations('domains.writing.actions');

  return (
    <FadeIn animate="mount">
      <Link
        href="/writing"
        className="group mb-8 inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-widest text-muted transition-colors hover:text-fg"
      >
        <ArrowLeft
          aria-hidden
          size={13}
          className="transition-transform group-hover:-translate-x-0.5"
        />
        {t('back')}
      </Link>
    </FadeIn>
  );
}
