'use client';

import Image from 'next/image';
import { useEffect, useId, useRef, useState } from 'react';

import { ArrowUpRight, Music2 } from 'lucide-react';

import type { NowPlayingData } from './now-playing.types';

export function NowPlaying() {
  const [data, setData] = useState<NowPlayingData>({
    isPlaying: false
  });
  const [open, setOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const cardId = useId();

  useEffect(() => {
    const controller = new AbortController();
    let loading = false;

    async function refresh() {
      if (loading || document.hidden || controller.signal.aborted) {
        return;
      }

      loading = true;

      try {
        const response = await fetch('/api/now-playing', {
          cache: 'no-store',
          signal: controller.signal
        });

        if (!response.ok) {
          throw new Error('Spotify is unavailable.');
        }

        const result = (await response.json()) as NowPlayingData;

        if (!controller.signal.aborted) {
          setData(result);

          if (!result.isPlaying) {
            setOpen(false);
          }
        }
      } catch {
        if (!controller.signal.aborted) {
          setData({ isPlaying: false });
          setOpen(false);
        }
      } finally {
        loading = false;
      }
    }

    function handleVisibilityChange() {
      void refresh();
    }

    void refresh();

    const interval = window.setInterval(() => {
      void refresh();
    }, 30_000);

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      controller.abort();
      window.clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    function handlePointerDown(event: PointerEvent) {
      if (event.target instanceof Node && !containerRef.current?.contains(event.target)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }

    function handleFocusIn(event: FocusEvent) {
      if (event.target instanceof Node && !containerRef.current?.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('focusin', handleFocusIn);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('focusin', handleFocusIn);
    };
  }, [open]);

  if (!data.isPlaying) {
    return null;
  }

  return (
    <div
      className="relative"
      ref={containerRef}
    >
      <button
        aria-controls={cardId}
        aria-expanded={open}
        aria-label={open ? 'Hide current song' : 'Show current song'}
        className="grid size-8 place-items-center rounded-md text-emerald-500 transition-colors hover:bg-fg/5 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
        onClick={() => setOpen((previous) => !previous)}
        ref={buttonRef}
        type="button"
      >
        <span
          aria-hidden="true"
          className="spotify-equalizer flex h-4 items-end gap-0.5"
        >
          <span className="h-2 w-0.5 rounded-full bg-current" />
          <span className="h-4 w-0.5 rounded-full bg-current" />
          <span className="h-3 w-0.5 rounded-full bg-current" />
          <span className="h-2.5 w-0.5 rounded-full bg-current" />
        </span>
      </button>

      <section
        aria-label="Currently playing on Spotify"
        className="spotify-song-card absolute right-0 bottom-full z-50 mb-2 w-64 rounded-xl border border-border bg-bg p-2 shadow-lg"
        hidden={!open}
        id={cardId}
      >
        <a
          className="group flex items-center gap-3 rounded-lg p-1 transition-colors hover:bg-fg/5 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
          href={data.url}
          rel="noopener noreferrer"
          target="_blank"
        >
          {data.image ? (
            <Image
              alt={`${data.album} album cover`}
              className="size-12 shrink-0 rounded-md object-cover"
              height={48}
              src={data.image}
              unoptimized
              width={48}
            />
          ) : (
            <span className="grid size-12 shrink-0 place-items-center rounded-md bg-fg/5">
              <Music2
                aria-hidden="true"
                className="size-5 text-muted"
              />
            </span>
          )}

          <span className="min-w-0 flex-1">
            <span className="block truncate font-medium text-fg text-xs">{data.title}</span>

            <span className="mt-0.5 block truncate text-muted text-xs">{data.artist}</span>

            <span className="mt-1 flex items-center gap-1.5 text-muted text-xs">
              <span
                aria-hidden="true"
                className="size-1 rounded-full bg-emerald-500"
              />
              Spotify
            </span>
          </span>

          <ArrowUpRight
            aria-hidden="true"
            className="size-3.5 shrink-0 text-muted transition-colors group-hover:text-fg"
          />
        </a>
      </section>
    </div>
  );
}
