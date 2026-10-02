'use client';

import type { KeyboardEvent, PointerEvent } from 'react';
import { useEffect, useRef, useState } from 'react';

type ResolveProgress = (x: number, y: number, current: number) => number;

const normalize = (value: number) => ((value % 1) + 1) % 1;

export function useCurveAnimation(
  speed: number,
  initialProgress: number,
  resolveProgress: ResolveProgress
) {
  const [progress, setProgress] = useState(initialProgress);
  const [dragging, setDragging] = useState(false);

  const progressRef = useRef(initialProgress);
  const pointerRef = useRef<number | null>(null);

  function updateProgress(value: number) {
    const next = normalize(value);

    progressRef.current = next;
    setProgress(next);
  }

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');

    let frame = 0;
    let previous: number | null = null;

    function animate(now: number) {
      if (previous !== null && pointerRef.current === null) {
        const delta = Math.min((now - previous) / 1000, 0.05);
        const next = normalize(progressRef.current + delta * speed);

        progressRef.current = next;
        setProgress(next);
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
  }, [speed]);

  function movePoint(event: PointerEvent<SVGCircleElement>) {
    const svg = event.currentTarget.ownerSVGElement;
    const matrix = svg?.getScreenCTM();

    if (!svg || !matrix) {
      return;
    }

    const point = svg.createSVGPoint();

    point.x = event.clientX;
    point.y = event.clientY;

    const local = point.matrixTransform(matrix.inverse());

    updateProgress(resolveProgress(local.x, local.y, progressRef.current));
  }

  function stopDragging() {
    pointerRef.current = null;
    setDragging(false);
  }

  function onPointerDown(event: PointerEvent<SVGCircleElement>) {
    if (!event.isPrimary || event.button !== 0) {
      return;
    }

    event.preventDefault();
    pointerRef.current = event.pointerId;
    setDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function onPointerMove(event: PointerEvent<SVGCircleElement>) {
    if (pointerRef.current === event.pointerId) {
      movePoint(event);
    }
  }

  function onPointerUp(event: PointerEvent<SVGCircleElement>) {
    if (pointerRef.current !== event.pointerId) {
      return;
    }

    movePoint(event);
    stopDragging();

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  function onKeyDown(event: KeyboardEvent<SVGCircleElement>) {
    if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
      event.preventDefault();
      updateProgress(progressRef.current + 0.01);
    }

    if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
      event.preventDefault();
      updateProgress(progressRef.current - 0.01);
    }
  }

  return {
    progress,
    dragging,
    pointProps: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel: stopDragging,
      onLostPointerCapture: stopDragging,
      onKeyDown,
      role: 'slider' as const,
      tabIndex: 0,
      'aria-valuemin': 0,
      'aria-valuemax': 100,
      'aria-valuenow': Math.round(progress * 100)
    }
  };
}
