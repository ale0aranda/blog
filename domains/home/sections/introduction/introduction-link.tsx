'use client';

import type { ReactNode } from 'react';
import { useEffect, useId, useState } from 'react';

import { introductionStyles } from './introduction.styles';
import type { SocialProfile } from './social-profile-card';
import { SocialProfileCard } from './social-profile-card';

type IntroductionLinkProps = {
  children: ReactNode;
  href: string;
  icon: ReactNode;
  external?: boolean;
  profile?: SocialProfile;
};

export function IntroductionLink({
  children,
  href,
  icon,
  external = false,
  profile
}: IntroductionLinkProps) {
  const [dismissed, setDismissed] = useState(false);
  const labelId = useId();
  const cardId = useId();

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setDismissed(true);
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <span className="group/profile relative inline-flex">
      <a
        aria-labelledby={labelId}
        className="inline-flex rounded-sm outline-offset-4 focus-visible:outline"
        href={href}
        onFocus={() => setDismissed(false)}
        onPointerEnter={() => setDismissed(false)}
        rel={external ? 'noopener noreferrer' : undefined}
        target={external ? '_blank' : undefined}
      >
        <span
          className={introductionStyles.link}
          id={labelId}
        >
          {icon}
          {children}

          <span
            aria-hidden="true"
            className={introductionStyles.underline}
          />
        </span>
      </a>

      {profile && !dismissed && (
        <span
          className="invisible absolute bottom-full left-1/2 z-50 block -translate-x-1/2 pb-3 opacity-0 transition-opacity duration-150 group-focus-within/profile:visible group-focus-within/profile:opacity-100 group-hover/profile:visible group-hover/profile:opacity-100 motion-reduce:transition-none"
          style={{ width: 'min(20rem, calc(100vw - 2rem))' }}
        >
          <SocialProfileCard
            href={href}
            id={cardId}
            profile={profile}
          />
        </span>
      )}
    </span>
  );
}
