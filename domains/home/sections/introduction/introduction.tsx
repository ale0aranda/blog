import { Calendar, FileText, Mail } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { FadeIn } from '@/shared/motion/components/fade-in';
import { StaggerGroup } from '@/shared/motion/components/stagger-group';

import { getGitHubProfile } from './github-profile';
import { introductionStyles } from './introduction.styles';
import { GitHubIcon, XIcon } from './introduction-icons';
import { IntroductionLink } from './introduction-link';
import type { SocialProfile } from './social-profile-card';

export async function Introduction() {
  const [t, github] = await Promise.all([getTranslations('home.introduction'), getGitHubProfile()]);

  const sharedIdentity = {
    name: github?.name || 'Alejandro Aranda',
    ...(github ? { avatar: github.avatar_url } : {})
  };

  const githubProfile: SocialProfile = {
    ...sharedIdentity,
    platform: 'github',
    username: github?.login ?? 'ale0aranda',
    bio: github?.bio ?? '',
    ...(github?.location ? { location: github.location } : {}),
    ...(github
      ? {
          followers: github.followers,
          repositories: github.public_repos
        }
      : {})
  };

  const xProfile: SocialProfile = {
    ...sharedIdentity,
    platform: 'x',
    username: 'ale0aranda',
    bio: t('profiles.x.bio'),
    location: 'Santiago, Chile',
    banner: '/profile/banner.png'
  };

  const calProfile: SocialProfile = {
    ...sharedIdentity,
    platform: 'cal',
    username: '',
    bio: t('profiles.cal.bio'),
    duration: t('profiles.cal.duration'),
    actionLabel: t('profiles.cal.action')
  };

  const emailProfile: SocialProfile = {
    ...sharedIdentity,
    platform: 'email',
    username: 'alejandro.arancibia.aranda@gmail.com',
    bio: t('profiles.email.bio'),
    actionLabel: t('profiles.email.action')
  };

  return (
    <StaggerGroup
      as="section"
      className="mt-8 space-y-4 text-fg leading-relaxed"
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
          profile={emailProfile}
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
          profile={calProfile}
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
          profile={githubProfile}
        >
          {t('github')}
        </IntroductionLink>

        <span aria-hidden="true">,</span>

        <IntroductionLink
          external
          href="https://x.com/ale0aranda"
          icon={<XIcon />}
          profile={xProfile}
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
