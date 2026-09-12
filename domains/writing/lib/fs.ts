import fs from 'node:fs';
import path from 'node:path';

import { LOCALE_PATTERN, POSTS_DIR, SLUG_PATTERN } from './constants';

function assertValidLocale(locale: string): void {
  if (!LOCALE_PATTERN.test(locale)) {
    throw new Error(`Invalid locale: ${locale}`);
  }
}

export function getPostSlugs(locale: string): string[] {
  assertValidLocale(locale);

  const dir = path.join(POSTS_DIR, locale);

  if (!fs.existsSync(dir)) {
    return [];
  }

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''));
}

export function readPostFile(locale: string, slug: string): string {
  assertValidLocale(locale);

  if (!SLUG_PATTERN.test(slug)) {
    throw new Error(`Invalid slug: ${slug}`);
  }

  const filePath = path.resolve(POSTS_DIR, locale, `${slug}.mdx`);
  const root = path.resolve(POSTS_DIR);

  if (!filePath.startsWith(root + path.sep)) {
    throw new Error(`Invalid slug: ${slug}`);
  }

  return fs.readFileSync(filePath, 'utf8');
}
