import type { Variants } from 'framer-motion';

export const landingEase = [0.22, 1, 0.36, 1] as const;
export const revealViewport = { once: true, amount: 0.22 } as const;

export const sectionRevealVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.06,
    },
  },
};

export const pageSectionVariants: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.78,
      ease: landingEase,
      staggerChildren: 0.08,
      delayChildren: 0.06,
    },
  },
};

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: landingEase },
  },
};

export const cardRevealVariants: Variants = {
  hidden: { opacity: 0, y: 34, scale: 0.975 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.68, ease: landingEase },
  },
};

export const heroImageVariants: Variants = {
  hidden: { opacity: 0, x: 54, scale: 0.96, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 1, ease: landingEase, delay: 0.18 },
  },
};

export const mediaFadeVariants: Variants = {
  hidden: { opacity: 0, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: landingEase, delay: 0.12 },
  },
};

export const headerEntranceVariants: Variants = {
  hidden: { opacity: 0, y: -12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.64, ease: landingEase },
  },
};

export const scrollCueVariants: Variants = {
  hidden: { opacity: 0, y: -8 },
  visible: {
    opacity: 1,
    y: [0, 8, 0],
    transition: {
      opacity: { duration: 0.45, delay: 0.9 },
      y: { duration: 1.9, repeat: Infinity, ease: 'easeInOut' },
    },
  },
};
