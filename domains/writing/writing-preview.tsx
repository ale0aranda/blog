import { WritingList } from '@/domains/writing/writing-list';

import { FadeIn } from '@/shared/motion/components/fade-in';
import type { ContentItem } from '@/shared/types/content-item';
import { SectionHeader } from '@/shared/ui/section-header';

type WritingProps = {
  items: ContentItem[];
};

export function WritingPreview({ items }: WritingProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="home-writing-title"
      className="mt-10"
    >
      <FadeIn animate="mount">
        <SectionHeader
          count={items.length}
          headingId="home-writing-title"
          href="/writing"
          translationNamespace="home.writing"
        />
      </FadeIn>

      <WritingList items={items.slice(0, 3)} />
    </section>
  );
}
