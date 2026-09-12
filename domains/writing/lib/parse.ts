import matter from 'gray-matter';
import readingTime from 'reading-time';

import type { Post, PostFrontmatter } from './post';
import { assertValidFrontmatter } from './post';

export function parsePost(locale: string, slug: string, source: string): Post {
  const parsed = matter(source);
  const data = parsed.data as Partial<PostFrontmatter>;

  assertValidFrontmatter(data, locale, slug);

  return {
    slug,
    locale,
    content: parsed.content,
    frontmatter: data,
    readingTime: readingTime(parsed.content).text
  };
}
