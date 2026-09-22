import type { ReactNode } from 'react';

import { introductionStyles } from './introduction.styles';

type IntroductionLinkProps = {
  children: ReactNode;
  href: string;
  icon: ReactNode;
  external?: boolean;
};

export function IntroductionLink({
  children,
  href,
  icon,
  external = false
}: IntroductionLinkProps) {
  return (
    <a
      className={introductionStyles.link}
      href={href}
      rel={external ? 'noopener noreferrer' : undefined}
      target={external ? '_blank' : undefined}
    >
      {icon}
      {children}
      <span className={introductionStyles.underline} />
    </a>
  );
}
