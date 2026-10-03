'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { useReducedMotion } from 'framer-motion';
import { createPortal } from 'react-dom';

type ProjectChevronProps = {
  open: boolean;
  activation: number;
};

type Point = {
  x: number;
  y: number;
};

const DOWN = 'M6 9L12 15L18 9';
const UP = 'M6 15L12 9L18 15';

function smoothStep(value: number) {
  return value * value * (3 - 2 * value);
}

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

export function ProjectChevron({ open, activation }: ProjectChevronProps) {
  const reducedMotion = useReducedMotion();

  const anchorRef = useRef<HTMLSpanElement>(null);
  const flyingSvgRef = useRef<SVGSVGElement>(null);
  const wingsRef = useRef<SVGPathElement>(null);

  const openRef = useRef(open);
  const flyingRef = useRef(false);
  const clicksRef = useRef<number[]>([]);
  const previousActivationRef = useRef(activation);

  const [origin, setOrigin] = useState<Point | null>(null);

  useLayoutEffect(() => {
    openRef.current = open;
  }, [open]);

  useEffect(() => {
    if (previousActivationRef.current === activation) {
      return;
    }

    previousActivationRef.current = activation;

    if (reducedMotion || flyingRef.current) {
      clicksRef.current = [];
      return;
    }

    const now = performance.now();

    clicksRef.current = [...clicksRef.current.filter((time) => now - time < 1000), now];

    if (clicksRef.current.length < 4) {
      return;
    }

    clicksRef.current = [];

    const rect = anchorRef.current?.getBoundingClientRect();

    if (!rect) {
      return;
    }

    flyingRef.current = true;

    setOrigin({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    });
  }, [activation, reducedMotion]);

  useLayoutEffect(() => {
    if (!origin) {
      return;
    }

    const startPoint = origin;
    const svg = flyingSvgRef.current;
    const wings = wingsRef.current;

    if (!svg || !wings || reducedMotion) {
      flyingRef.current = false;
      setOrigin(null);
      return;
    }

    // Estas constantes mantienen el tipo definido en animate.
    const flyingSvg = svg;
    const flyingWings = wings;

    let frame = 0;
    const startedAt = performance.now();

    const route = Math.floor(Math.random() * 3);
    const direction = Math.random() > 0.5 ? 1 : -1;
    const width = randomBetween(100, 190);
    const height = randomBetween(70, 120);
    const lift = randomBetween(60, 110);
    const variation = randomBetween(-0.25, 0.25);
    const duration = randomBetween(3600, 4600);
    const flapSpeed = randomBetween(1.8, 2.4);

    const startingPhase = openRef.current ? Math.PI : 0;

    function getOffset(progress: number): Point {
      const angle = progress * Math.PI * 2;
      const envelope = Math.sin(Math.PI * progress) ** 2;

      let x: number;
      let y: number;

      if (route === 0) {
        x = width * Math.sin(angle);
        y = height * Math.sin(angle * 2);
      } else if (route === 1) {
        x = width * (Math.sin(angle) + 0.3 * Math.sin(angle * 2));

        y = height * (0.65 * Math.sin(angle * 2) + 0.2 * Math.sin(angle * 3));
      } else {
        x = width * (0.75 * Math.sin(angle) + 0.25 * Math.sin(angle * 3));

        y = height * Math.sin(angle * 2) * (0.7 + 0.3 * Math.cos(angle));
      }

      return {
        x: direction * (x + variation * y),
        y: y - lift * envelope
      };
    }

    function animate(now: number) {
      const rect = anchorRef.current?.getBoundingClientRect();

      if (!rect) {
        flyingRef.current = false;
        setOrigin(null);
        return;
      }

      const progress = Math.min((now - startedAt) / duration, 1);
      const flightProgress = smoothStep(progress);
      const offset = getOffset(flightProgress);

      const target = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      };

      const returnBlend = smoothStep(Math.max(0, Math.min(1, (progress - 0.55) / 0.45)));

      const baseX = startPoint.x + (target.x - startPoint.x) * returnBlend;

      const baseY = startPoint.y + (target.y - startPoint.y) * returnBlend;

      const horizontalRoom = Math.max(
        1,
        offset.x >= 0 ? window.innerWidth - 16 - baseX : baseX - 16
      );

      const verticalRoom = Math.max(
        1,
        offset.y >= 0 ? window.innerHeight - 16 - baseY : baseY - 16
      );

      const x = baseX + horizontalRoom * Math.tanh(offset.x / horizontalRoom);

      const y = baseY + verticalRoom * Math.tanh(offset.y / verticalRoom);

      const nextOffset = getOffset(Math.min(1, flightProgress + 0.005));

      const horizontalVelocity = nextOffset.x - offset.x;
      const envelope = Math.sin(Math.PI * progress) ** 2;

      const tilt = Math.tanh(horizontalVelocity * 0.5) * 16 * envelope;

      flyingSvg.style.transform = `translate(${x - 8}px, ${y - 8}px) rotate(${tilt}deg)`;

      const elapsed = (now - startedAt) / 1000;

      const flapPhase =
        elapsed * Math.PI * 2 * flapSpeed + 0.3 * Math.sin(elapsed * 2) + startingPhase;

      const flap = Math.cos(flapPhase);

      const landing = smoothStep(Math.max(0, Math.min(1, (progress - 0.84) / 0.16)));

      const restingShape = openRef.current ? -1 : 1;
      const shape = flap * (1 - landing) + restingShape * landing;

      const edgeY = 12 - shape * 3;
      const centerY = 12 + shape * 3;

      flyingWings.setAttribute('d', `M6 ${edgeY}L12 ${centerY}L18 ${edgeY}`);

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
        return;
      }

      flyingSvg.style.transform = `translate(${target.x - 8}px, ${target.y - 8}px)`;

      flyingWings.setAttribute('d', openRef.current ? UP : DOWN);

      flyingRef.current = false;
      setOrigin(null);
    }

    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
    };
  }, [origin, reducedMotion]);

  return (
    <>
      <span
        aria-hidden="true"
        className="flex size-5 shrink-0 items-center justify-center text-muted"
        ref={anchorRef}
      >
        <svg
          className="size-4"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          style={{ visibility: origin ? 'hidden' : 'visible' }}
          viewBox="0 0 24 24"
        >
          <title>Toggle project details</title>
          <path d={open ? UP : DOWN} />
        </svg>
      </span>

      {origin
        && createPortal(
          <div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-50 overflow-hidden text-muted"
          >
            <svg
              className="absolute top-0 left-0 size-4"
              fill="none"
              ref={flyingSvgRef}
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              style={{
                transform: `translate(${origin.x - 8}px, ${origin.y - 8}px)`,
                transformOrigin: 'center',
                willChange: 'transform'
              }}
              viewBox="0 0 24 24"
            >
              <title>Flying chevron</title>
              <path
                d={open ? UP : DOWN}
                ref={wingsRef}
              />
            </svg>
          </div>,
          document.body
        )}
    </>
  );
}
