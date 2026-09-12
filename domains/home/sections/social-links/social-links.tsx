import { useTranslations } from 'next-intl';

import { FadeIn } from '@/shared/motion/components/fade-in';
import { StaggerGroup } from '@/shared/motion/components/stagger-group';

import type { Social } from '../../content/social-links';
import { SocialLink } from './social-link';

interface SocialLinksProps {
  links: readonly Social[];
}

export function SocialLinks({ links }: SocialLinksProps) {
  const t = useTranslations('home.social');

  return (
    <nav aria-label={t('navigation')} className="mb-10">
      <StaggerGroup as="ul" className="flex items-center gap-4">
        {links.map((link) => (
          <FadeIn key={link.id} as="li" y={6}>
            <SocialLink
              social={{
                ...link,
                label: t(link.id)
              }}
            />
          </FadeIn>
        ))}
      </StaggerGroup>
    </nav>
  );
}
