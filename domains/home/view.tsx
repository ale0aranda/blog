import { Container } from '@/shared/ui/container';

import type { ActivityItemsByCategory } from './content/activity';
// import { Activity } from './sections/activity/activity';
import { Footer } from './sections/footer/footer';
import { Gallery } from './sections/gallery/gallery';
import { Hero } from './sections/hero/hero';
import { Introduction } from './sections/introduction/introduction';
import { MathGallery } from './sections/math-gallery/math-gallery';

type Props = {
  activityItemsByCategory: ActivityItemsByCategory;
};

export function HomePage({ activityItemsByCategory }: Props) {
  return (
    <Container>
      <Hero />
      <Introduction />
      <Gallery />
      <MathGallery />
      <Footer />
    </Container>
  );
}
