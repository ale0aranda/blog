'use client';

import { useParams } from 'next/navigation';

import { useLocale } from 'next-intl';

import type { Locale } from '@/i18n/locale';
import { getNextLocale } from '@/i18n/locale';
import { usePathname, useRouter } from '@/i18n/navigation';
import { replaceStaticLocale, replaceWritingPostLocale } from '@/i18n/navigation-routes';
import { routing } from '@/i18n/routing';

export function useLocaleSwitcher() {
  const currentLocale = useLocale() as Locale;

  const router = useRouter();
  const pathname = usePathname();
  const params = useParams<{ slug?: string }>();

  const availableLocales = routing.locales;
  const nextLocale = getNextLocale(currentLocale);

  function switchLocale(locale: Locale) {
    switch (pathname) {
      case '/writing/[slug]':
        if (!params.slug) {
          return;
        }

        replaceWritingPostLocale(router, params.slug, locale);
        break;

      default:
        replaceStaticLocale(router, pathname, locale);
    }
  }

  return {
    currentLocale,
    availableLocales,
    nextLocale,
    switchLocale
  };
}
