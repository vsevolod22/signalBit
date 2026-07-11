import type { ReactElement } from 'react';
import { motion } from 'framer-motion';

import { useSiteContent } from '@/app/providers/SiteContentProvider';
import type { ActivityCard } from '@/shared/model/site-content';
import { cardRevealVariants, fadeUpVariants, landingEase, pageSectionVariants, revealViewport, SECTION_ROUTE_PATHS } from '@/shared/lib/landing-motion';
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
      whileHover={{ y: -8, scale: 1.015 }}
      transition={{ duration: 0.3, ease: landingEase }}
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
    <motion.section
      className="section-shell services-shell"
      id="services"
      aria-labelledby="services-title"
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      variants={pageSectionVariants}
    >
      <SectionRoute className="services-route" path={SECTION_ROUTE_PATHS.services} />
      <RouteConnector side="left" />
      <motion.h2 id="services-title" variants={fadeUpVariants}>
        {content.activityTitle}
      </motion.h2>
      <motion.div className="activity-grid" variants={pageSectionVariants}>
        {content.activityCards.map((card, index) => (
          <ActivityCardView card={card} key={card.number} tone={index % 2 === 0 ? 'dark' : 'light'} />
        ))}
      </motion.div>
    </motion.section>
  );
}
