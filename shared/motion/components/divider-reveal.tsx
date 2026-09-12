'use client';

import { motion } from 'framer-motion';

import { DURATION } from '../tokens/durations';
import { EASE_OUT } from '../tokens/easings';

type DividerRevealProps = {
  className?: string;
  delay?: number;
  duration?: number;
};

export function DividerReveal({
  className,
  delay = 0,
  duration = DURATION.base
}: DividerRevealProps) {
  return (
    <motion.div
      initial={{
        scaleX: 0
      }}
      animate={{
        scaleX: 1
      }}
      transition={{
        duration,
        delay,
        ease: EASE_OUT
      }}
      className={className}
      style={{
        transformOrigin: 'left'
      }}
      aria-hidden="true"
    />
  );
}
