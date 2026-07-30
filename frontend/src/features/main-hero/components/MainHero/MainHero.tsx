import { motion } from 'framer-motion';
import type { ReactElement } from 'react';

import { useSiteContent } from '@/app/providers/SiteContentProvider';
import { fadeUpVariants, heroImageVariants, pageSectionVariants, scrollCueVariants } from '@/shared/lib/landing-motion';
import { MotionLink } from '@/shared/ui/link/MotionLink';
import { PositionedImage } from '@/shared/ui/positioned-image/PositionedImage';
import './main-hero.scss';

export function MainHero(): ReactElement {
  const { content } = useSiteContent();

  return (
    <motion.section
      className="hero"
      id="top"
      aria-labelledby="hero-title"
      initial={false}
      animate="visible"
      variants={pageSectionVariants}
    >
      <motion.div className="hero__copy" variants={pageSectionVariants}>
        <motion.h1 id="hero-title" variants={fadeUpVariants}>
          {content.hero.title}
        </motion.h1>
        <motion.p className="hero__subtitle" variants={fadeUpVariants}>
          {content.hero.subtitle}
        </motion.p>
        <motion.h2 variants={fadeUpVariants}>{content.hero.headline}</motion.h2>
        <motion.p variants={fadeUpVariants}>{content.hero.description}</motion.p>
      </motion.div>
      <motion.div className="hero__media" aria-hidden="true" variants={heroImageVariants}>
        <PositionedImage
          src={content.hero.image}
          position={content.hero.imagePosition}
          alt=""
          width="814"
          height="401"
          decoding="async"
          {...{ fetchpriority: 'high' }}
        />
      </motion.div>
      <MotionLink
        className="hero__scroll-cue"
        href="#services"
        aria-label="Перейти к сервисам"
        initial="hidden"
        animate="visible"
        variants={scrollCueVariants}
        interaction="scrollCue"
      >
        <PositionedImage
          src={content.hero.arrowImage}
          position={content.hero.arrowImagePosition}
          alt=""
          width="184"
          height="92"
        />
      </MotionLink>
    </motion.section>
  );
}
