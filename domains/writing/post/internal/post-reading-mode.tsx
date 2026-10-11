'use client';

import type { CSSProperties, ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';

import { BookOpen, Minus, Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { cn } from '@/shared/lib/cn';

type PostReadingModeProps = {
  children: ReactNode;
  backLink: ReactNode;
};

export function PostReadingMode({ children, backLink }: PostReadingModeProps) {
  const [zen, setZen] = useState(false);
  const [fontSize, setFontSize] = useState(18);
  const [progress, setProgress] = useState(0);

  const contentRef = useRef<HTMLDivElement>(null);
  const enterButton = useRef<HTMLButtonElement>(null);
  const exitButton = useRef<HTMLButtonElement>(null);

  const t = useTranslations('domains.writing.readingMode');

  function exitZen() {
    setZen(false);

    requestAnimationFrame(() => {
      enterButton.current?.focus({ preventScroll: true });
    });
  }

  useEffect(() => {
    if (!zen) {
      return;
    }

    exitButton.current?.focus({ preventScroll: true });

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Escape' || event.defaultPrevented) {
        return;
      }

      event.preventDefault();
      setZen(false);

      requestAnimationFrame(() => {
        enterButton.current?.focus({ preventScroll: true });
      });
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [zen]);

  useEffect(() => {
    const content = contentRef.current;

    if (!zen || !content) {
      return;
    }

    let frame: number | null = null;

    function getBlocks() {
      const prose = content?.querySelector('.prose');

      if (!prose) {
        return [];
      }

      const candidates = Array.from(
        prose.querySelectorAll<HTMLElement>('p, h2, h3, h4, ul, ol, pre, blockquote, figure, table')
      ).filter((block) => !block.closest('.not-prose, .post-highlight-toolbar'));

      return candidates.filter(
        (block) => !candidates.some((parent) => parent !== block && parent.contains(block))
      );
    }

    function updateReading() {
      frame = null;

      if (!content) {
        return;
      }

      const viewportHeight = document.documentElement.clientHeight;
      const rect = content.getBoundingClientRect();
      const scrollTop = window.scrollY;

      const pageHeight = document.documentElement.scrollHeight;
      const maxScroll = Math.max(0, pageHeight - viewportHeight);

      const articleTop = scrollTop + rect.top;
      const articleBottom = articleTop + rect.height;

      const start = Math.min(maxScroll, Math.max(0, articleTop - 80));

      const end = Math.min(maxScroll, Math.max(start, articleBottom - viewportHeight + 128));

      const readingDistance = end - start;

      const nextProgress =
        readingDistance > 0
          ? Math.round(Math.min(1, Math.max(0, (scrollTop - start) / readingDistance)) * 100)
          : 100;

      setProgress((current) => (current === nextProgress ? current : nextProgress));

      const blocks = getBlocks();
      const focusLine = viewportHeight * 0.45;

      let activeBlock: HTMLElement | null = null;
      let closestDistance = Number.POSITIVE_INFINITY;

      for (const block of blocks) {
        const blockRect = block.getBoundingClientRect();

        if (blockRect.height === 0) {
          continue;
        }

        const blockDistance =
          focusLine < blockRect.top
            ? blockRect.top - focusLine
            : focusLine > blockRect.bottom
              ? focusLine - blockRect.bottom
              : 0;

        if (blockDistance < closestDistance) {
          closestDistance = blockDistance;
          activeBlock = block;
        }
      }

      for (const block of blocks) {
        const state = block === activeBlock ? 'active' : 'muted';

        if (block.getAttribute('data-reading-block') !== state) {
          block.setAttribute('data-reading-block', state);
        }
      }
    }

    function scheduleUpdate() {
      if (frame === null) {
        frame = requestAnimationFrame(updateReading);
      }
    }

    const resizeObserver = new ResizeObserver(scheduleUpdate);
    const mutationObserver = new MutationObserver(scheduleUpdate);

    resizeObserver.observe(content);
    resizeObserver.observe(document.documentElement);

    mutationObserver.observe(content, {
      childList: true,
      subtree: true
    });

    updateReading();

    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);

    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();

      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);

      if (frame !== null) {
        cancelAnimationFrame(frame);
      }

      for (const block of content.querySelectorAll('[data-reading-block]')) {
        block.removeAttribute('data-reading-block');
      }
    };
  }, [zen]);

  const readingStyle = {
    '--reading-font-size': `${fontSize}px`
  } as CSSProperties;

  const sizeButtonClass =
    'inline-flex h-10 w-12 items-center justify-center gap-1 rounded-xl text-muted transition-colors hover:bg-surface hover:text-fg focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-muted';

  return (
    <div
      data-reading-mode={zen ? 'zen' : 'default'}
      className={cn(
        'mx-auto flex w-full max-w-2xl flex-col px-6',
        zen ? 'pt-8 pb-32 sm:pt-10' : 'py-20'
      )}
      style={zen ? readingStyle : undefined}
    >
      <div
        hidden={zen}
        className="mb-10"
      >
        <div className="flex items-center justify-between gap-4">
          {backLink}

          <button
            ref={enterButton}
            type="button"
            onClick={() => setZen(true)}
            className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-border px-3 py-2 text-muted text-sm transition-colors hover:bg-surface hover:text-fg focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
          >
            <BookOpen
              aria-hidden="true"
              size={16}
              strokeWidth={1.6}
            />

            {t('enter')}
          </button>
        </div>
      </div>

      {zen && (
        <div className="mb-12 sm:mb-16">
          <div className="flex items-center justify-between gap-4">
            <span className="inline-flex items-center gap-2 text-muted text-xs">
              <BookOpen
                aria-hidden="true"
                size={16}
                strokeWidth={1.6}
              />

              {t('reading')}
            </span>

            <button
              ref={exitButton}
              type="button"
              onClick={exitZen}
              className="inline-flex items-center gap-2 rounded-lg px-2 py-1.5 text-muted text-xs transition-colors hover:bg-surface hover:text-fg focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
            >
              {t('exit')}

              <kbd className="hidden rounded border border-border px-1.5 py-0.5 font-mono text-xs sm:inline">
                Esc
              </kbd>
            </button>
          </div>
        </div>
      )}

      <div
        ref={contentRef}
        className="reading-content"
      >
        {children}
      </div>

      {zen && (
        <div className="reading-dock fixed inset-x-0 z-50 flex justify-center px-4">
          <fieldset
            aria-label={t('controls')}
            className="inline-flex items-center gap-1 rounded-2xl border border-border bg-bg/95 p-1.5 shadow-sm backdrop-blur-md"
          >
            <button
              type="button"
              aria-label={t('smaller')}
              title={t('smaller')}
              disabled={fontSize <= 16}
              onClick={() => setFontSize((current) => Math.max(16, current - 1))}
              className={sizeButtonClass}
            >
              <span
                aria-hidden="true"
                className="font-medium text-sm"
              >
                A
              </span>

              <Minus
                aria-hidden="true"
                size={12}
                strokeWidth={1.8}
              />
            </button>

            <button
              type="button"
              aria-label={t('larger')}
              title={t('larger')}
              disabled={fontSize >= 24}
              onClick={() => setFontSize((current) => Math.min(24, current + 1))}
              className={sizeButtonClass}
            >
              <span
                aria-hidden="true"
                className="font-medium text-lg"
              >
                A
              </span>

              <Plus
                aria-hidden="true"
                size={12}
                strokeWidth={1.8}
              />
            </button>

            <span
              aria-hidden="true"
              className="mx-1 h-4 w-px bg-border"
            />

            <div
              role="progressbar"
              aria-label={t('progress')}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progress}
              className="flex h-10 w-16 items-center justify-center"
            >
              <span className="font-mono text-muted text-xs tabular-nums">
                {progress}
                <span className="ml-0.5 opacity-60">%</span>
              </span>
            </div>
          </fieldset>
        </div>
      )}
    </div>
  );
}
