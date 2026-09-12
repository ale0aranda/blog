'use client';

import type { ReactNode } from 'react';

import { inView } from '../config';
import { useEntranceVariants } from '../hooks/use-reduced-motion-safe';
import type { MotionTagName } from './motion-tag';
import { MOTION_TAGS } from './motion-tag';

type FadeInProps = {
  as?: MotionTagName;
  animate?: 'view' | 'mount';
  y?: number;
  delay?: number;
  duration?: number;
  className?: string;
  children: ReactNode;
};

export function FadeIn({
  as = 'div',
  animate = 'view',
  y,
  delay,
  duration,
  className,
  children
}: FadeInProps) {
  const MotionTag = MOTION_TAGS[as];

  const variants = useEntranceVariants({
    ...(y !== undefined && { y }),
    ...(delay !== undefined && { delay }),
    ...(duration !== undefined && { duration })
  });

  const animationProps =
    animate === 'mount'
      ? {
          animate: 'show' as const
        }
      : {
          whileInView: 'show' as const,
          viewport: inView
        };

  return (
    <MotionTag initial="hidden" variants={variants} className={className} {...animationProps}>
      {children}
    </MotionTag>
  );
}
