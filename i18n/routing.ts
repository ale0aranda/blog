import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['es', 'en'],
  defaultLocale: 'es',

  pathnames: {
    '/': '/',
    '/projects': '/projects',
    '/writing': '/writing',
    '/writing/[slug]': '/writing/[slug]'
  }
});
