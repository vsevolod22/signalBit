import type { ReactElement } from 'react';
import { motion } from 'framer-motion';

import { useSiteContent } from '@/app/providers/SiteContentProvider';
import { fadeUpVariants, headerEntranceVariants, pageSectionVariants } from '@/shared/lib/landing-motion';
import { MotionLink } from '@/shared/ui/link/MotionLink';
import './site-header.scss';

export function SiteHeader(): ReactElement {
  const { content } = useSiteContent();

  return (
    <motion.header
      className="site-header"
      aria-label="Главная навигация"
      initial={false}
      animate="visible"
      variants={headerEntranceVariants}
    >
      <MotionLink className="brand" href="#top" aria-label="СИГНАЛ-БИТ" interaction="brand">
        <img src={content.navigation.logo} alt="СИГНАЛ-БИТ — безопасность и робототехника" width="3091" height="484" />
      </MotionLink>
      <motion.nav className="nav-links" initial="hidden" animate="visible" variants={pageSectionVariants}>
        {content.navigation.links.map((link) => (
          <MotionLink href={link.href} key={link.href} variants={fadeUpVariants} interaction="lift">
            {link.label}
          </MotionLink>
        ))}
      </motion.nav>
      <MotionLink className="contact-link" href="#contacts" interaction="cta">
        {content.navigation.contactLabel}
      </MotionLink>
    </motion.header>
  );
}
