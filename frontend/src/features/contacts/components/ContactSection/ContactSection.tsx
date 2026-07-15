import { motion } from 'framer-motion';
import type { PropsWithChildren, ReactElement } from 'react';

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
    <AnimatedSection className="section-shell contacts" id="contacts" ariaLabelledBy="contacts-title">
      <SectionRoute className="contacts__route" variant="right-to-left" />
      <motion.div className="contacts__content" variants={pageSectionVariants}>
        <motion.div className="contacts__copy" variants={pageSectionVariants}>
          <AnimatedSectionHeading id="contacts-title">{content.contacts.title}</AnimatedSectionHeading>
          <motion.p className="contacts__email" variants={fadeUpVariants}>
            <span>{content.contacts.emailLabel}</span>
            <img src={content.contacts.emailIcon} alt="" aria-hidden="true" width="100" height="76" />
            <EmailLink email={content.contacts.emailAddress} />
          </motion.p>
          <motion.p variants={fadeUpVariants}>{content.contacts.responseText}</motion.p>
          <motion.div className="contacts__drone" variants={mediaFadeVariants} aria-hidden="true">
            <img src={content.contacts.heroImage} alt="" loading="lazy" decoding="async" />
          </motion.div>
          <motion.div
            className="contacts__partners"
            aria-label={content.contacts.partnersTitle}
            variants={pageSectionVariants}
          >
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
    </AnimatedSection>
  );
}
