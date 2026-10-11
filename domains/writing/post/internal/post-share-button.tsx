'use client';

import { useEffect, useRef, useState } from 'react';

import { Check, Link2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { copyToClipboard } from '@/shared/lib/clipboard';

type CopyStatus = 'idle' | 'copied' | 'error';

export function PostShareButton() {
  const [status, setStatus] = useState<CopyStatus>('idle');
  const busyRef = useRef(false);
  const t = useTranslations('domains.writing.share');

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

  const label = status === 'copied' ? t('copied') : status === 'error' ? t('retry') : t('share');

  return (
    <div className="relative">
      <button
        aria-label={t('copyAria')}
        className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-2 text-muted text-sm transition-colors hover:bg-fg/5 hover:text-fg focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4"
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
        {status === 'copied' ? t('copiedLive') : status === 'error' ? t('errorLive') : ''}
      </span>
    </div>
  );
}
