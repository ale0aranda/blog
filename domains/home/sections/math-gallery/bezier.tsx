'use client';

import type { KeyboardEvent, PointerEvent } from 'react';
import { useRef, useState } from 'react';

import { MathFormula } from './math-formula';
import { getSvgPoint } from './svg-point';
import { useCurveAnimation } from './use-curve-animation';

type Point = {
  x: number;
  y: number;
};

type Handle = 'first' | 'second';

const START: Point = { x: 35, y: 205 };
const END: Point = { x: 265, y: 65 };

const HANDLES = ['first', 'second'] as const;

const KEY_OFFSETS: Record<string, Point> = {
  ArrowLeft: { x: -5, y: 0 },
  ArrowRight: { x: 5, y: 0 },
  ArrowUp: { x: 0, y: -5 },
  ArrowDown: { x: 0, y: 5 }
};

function resolveProgress() {
  return 0;
}

function clampPoint(point: Point): Point {
  return {
    x: Math.max(20, Math.min(280, point.x)),
    y: Math.max(20, Math.min(245, point.y))
  };
}

function getCurvePoint(t: number, first: Point, second: Point): Point {
  const inverse = 1 - t;

  return {
    x:
      inverse ** 3 * START.x
      + 3 * inverse ** 2 * t * first.x
      + 3 * inverse * t ** 2 * second.x
      + t ** 3 * END.x,
    y:
      inverse ** 3 * START.y
      + 3 * inverse ** 2 * t * first.y
      + 3 * inverse * t ** 2 * second.y
      + t ** 3 * END.y
  };
}

export function Bezier() {
  const [controls, setControls] = useState({
    first: { x: 65, y: 45 },
    second: { x: 235, y: 230 }
  });

  const activeRef = useRef<{
    handle: Handle;
    pointerId: number;
  } | null>(null);

  const { progress } = useCurveAnimation(0.1, 0.35, resolveProgress);

  const point = getCurvePoint(progress, controls.first, controls.second);

  function stopDragging() {
    activeRef.current = null;
  }

  function updateHandle(event: PointerEvent<SVGCircleElement>) {
    const active = activeRef.current;
    const svg = event.currentTarget.ownerSVGElement;

    if (!active || active.pointerId !== event.pointerId || !svg) {
      return;
    }

    const position = getSvgPoint(svg, event.clientX, event.clientY);

    if (!position) return;

    setControls((current) => ({
      ...current,
      [active.handle]: clampPoint(position)
    }));
  }

  function moveWithKeyboard(event: KeyboardEvent<SVGCircleElement>, handle: Handle) {
    const offset = KEY_OFFSETS[event.key];

    if (!offset) return;

    event.preventDefault();
    event.stopPropagation();

    setControls((current) => ({
      ...current,
      [handle]: clampPoint({
        x: current[handle].x + offset.x,
        y: current[handle].y + offset.y
      })
    }));
  }

  const path = [
    `M ${START.x} ${START.y}`,
    `C ${controls.first.x} ${controls.first.y}`,
    `${controls.second.x} ${controls.second.y}`,
    `${END.x} ${END.y}`
  ].join(' ');

  const graph = (
    <svg
      className="block w-full text-fg"
      fill="none"
      strokeLinecap="round"
      viewBox="0 0 300 300"
    >
      <title>Bézier curve. Move the control points.</title>

      <g
        opacity="0.18"
        stroke="currentColor"
        strokeDasharray="3 5"
      >
        <line
          x1={START.x}
          x2={controls.first.x}
          y1={START.y}
          y2={controls.first.y}
        />

        <line
          x1={END.x}
          x2={controls.second.x}
          y1={END.y}
          y2={controls.second.y}
        />
      </g>

      <path
        d={path}
        opacity="0.7"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      <circle
        cx={START.x}
        cy={START.y}
        fill="currentColor"
        opacity="0.3"
        r="2.5"
      />

      <circle
        cx={END.x}
        cy={END.y}
        fill="currentColor"
        opacity="0.3"
        r="2.5"
      />

      <circle
        cx={point.x}
        cy={point.y}
        fill="currentColor"
        opacity="0.06"
        r="9"
      />

      <circle
        cx={point.x}
        cy={point.y}
        fill="currentColor"
        opacity="0.85"
        r="3.5"
      />

      {HANDLES.map((handle) => (
        <g key={handle}>
          <circle
            cx={controls[handle].x}
            cy={controls[handle].y}
            fill="var(--color-surface)"
            r="4"
            stroke="currentColor"
            strokeOpacity="0.5"
            strokeWidth="1.2"
          />

          {/* biome-ignore lint/a11y/useSemanticElements: SVG control point supports dragging and keyboard movement; an HTML button cannot replace this circle. */}
          <circle
            aria-label={
              handle === 'first'
                ? 'First control point. Use the arrows to move it.'
                : 'Second control point. Use the arrows to move it.'
            }
            className="cursor-grab touch-none outline-none focus-visible:stroke-current active:cursor-grabbing"
            cx={controls[handle].x}
            cy={controls[handle].y}
            data-interactive="true"
            fill="transparent"
            onKeyDown={(event) => moveWithKeyboard(event, handle)}
            onLostPointerCapture={stopDragging}
            onPointerCancel={stopDragging}
            onPointerDown={(event) => {
              if (!event.isPrimary || event.button !== 0) return;

              event.preventDefault();
              event.currentTarget.focus();

              activeRef.current = {
                handle,
                pointerId: event.pointerId
              };

              event.currentTarget.setPointerCapture(event.pointerId);
            }}
            onPointerMove={updateHandle}
            onPointerUp={(event) => {
              if (activeRef.current?.pointerId !== event.pointerId) {
                return;
              }

              updateHandle(event);
              stopDragging();

              if (event.currentTarget.hasPointerCapture(event.pointerId)) {
                event.currentTarget.releasePointerCapture(event.pointerId);
              }
            }}
            r="16"
            role="button"
            tabIndex={0}
          />
        </g>
      ))}
    </svg>
  );

  return (
    <div className="relative overflow-hidden rounded-2xl bg-surface">
      {graph}
      <MathFormula
        experiment="bezier"
        formula={String.raw`B(t)=\displaystyle\sum_{i=0}^{3}b_{i,3}(t)\,P_i`}
        graph={graph}
      />
    </div>
  );
}
