'use client';

import type { PointerEvent } from 'react';
import { useRef, useState } from 'react';

import { MathFormula } from './math-formula';
import { getSvgPoint } from './svg-point';
import { useCurveAnimation } from './use-curve-animation';

type Point = {
  x: number;
  y: number;
};

const RINGS = [0, 1, 2, 3, 4];

const KEY_OFFSETS: Record<string, Point> = {
  ArrowLeft: { x: -8, y: 0 },
  ArrowRight: { x: 8, y: 0 },
  ArrowUp: { x: 0, y: -8 },
  ArrowDown: { x: 0, y: 8 }
};

function resolveProgress() {
  return 0;
}

function clampOrigin(point: Point): Point {
  return {
    x: Math.max(20, Math.min(280, point.x)),
    y: Math.max(20, Math.min(245, point.y))
  };
}

export function Ripples() {
  const [origin, setOrigin] = useState<Point>({ x: 150, y: 135 });
  const pointerRef = useRef<number | null>(null);

  const { progress } = useCurveAnimation(0.18, 0, resolveProgress);

  function updateOrigin(event: PointerEvent<SVGSVGElement>) {
    const point = getSvgPoint(event.currentTarget, event.clientX, event.clientY);

    if (point) {
      setOrigin(clampOrigin(point));
    }
  }

  function stopDragging() {
    pointerRef.current = null;
  }

  return (
    <div className="relative overflow-hidden rounded-2xl bg-surface">
      <svg
        aria-label="Concentric ripples. Drag or use the arrow keys to move their origin."
        className="block w-full cursor-crosshair touch-none text-fg outline-none focus-visible:ring-1 focus-visible:ring-fg/30"
        data-interactive="true"
        fill="none"
        onKeyDown={(event) => {
          const offset = KEY_OFFSETS[event.key];

          if (!offset) return;

          event.preventDefault();
          event.stopPropagation();

          setOrigin((current) =>
            clampOrigin({
              x: current.x + offset.x,
              y: current.y + offset.y
            })
          );
        }}
        onLostPointerCapture={stopDragging}
        onPointerCancel={stopDragging}
        onPointerDown={(event) => {
          if (!event.isPrimary || event.button !== 0) return;

          event.preventDefault();
          event.currentTarget.focus();

          pointerRef.current = event.pointerId;
          event.currentTarget.setPointerCapture(event.pointerId);

          updateOrigin(event);
        }}
        onPointerMove={(event) => {
          if (pointerRef.current === event.pointerId) {
            updateOrigin(event);
          }
        }}
        onPointerUp={(event) => {
          if (pointerRef.current !== event.pointerId) return;

          updateOrigin(event);
          stopDragging();

          if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
          }
        }}
        // biome-ignore lint/a11y/noNoninteractiveTabindex: Keyboard focus allows moving the ripple origin with arrow keys.
        tabIndex={0}
        viewBox="0 0 300 300"
      >
        <title>Concentric ripples</title>

        {RINGS.map((ring) => {
          const phase = (progress + ring / RINGS.length) % 1;

          return (
            <circle
              cx={origin.x}
              cy={origin.y}
              key={ring}
              opacity={0.45 * (1 - phase) ** 2}
              r={5 + phase * 190}
              stroke="currentColor"
              strokeWidth="1.2"
            />
          );
        })}

        <circle
          cx={origin.x}
          cy={origin.y}
          fill="currentColor"
          opacity="0.06"
          r="10"
        />

        <circle
          cx={origin.x}
          cy={origin.y}
          fill="currentColor"
          opacity="0.75"
          r="3.5"
        />
      </svg>

      <MathFormula
        experiment="ripples"
        formula="r=ct"
      />
    </div>
  );
}
