import type { ReactElement } from 'react';
import { motion } from 'framer-motion';

import { useSiteContent } from '@/app/providers/SiteContentProvider';
import { cardRevealVariants, fadeUpVariants, pageSectionVariants } from '@/shared/lib/landing-motion';
import './achievements.scss';

export function Achievements(): ReactElement {
  const { content } = useSiteContent();

  return (
    <motion.div className="about-achievements" aria-labelledby="achievements-title" variants={pageSectionVariants}>
      <motion.h3 id="achievements-title" variants={fadeUpVariants}>
        {content.achievementsTitle}
      </motion.h3>
      <motion.div className="achievement-grid" variants={pageSectionVariants}>
        {content.achievements.map((achievement) => (
          <motion.figure key={achievement.image} variants={cardRevealVariants} whileHover={{ y: -8, scale: 1.02 }}>
            <img src={achievement.image} alt={achievement.title} loading="lazy" decoding="async" />
          </motion.figure>
        ))}
      </motion.div>
    </motion.div>
  );
}
