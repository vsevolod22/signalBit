import type { ReactElement } from 'react';

import { useSiteContent } from '@/app/providers/SiteContentProvider';
import { AboutCompany } from '@/features/about-company';
import { Achievements } from '@/features/achievements';
import { ActivityFields } from '@/features/activity-fields';
import { ContactSection } from '@/features/contacts';
import { DevelopmentSection } from '@/features/developments';
import { MainHero } from '@/features/main-hero';
import { ProductsCarousel } from '@/features/products';
import { SiteHeader } from '@/features/site-navigation';

export function LandingPage(): ReactElement {
  const { source } = useSiteContent();

  return (
    <div className="landing-page" data-content-source={source}>
      <SiteHeader />
      <main>
        <MainHero />
        <ActivityFields />
        <DevelopmentSection />
        <ProductsCarousel />
        <AboutCompany>
          <Achievements />
        </AboutCompany>
        <ContactSection />
      </main>
    </div>
  );
}
