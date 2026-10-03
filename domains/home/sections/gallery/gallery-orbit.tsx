'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { useTranslations } from 'next-intl';

import type { GalleryItem } from './gallery.data';

type GalleryOrbitProps = {
  items: readonly GalleryItem[];
  onOpen: (index: number) => void;
  paused: boolean;
};

type DragState = {
  pointerId: number;
  startX: number;
  startAngle: number;
  moved: boolean;
};

const FULL_TURN = Math.PI * 2;
const SPEED = 0.16;
const DRAG_THRESHOLD = 6;

export function GalleryOrbit({ items, onOpen, paused }: GalleryOrbitProps) {
  const t = useTranslations('home.gallery');
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef(new Map<number, HTMLButtonElement>());
  const angleRef = useRef(Math.PI / 4);
  const dragRef = useRef<DragState | null>(null);
  const suppressClickRef = useRef(false);
  const pausedRef = useRef(paused);
  const focusedRef = useRef(false);

  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    const container = containerRef.current;

    if (!container || items.length === 0) {
      return;
    }

    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    let width = container.clientWidth;
    let frame = 0;
    let previousTime = 0;

    function paint() {
      const radius = Math.max(0, width / 2 - 105);

      cardsRef.current.forEach((card, index) => {
        const angle = angleRef.current + (index / items.length) * FULL_TURN;

        const depth = (Math.sin(angle) + 1) / 2;
        const x = Math.cos(angle) * radius;
        const y = (depth - 0.5) * 64;
        const scale = 0.76 + depth * 0.24;
        const rotation = Math.cos(angle) * -9;

        card.style.transform =
          `translate(-50%, -50%) translate(${x}px, ${y}px) `
          + `rotate(${rotation}deg) scale(${scale})`;

        card.style.opacity = String(0.55 + depth * 0.45);
        card.style.filter = `blur(${(1 - depth) * 1.4}px)`;
        card.style.zIndex = String(Math.round(depth * 100));
      });
    }

    function animate(time: number) {
      const delta = previousTime ? Math.min((time - previousTime) / 1000, 0.05) : 0;

      previousTime = time;

      if (
        !media.matches
        && !document.hidden
        && !pausedRef.current
        && !focusedRef.current
        && !dragRef.current
      ) {
        angleRef.current = (angleRef.current + delta * SPEED) % FULL_TURN;
      }

      paint();
      frame = requestAnimationFrame(animate);
    }

    const observer = new ResizeObserver(() => {
      width = container.clientWidth;
      paint();
    });

    observer.observe(container);
    paint();
    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [items.length]);

  function stopDragging() {
    dragRef.current = null;
    setDragging(false);
  }

  return (
    <div
      className={[
        'relative h-64 select-none touch-pan-y sm:h-72',
        dragging ? 'cursor-grabbing' : 'cursor-grab'
      ].join(' ')}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          focusedRef.current = false;
        }
      }}
      onFocusCapture={() => {
        focusedRef.current = true;
      }}
      onLostPointerCapture={stopDragging}
      onPointerCancel={stopDragging}
      onPointerDown={(event) => {
        if (paused || !event.isPrimary || event.button !== 0) {
          return;
        }

        suppressClickRef.current = false;

        dragRef.current = {
          pointerId: event.pointerId,
          startX: event.clientX,
          startAngle: angleRef.current,
          moved: false
        };
      }}
      onPointerMove={(event) => {
        const drag = dragRef.current;

        if (!drag || drag.pointerId !== event.pointerId) {
          return;
        }

        const distance = event.clientX - drag.startX;

        if (!drag.moved && Math.abs(distance) < DRAG_THRESHOLD) {
          return;
        }

        if (!drag.moved) {
          drag.moved = true;
          suppressClickRef.current = true;
          setDragging(true);
          event.currentTarget.setPointerCapture(event.pointerId);
        }

        const width = Math.max(event.currentTarget.clientWidth, 1);

        angleRef.current = drag.startAngle - (distance / width) * FULL_TURN;
      }}
      onPointerUp={(event) => {
        if (dragRef.current?.pointerId !== event.pointerId) {
          return;
        }

        stopDragging();

        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
          event.currentTarget.releasePointerCapture(event.pointerId);
        }
      }}
      ref={containerRef}
    >
      {items.map((item, index) => (
        <button
          aria-label={t('openImage', { description: item.alt })}
          className={[
            'group absolute top-1/2 left-1/2 h-40 w-40',
            'overflow-hidden rounded-2xl bg-surface shadow-lg',
            'outline-offset-4 focus-visible:outline',
            'focus-visible:outline-2 focus-visible:outline-accent',
            'sm:h-52 sm:w-52',
            dragging ? 'cursor-grabbing' : 'cursor-grab'
          ].join(' ')}
          key={item.src}
          onClick={(event) => {
            if (event.detail !== 0 && suppressClickRef.current) {
              suppressClickRef.current = false;
              return;
            }

            onOpen(index);
          }}
          onDragStart={(event) => event.preventDefault()}
          ref={(element) => {
            if (element) {
              cardsRef.current.set(index, element);
            } else {
              cardsRef.current.delete(index);
            }
          }}
          style={{
            transform: 'translate(-50%, -50%)',
            opacity: 0,
            willChange: 'transform'
          }}
          type="button"
        >
          <Image
            alt={item.alt}
            className="pointer-events-none object-cover"
            draggable={false}
            fill
            sizes="(max-width: 640px) 160px, 208px"
            src={item.src}
          />

          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-fg/5"
          />
        </button>
      ))}
    </div>
  );
}
