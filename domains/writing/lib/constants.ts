import path from 'node:path';

export const POSTS_DIR = path.join(process.cwd(), 'domains/writing/content/posts');

export const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const LOCALE_PATTERN = /^[a-z]{2}(?:-[A-Z]{2})?$/;

export const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
