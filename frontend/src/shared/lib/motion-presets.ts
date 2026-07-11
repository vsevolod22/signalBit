import type { TargetAndTransition } from 'framer-motion';

export type LinkMotionPreset = 'brand' | 'cta' | 'lift' | 'productCta' | 'scrollCue';

interface LinkInteraction {
  hover: TargetAndTransition;
  tap: TargetAndTransition;
}

export const LINK_MOTION: Record<LinkMotionPreset, LinkInteraction> = {
  brand: {
    hover: { scale: 1.02 },
    tap: { scale: 0.99 },
  },
  cta: {
    hover: { y: -2, scale: 1.03 },
    tap: { scale: 0.98 },
  },
  lift: {
    hover: { y: -2 },
    tap: { y: 0 },
  },
  productCta: {
    hover: { scale: 1.04 },
    tap: { scale: 0.97 },
  },
  scrollCue: {
    hover: { scale: 1.08 },
    tap: { scale: 0.95 },
  },
};

export const CARD_HOVER = {
  achievement: { y: -8, scale: 1.02 },
  activity: { y: -8, scale: 1.015 },
  aboutPhoto: { y: -6 },
  development: { y: -6, scale: 1.01 },
} satisfies Record<string, TargetAndTransition>;

export const CARD_TRANSITION = {
  activity: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
} as const;
