import type { Variants } from 'framer-motion';

export type StaggerOptions = {
  delayChildren?: number;
  staggerChildren?: number;
};

export function staggerContainer({
  delayChildren = 0.12,
  staggerChildren = 0.16
}: StaggerOptions = {}): Variants {
  return {
    hidden: {},

    show: {
      transition: {
        delayChildren,
        staggerChildren
      }
    }
  };
}
