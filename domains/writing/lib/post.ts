import { DATE_PATTERN } from './constants';

export type PostFrontmatter = {
  title: string;
  description?: string;
  date: string;
  tags?: string[];
  image?: string;
  draft?: boolean;
};

export type Post = {
  slug: string;
  locale: string;
  frontmatter: PostFrontmatter;
  content: string;
  readingTime: string;
};

type FrontmatterInput = Partial<PostFrontmatter>;

export function assertValidFrontmatter(
  data: FrontmatterInput,
  locale: string,
  slug: string
): asserts data is PostFrontmatter {
  if (typeof data.title !== 'string' || data.title.trim() === '') {
    throw new Error(`Post "${locale}/${slug}" is missing a valid "title" in frontmatter`);
  }

  if (
    typeof data.date !== 'string'
    || !DATE_PATTERN.test(data.date)
    || Number.isNaN(Date.parse(data.date))
  ) {
    throw new Error(`Post "${locale}/${slug}" is missing a valid "date" in frontmatter`);
  }

  if (data.description !== undefined && typeof data.description !== 'string') {
    throw new Error(`Post "${locale}/${slug}" has an invalid "description" in frontmatter`);
  }

  if (
    data.tags !== undefined
    && (!Array.isArray(data.tags) || !data.tags.every((tag) => typeof tag === 'string'))
  ) {
    throw new Error(`Post "${locale}/${slug}" has an invalid "tags" in frontmatter`);
  }

  if (data.image !== undefined && typeof data.image !== 'string') {
    throw new Error(`Post "${locale}/${slug}" has an invalid "image" in frontmatter`);
  }

  if (data.draft !== undefined && typeof data.draft !== 'boolean') {
    throw new Error(`Post "${locale}/${slug}" has an invalid "draft" in frontmatter`);
  }
}
