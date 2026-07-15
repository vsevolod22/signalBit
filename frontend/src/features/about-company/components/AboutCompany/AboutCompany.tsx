import { motion } from 'framer-motion';
import type { ReactElement } from 'react';

import { useSiteContent } from '@/app/providers/SiteContentProvider';
import { cardRevealVariants, fadeUpVariants, pageSectionVariants } from '@/shared/lib/landing-motion';
import { CARD_HOVER } from '@/shared/lib/motion-presets';
import { AnimatedSection } from '@/shared/ui/animated-section/AnimatedSection';
import { AnimatedSectionHeading } from '@/shared/ui/animated-section/AnimatedSectionHeading';
import { RouteConnector, SectionRoute } from '@/shared/ui/section-route';
import './about-company.scss';

export function AboutCompany(): ReactElement {
  const { content } = useSiteContent();

  return (
    <AnimatedSection className="section-shell about" id="about" ariaLabelledBy="about-title">
      <SectionRoute className="about__route" variant="right-to-left" />
      <RouteConnector side="left" />
      <AnimatedSectionHeading id="about-label">О нас</AnimatedSectionHeading>
      <motion.div className="about__grid" variants={pageSectionVariants}>
        <motion.div className="about__copy" variants={pageSectionVariants}>
          <motion.h3 id="about-title" variants={fadeUpVariants}>
            {content.about.title}
          </motion.h3>
          {content.about.paragraphs.map((paragraph) => (
            <motion.p key={paragraph} variants={fadeUpVariants}>
              {paragraph}
            </motion.p>
          ))}
          <motion.dl className="about__stats" variants={pageSectionVariants}>
            {content.about.stats.map((stat) => (
              <motion.div key={stat.label} variants={cardRevealVariants}>
                <dt>{stat.value}</dt>
                <dd>{stat.label}</dd>
              </motion.div>
            ))}
          </motion.dl>
        </motion.div>
        <motion.figure className="about__photo" variants={cardRevealVariants} whileHover={CARD_HOVER.aboutPhoto}>
          <img
            src={content.about.photo}
            alt="Демонстрация беспилотной системы СИГНАЛ-БИТ"
            width="424"
            height="277"
            loading="lazy"
            decoding="async"
          />
          <figcaption>
            <b>{content.about.officialTitle}</b>
            {content.about.officialItems.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </figcaption>
        </motion.figure>
      </motion.div>
    </AnimatedSection>
  );
}
