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

export type DesktopSectionIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export const DESKTOP_SECTIONS = [
  <MainHero key="main" />,
  <ActivityFields key="activity-fields" />,
  <ProductCanary key="product-canary" />,
  <ServiceList key="services" />,
  <ContactSection key="contacts" />,
  <AboutCompany key="about-company" />,
  <FlightControllerProduct key="flight-controller" />,
  <SensorProduct key="sensor" />,
  <Achievements key="achievements" />,
] as const satisfies readonly ReactElement[];

export function isDesktopSectionIndex(value: number): value is DesktopSectionIndex {
  return Number.isInteger(value) && value >= 0 && value < DESKTOP_SECTIONS.length;
}
