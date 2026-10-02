'use client';

import { useRef, useState } from 'react';

import { FadeIn } from '@/shared/motion/components/fade-in';
import { StaggerGroup } from '@/shared/motion/components/stagger-group';

import { Bezier } from './bezier';
import { Orbit } from './orbit';
import { Pendulum } from './pendulum';
import { Ripples } from './ripples';
import { SineWave } from './sine-wave';

const experiments = [
  { id: 'sine', Component: SineWave },
  { id: 'orbit', Component: Orbit },
  { id: 'ripples', Component: Ripples },
  { id: 'bezier', Component: Bezier },
  { id: 'pendulum', Component: Pendulum }
];

export function MathGallery() {
  const [dragging, setDragging] = useState(false);

  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    startScroll: number;
  } | null>(null);

  function stopDragging() {
    dragRef.current = null;
    setDragging(false);
  }

  return (
    <section
      aria-label="Experiments with mathematical curves and motion"
      className="pt-8"
    >
      <div className="relative left-1/2 w-screen max-w-6xl -translate-x-1/2 px-5 md:px-16">
        <section
          aria-label="Slide horizontally to explore the experiments"
          className={`select-none overflow-x-auto overscroll-x-contain rounded-2xl py-1 outline-none focus-visible:ring-1 focus-visible:ring-fg/20 ${
            dragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          onLostPointerCapture={stopDragging}
          onPointerCancel={stopDragging}
          onPointerDown={(event) => {
            if (event.pointerType !== 'mouse' || event.button !== 0) {
              return;
            }

            const target = event.target;

            if (
              target instanceof Element
              && target.closest('[data-interactive], [role="slider"], button, a')
            ) {
              return;
            }

            event.preventDefault();
            event.currentTarget.focus();

            dragRef.current = {
              pointerId: event.pointerId,
              startX: event.clientX,
              startScroll: event.currentTarget.scrollLeft
            };

            setDragging(true);
            event.currentTarget.setPointerCapture(event.pointerId);
          }}
          onPointerMove={(event) => {
            const drag = dragRef.current;

            if (!drag || drag.pointerId !== event.pointerId) return;

            event.currentTarget.scrollLeft = drag.startScroll - (event.clientX - drag.startX);
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
          style={{ scrollbarWidth: 'none' }}
          // biome-ignore lint/a11y/noNoninteractiveTabindex: Horizontal scrolling needs keyboard focus.
          tabIndex={0}
        >
          <StaggerGroup
            as="div"
            className="flex w-full gap-4"
          >
            {experiments.map(({ id, Component }) => (
              <div
                className="min-w-0 shrink-0"
                key={id}
                style={{
                  width: 'clamp(15rem, calc((100% - 3rem) / 4), 18rem)'
                }}
              >
                <FadeIn as="div">
                  <Component />
                </FadeIn>
              </div>
            ))}
          </StaggerGroup>
        </section>
      </div>
    </section>
  );
}
