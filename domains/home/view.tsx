import { ProjectPreview } from '@/domains/projects/project-preview';
import { WritingPreview } from '@/domains/writing/writing-preview';

import type { ContentItem } from '@/shared/types/content-item';
import { Container } from '@/shared/ui/container';
import { Footer } from '@/shared/ui/footer/footer';

import { Gallery } from './sections/gallery/gallery';
import { Hero } from './sections/hero/hero';
import { Introduction } from './sections/introduction/introduction';
import { MathGallery } from './sections/math-gallery/math-gallery';

type HomePageProps = {
  writingItems: ContentItem[];
};

export function HomePage({ writingItems }: HomePageProps) {
  return (
    <Container>
      <Hero />
      <Introduction />
      <ProjectPreview />
      <WritingPreview items={writingItems} />
      <Gallery />
      <MathGallery />
      <Footer />
    </Container>
  );
}
