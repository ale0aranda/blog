'use client';

import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';

import { Eraser } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { createPortal } from 'react-dom';

const colors = ['yellow', 'green', 'blue'] as const;

type Color = (typeof colors)[number];

type Annotation = {
  start: number;
  end: number;
  color: Color;
};

type SelectedText = {
  start: number;
  end: number;
};

type SavedHighlights = {
  text: string;
  items: Annotation[];
};

type PostHighlightsProps = {
  children: ReactNode;
  locale: string;
  slug: string;
};

const colorClasses: Record<Color, string> = {
  yellow: 'bg-amber-300',
  green: 'bg-emerald-300',
  blue: 'bg-sky-300'
};

function isAnnotation(value: unknown): value is Annotation {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const item = value as Partial<Annotation>;

  return (
    typeof item.start === 'number'
    && Number.isInteger(item.start)
    && item.start >= 0
    && typeof item.end === 'number'
    && Number.isInteger(item.end)
    && item.end > item.start
    && colors.some((color) => color === item.color)
  );
}

function readSavedHighlights(value: unknown): SavedHighlights | null {
  if (typeof value !== 'object' || value === null) {
    return null;
  }

  const saved = value as {
    text?: unknown;
    items?: unknown;
  };

  if (typeof saved.text !== 'string' || !Array.isArray(saved.items)) {
    return null;
  }

  const text = saved.text;

  return {
    text,
    items: saved.items.filter(isAnnotation).filter((item) => item.end <= text.length)
  };
}

function createTextRange(root: HTMLElement, start: number, end: number) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const range = document.createRange();

  let position = 0;
  let started = false;
  let node = walker.nextNode();

  while (node) {
    const length = node.textContent?.length ?? 0;

    if (!started && start < position + length) {
      range.setStart(node, start - position);
      started = true;
    }

    if (started && end <= position + length) {
      range.setEnd(node, end - position);
      return range;
    }

    position += length;
    node = walker.nextNode();
  }

  return null;
}

function paintHighlights(root: HTMLElement, items: Annotation[]) {
  if (!('highlights' in CSS) || !('Highlight' in window)) {
    return;
  }

  for (const color of colors) {
    const ranges = items
      .filter((item) => item.color === color)
      .map((item) => createTextRange(root, item.start, item.end))
      .filter((range): range is Range => range !== null);

    CSS.highlights.set(`post-${color}`, new Highlight(...ranges));
  }
}

export function PostHighlights({ children, locale, slug }: PostHighlightsProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const toolbarRef = useRef<HTMLFieldSetElement>(null);
  const annotationsRef = useRef<Annotation[]>([]);

  const [selection, setSelection] = useState<SelectedText | null>(null);
  const [storageError, setStorageError] = useState(false);
  const [toolbarPosition, setToolbarPosition] = useState({
    left: 0,
    top: 0,
    vertical: true
  });

  const t = useTranslations('domains.writing.highlights');
  const storageKey = `post-highlights:v1:${locale}:${slug}`;

  useEffect(() => {
    const style = document.createElement('style');

    style.setAttribute('data-post-highlights', '');
    style.textContent = `
      ::highlight(post-yellow) {
        background-color: rgb(252 211 77 / 38%);
      }

      ::highlight(post-green) {
        background-color: rgb(110 231 183 / 35%);
      }

      ::highlight(post-blue) {
        background-color: rgb(125 211 252 / 38%);
      }
    `;

    document.head.appendChild(style);

    return () => {
      style.remove();
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;

    if (!root || !('highlights' in CSS) || !('Highlight' in window)) {
      return;
    }

    const articleRoot = root;
    annotationsRef.current = [];

    try {
      const raw = localStorage.getItem(storageKey);

      if (raw) {
        const parsed: unknown = JSON.parse(raw);
        const saved = readSavedHighlights(parsed);

        if (saved && saved.text === articleRoot.textContent) {
          annotationsRef.current = saved.items;
        }
      }
    } catch {
      annotationsRef.current = [];
    }

    paintHighlights(articleRoot, annotationsRef.current);

    function updateSelection() {
      const current = window.getSelection();

      if (!current || current.isCollapsed || current.rangeCount === 0) {
        // Mantiene la barra disponible cuando se navega por teclado.
        if (toolbarRef.current?.contains(document.activeElement)) {
          return;
        }

        setSelection(null);
        return;
      }

      const range = current.getRangeAt(0);

      if (
        !articleRoot.contains(range.startContainer)
        || !articleRoot.contains(range.endContainer)
        || !current.toString().trim()
      ) {
        setSelection(null);
        return;
      }

      const before = document.createRange();
      before.selectNodeContents(articleRoot);
      before.setEnd(range.startContainer, range.startOffset);

      const start = before.toString().length;
      const articleRect = articleRoot.getBoundingClientRect();
      const selectionRect = range.getBoundingClientRect();

      const viewportWidth = document.documentElement.clientWidth;
      const viewportHeight = document.documentElement.clientHeight;

      if (selectionRect.bottom < 0 || selectionRect.top > viewportHeight) {
        setSelection(null);
        return;
      }

      const vertical = articleRect.right + 76 <= viewportWidth;
      const toolbarWidth = vertical ? 48 : 184;
      const toolbarHeight = vertical ? 184 : 48;

      const preferredLeft = vertical
        ? articleRect.right + 20
        : selectionRect.left + selectionRect.width / 2 - toolbarWidth / 2;

      let preferredTop = vertical
        ? selectionRect.top + selectionRect.height / 2 - toolbarHeight / 2
        : selectionRect.top - toolbarHeight - 12;

      if (!vertical && preferredTop < 12) {
        preferredTop = selectionRect.bottom + 12;
      }

      setToolbarPosition({
        vertical,
        left: Math.max(12, Math.min(preferredLeft, viewportWidth - toolbarWidth - 12)),
        top: Math.max(12, Math.min(preferredTop, viewportHeight - toolbarHeight - 12))
      });

      setSelection({
        start,
        end: start + range.toString().length
      });
    }

    function handlePointerDown(event: PointerEvent) {
      if (event.target instanceof Node && toolbarRef.current?.contains(event.target)) {
        return;
      }

      setSelection(null);
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setSelection(null);
        window.getSelection()?.removeAllRanges();
      }
    }

    const observer = new ResizeObserver(updateSelection);
    observer.observe(articleRoot);

    document.addEventListener('selectionchange', updateSelection);
    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('scroll', updateSelection, { passive: true });
    window.addEventListener('resize', updateSelection);

    return () => {
      observer.disconnect();

      document.removeEventListener('selectionchange', updateSelection);
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('scroll', updateSelection);
      window.removeEventListener('resize', updateSelection);

      for (const color of colors) {
        CSS.highlights.delete(`post-${color}`);
      }
    };
  }, [storageKey]);

  function applyColor(color: Color | null) {
    const root = rootRef.current;

    if (!selection || !root) {
      return;
    }

    const next: Annotation[] = [];

    for (const item of annotationsRef.current) {
      if (item.end <= selection.start || item.start >= selection.end) {
        next.push(item);
        continue;
      }

      if (item.start < selection.start) {
        next.push({ ...item, end: selection.start });
      }

      if (item.end > selection.end) {
        next.push({ ...item, start: selection.end });
      }
    }

    if (color) {
      next.push({ ...selection, color });
    }

    annotationsRef.current = next;
    paintHighlights(root, next);

    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify({
          text: root.textContent ?? '',
          items: next
        })
      );

      setStorageError(false);
    } catch {
      setStorageError(true);
    }

    window.getSelection()?.removeAllRanges();
    setSelection(null);
  }

  return (
    <>
      <div ref={rootRef}>{children}</div>

      {selection
        && createPortal(
          <fieldset
            ref={toolbarRef}
            aria-label={t('toolbar')}
            style={{
              left: toolbarPosition.left,
              top: toolbarPosition.top
            }}
            className={`post-highlight-toolbar fixed z-60 m-0 flex min-w-0 items-center gap-1 rounded-full border border-border bg-bg/95 p-1.5 shadow-md backdrop-blur-md ${
              toolbarPosition.vertical ? 'flex-col' : 'flex-row'
            }`}
          >
            {colors.map((color) => {
              const active = annotationsRef.current.some(
                (item) =>
                  item.color === color && item.start <= selection.start && item.end >= selection.end
              );

              const label = t(`colors.${color}`);

              return (
                <button
                  key={color}
                  type="button"
                  aria-label={label}
                  aria-pressed={active}
                  title={label}
                  onPointerDown={(event) => event.preventDefault()}
                  onClick={() => applyColor(color)}
                  className="flex size-9 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-surface focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
                >
                  <span
                    aria-hidden="true"
                    className={`size-5 rounded-full ${colorClasses[color]} ${
                      active ? 'ring-2 ring-muted/40 ring-offset-2 ring-offset-bg' : ''
                    }`}
                  />
                </button>
              );
            })}

            <span
              aria-hidden="true"
              className={
                toolbarPosition.vertical ? 'my-1 h-px w-5 bg-border' : 'mx-1 h-5 w-px bg-border'
              }
            />

            <button
              type="button"
              aria-label={t('remove')}
              title={t('remove')}
              onPointerDown={(event) => event.preventDefault()}
              onClick={() => applyColor(null)}
              className="flex size-9 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface hover:text-fg focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
            >
              <Eraser
                aria-hidden="true"
                size={17}
                strokeWidth={1.6}
              />
            </button>
          </fieldset>,
          document.body
        )}

      {storageError && (
        <p
          role="status"
          className="mt-3 text-muted text-sm"
        >
          {t('storageError')}
        </p>
      )}
    </>
  );
}
