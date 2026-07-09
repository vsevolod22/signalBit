import type { ReactElement } from 'react';
import { motion } from 'framer-motion';

import { useSiteContent } from '@/app/providers/SiteContentProvider';
import type { DevelopmentCard } from '@/shared/model/site-content';
import { cardRevealVariants, fadeUpVariants, pageSectionVariants, revealViewport, SECTION_ROUTE_PATHS } from '@/shared/lib/landing-motion';
import { RouteConnector, SectionRoute } from '@/shared/ui/section-route';
import './development-section.scss';

function DevelopmentCardView({ card }: { card: DevelopmentCard }): ReactElement {
  return (
    <motion.article className="development-card" variants={cardRevealVariants} whileHover={{ y: -6, scale: 1.01 }}>
      <div>
        <h3>{card.title}</h3>
        <p>{card.description}</p>
      </div>
      <aside>
        <b>Используемые технологии</b>
        <span>{card.technologies}</span>
        <b>Стоимость</b>
        <span>{card.cost}</span>
      </aside>
    </motion.article>
  );
}

export function DevelopmentSection(): ReactElement {
  const { content } = useSiteContent();

  return (
    <motion.section
      className="section-shell development-shell"
      id="development"
      aria-labelledby="development-title"
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      variants={pageSectionVariants}
    >
      <SectionRoute className="development-route" path={SECTION_ROUTE_PATHS.development} />
      <RouteConnector side="right" />
      <motion.h2 id="development-title" variants={fadeUpVariants}>
        {content.developmentTitle}
      </motion.h2>
      <motion.div className="development-grid" variants={pageSectionVariants}>
        {content.developments.map((card) => (
          <DevelopmentCardView card={card} key={card.title} />
        ))}
      </motion.div>
    </motion.section>
  );
}
