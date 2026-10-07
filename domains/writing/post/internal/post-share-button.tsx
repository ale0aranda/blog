'use client';

import { useEffect, useRef, useState } from 'react';

import { Check, Link2 } from 'lucide-react';

import { copyToClipboard } from '@/shared/lib/clipboard';

type CopyStatus = 'idle' | 'copied' | 'error';

export function PostShareButton() {
  const [status, setStatus] = useState<CopyStatus>('idle');
  const busyRef = useRef(false);

  useEffect(() => {
    if (status === 'idle') {
      return;
    }

    const timeout = window.setTimeout(() => {
      setStatus('idle');
    }, 2_000);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [status]);

  async function handleShare() {
    if (busyRef.current) {
      return;
    }

    busyRef.current = true;

    try {
      const url = new URL(window.location.href);

      url.search = '';
      url.hash = '';

      const copied = await copyToClipboard(url.toString());

      setStatus(copied ? 'copied' : 'error');
    } finally {
      busyRef.current = false;
    }
  }

  const label = status === 'copied' ? 'Link copied' : status === 'error' ? 'Try again' : 'Share';

  return (
    <div className="relative">
      <button
        aria-label="Copy post link"
        className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-2 text-muted text-sm transition-colors hover:bg-fg/5 hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        onClick={() => {
          void handleShare();
        }}
        type="button"
      >
        {status === 'copied' ? (
          <Check
            aria-hidden="true"
            className="size-4"
          />
        ) : (
          <Link2
            aria-hidden="true"
            className="size-4"
          />
        )}

        <span className="text-xs">{label}</span>
      </button>

      <span
        aria-live="polite"
        className="sr-only"
      >
        {status === 'copied'
          ? 'Post link copied to clipboard.'
          : status === 'error'
            ? 'Could not copy the link. Please try again.'
            : ''}
      </span>
    </div>
  );
}
