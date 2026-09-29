'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

import type { GalleryItem } from './gallery.data';

type Props = {
  activeIndex: number | null;
  items: readonly GalleryItem[];
  onChange: (index: number) => void;
  onClose: () => void;
};

const MotionDiv = motion.create('div');

export function GalleryViewer({ activeIndex, items, onChange, onClose }: Props) {
  const [direction, setDirection] = useState(0);

  const previous = useCallback(() => {
    if (activeIndex === null) {
      return;
    }

    setDirection(-1);
    onChange((activeIndex - 1 + items.length) % items.length);
  }, [activeIndex, items.length, onChange]);

  const next = useCallback(() => {
    if (activeIndex === null) {
      return;
    }

    setDirection(1);
    onChange((activeIndex + 1) % items.length);
  }, [activeIndex, items.length, onChange]);

  useEffect(() => {
    if (activeIndex === null) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }

      if (event.key === 'ArrowLeft') {
        previous();
      }

      if (event.key === 'ArrowRight') {
        next();
      }
    };

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeIndex, next, onClose, previous]);

  const item = activeIndex === null ? undefined : items[activeIndex];

  if (activeIndex === null || !item) {
    return null;
  }

  const previousIndex = (activeIndex - 1 + items.length) % items.length;
  const nextIndex = (activeIndex + 1) % items.length;

  const previousItem = items[previousIndex];
  const nextItem = items[nextIndex];

  if (!previousItem || !nextItem) {
    return null;
  }

  return (
    <AnimatePresence>
      <MotionDiv
        animate={{ opacity: 1 }}
        className="fixed inset-0 z-50 overflow-hidden bg-bg"
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        role="dialog"
        aria-label="Gallery viewer"
        aria-modal="true"
        transition={{
          duration: 0.2,
          ease: 'easeOut'
        }}
      >
        <header className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-5 py-5 sm:px-8 sm:py-7">
          <div className="flex items-center gap-2 font-mono text-muted text-xs tabular-nums">
            <span className="text-fg">{String(activeIndex + 1).padStart(2, '0')}</span>

            <span className="text-border">/</span>

            <span>{String(items.length).padStart(2, '0')}</span>
          </div>

          <button
            type="button"
            aria-label="Close gallery"
            className="group flex size-8 items-center justify-center text-muted transition-colors duration-200 hover:text-fg"
            onClick={onClose}
          >
            <X
              aria-hidden="true"
              className="size-4 transition-transform duration-300 ease-out group-hover:rotate-90"
            />
          </button>
        </header>

        <main className="flex h-dvh flex-col justify-center">
          <div className="relative flex h-2/3 min-h-90 w-full items-center justify-center overflow-hidden sm:h-3/4">
            <SideImage
              item={previousItem}
              position="left"
              onClick={previous}
            />

            <AnimatePresence
              custom={direction}
              initial={false}
              mode="popLayout"
            >
              <MotionDiv
                key={item.src}
                custom={direction}
                variants={{
                  enter: (value: number) => ({
                    opacity: 0,
                    x: value >= 0 ? 48 : -48,
                    scale: 0.985
                  }),
                  center: {
                    opacity: 1,
                    x: 0,
                    scale: 1
                  },
                  exit: (value: number) => ({
                    opacity: 0,
                    x: value >= 0 ? -48 : 48,
                    scale: 0.985
                  })
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  duration: 0.42,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="relative z-20 flex h-full w-3/4 max-w-260 items-center justify-center px-3 sm:w-2/3 sm:px-0"
              >
                <Image
                  priority
                  alt={item.alt}
                  className="max-h-full w-auto max-w-full rounded-md object-contain"
                  height={1400}
                  sizes="(max-width: 640px) 90vw, 70vw"
                  src={item.src}
                  width={1800}
                />
              </MotionDiv>
            </AnimatePresence>

            <SideImage
              item={nextItem}
              position="right"
              onClick={next}
            />
          </div>

          <div className="mx-auto mt-5 flex w-3/4 max-w-260 items-start justify-between sm:w-2/3">
            <AnimatePresence
              initial={false}
              mode="wait"
            >
              <MotionDiv
                key={item.src}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                initial={{
                  opacity: 0,
                  y: 4
                }}
                exit={{
                  opacity: 0,
                  y: -2
                }}
                transition={{
                  duration: 0.25
                }}
                className="font-mono text-muted text-xs"
              >
                {item.alt}
              </MotionDiv>
            </AnimatePresence>

            <span className="hidden font-mono text-muted/50 text-xs sm:block">
              ← / → to navigate
            </span>
          </div>
        </main>
      </MotionDiv>
    </AnimatePresence>
  );
}

type SideImageProps = {
  item: GalleryItem;
  position: 'left' | 'right';
  onClick: () => void;
};

function SideImage({ item, position, onClick }: SideImageProps) {
  const positionClass = position === 'left' ? 'left-0' : 'right-0';

  return (
    <button
      type="button"
      aria-label={position === 'left' ? 'Previous image' : 'Next image'}
      className={[
        'group absolute top-1/2 z-10 hidden',
        'h-1/2 w-1/4 max-w-85',
        '-translate-y-1/2 overflow-hidden',
        'rounded-md opacity-35 sm:block',
        'transition-all duration-500 hover:opacity-70',
        positionClass
      ].join(' ')}
      onClick={onClick}
    >
      <Image
        fill
        alt=""
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-102"
        sizes="25vw"
        src={item.src}
      />

      <span className="absolute inset-0 bg-bg/20 transition-colors duration-300 group-hover:bg-transparent" />
    </button>
  );
}
