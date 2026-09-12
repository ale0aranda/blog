'use client';

import { useCurrentTime } from '@/shared/hooks/use-current-time';
import { FadeIn } from '@/shared/motion/components/fade-in';

import { FOOTER_LOCATION, FOOTER_TIMEZONE } from './footer.constants';

export function Footer() {
  const time = useCurrentTime({ timeZone: FOOTER_TIMEZONE });

  return (
    <FadeIn
      as="footer"
      animate="mount"
      className="mt-8 flex items-center justify-between border-t border-border py-4"
    >
      <p className="whitespace-nowrap text-sm tracking-tight text-muted">
        {FOOTER_LOCATION}
        <span aria-hidden="true" className="mx-1.5 opacity-40">
          —
        </span>
        {time ? (
          <time dateTime={time.iso}>{time.formatted}</time>
        ) : (
          <span className="inline-block w-13" aria-hidden="true" />
        )}
      </p>
    </FadeIn>
  );
}
