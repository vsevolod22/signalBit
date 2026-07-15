import { motion } from 'framer-motion';
import type { PropsWithChildren, ReactElement } from 'react';

import { fadeUpVariants } from '@/shared/lib/landing-motion';

interface AnimatedSectionHeadingProps extends PropsWithChildren {
  id: string;
}

export function AnimatedSectionHeading({ children, id }: AnimatedSectionHeadingProps): ReactElement {
  return (
    <motion.h2 id={id} variants={fadeUpVariants}>
      {children}
    </motion.h2>
  );
}
