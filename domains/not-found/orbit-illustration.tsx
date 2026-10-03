'use client';

import { useEffect, useRef } from 'react';

function getOrbitPoint(angle: number, radiusX: number, radiusY: number, rotation: number) {
  const x = Math.cos(angle) * radiusX;
  const y = Math.sin(angle) * radiusY;

  return {
    x: 210 + x * Math.cos(rotation) - y * Math.sin(rotation),
    y: 120 + x * Math.sin(rotation) + y * Math.cos(rotation)
  };
}

export function OrbitIllustration() {
  const firstRef = useRef<SVGCircleElement>(null);
  const secondRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const first = firstRef.current;
    const second = secondRef.current;

    if (!first || !second) return;

    const media = window.matchMedia('(prefers-reduced-motion: reduce)');

    let frame = 0;
    let previousTime: number | null = null;
    let elapsed = 0;

    function draw(time: number) {
      const firstPoint = getOrbitPoint(-0.9 + time * 0.24, 175, 42, -Math.PI / 7);

      const secondPoint = getOrbitPoint(2.5 - time * 0.18, 165, 38, Math.PI / 9);

      first?.setAttribute('cx', String(firstPoint.x));
      first?.setAttribute('cy', String(firstPoint.y));

      second?.setAttribute('cx', String(secondPoint.x));
      second?.setAttribute('cy', String(secondPoint.y));
    }

    function animate(now: number) {
      if (previousTime !== null) {
        elapsed += Math.min((now - previousTime) / 1000, 0.05);
      }

      previousTime = now;
      draw(elapsed);

      frame = requestAnimationFrame(animate);
    }

    function syncAnimation() {
      cancelAnimationFrame(frame);
      previousTime = null;

      if (media.matches) {
        draw(0);
        return;
      }

      if (!document.hidden) {
        frame = requestAnimationFrame(animate);
      }
    }

    media.addEventListener('change', syncAnimation);
    document.addEventListener('visibilitychange', syncAnimation);

    syncAnimation();

    return () => {
      cancelAnimationFrame(frame);
      media.removeEventListener('change', syncAnimation);
      document.removeEventListener('visibilitychange', syncAnimation);
    };
  }, []);

  const firstPoint = getOrbitPoint(-0.9, 175, 42, -Math.PI / 7);

  const secondPoint = getOrbitPoint(2.5, 165, 38, Math.PI / 9);

  return (
    <svg
      aria-hidden="true"
      className="block h-auto w-full text-fg"
      fill="none"
      viewBox="0 0 420 250"
    >
      <title>Elliptical orbits</title>

      <g
        opacity="0.45"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1"
      >
        <path d="M35 42H45M40 37V47" />
        <path d="M382 121H392M387 116V126" />
      </g>

      <g
        fill="currentColor"
        opacity="0.35"
      >
        <circle
          cx="18"
          cy="83"
          r="1.2"
        />
        <circle
          cx="115"
          cy="225"
          r="1.2"
        />
        <circle
          cx="405"
          cy="160"
          r="1.2"
        />
      </g>

      <ellipse
        cx="210"
        cy="120"
        opacity="0.45"
        rx="175"
        ry="42"
        stroke="currentColor"
        strokeWidth="1"
        transform="rotate(-25.714 210 120)"
      />

      <g transform="rotate(20 210 120)">
        <ellipse
          cx="210"
          cy="120"
          opacity="0.15"
          pathLength="100"
          rx="165"
          ry="38"
          stroke="currentColor"
          strokeDasharray="1 2"
          strokeWidth="1"
        />

        <ellipse
          cx="210"
          cy="120"
          opacity="0.5"
          pathLength="100"
          rx="165"
          ry="38"
          stroke="currentColor"
          strokeDasharray="80 20"
          strokeDashoffset="-10"
          strokeWidth="1"
        />
      </g>

      <circle
        cx={secondPoint.x}
        cy={secondPoint.y}
        fill="currentColor"
        r="3"
        ref={secondRef}
      />

      <circle
        className="text-accent"
        cx={firstPoint.x}
        cy={firstPoint.y}
        fill="currentColor"
        r="4"
        ref={firstRef}
      />

      <ellipse
        cx="210"
        cy="120"
        opacity="0.6"
        rx="42"
        ry="10"
        stroke="currentColor"
        strokeWidth="1.1"
        transform="rotate(-22 210 120)"
      />

      <circle
        cx="210"
        cy="120"
        fill="currentColor"
        r="21"
      />

      <path
        d="M168 120A42 10 0 0 0 252 120"
        stroke="var(--color-bg)"
        strokeWidth="4"
        transform="rotate(-22 210 120)"
      />

      <path
        d="M168 120A42 10 0 0 0 252 120"
        opacity="0.7"
        stroke="currentColor"
        strokeWidth="1.1"
        transform="rotate(-22 210 120)"
      />
    </svg>
  );
}
