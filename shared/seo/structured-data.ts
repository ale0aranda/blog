import type { Post } from '@/domains/writing/lib/post';

import type { JsonObject } from '@/shared/seo/json-ld';

import { site } from '../../config/site';

export const personJsonLd: JsonObject = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  url: site.url,
  description: site.description,
  jobTitle: 'Computer Science Student',
  sameAs: [site.social.github]
};

export function blogPostingJsonLd(post: Post, locale: string): JsonObject {
  const url = `${site.url}/${locale}/writing/${post.slug}`;
  const image = post.frontmatter.image
    ? post.frontmatter.image.startsWith('http')
      ? post.frontmatter.image
      : `${site.url}${post.frontmatter.image}`
    : undefined;

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.frontmatter.title,
    description: post.frontmatter.description ?? null,
    datePublished: post.frontmatter.date,
    dateModified: post.frontmatter.date,
    inLanguage: locale,
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    author: { '@type': 'Person', name: site.author, url: site.url },
    publisher: { '@type': 'Person', name: site.author },
    ...(image && { image }),
    ...(post.frontmatter.tags && { keywords: post.frontmatter.tags.join(', ') })
  };
}

export const websiteJsonLd: JsonObject = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: site.name,
  url: site.url,
  inLanguage: [site.locale]
};
