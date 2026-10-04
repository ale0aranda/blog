import type { ContentItem } from '@/shared/types/content-item';
import { Container } from '@/shared/ui/container';

import { Footer } from './sections/footer/footer';
import { Gallery } from './sections/gallery/gallery';
import { Hero } from './sections/hero/hero';
import { Introduction } from './sections/introduction/introduction';
import { MathGallery } from './sections/math-gallery/math-gallery';
import { Projects } from './sections/projects/projects';
import { Writing } from './sections/writing/writing';

type HomePageProps = {
  writingItems: ContentItem[];
};

export function HomePage({ writingItems }: HomePageProps) {
  return (
    <Container>
      <Hero />
      <Introduction />
      <Projects />
      <Writing items={writingItems} />
      <Gallery />
      <MathGallery />
      <Footer />
    </Container>
  );
}
