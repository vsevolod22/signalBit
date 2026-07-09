import type { ReactElement } from 'react';
import { motion } from 'framer-motion';

import { useSiteContent } from '@/app/providers/SiteContentProvider';
import { fadeUpVariants, mediaFadeVariants, pageSectionVariants, revealViewport, SECTION_ROUTE_PATHS } from '@/shared/lib/landing-motion';
import { SectionRoute } from '@/shared/ui/section-route';
import './contact-section.scss';

export function ContactSection(): ReactElement {
  const { content } = useSiteContent();

  return (
    <motion.section
      className="section-shell contacts-shell"
      id="contacts"
      aria-labelledby="contacts-title"
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      variants={pageSectionVariants}
    >
      <SectionRoute className="contacts-route" path={SECTION_ROUTE_PATHS.contacts} />
      <motion.div className="contacts-copy" variants={pageSectionVariants}>
        <motion.h2 id="contacts-title" variants={fadeUpVariants}>
          {content.contacts.title}
        </motion.h2>
        <motion.p className="email-line" variants={fadeUpVariants}>
          <span>{content.contacts.emailLabel}</span>
          <img src={content.contacts.emailIcon} alt="" aria-hidden="true" />
          <a href={`mailto:${content.contacts.emailAddress}`}>{content.contacts.emailAddress}</a>
        </motion.p>
        <motion.p variants={fadeUpVariants}>{content.contacts.responseText}</motion.p>
        <motion.div className="partners" aria-label={content.contacts.partnersTitle} variants={pageSectionVariants}>
          <h3>{content.contacts.partnersTitle}</h3>
          <div>
            {content.contacts.partners.map((partner) => (
              <img src={partner.image} alt={partner.name} key={partner.name} loading="lazy" />
            ))}
          </div>
        </motion.div>
      </motion.div>
      <motion.img
        className="contacts-drone"
        src={content.contacts.heroImage}
        alt=""
        aria-hidden="true"
        variants={mediaFadeVariants}
      />
    </motion.section>
  );
}
