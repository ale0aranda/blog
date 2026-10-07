'use client';

import { useCurrentTime } from '@/shared/hooks/use-current-time';
import { FadeIn } from '@/shared/motion/components/fade-in';

import { FOOTER_LOCATION, FOOTER_TIMEZONE } from './footer.constants';
import { VisitCounter } from './visit-counter';

export function Footer() {
  const time = useCurrentTime({ timeZone: FOOTER_TIMEZONE });

  return (
    <FadeIn
      animate="mount"
      as="footer"
      className="mt-8 flex items-center justify-between gap-4 border-border border-t py-4"
    >
      <p className="whitespace-nowrap text-muted text-sm tracking-tight">
        {FOOTER_LOCATION}

        <span
          aria-hidden="true"
          className="mx-1.5 opacity-40"
        >
          —
        </span>

        {time ? (
          <time dateTime={time.iso}>{time.formatted}</time>
        ) : (
          <span
            aria-hidden="true"
            className="inline-block w-13"
          />
        )}
      </p>

      <VisitCounter />
    </FadeIn>
  );
}
