import type { ContentItem } from '@/shared/types/content-item';

import type { Post } from './post';

export function postToContentItem(post: Post): ContentItem {
  return {
    id: post.slug,
    title: post.frontmatter.title,
    description: post.frontmatter.description ?? '',
    href: `/writing/${post.slug}`,
    date: post.frontmatter.date,
    tags: post.frontmatter.tags ?? [],
    type: 'writing'
  };
}
