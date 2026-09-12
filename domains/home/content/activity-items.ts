import { projects } from '@/domains/projects/content/projects';

import type { ContentItem } from '@/shared/ui/content-list';

import type { ActivityItemsByCategory } from './activity';

export function buildActivityItemsByCategory(writing: ContentItem[]): ActivityItemsByCategory {
  return {
    projects,
    writing
  };
}
