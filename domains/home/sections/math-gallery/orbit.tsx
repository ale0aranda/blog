'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';

import { CurveValue } from './curve-value';
import { MathFormula } from './math-formula';
import { useCurveAnimation } from './use-curve-animation';

const TAU = Math.PI * 2;
const CENTER_X = 150;
const CENTER_Y = 135;
const RADIUS_X = 108;
const RADIUS_Y = 65;

function getPoint(progress: number) {
  const angle = progress * TAU;

  return {
    x: CENTER_X + Math.cos(angle) * RADIUS_X,
    y: CENTER_Y + Math.sin(angle) * RADIUS_Y
  };
}

function resolveProgress(x: number, y: number) {
  const angle = Math.atan2((y - CENTER_Y) / RADIUS_Y, (x - CENTER_X) / RADIUS_X);

  return (((angle / TAU) % 1) + 1) % 1;
}

export function Orbit() {
  const t = useTranslations('home.mathGallery');
  const [focused, setFocused] = useState(false);

  const { progress, dragging, pointProps } = useCurveAnimation(0.08, 0.12, resolveProgress);

  const { x, y } = getPoint(progress);
  const angle = progress * TAU;

  const value = `x = ${(Math.cos(angle) * RADIUS_X).toFixed(1)} · y = ${(
    Math.sin(angle) * RADIUS_Y
  ).toFixed(1)}`;

  const trail = Array.from({ length: 65 }, (_, index) => {
    const point = getPoint(progress - 0.24 + (index / 64) * 0.24);

    return `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`;
  }).join(' ');

  const focusX = CENTER_X - Math.sqrt(RADIUS_X ** 2 - RADIUS_Y ** 2);

  const graph = (
    <svg
      className="block w-full text-fg"
      fill="none"
      strokeLinecap="round"
      viewBox="0 0 300 300"
    >
      <title>{t('experiments.orbit.title')}</title>

      <ellipse
        cx={CENTER_X}
        cy={CENTER_Y}
        opacity="0.12"
        rx={RADIUS_X}
        ry={RADIUS_Y}
        stroke="currentColor"
      />

      <line
        opacity="0.15"
        stroke="currentColor"
        strokeDasharray="3 5"
        x1={focusX}
        x2={x}
        y1={CENTER_Y}
        y2={y}
      />

      <path
        d={trail}
        opacity="0.65"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      <circle
        cx={focusX}
        cy={CENTER_Y}
        fill="currentColor"
        opacity="0.04"
        r="18"
      />

      <circle
        cx={focusX}
        cy={CENTER_Y}
        fill="currentColor"
        opacity="0.08"
        r="11"
      />

      <circle
        cx={focusX}
        cy={CENTER_Y}
        fill="currentColor"
        opacity="0.8"
        r="5"
      />

      <circle
        className="pointer-events-none"
        cx={x}
        cy={y}
        fill="currentColor"
        opacity={dragging ? 0.12 : 0.05}
        r={dragging ? 13 : 9}
      />

      <circle
        className="pointer-events-none"
        cx={x}
        cy={y}
        fill="currentColor"
        opacity="0.8"
        r="4"
      />

      <circle
        {...pointProps}
        aria-label={t('experiments.orbit.pointLabel')}
        aria-valuemax={360}
        aria-valuemin={0}
        aria-valuenow={progress * 360}
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
        experiment="orbit"
        formula={String.raw`\dfrac{x^2}{a^2}+\dfrac{y^2}{b^2}=1`}
        graph={graph}
        value={value}
      />
    </div>
  );
}
