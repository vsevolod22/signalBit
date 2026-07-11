import type { Variants } from 'framer-motion';

export const SECTION_ROUTE_PATHS = {
  services: 'M 0 0 H 970 Q 1000 0 1000 30 V 970 Q 1000 1000 970 1000 H 30',
  development: 'M 0 0 V 970 Q 0 1000 30 1000 H 970',
  products: 'M 1000 0 V 970 Q 1000 1000 970 1000 H 30',
  about: 'M 0 0 V 970 Q 0 1000 30 1000 H 970',
  contacts: 'M 1000 0 V 970 Q 1000 1000 970 1000 H 30',
} as const;

export const ROUTE_CONNECTOR_PATHS = {
  left: 'M 30 0 Q 0 0 0 30 V 100',
  right: 'M 970 0 Q 1000 0 1000 30 V 100',
} as const;

export const landingEase = [0.22, 1, 0.36, 1] as const;
export const revealViewport = { once: true, amount: 0.22 } as const;

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
