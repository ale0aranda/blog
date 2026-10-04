'use client';

import { FadeIn } from '@/shared/motion/components/fade-in';
import { StaggerGroup } from '@/shared/motion/components/stagger-group';
import type { ContentItem } from '@/shared/types/content-item';

import { WritingItem } from './writing-item';

type WritingListProps = {
  items: ContentItem[];
};

export function WritingList({ items }: WritingListProps) {
  return (
    <StaggerGroup
      as="ul"
      animate="mount"
      className="-mx-2"
    >
      {items.map((item) => (
        <FadeIn
          as="li"
          animate="mount"
          className="relative before:pointer-events-none before:absolute before:inset-x-2 before:top-0 before:h-px before:bg-border first:before:hidden"
          key={item.id}
        >
          <WritingItem item={item} />
        </FadeIn>
      ))}
    </StaggerGroup>
  );
}
