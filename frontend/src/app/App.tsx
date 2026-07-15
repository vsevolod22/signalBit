import { MotionConfig } from 'framer-motion';
import type { ReactElement } from 'react';

import { SiteContentProvider, useSiteContent } from '@/app/providers/SiteContentProvider';
import { SiteLoadingScreen } from '@/app/ui/SiteLoadingScreen';
import { SeoManager } from '@/features/seo';
import { LandingPage } from '@/pages/landing-page';

import './styles/base.scss';

function SiteRuntime(): ReactElement {
  const { content, status } = useSiteContent();
  const isLoading = status === 'loading';

  return (
    <div className={`site-runtime${isLoading ? ' site-runtime--loading' : ''}`} aria-busy={isLoading}>
      <SeoManager content={content} />
      {isLoading ? <SiteLoadingScreen /> : null}
      <div className={isLoading ? 'site-runtime__content--loading' : undefined} aria-hidden={isLoading || undefined}>
        <LandingPage />
      </div>
    </div>
  );
}

export function App(): ReactElement {
  return (
    <MotionConfig reducedMotion="user">
      <SiteContentProvider>
        <SiteRuntime />
      </SiteContentProvider>
    </MotionConfig>
  );
}
