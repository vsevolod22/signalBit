import type { PropsWithChildren, ReactElement } from 'react';
import { motion } from 'framer-motion';

import { useSiteContent } from '@/app/providers/SiteContentProvider';
import { cardRevealVariants, fadeUpVariants, pageSectionVariants, revealViewport, SECTION_ROUTE_PATHS } from '@/shared/lib/landing-motion';
import { RouteConnector, SectionRoute } from '@/shared/ui/section-route';
import './about-company.scss';

export function AboutCompany({ children }: PropsWithChildren): ReactElement {
  const { content } = useSiteContent();

  return (
    <motion.section
      className="section-shell about-shell"
      id="about"
      aria-labelledby="about-title"
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      variants={pageSectionVariants}
    >
      <SectionRoute className="about-route" path={SECTION_ROUTE_PATHS.about} />
      <RouteConnector side="right" />
      <motion.h2 id="about-label" variants={fadeUpVariants}>
        О нас
      </motion.h2>
      <motion.div className="about-grid" variants={pageSectionVariants}>
        <motion.div className="about-copy" variants={pageSectionVariants}>
          <motion.h3 id="about-title" variants={fadeUpVariants}>
            {content.about.title}
          </motion.h3>
          {content.about.paragraphs.map((paragraph) => (
            <motion.p key={paragraph} variants={fadeUpVariants}>
              {paragraph}
            </motion.p>
          ))}
          <motion.dl className="stats-list" variants={pageSectionVariants}>
            {content.about.stats.map((stat) => (
              <motion.div key={stat.label} variants={cardRevealVariants}>
                <dt>{stat.value}</dt>
                <dd>{stat.label}</dd>
              </motion.div>
            ))}
          </motion.dl>
        </motion.div>
        <motion.figure className="about-photo" variants={cardRevealVariants} whileHover={{ y: -6 }}>
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
      {children}
    </motion.section>
  );
}
