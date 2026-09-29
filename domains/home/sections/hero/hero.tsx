import { FadeIn } from '@/shared/motion/components/fade-in';
import { StaggerGroup } from '@/shared/motion/components/stagger-group';

import { build } from '../../content/build';
import { BuildBadge } from './build-badge';
import { HeroTitle } from './hero-title';

export function Hero() {
  return (
    <StaggerGroup
      as="header"
      className="flex items-center gap-5"
    >
      <FadeIn>
        <HeroTitle />
      </FadeIn>
      <FadeIn delay={0.12}>
        <BuildBadge build={build} />
      </FadeIn>
    </StaggerGroup>
  );
}
