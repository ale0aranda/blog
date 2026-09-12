import type { Locale } from './locale';
import type { useRouter } from './navigation';

type Router = ReturnType<typeof useRouter>;

export function replaceStaticLocale(
  router: Router,
  pathname: '/' | '/projects' | '/writing',
  locale: Locale
) {
  router.replace(pathname, {
    locale
  });
}

export function replaceWritingPostLocale(router: Router, slug: string, locale: Locale) {
  router.replace(
    {
      pathname: '/writing/[slug]',
      params: {
        slug
      }
    },
    {
      locale
    }
  );
}
