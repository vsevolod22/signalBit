import type { ReactElement } from 'react';
import { motion } from 'framer-motion';

import { useSiteContent } from '@/app/providers/SiteContentProvider';
import type { DevelopmentCard } from '@/shared/model/site-content';
import { cardRevealVariants, pageSectionVariants } from '@/shared/lib/landing-motion';
import { CARD_HOVER } from '@/shared/lib/motion-presets';
import { AnimatedSection } from '@/shared/ui/animated-section/AnimatedSection';
import { AnimatedSectionHeading } from '@/shared/ui/animated-section/AnimatedSectionHeading';
import { RouteConnector, SectionRoute } from '@/shared/ui/section-route';
import './development-section.scss';

function DevelopmentCardView({ card }: { card: DevelopmentCard }): ReactElement {
  return (
    <motion.article className="development-card" variants={cardRevealVariants} whileHover={CARD_HOVER.development}>
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
    <AnimatedSection
      className="section-shell development-shell"
      id="development"
      ariaLabelledBy="development-title"
    >
      <SectionRoute className="development-route" />
      <RouteConnector side="right" />
      <AnimatedSectionHeading id="development-title">{content.developmentTitle}</AnimatedSectionHeading>
      <motion.div className="development-grid" variants={pageSectionVariants}>
        {content.developments.map((card) => (
          <DevelopmentCardView card={card} key={card.title} />
        ))}
      </motion.div>
    </AnimatedSection>
  );
}
