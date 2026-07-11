import type { ReactElement } from 'react';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';

import { LINK_MOTION } from '@/shared/lib/motion-presets';
import type { LinkMotionPreset } from '@/shared/lib/motion-presets';

interface MotionLinkProps extends Omit<HTMLMotionProps<'a'>, 'whileFocus' | 'whileHover' | 'whileTap'> {
  interaction: LinkMotionPreset;
}

export function MotionLink({ interaction, ...anchorProps }: MotionLinkProps): ReactElement {
  const motionPreset = LINK_MOTION[interaction];

  return (
    <motion.a
      {...anchorProps}
      whileHover={motionPreset.hover}
      whileFocus={motionPreset.hover}
      whileTap={motionPreset.tap}
    />
  );
}
