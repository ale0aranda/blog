'use client';

import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';

import { Maximize2, Minimize2 } from 'lucide-react';

import { cn } from '@/shared/lib/cn';

type PostReadingModeProps = {
  children: ReactNode;
  backLink: ReactNode;
  locale: string;
};

export function PostReadingMode({ children, backLink, locale }: PostReadingModeProps) {
  const [zen, setZen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const enterButton = useRef<HTMLButtonElement>(null);
  const exitButton = useRef<HTMLButtonElement>(null);
  const spanish = locale === 'es';

  useEffect(() => {
    if (!zen) {
      return;
    }

    const content = contentRef.current;

    if (!content) {
      return;
    }

    exitButton.current?.focus({ preventScroll: true });

    let frame: number | null = null;

    function updateFocus() {
      frame = null;

      if (!content) {
        return;
      }

      const paragraph = content.querySelector('.prose p');
      const lineHeight = paragraph ? Number.parseFloat(getComputedStyle(paragraph).lineHeight) : 28;

      const readableLineHeight = Number.isFinite(lineHeight) ? lineHeight : 28;

      const bandHeight = readableLineHeight * 5;
      const viewportHeight = document.documentElement.clientHeight;
      const rect = content.getBoundingClientRect();

      // La franja se mantiene un poco por encima del centro.
      const viewportCenter = viewportHeight * 0.45;
      const preferredStart = viewportCenter - bandHeight / 2 - rect.top;

      // Permite leer completos el inicio y el final del artículo.
      const start = Math.max(0, Math.min(preferredStart, Math.max(0, rect.height - bandHeight)));

      content.style.setProperty('--reading-start', `${start}px`);
      content.style.setProperty('--reading-end', `${start + bandHeight}px`);
    }

    function scheduleUpdate() {
      if (frame === null) {
        frame = requestAnimationFrame(updateFocus);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault();
        setZen(false);
        enterButton.current?.focus({ preventScroll: true });
      }
    }

    const observer = new ResizeObserver(scheduleUpdate);

    observer.observe(content);
    updateFocus();

    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      observer.disconnect();

      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      document.removeEventListener('keydown', handleKeyDown);

      if (frame !== null) {
        cancelAnimationFrame(frame);
      }

      content.style.removeProperty('--reading-start');
      content.style.removeProperty('--reading-end');
    };
  }, [zen]);

  function exitZen() {
    setZen(false);
    enterButton.current?.focus({ preventScroll: true });
  }

  return (
    <div
      data-reading-mode={zen ? 'zen' : 'default'}
      className={cn(
        'mx-auto flex w-full flex-col px-6 py-20',
        zen ? 'max-w-3xl sm:px-10' : 'max-w-2xl'
      )}
    >
      <div
        hidden={zen}
        className="mb-8"
      >
        <div className="flex items-start justify-between gap-4">
          {backLink}

          <button
            ref={enterButton}
            type="button"
            aria-pressed={zen}
            onClick={() => setZen(true)}
            className="inline-flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-muted text-sm transition-colors hover:bg-surface hover:text-fg focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
          >
            <Maximize2
              aria-hidden="true"
              size={15}
              strokeWidth={1.6}
            />

            {spanish ? 'Modo zen' : 'Zen mode'}
          </button>
        </div>
      </div>

      {zen && (
        <button
          ref={exitButton}
          type="button"
          onClick={exitZen}
          className="fixed top-5 right-5 z-50 inline-flex items-center gap-2 rounded-full border border-border bg-bg/95 px-3 py-2 text-muted text-sm backdrop-blur-md transition-colors hover:bg-surface hover:text-fg focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
        >
          <Minimize2
            aria-hidden="true"
            size={15}
            strokeWidth={1.6}
          />

          {spanish ? 'Salir del modo zen' : 'Exit zen mode'}

          <span
            aria-hidden="true"
            className="hidden rounded border border-border px-1 font-mono text-xs sm:inline"
          >
            Esc
          </span>
        </button>
      )}

      <div
        ref={contentRef}
        className="reading-content"
      >
        {children}
      </div>
    </div>
  );
}
