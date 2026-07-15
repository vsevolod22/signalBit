import { motion } from 'framer-motion';
import type { ReactElement } from 'react';

import { useSiteContent } from '@/app/providers/SiteContentProvider';
import { cardRevealVariants, fadeUpVariants, pageSectionVariants } from '@/shared/lib/landing-motion';
import { CARD_HOVER } from '@/shared/lib/motion-presets';
import { AnimatedSection } from '@/shared/ui/animated-section/AnimatedSection';
import { RouteConnector, SectionRoute } from '@/shared/ui/section-route';
import './achievements.scss';

export function Achievements(): ReactElement {
  const { content } = useSiteContent();

  return (
    <AnimatedSection className="section-shell achievements-shell" id="achievements" ariaLabelledBy="achievements-title">
      <SectionRoute className="achievements__route" variant="left-to-right" />
      <RouteConnector side="right" />
      <motion.div className="achievements" variants={pageSectionVariants}>
        <motion.h3 id="achievements-title" variants={fadeUpVariants}>
          {content.achievementsTitle}
        </motion.h3>
        <motion.div className="achievements__grid" variants={pageSectionVariants}>
          {content.achievements.map((achievement) => (
            <motion.figure key={achievement.image} variants={cardRevealVariants} whileHover={CARD_HOVER.achievement}>
              <img src={achievement.image} alt={achievement.title} loading="lazy" decoding="async" />
            </motion.figure>
          ))}
        </motion.div>
      </motion.div>
    </AnimatedSection>
  );
}
