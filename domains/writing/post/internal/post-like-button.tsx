'use client';

import { useEffect, useRef, useState } from 'react';

import { Heart } from 'lucide-react';

type PostLikeButtonProps = {
  locale: string;
  slug: string;
};

type LikesData = {
  count: number;
  liked: boolean;
};

export function PostLikeButton({ locale, slug }: PostLikeButtonProps) {
  const [data, setData] = useState<LikesData>({
    count: 0,
    liked: false
  });
  const [ready, setReady] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const busyRef = useRef(false);

  const endpoint = `/api/likes?${new URLSearchParams({
    locale,
    slug
  }).toString()}`;

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      setReady(false);
      setError(null);

      try {
        const response = await fetch(endpoint, {
          cache: 'no-store',
          signal: controller.signal
        });

        if (!response.ok) {
          throw new Error('Likes unavailable.');
        }

        const result = (await response.json()) as LikesData;

        if (!controller.signal.aborted) {
          setData(result);
          setReady(true);
        }
      } catch {
        if (!controller.signal.aborted) {
          setError('Likes are unavailable right now.');
        }
      }
    }

    void load();

    return () => {
      controller.abort();
    };
  }, [endpoint]);

  async function handleLike() {
    if (!ready || busyRef.current) {
      return;
    }

    busyRef.current = true;
    setPending(true);
    setError(null);

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          liked: !data.liked
        })
      });

      if (!response.ok) {
        throw new Error('Failed to save like.');
      }

      const result = (await response.json()) as LikesData;
      setData(result);
    } catch {
      setError('Could not save your like. Try again.');
    } finally {
      busyRef.current = false;
      setPending(false);
    }
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <button
        aria-busy={pending}
        aria-label={data.liked ? 'Remove like' : 'Like this post'}
        aria-pressed={data.liked}
        className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-50 ${
          data.liked
            ? 'border-accent/30 bg-accent/10 text-accent'
            : 'border-border text-muted hover:bg-fg/5 hover:text-fg'
        }`}
        disabled={!ready || pending}
        onClick={() => {
          void handleLike();
        }}
        type="button"
      >
        <Heart
          aria-hidden="true"
          className={`size-4 transition-transform motion-safe:active:scale-90 ${
            data.liked ? 'fill-current' : ''
          }`}
        />

        <span className="font-mono text-xs tabular-nums">
          {ready ? data.count.toLocaleString('en-US') : '—'}
        </span>
      </button>

      <p
        aria-live="polite"
        className="text-muted text-xs"
      >
        {error}
      </p>
    </div>
  );
}
