'use client';

import { MathFormula } from './math-formula';
import { useCurveAnimation } from './use-curve-animation';

const TAU = Math.PI * 2;
const STEPS = 720;

function getPoint(progress: number) {
  const angle = progress * TAU;

  return {
    x: 150 + Math.sin(3 * angle) * 92,
    y: 140 - Math.sin(2 * angle) * 82
  };
}

const samples = Array.from({ length: STEPS }, (_, index) => {
  const progress = index / STEPS;

  return { progress, ...getPoint(progress) };
});

const path = Array.from({ length: STEPS + 1 }, (_, index) => {
  const { x, y } = getPoint(index / STEPS);

  return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
}).join(' ');

function resolveProgress(x: number, y: number, current: number) {
  let closest = current;
  let bestScore = Number.POSITIVE_INFINITY;

  for (const sample of samples) {
    const dx = sample.x - x;
    const dy = sample.y - y;
    const difference = Math.abs(sample.progress - current);
    const phaseDistance = Math.min(difference, 1 - difference);

    const score = dx * dx + dy * dy + phaseDistance * phaseDistance * 160;

    if (score < bestScore) {
      bestScore = score;
      closest = sample.progress;
    }
  }

  return closest;
}

export function LissajousCurve() {
  const { progress, dragging, pointProps } = useCurveAnimation(0.07, 0.12, resolveProgress);

  const { x, y } = getPoint(progress);

  return (
    <div className="relative overflow-hidden rounded-2xl bg-surface">
      <svg
        className="block w-full text-fg"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 300 300"
      >
        <title>Lissajous curve. Drag the point to trace the curve.</title>

        <g
          opacity="0.1"
          stroke="currentColor"
        >
          <line
            x1="28"
            x2="272"
            y1="140"
            y2="140"
          />
          <line
            x1="150"
            x2="150"
            y1="36"
            y2="244"
          />
        </g>

        <path
          d={path}
          opacity="0.12"
          stroke="currentColor"
          strokeWidth="1"
        />

        <path
          d={path}
          opacity="0.7"
          pathLength="1"
          stroke="currentColor"
          strokeDasharray={`${progress} 1`}
          strokeWidth="1.5"
        />

        <path
          d={`M ${x} 140 L ${x} ${y} L 150 ${y}`}
          opacity="0.18"
          stroke="currentColor"
          strokeDasharray="3 5"
        />

        <circle
          className="pointer-events-none transition-all duration-150"
          cx={x}
          cy={y}
          fill="currentColor"
          opacity={dragging ? 0.1 : 0.04}
          r={dragging ? 12 : 8}
        />

        <circle
          className="pointer-events-none"
          cx={x}
          cy={y}
          fill="currentColor"
          opacity="0.8"
          r="3.5"
        />

        <circle
          {...pointProps}
          aria-label="Position of the point in the Lissajous curve"
          className="cursor-grab touch-none outline-none focus-visible:stroke-current active:cursor-grabbing"
          cx={x}
          cy={y}
          fill="transparent"
          r="16"
          strokeWidth="1"
        />
      </svg>

      <MathFormula
        experiment="lissajous"
        formula={String.raw`x=\sin(3t),\quad y=\sin(2t)`}
      />
    </div>
  );
}
