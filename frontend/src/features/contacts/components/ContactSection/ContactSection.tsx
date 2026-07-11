import type { PropsWithChildren, ReactElement } from 'react';
import { motion } from 'framer-motion';

import { useSiteContent } from '@/app/providers/SiteContentProvider';
import { fadeUpVariants, mediaFadeVariants, pageSectionVariants } from '@/shared/lib/landing-motion';
import { AnimatedSection } from '@/shared/ui/animated-section/AnimatedSection';
import { AnimatedSectionHeading } from '@/shared/ui/animated-section/AnimatedSectionHeading';
import { EmailLink } from '@/shared/ui/link/EmailLink';
import { SectionRoute } from '@/shared/ui/section-route';
import './contact-section.scss';

export function ContactSection({ children }: PropsWithChildren): ReactElement {
  const { content } = useSiteContent();

  return (
    <AnimatedSection
      className="section-shell contacts-shell"
      id="contacts"
      ariaLabelledBy="contacts-title"
    >
      <SectionRoute className="contacts-route" />
      <motion.div className="contacts-content" variants={pageSectionVariants}>
        <motion.div className="contacts-copy" variants={pageSectionVariants}>
          <AnimatedSectionHeading id="contacts-title">{content.contacts.title}</AnimatedSectionHeading>
          <motion.p className="email-line" variants={fadeUpVariants}>
            <span>{content.contacts.emailLabel}</span>
            <img src={content.contacts.emailIcon} alt="" aria-hidden="true" width="100" height="76" />
            <EmailLink email={content.contacts.emailAddress} />
          </motion.p>
          <motion.p variants={fadeUpVariants}>{content.contacts.responseText}</motion.p>
          <motion.div className="partners" aria-label={content.contacts.partnersTitle} variants={pageSectionVariants}>
            <h3>{content.contacts.partnersTitle}</h3>
            <div>
              {content.contacts.partners.map((partner) => (
                <img src={partner.image} alt={partner.name} key={partner.name} loading="lazy" decoding="async" />
              ))}
            </div>
          </motion.div>
        </motion.div>
        {children}
      </motion.div>
      <motion.img
        className="contacts-drone"
        src={content.contacts.heroImage}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        variants={mediaFadeVariants}
      />
    </AnimatedSection>
  );
}
