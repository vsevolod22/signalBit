import { DEFAULT_ABOUT_CONTENT } from '@/features/about-company/model/about-company-content';
import { DEFAULT_ACHIEVEMENTS, DEFAULT_ACHIEVEMENTS_TITLE } from '@/features/achievements/model/achievements-content';
import { DEFAULT_ACTIVITY_CARDS, DEFAULT_ACTIVITY_TITLE } from '@/features/activity-fields/model/activity-fields-content';
import { DEFAULT_CONTACTS_CONTENT } from '@/features/contacts/model/contacts-content';
import { DEFAULT_DEVELOPMENTS, DEFAULT_DEVELOPMENT_TITLE } from '@/features/developments/model/developments-content';
import { DEFAULT_HERO_CONTENT } from '@/features/main-hero/model/hero-content';
import { DEFAULT_PRODUCTS, DEFAULT_PRODUCTS_TITLE } from '@/features/products/model/products-content';
import { DEFAULT_NAVIGATION_CONTENT } from '@/features/site-navigation/model/navigation-content';

export type {
  ActivityCard,
  DevelopmentCard,
  MediaContent,
  PartnerLogo,
  ProductCard,
  SiteContent,
  StatItem,
} from './site-content.types';

import type { SiteContent } from './site-content.types';

export const DEFAULT_SITE_CONTENT: SiteContent = {
  navigation: DEFAULT_NAVIGATION_CONTENT,
  hero: DEFAULT_HERO_CONTENT,
  activityTitle: DEFAULT_ACTIVITY_TITLE,
  activityCards: DEFAULT_ACTIVITY_CARDS,
  developmentTitle: DEFAULT_DEVELOPMENT_TITLE,
  developments: DEFAULT_DEVELOPMENTS,
  productsTitle: DEFAULT_PRODUCTS_TITLE,
  products: DEFAULT_PRODUCTS,
  about: DEFAULT_ABOUT_CONTENT,
  achievementsTitle: DEFAULT_ACHIEVEMENTS_TITLE,
  achievements: DEFAULT_ACHIEVEMENTS,
  contacts: DEFAULT_CONTACTS_CONTENT,
};
