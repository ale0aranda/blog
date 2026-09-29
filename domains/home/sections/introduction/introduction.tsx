import { Calendar, FileText, Mail } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { FadeIn } from '@/shared/motion/components/fade-in';
import { StaggerGroup } from '@/shared/motion/components/stagger-group';

import { introductionStyles } from './introduction.styles';
import { GitHubIcon, XIcon } from './introduction-icons';
import { IntroductionLink } from './introduction-link';

export function Introduction() {
  const t = useTranslations('home.introduction');

  return (
    <StaggerGroup
      as="section"
      className="mt-8 mb-3 space-y-4 text-fg leading-relaxed"
    >
      <FadeIn as="p">{t('description')}</FadeIn>

      <FadeIn as="p">{t('about')}</FadeIn>

      <FadeIn
        as="p"
        className={introductionStyles.paragraph}
      >
        <span>{t('contact')}</span>

        <IntroductionLink
          href="mailto:alejandro.arancibia.aranda@gmail.com"
          icon={
            <Mail
              aria-hidden="true"
              className={introductionStyles.icon}
            />
          }
        >
          {t('email')}
        </IntroductionLink>

        <span>{t('or')}</span>

        <IntroductionLink
          external
          href="https://cal.com/alejandro-aranda-og8ygh/30min"
          icon={
            <Calendar
              aria-hidden="true"
              className={introductionStyles.icon}
            />
          }
        >
          {t('book')}
        </IntroductionLink>

        <span
          aria-hidden="true"
          className="text-fg/30"
        >
          ·
        </span>

        <span>{t('explore')}</span>

        <IntroductionLink
          external
          href="https://github.com/ale0aranda"
          icon={<GitHubIcon />}
        >
          {t('github')}
        </IntroductionLink>

        <span aria-hidden="true">,</span>

        <IntroductionLink
          external
          href="https://x.com/ale0aranda"
          icon={<XIcon />}
        >
          {t('x')}
        </IntroductionLink>

        <span>{t('and')}</span>

        <IntroductionLink
          href="/resume.pdf"
          icon={
            <FileText
              aria-hidden="true"
              className={introductionStyles.icon}
            />
          }
        >
          {t('resume')}
        </IntroductionLink>
      </FadeIn>
    </StaggerGroup>
  );
}
