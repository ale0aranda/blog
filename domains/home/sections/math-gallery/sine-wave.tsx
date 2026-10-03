'use client';

import { MathFormula } from './math-formula';
import { useCurveAnimation } from './use-curve-animation';

const TAU = Math.PI * 2;

const path = Array.from({ length: 241 }, (_, index) => {
  const progress = index / 240;
  const x = 28 + progress * 244;
  const y = 140 - Math.sin(progress * TAU) * 72;

  return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
}).join(' ');

function resolveProgress(x: number) {
  return Math.max(0, Math.min(0.9999, (x - 28) / 244));
}

export function SineWave() {
  const { progress, dragging, pointProps } = useCurveAnimation(0.12, 0.15, resolveProgress);

  const x = 28 + progress * 244;
  const y = 140 - Math.sin(progress * TAU) * 72;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-surface">
      <svg
        className="block w-full text-fg"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 300 300"
      >
        <title>Sine wave. Drag the point to trace the curve.</title>

        <g
          opacity="0.1"
          stroke="currentColor"
        >
          <line
            x1="22"
            x2="278"
            y1="140"
            y2="140"
          />
          <line
            x1="28"
            x2="28"
            y1="44"
            y2="236"
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

        <line
          opacity="0.18"
          stroke="currentColor"
          strokeDasharray="3 5"
          x1={x}
          x2={x}
          y1="140"
          y2={y}
        />

        <circle
          cx={x}
          cy="140"
          fill="currentColor"
          opacity="0.2"
          r="2"
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
          aria-label="Posición del punto en la onda seno"
          className="cursor-grab touch-none outline-none focus-visible:stroke-current active:cursor-grabbing"
          cx={x}
          cy={y}
          fill="transparent"
          r="16"
          strokeWidth="1"
        />
      </svg>

      <MathFormula formula={String.raw`y=\sin(x)`} />
    </div>
  );
}
