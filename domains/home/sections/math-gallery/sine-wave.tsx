'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';

import { CurveValue } from './curve-value';
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
  const t = useTranslations('home.mathGallery');
  const [focused, setFocused] = useState(false);

  const { progress, dragging, pointProps } = useCurveAnimation(0.12, 0.15, resolveProgress);

  const input = progress * TAU;
  const output = Math.sin(input);

  const x = 28 + progress * 244;
  const y = 140 - output * 72;

  const value = `x = ${input.toFixed(2)} · y = ${output.toFixed(2)}`;

  const graph = (
    <svg
      className="block w-full text-fg"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 300 300"
    >
      <title>{t('experiments.sine.title')}</title>

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
        className="pointer-events-none"
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
        aria-label={t('experiments.sine.pointLabel')}
        aria-orientation="horizontal"
        aria-valuemax={TAU}
        aria-valuemin={0}
        aria-valuenow={input}
        aria-valuetext={value}
        className="cursor-grab touch-none outline-none focus-visible:stroke-current active:cursor-grabbing"
        cx={x}
        cy={y}
        data-interactive="true"
        fill="transparent"
        onBlur={() => setFocused(false)}
        onFocus={() => setFocused(true)}
        r="16"
        role="slider"
        strokeWidth="1"
        tabIndex={0}
      />
    </svg>
  );

  return (
    <div className="relative overflow-hidden rounded-2xl bg-surface">
      {graph}

      <CurveValue
        value={value}
        visible={dragging || focused}
      />

      <MathFormula
        experiment="sine"
        formula={String.raw`y=\sin(x)`}
        graph={graph}
        value={value}
      />
    </div>
  );
}
