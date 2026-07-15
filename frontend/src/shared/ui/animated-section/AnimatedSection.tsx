import { motion } from 'framer-motion';
import type { PropsWithChildren, ReactElement } from 'react';

import { revealViewport, sectionRevealVariants } from '@/shared/lib/landing-motion';

interface AnimatedSectionProps extends PropsWithChildren {
  ariaLabelledBy: string;
  className: string;
  id: string;
}

export function AnimatedSection({ ariaLabelledBy, children, className, id }: AnimatedSectionProps): ReactElement {
  return (
    <motion.section
      className={className}
      id={id}
      aria-labelledby={ariaLabelledBy}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      variants={sectionRevealVariants}
    >
      {children}
    </motion.section>
  );
}
