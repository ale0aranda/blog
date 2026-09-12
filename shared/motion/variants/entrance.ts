import type { Variants } from 'framer-motion';

import { DURATION } from '../tokens/durations';
import { EASE_OUT } from '../tokens/easings';

export type EntranceOptions = {
  y?: number;
  duration?: number;
  delay?: number;
};

export function entrance({
  y = 10,
  duration = DURATION.slow,
  delay = 0
}: EntranceOptions = {}): Variants {
  return {
    hidden: {
      opacity: 0,
      y
    },

    show: {
      opacity: 1,
      y: 0,

      transition: {
        duration,
        delay,
        ease: EASE_OUT
      }
    }
  };
}
