import type { ReactElement } from 'react';

import { AboutCompany } from '@/features/about-company';
import { Achievements } from '@/features/achievements';
import { ActivityFields } from '@/features/activity-fields';
import { ContactSection } from '@/features/contacts';
import { MainHero } from '@/features/main-hero';
import { ProductCanary } from '@/features/product-canary';
import { FlightControllerProduct } from '@/features/product-flight-controller';
import { SensorProduct } from '@/features/product-sensor';
import { ServiceList } from '@/features/services';
import { SiteFooter } from '@/features/site-footer';

import '../styles/mobileHome.css';

export function MobileHomePage(): ReactElement {
  return (
    <main className="mobile-home">
      <MainHero />
      <ActivityFields />
      <ServiceList />
      <ProductCanary />
      <SensorProduct />
      <FlightControllerProduct />
      <AboutCompany />
      <Achievements />
      <ContactSection />
      <SiteFooter />
    </main>
  );
}
