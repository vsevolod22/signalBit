import type { ReactElement } from 'react';
import { motion } from 'framer-motion';

import { useSiteContent } from '@/app/providers/SiteContentProvider';
import { fadeUpVariants, heroImageVariants, pageSectionVariants } from '@/shared/lib/landing-motion';
import './main-hero.scss';

export function MainHero(): ReactElement {
  const { content } = useSiteContent();

  return (
    <motion.section className="hero" id="top" aria-labelledby="hero-title" initial={false} animate="visible" variants={pageSectionVariants}>
      <motion.div className="hero-copy" variants={pageSectionVariants}>
        <motion.h1 id="hero-title" variants={fadeUpVariants}>
          {content.hero.title}
        </motion.h1>
        <motion.p className="hero-subtitle" variants={fadeUpVariants}>
          {content.hero.subtitle}
        </motion.p>
        <motion.h2 variants={fadeUpVariants}>{content.hero.headline}</motion.h2>
        <motion.p variants={fadeUpVariants}>{content.hero.description}</motion.p>
      </motion.div>
      <motion.div className="hero-media" aria-hidden="true" variants={heroImageVariants}>
        <img
          src={content.hero.image}
          alt=""
          width="814"
          height="401"
          decoding="async"
          {...{ fetchpriority: 'high' }}
        />
      </motion.div>
      <motion.a
        className="scroll-cue"
        href="#services"
        aria-label="Перейти к сервисам"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { duration: 0.45, delay: 0.9 }, y: { duration: 1.9, repeat: Infinity, ease: 'easeInOut' } }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
      >
        <img src={content.hero.arrowImage} alt="" width="184" height="92" />
      </motion.a>
    </motion.section>
  );
}
