import type { MetadataRoute } from 'next';

import { site } from '@/config/site';

import { routing } from '@/i18n/routing';

import { getAllPosts } from '@/domains/writing/lib/posts';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['', '/projects', '/writing'];

  const staticEntries: MetadataRoute.Sitemap = routing.locales.flatMap((locale) =>
    staticRoutes.map((route) => ({
      url: `${site.url}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: route === '' ? 'monthly' : 'weekly',
      priority: route === '' ? 1 : 0.8
    }))
  );

  const postEntries: MetadataRoute.Sitemap = routing.locales.flatMap((locale) =>
    getAllPosts(locale).map((post) => ({
      url: `${site.url}/${locale}/writing/${post.slug}`,
      lastModified: new Date(post.frontmatter.date),
      changeFrequency: 'monthly',
      priority: 0.6
    }))
  );

  return [...staticEntries, ...postEntries];
}
