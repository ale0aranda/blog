'use client';

import type { ReactNode } from 'react';

import { inView } from '../config';
import type { StaggerOptions } from '../variants/container';
import { staggerContainer } from '../variants/container';
import type { MotionTagName } from './motion-tag';
import { MOTION_TAGS } from './motion-tag';

type StaggerGroupProps = {
  as?: MotionTagName;
  animate?: 'view' | 'mount';
  className?: string;
  children: ReactNode;
} & StaggerOptions;

export function StaggerGroup({
  as = 'div',
  animate = 'view',
  delayChildren,
  staggerChildren,
  className,
  children
}: StaggerGroupProps) {
  const MotionTag = MOTION_TAGS[as];

  const variants = staggerContainer({
    ...(delayChildren !== undefined && {
      delayChildren
    }),
    ...(staggerChildren !== undefined && {
      staggerChildren
    })
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
