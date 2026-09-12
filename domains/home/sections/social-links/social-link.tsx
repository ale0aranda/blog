'use client';

import type { KeyboardEventHandler } from 'react';
import { useCallback } from 'react';

import { useCopyFeedback } from '@/shared/hooks/use-copy-feedback';
import { useHoverIntent } from '@/shared/hooks/use-hover-intent';

import { SOCIAL_LINK_DELAY } from './social-link.constants';
import { socialLinkClass } from './social-link.styles';
import type { SocialLinkProps } from './social-link.types';
import { SocialPopover } from './social-popover';

export function SocialLink({ social }: SocialLinkProps) {
  const { href, label, external = false, copyValue } = social;

  const {
    isActive: hovered,
    show,
    hide,
    forceShow
  } = useHoverIntent({
    enterDelay: SOCIAL_LINK_DELAY.hoverEnter,
    leaveDelay: SOCIAL_LINK_DELAY.hoverLeave
  });

  const { isCopied, copy } = useCopyFeedback(SOCIAL_LINK_DELAY.copiedReset);

  const valueToCopy = copyValue ?? href;

  const handleCopy = useCallback(async () => {
    if (await copy(valueToCopy)) {
      forceShow();
    }
  }, [copy, valueToCopy, forceShow]);

  const handleKeyDown: KeyboardEventHandler<HTMLAnchorElement> = useCallback(
    (event) => {
      if (event.key === 'Escape') {
        hide();
      }
    },
    [hide]
  );

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: Container coordinates hover and focus between the link and popover.
    <div
      className="relative inline-flex"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocusCapture={show}
      onBlurCapture={hide}
    >
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        onKeyDown={handleKeyDown}
        className={socialLinkClass}
      >
        {label}
      </a>

      <SocialPopover
        open={hovered}
        copied={isCopied}
        href={href}
        onCopy={handleCopy}
        onMouseEnter={show}
        onMouseLeave={hide}
      />
    </div>
  );
}
