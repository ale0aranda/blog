import { Container } from '@/shared/ui/container';

import type { ActivityItemsByCategory } from './content/activity';
import { Activity } from './sections/activity/activity';
import { Footer } from './sections/footer/footer';
import { Hero } from './sections/hero/hero';
import { Introduction } from './sections/introduction/introduction';

type Props = {
  activityItemsByCategory: ActivityItemsByCategory;
};

export function HomePage({ activityItemsByCategory }: Props) {
  return (
    <Container>
      <Hero />
      <Introduction />
      <Activity itemsByCategory={activityItemsByCategory} />
      <Footer />
    </Container>
  );
}
