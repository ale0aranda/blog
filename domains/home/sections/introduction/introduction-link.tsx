'use client';

import type { ReactNode } from 'react';
import { useEffect, useId, useRef, useState } from 'react';

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
  const [open, setOpen] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const labelId = useId();
  const cardId = useId();

  function clearTimer() {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }

  function scheduleOpen() {
    if (!profile) return;

    clearTimer();

    timerRef.current = setTimeout(() => {
      setOpen(true);
      timerRef.current = null;
    }, 180);
  }

  function scheduleClose() {
    clearTimer();

    timerRef.current = setTimeout(() => {
      setOpen(false);
      timerRef.current = null;
    }, 120);
  }

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <a
      aria-describedby={profile && open ? cardId : undefined}
      aria-labelledby={labelId}
      className="relative inline-flex rounded-sm outline-offset-4 focus-visible:outline"
      href={href}
      rel={external ? 'noopener noreferrer' : undefined}
      target={external ? '_blank' : undefined}
      onBlur={scheduleClose}
      onFocus={() => {
        if (!profile) return;

        clearTimer();
        setOpen(true);
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          clearTimer();
          setOpen(false);
        }
      }}
      onPointerEnter={(event) => {
        if (event.pointerType === 'mouse') {
          scheduleOpen();
        }
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === 'mouse') {
          scheduleClose();
        }
      }}
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

      {profile && open && (
        <span
          className="absolute bottom-full left-1/2 z-50 block -translate-x-1/2 pb-3"
          style={{ width: 'min(20rem, calc(100vw - 2rem))' }}
        >
          <SocialProfileCard
            href={href}
            id={cardId}
            profile={profile}
          />
        </span>
      )}
    </a>
  );
}
