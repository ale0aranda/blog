'use client';

import type { ReactNode } from 'react';
import { useEffect, useId, useRef, useState } from 'react';

import { Check } from 'lucide-react';

import { copyToClipboard } from '@/shared/lib/clipboard';

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

type CopyStatus = 'idle' | 'copied' | 'error';

export function IntroductionLink({
  children,
  href,
  icon,
  external = false,
  profile
}: IntroductionLinkProps) {
  const [dismissed, setDismissed] = useState(false);
  const [copyStatus, setCopyStatus] = useState<CopyStatus>('idle');

  const busyRef = useRef(false);
  const labelId = useId();
  const cardId = useId();

  const isEmail = href.startsWith('mailto:');

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

  useEffect(() => {
    if (copyStatus === 'idle') {
      return;
    }

    const timeout = window.setTimeout(() => {
      setCopyStatus('idle');
    }, 2_000);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [copyStatus]);

  async function handleCopyEmail() {
    if (busyRef.current) {
      return;
    }

    busyRef.current = true;

    try {
      const email = decodeURIComponent(href.slice('mailto:'.length).split('?')[0] ?? '');

      const copied = await copyToClipboard(email);

      setCopyStatus(copied ? 'copied' : 'error');
    } finally {
      busyRef.current = false;
    }
  }

  const content = (
    <span
      className={introductionStyles.link}
      id={labelId}
    >
      {isEmail && copyStatus === 'copied' ? (
        <Check
          aria-hidden="true"
          className={introductionStyles.icon}
        />
      ) : (
        icon
      )}

      {isEmail && copyStatus === 'copied'
        ? 'Copied'
        : isEmail && copyStatus === 'error'
          ? 'Try again'
          : children}

      <span
        aria-hidden="true"
        className={introductionStyles.underline}
      />
    </span>
  );

  return (
    <span className="group/profile relative inline-flex">
      {isEmail ? (
        <button
          aria-label="Copy email address"
          className="inline-flex cursor-pointer rounded-sm border-0 bg-transparent p-0 text-inherit outline-offset-4 focus-visible:outline"
          onClick={() => {
            void handleCopyEmail();
          }}
          onFocus={() => setDismissed(false)}
          onPointerEnter={() => setDismissed(false)}
          type="button"
        >
          {content}
        </button>
      ) : (
        <a
          aria-labelledby={labelId}
          className="inline-flex rounded-sm outline-offset-4 focus-visible:outline"
          href={href}
          onFocus={() => setDismissed(false)}
          onPointerEnter={() => setDismissed(false)}
          rel={external ? 'noopener noreferrer' : undefined}
          target={external ? '_blank' : undefined}
        >
          {content}
        </a>
      )}

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

      {isEmail && (
        <span
          aria-live="polite"
          className="sr-only"
        >
          {copyStatus === 'copied'
            ? 'Email address copied to clipboard.'
            : copyStatus === 'error'
              ? 'Could not copy the email address. Please try again.'
              : ''}
        </span>
      )}
    </span>
  );
}
