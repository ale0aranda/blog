import { cache } from 'react';

import { getPostSlugs, readPostFile } from './fs';
import { parsePost } from './parse';
import type { Post } from './post';

export const getPostBySlug = cache(
  (locale: string, slug: string): Post => parsePost(locale, slug, readPostFile(locale, slug))
);

export const getAllPosts = cache((locale: string): Post[] =>
  getPostSlugs(locale)
    .map((slug) => getPostBySlug(locale, slug))
    .filter((post) => !post.frontmatter.draft)
    .sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime())
);
