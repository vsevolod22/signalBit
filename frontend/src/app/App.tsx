import type { ReactElement } from 'react';
import { MotionConfig } from 'framer-motion';

import { SiteContentProvider } from '@/app/providers/SiteContentProvider';
import { LandingPage } from '@/pages/landing-page';

import './styles/base.scss';

export function App(): ReactElement {
  return (
    <MotionConfig reducedMotion="user">
      <SiteContentProvider>
        <LandingPage />
      </SiteContentProvider>
    </MotionConfig>
  );
}
