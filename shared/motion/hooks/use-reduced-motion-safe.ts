'use client';

import type { Variants } from 'framer-motion';
import { useReducedMotion } from 'framer-motion';

import type { EntranceOptions } from '../variants/entrance';
import { entrance } from '../variants/entrance';

const REDUCED_MOTION_VARIANTS: Variants = {
  hidden: {
    opacity: 0
  },

  show: {
    opacity: 1,
    transition: {
      duration: 0.15
    }
  }
};

export function useEntranceVariants(options?: EntranceOptions): Variants {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return REDUCED_MOTION_VARIANTS;
  }

  return entrance(options);
}
