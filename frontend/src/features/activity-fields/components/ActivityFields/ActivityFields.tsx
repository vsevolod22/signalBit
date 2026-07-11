import type { ReactElement } from 'react';
import { motion } from 'framer-motion';

import { useSiteContent } from '@/app/providers/SiteContentProvider';
import type { ActivityCard } from '@/shared/model/site-content';
import { cardRevealVariants, pageSectionVariants } from '@/shared/lib/landing-motion';
import { CARD_HOVER, CARD_TRANSITION } from '@/shared/lib/motion-presets';
import { AnimatedSection } from '@/shared/ui/animated-section/AnimatedSection';
import { AnimatedSectionHeading } from '@/shared/ui/animated-section/AnimatedSectionHeading';
import { RouteConnector, SectionRoute } from '@/shared/ui/section-route';
import './activity-fields.scss';

interface ActivityCardViewProps {
  card: ActivityCard;
  tone: 'dark' | 'light';
}

function ActivityCardView({ card, tone }: ActivityCardViewProps): ReactElement {
  return (
    <motion.article
      className={`activity-card activity-card--${tone}`}
      variants={cardRevealVariants}
      whileHover={CARD_HOVER.activity}
      transition={CARD_TRANSITION.activity}
    >
      <span className="activity-number">{card.number}</span>
      {card.image !== undefined && <img src={card.image} alt="" aria-hidden="true" loading="lazy" decoding="async" />}
      <h3>{card.title}</h3>
      <p>{card.description}</p>
    </motion.article>
  );
}

export function ActivityFields(): ReactElement {
  const { content } = useSiteContent();

  return (
    <AnimatedSection
      className="section-shell services-shell"
      id="services"
      ariaLabelledBy="services-title"
    >
      <SectionRoute className="services-route" />
      <RouteConnector side="left" />
      <AnimatedSectionHeading id="services-title">{content.activityTitle}</AnimatedSectionHeading>
      <motion.div className="activity-grid" variants={pageSectionVariants}>
        {content.activityCards.map((card, index) => {
          const isEvenCard = index % 2 === 0;
          const cardTone = isEvenCard ? 'dark' : 'light';

          return <ActivityCardView card={card} key={card.number} tone={cardTone} />;
        })}
      </motion.div>
    </AnimatedSection>
  );
}
