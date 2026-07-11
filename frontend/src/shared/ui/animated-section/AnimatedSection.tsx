import type { PropsWithChildren, ReactElement } from 'react';
import { motion } from 'framer-motion';

import { pageSectionVariants, revealViewport } from '@/shared/lib/landing-motion';

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
      variants={pageSectionVariants}
    >
      {children}
    </motion.section>
  );
}
