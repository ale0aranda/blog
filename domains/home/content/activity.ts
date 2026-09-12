import type { ContentItem } from '@/shared/ui/content-list';

export const ACTIVITY_CATEGORIES = [
  {
    id: 'projects',
    href: '/projects'
  },
  {
    id: 'writing',
    href: '/writing'
  }
] as const;

export type ActivityCategory = (typeof ACTIVITY_CATEGORIES)[number];

export type ActivityCategoryId = ActivityCategory['id'];

export type ActivityItemsByCategory = Record<ActivityCategoryId, ContentItem[]>;
