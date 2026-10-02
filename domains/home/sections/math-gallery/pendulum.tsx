'use client';

import type { PointerEvent } from 'react';
import { useEffect, useRef, useState } from 'react';

import { getSvgPoint } from './svg-point';

const PIVOT = { x: 150, y: 48 };
const LENGTH = 145;
const MAX_ANGLE = 1.15;
const GRAVITY = 7;

function clampAngle(angle: number) {
  return Math.max(-MAX_ANGLE, Math.min(MAX_ANGLE, angle));
}

function getPosition(angle: number) {
  return {
    x: PIVOT.x + Math.sin(angle) * LENGTH,
    y: PIVOT.y + Math.cos(angle) * LENGTH
  };
}

const arcStart = getPosition(-MAX_ANGLE);
const arcEnd = getPosition(MAX_ANGLE);

const arc = [
  `M ${arcStart.x} ${arcStart.y}`,
  `A ${LENGTH} ${LENGTH} 0 0 0 ${arcEnd.x} ${arcEnd.y}`
].join(' ');

export function Pendulum() {
  const [angle, setAngle] = useState(0.65);
  const [dragging, setDragging] = useState(false);

  const simulationRef = useRef({
    angle: 0.65,
    velocity: 0
  });

  const pointerRef = useRef<number | null>(null);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');

    let frame = 0;
    let previous: number | null = null;

    function animate(now: number) {
      if (previous !== null && pointerRef.current === null) {
        const delta = Math.min((now - previous) / 1000, 0.04);
        const simulation = simulationRef.current;

        // Pasos pequeños para mantener estable la oscilación.
        const steps = Math.max(1, Math.ceil(delta / 0.008));
        const step = delta / steps;

        for (let index = 0; index < steps; index += 1) {
          simulation.velocity -= GRAVITY * Math.sin(simulation.angle) * step;

          simulation.angle += simulation.velocity * step;
        }

        setAngle(simulation.angle);
      }

      previous = now;
      frame = window.requestAnimationFrame(animate);
    }

    function synchronize() {
      window.cancelAnimationFrame(frame);
      previous = null;

      if (!media.matches && !document.hidden) {
        frame = window.requestAnimationFrame(animate);
      }
    }

    media.addEventListener('change', synchronize);
    document.addEventListener('visibilitychange', synchronize);
    synchronize();

    return () => {
      window.cancelAnimationFrame(frame);
      media.removeEventListener('change', synchronize);
      document.removeEventListener('visibilitychange', synchronize);
    };
  }, []);

  function updateAngle(next: number) {
    const value = clampAngle(next);

    simulationRef.current.angle = value;
    simulationRef.current.velocity = 0;
    setAngle(value);
  }

  function movePoint(event: PointerEvent<SVGCircleElement>) {
    if (pointerRef.current !== event.pointerId) {
      return;
    }

    const svg = event.currentTarget.ownerSVGElement;

    if (!svg) {
      return;
    }

    const point = getSvgPoint(svg, event.clientX, event.clientY);

    if (!point) {
      return;
    }

    updateAngle(Math.atan2(point.x - PIVOT.x, point.y - PIVOT.y));
  }

  function stopDragging() {
    pointerRef.current = null;
    setDragging(false);
  }

  const position = getPosition(angle);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/40 bg-surface">
      <svg
        className="block w-full text-fg"
        fill="none"
        strokeLinecap="round"
        viewBox="0 0 300 300"
      >
        <title>PPendulum. Lift the sphere and let it go.</title>

        <path
          d={arc}
          opacity="0.1"
          stroke="currentColor"
          strokeDasharray="2 6"
          strokeWidth="1"
        />

        <line
          opacity="0.1"
          stroke="currentColor"
          strokeDasharray="3 5"
          x1={PIVOT.x}
          x2={PIVOT.x}
          y1={PIVOT.y}
          y2={PIVOT.y + LENGTH}
        />

        <line
          opacity="0.25"
          stroke="currentColor"
          x1="131"
          x2="169"
          y1={PIVOT.y}
          y2={PIVOT.y}
        />

        <line
          opacity="0.65"
          stroke="currentColor"
          strokeWidth="1.2"
          x1={PIVOT.x}
          x2={position.x}
          y1={PIVOT.y}
          y2={position.y}
        />

        <circle
          cx={PIVOT.x}
          cy={PIVOT.y}
          fill="currentColor"
          opacity="0.5"
          r="2.5"
        />

        <circle
          className="pointer-events-none transition-all duration-150"
          cx={position.x}
          cy={position.y}
          fill="currentColor"
          opacity={dragging ? 0.1 : 0.04}
          r={dragging ? 17 : 12}
        />

        <circle
          className="pointer-events-none"
          cx={position.x}
          cy={position.y}
          fill="currentColor"
          opacity="0.8"
          r="6"
        />

        <circle
          aria-label="Angle of the pendulum"
          aria-valuemax={66}
          aria-valuemin={-66}
          aria-valuenow={Math.round((angle * 180) / Math.PI)}
          aria-valuetext={`${Math.round((angle * 180) / Math.PI)} degrees`}
          className="cursor-grab touch-none outline-none focus-visible:stroke-current active:cursor-grabbing"
          cx={position.x}
          cy={position.y}
          data-interactive="true"
          fill="transparent"
          onKeyDown={(event) => {
            if (event.key === 'ArrowLeft') {
              event.preventDefault();
              updateAngle(simulationRef.current.angle - 0.08);
            }

            if (event.key === 'ArrowRight') {
              event.preventDefault();
              updateAngle(simulationRef.current.angle + 0.08);
            }

            if (event.key === 'Home') {
              event.preventDefault();
              updateAngle(0);
            }
          }}
          onLostPointerCapture={stopDragging}
          onPointerCancel={stopDragging}
          onPointerDown={(event) => {
            if (!event.isPrimary || event.button !== 0) {
              return;
            }

            event.preventDefault();
            pointerRef.current = event.pointerId;
            simulationRef.current.velocity = 0;
            setDragging(true);

            event.currentTarget.setPointerCapture(event.pointerId);
          }}
          onPointerMove={movePoint}
          onPointerUp={(event) => {
            if (pointerRef.current !== event.pointerId) {
              return;
            }

            movePoint(event);
            stopDragging();

            if (event.currentTarget.hasPointerCapture(event.pointerId)) {
              event.currentTarget.releasePointerCapture(event.pointerId);
            }
          }}
          r="20"
          role="slider"
          tabIndex={0}
        />
      </svg>

      <p className="pointer-events-none absolute inset-x-0 bottom-4 m-0 text-center font-serif text-muted text-sm italic">
        θ̈ + (g/ℓ) sin θ = 0
      </p>
    </div>
  );
}
