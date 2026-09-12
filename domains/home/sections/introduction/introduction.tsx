import { useTranslations } from 'next-intl';

import { FadeIn } from '@/shared/motion/components/fade-in';
import { StaggerGroup } from '@/shared/motion/components/stagger-group';

export function Introduction() {
  const t = useTranslations('home.introduction');

  return (
    <StaggerGroup as="section" className="mb-3 mt-8 space-y-4 leading-relaxed text-fg">
      <FadeIn as="p">{t('description')}</FadeIn>
      <FadeIn as="p">{t('about')}</FadeIn>
    </StaggerGroup>
  );
}
