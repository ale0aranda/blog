import { motion } from 'framer-motion';

export const MOTION_TAGS = {
  div: motion.div,
  span: motion.span,
  nav: motion.nav,
  header: motion.header,
  main: motion.main,
  section: motion.section,
  article: motion.article,
  aside: motion.aside,
  ul: motion.ul,
  li: motion.li,
  p: motion.p,
  footer: motion.footer
} as const;

export type MotionTagName = keyof typeof MOTION_TAGS;
