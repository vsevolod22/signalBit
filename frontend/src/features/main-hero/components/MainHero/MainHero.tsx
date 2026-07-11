import type { ReactElement } from 'react';
import { motion } from 'framer-motion';

import { useSiteContent } from '@/app/providers/SiteContentProvider';
import { fadeUpVariants, heroImageVariants, pageSectionVariants, scrollCueVariants } from '@/shared/lib/landing-motion';
import { MotionLink } from '@/shared/ui/link/MotionLink';
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
      <MotionLink
        className="scroll-cue"
        href="#services"
        aria-label="Перейти к сервисам"
        initial="hidden"
        animate="visible"
        variants={scrollCueVariants}
        interaction="scrollCue"
      >
        <img src={content.hero.arrowImage} alt="" width="184" height="92" />
      </MotionLink>
    </motion.section>
  );
}
