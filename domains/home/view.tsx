import { Container } from '@/shared/ui/container';

import { Footer } from './sections/footer/footer';
import { Gallery } from './sections/gallery/gallery';
import { Hero } from './sections/hero/hero';
import { Introduction } from './sections/introduction/introduction';
import { MathGallery } from './sections/math-gallery/math-gallery';
import { Projects } from './sections/projects/projects';

export function HomePage() {
  return (
    <Container>
      <Hero />
      <Introduction />
      <Projects />
      <Gallery />
      <MathGallery />
      <Footer />
    </Container>
  );
}
