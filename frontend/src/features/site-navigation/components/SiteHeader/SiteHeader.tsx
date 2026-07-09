import type { ReactElement } from 'react';
import { motion } from 'framer-motion';

import { useSiteContent } from '@/app/providers/SiteContentProvider';
import { fadeUpVariants, landingEase, pageSectionVariants } from '@/shared/lib/landing-motion';
import './site-header.scss';

export function SiteHeader(): ReactElement {
  const { content } = useSiteContent();

  return (
    <motion.header
      className="site-header"
      aria-label="Главная навигация"
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.64, ease: landingEase }}
    >
      <motion.a className="brand" href="#top" aria-label="СИГНАЛ-БИТ" whileHover={{ scale: 1.02 }}>
        <img src={content.navigation.logo} alt="СИГНАЛ-БИТ" />
      </motion.a>
      <motion.nav className="nav-links" initial="hidden" animate="visible" variants={pageSectionVariants}>
        {content.navigation.links.map((link) => (
          <motion.a href={link.href} key={link.href} variants={fadeUpVariants} whileHover={{ y: -2 }}>
            {link.label}
          </motion.a>
        ))}
      </motion.nav>
      <motion.a className="contact-link" href="#contacts" whileHover={{ y: -2, scale: 1.03 }} whileTap={{ scale: 0.98 }}>
        {content.navigation.contactLabel}
      </motion.a>
    </motion.header>
  );
}
