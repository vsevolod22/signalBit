import type { ReactElement } from 'react';
import { motion } from 'framer-motion';

import { fadeUpVariants } from '@/shared/lib/landing-motion';

export function ContactFormIntro(): ReactElement {
  return (
    <motion.div className="contact-form-intro" variants={fadeUpVariants}>
      <span className="section-kicker">Связаться с командой</span>
      <h3 id="request-title">Оставьте заявку</h3>
      <p>Опишите задачу в нескольких предложениях. Мы изучим детали и предложим следующий шаг.</p>
    </motion.div>
  );
}
