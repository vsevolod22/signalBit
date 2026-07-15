import { motion } from 'framer-motion';
import type { ReactElement } from 'react';

import { useSiteContent } from '@/app/providers/SiteContentProvider';
import { cardRevealVariants, pageSectionVariants } from '@/shared/lib/landing-motion';
import type { EducationProgram } from '@/shared/model/site-content';
import { AnimatedSection } from '@/shared/ui/animated-section/AnimatedSection';
import { AnimatedSectionHeading } from '@/shared/ui/animated-section/AnimatedSectionHeading';
import { MotionLink } from '@/shared/ui/link/MotionLink';
import { RouteConnector, SectionRoute } from '@/shared/ui/section-route';
import './education-section.scss';

function EducationProgramCard({ program, ctaLabel }: { program: EducationProgram; ctaLabel: string }): ReactElement {
  return (
    <motion.article className={`education__card education__card--${program.theme}`} variants={cardRevealVariants}>
      <header className="education__card-header">
        <h3>{program.title}</h3>
        <p>{program.subtitle}</p>
      </header>
      <dl className="education__details">
        {program.details.map((detail) => (
          <div key={detail.label}>
            <dt>{detail.label}</dt>
            <dd>{detail.value}</dd>
          </div>
        ))}
      </dl>
      <div className="education__curriculum">
        <img src={program.image} alt="" aria-hidden="true" loading="lazy" decoding="async" />
        <div className="education__directions">
          <strong>направления</strong>
          <ol>
            {program.directions.map((direction) => (
              <li key={direction}>{direction}</li>
            ))}
          </ol>
        </div>
      </div>
      <ul className="education__outcomes">
        {program.outcomes.map((outcome) => (
          <li key={outcome.segments.map((segment) => segment.text).join('')}>
            {outcome.segments.map((segment, index) =>
              segment.emphasized === true ? (
                <strong key={`${segment.text}-${index}`}>{segment.text}</strong>
              ) : (
                segment.text
              ),
            )}
          </li>
        ))}
      </ul>
      <MotionLink className="education__cta" href="#contacts" interaction="cta">
        {ctaLabel}
      </MotionLink>
    </motion.article>
  );
}

export function EducationSection(): ReactElement {
  const { content } = useSiteContent();
  const { education } = content;

  return (
    <AnimatedSection className="section-shell education" id="education" ariaLabelledBy="education-title">
      <SectionRoute className="education__route" variant="right-to-left" />
      <RouteConnector side="left" />
      <AnimatedSectionHeading id="education-title">{education.title}</AnimatedSectionHeading>
      <motion.div className="education__programs" variants={pageSectionVariants}>
        {education.programs.map((program) => (
          <EducationProgramCard program={program} ctaLabel={education.ctaLabel} key={program.title} />
        ))}
      </motion.div>
      <motion.div className="education__summary" variants={cardRevealVariants}>
        <h3>{education.introTitle}</h3>
        <p>{education.introText}</p>
        <dl>
          {education.stats.map((stat) => (
            <div key={stat.value}>
              <dt>{stat.value}</dt>
              <dd>{stat.label}</dd>
            </div>
          ))}
        </dl>
      </motion.div>
    </AnimatedSection>
  );
}
