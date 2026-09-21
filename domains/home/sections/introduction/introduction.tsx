import { Calendar, FileText, Mail } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { FadeIn } from '@/shared/motion/components/fade-in';
import { StaggerGroup } from '@/shared/motion/components/stagger-group';

const linkClass =
  'group relative inline-flex items-center gap-1.5 rounded-sm px-1 py-0.5 -mx-1 '
  + 'text-fg/75 transition-colors duration-300 hover:text-fg';

const underlineClass =
  'pointer-events-none absolute inset-x-1 -bottom-px h-px origin-left scale-x-0 '
  + 'bg-fg transition-transform duration-300 ease-[cubic-bezier(0.65,0,0.35,1)] '
  + 'group-hover:scale-x-100';

const iconClass =
  'size-4 shrink-0 transition-transform duration-300 ease-out group-hover:-translate-y-px';

function GitHubIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-4"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.084-.729.084-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23a11.5 11.5 0 0 1 3.003-.404c1.02.005 2.045.138 3.003.404 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.21 0 1.595-.015 2.875-.015 3.265 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-4"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817-5.967 6.817H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function Introduction() {
  const t = useTranslations('home.introduction');

  return (
    <StaggerGroup
      as="section"
      className="mb-3 mt-8 space-y-4 leading-relaxed text-fg"
    >
      <FadeIn as="p">{t('description')}</FadeIn>

      <FadeIn as="p">{t('about')}</FadeIn>

      <FadeIn
        as="p"
        className="flex flex-wrap items-center gap-x-1.5 gap-y-2 text-fg/75"
      >
        <span>{t('contact')}</span>

        <a
          className={linkClass}
          href="mailto:alejandro.arancibia.aranda@gmail.com"
        >
          <Mail
            aria-hidden="true"
            className={iconClass}
          />
          {t('email')}
          <span className={underlineClass} />
        </a>

        <span>{t('or')}</span>

        <a
          className={linkClass}
          href="https://cal.com/alejandro-aranda-og8ygh/30min"
          rel="noopener noreferrer"
          target="_blank"
        >
          <Calendar
            aria-hidden="true"
            className={iconClass}
          />
          {t('book')}
          <span className={underlineClass} />
        </a>

        <span
          aria-hidden="true"
          className="text-fg/30"
        >
          ·
        </span>

        <span>{t('explore')}</span>

        <a
          className={linkClass}
          href="https://github.com/ale0aranda"
          rel="noopener noreferrer"
          target="_blank"
        >
          <GitHubIcon />
          {t('github')}
          <span className={underlineClass} />
        </a>

        <span aria-hidden="true">,</span>

        <a
          className={linkClass}
          href="https://x.com/ale0aranda"
          rel="noopener noreferrer"
          target="_blank"
        >
          <XIcon />
          <span className={underlineClass} />
        </a>

        <span>{t('and')}</span>

        <a
          className={linkClass}
          href="/resume.pdf"
          rel="noopener noreferrer"
          target="_blank"
        >
          <FileText
            aria-hidden="true"
            className={iconClass}
          />
          {t('resume')}
          <span className={underlineClass} />
        </a>
      </FadeIn>
    </StaggerGroup>
  );
}
