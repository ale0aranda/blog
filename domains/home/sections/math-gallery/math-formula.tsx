'use client';

import type { ReactNode } from 'react';
import { useEffect, useId, useRef, useState } from 'react';

import katex from 'katex';
import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { createPortal } from 'react-dom';

type Experiment = 'sine' | 'orbit' | 'ripples' | 'bezier' | 'pendulum' | 'lissajous';

type MathFormulaProps = {
  formula: string;
  experiment: Experiment;
  graph?: ReactNode;
  value?: string;
};

type FormulaProps = {
  formula: string;
};

function Formula({ formula }: FormulaProps) {
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) {
      return;
    }

    katex.render(formula, element, {
      displayMode: false,
      output: 'htmlAndMathml',
      throwOnError: false,
      trust: false
    });
  }, [formula]);

  return (
    <span
      className="block"
      ref={elementRef}
    />
  );
}

export function MathFormula({ formula, experiment, graph, value }: MathFormulaProps) {
  const t = useTranslations('home.mathGallery');

  const titleId = useId();
  const descriptionId = useId();

  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const previousOverflowRef = useRef<string | null>(null);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => {
      if (previousOverflowRef.current !== null) {
        document.body.style.overflow = previousOverflowRef.current;
        previousOverflowRef.current = null;
      }
    };
  }, []);

  function restoreScroll() {
    if (previousOverflowRef.current !== null) {
      document.body.style.overflow = previousOverflowRef.current;
      previousOverflowRef.current = null;
    }
  }

  function openDialog() {
    const dialog = dialogRef.current;

    if (!dialog || dialog.open) {
      return;
    }

    dialog.showModal();

    previousOverflowRef.current = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }

  function closeDialog() {
    dialogRef.current?.close();
  }

  function handleClose() {
    restoreScroll();
    triggerRef.current?.focus({ preventScroll: true });
  }

  return (
    <>
      <div className="absolute inset-x-0 bottom-3 flex h-12 items-center justify-center px-3">
        <button
          aria-haspopup="dialog"
          aria-label={t('openFormula', {
            name: t(`experiments.${experiment}.title`)
          })}
          className="cursor-pointer rounded-lg px-2 py-1 text-muted text-sm outline-offset-4 transition-colors duration-200 hover:bg-bg hover:text-accent focus-visible:text-accent focus-visible:outline focus-visible:outline-accent motion-reduce:transition-none"
          data-interactive="true"
          onClick={openDialog}
          ref={triggerRef}
          type="button"
        >
          <Formula formula={formula} />
        </button>
      </div>

      {mounted
        && createPortal(
          <dialog
            aria-describedby={descriptionId}
            aria-labelledby={titleId}
            className="fixed inset-0 m-auto max-h-11/12 w-11/12 max-w-md overflow-y-auto rounded-2xl border border-border bg-bg p-0 text-fg shadow-xl backdrop:bg-black/30 backdrop:backdrop-blur-sm"
            onClose={handleClose}
            ref={dialogRef}
          >
            <header className="flex items-center justify-between gap-4 px-5 py-4">
              <h2
                className="m-0 font-medium text-fg text-sm tracking-tight"
                id={titleId}
              >
                {t(`experiments.${experiment}.title`)}
              </h2>

              <button
                aria-label={t('close')}
                className="flex size-8 shrink-0 items-center justify-center rounded-lg text-muted outline-offset-2 transition-colors duration-200 hover:bg-surface hover:text-fg focus-visible:outline focus-visible:outline-accent motion-reduce:transition-none"
                onClick={closeDialog}
                type="button"
              >
                <X
                  aria-hidden="true"
                  className="size-4"
                  strokeWidth={1.5}
                />
              </button>
            </header>

            {graph && (
              <div className="px-4">
                <div className="relative overflow-hidden rounded-xl bg-surface">
                  {graph}

                  {value && (
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute top-3 right-3 rounded-md bg-bg/80 px-2 py-1 font-mono text-muted text-xs tabular-nums"
                    >
                      {value}
                    </span>
                  )}
                </div>
              </div>
            )}

            <div className="px-5 pt-4 pb-5">
              <div className="overflow-x-auto py-2 text-center text-fg">
                <Formula formula={formula} />
              </div>

              <p
                className="mt-3 mb-0 text-muted text-sm leading-relaxed"
                id={descriptionId}
              >
                {t(`experiments.${experiment}.description`)}
              </p>
            </div>
          </dialog>,
          document.body
        )}
    </>
  );
}
