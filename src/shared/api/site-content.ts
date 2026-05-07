import { useQuery } from '@tanstack/react-query';

export const STRAPI_API_URL = import.meta.env.VITE_STRAPI_API_URL ?? 'http://localhost:1337';

export interface StrapiMedia {
  url?: string;
  alternativeText?: string | null;
}

export interface HeroContent {
  title?: string;
  description?: string;
  secondaryTitle?: string;
  secondaryDescription?: string;
  logo?: StrapiMedia | null;
  rightHand?: StrapiMedia | null;
  leftHand?: StrapiMedia | null;
}

export interface AboutCompanyContent {
  missionTitle?: string;
  companyLabel?: string;
  paragraphs?: string[];
  stats?: Array<{ value?: string; text?: string; icon?: StrapiMedia | null }>;
  officialTitle?: string;
  officialItems?: string[];
  photo?: StrapiMedia | null;
}

export interface ActivitySettingContent {
  sectionTitle?: string;
  educationEyebrow?: string;
  educationTitle?: string;
  parentFieldsTitle?: string;
}

export interface ActivityFieldContent {
  title?: string;
  description?: string;
  image?: StrapiMedia | null;
  sortOrder?: number;
}

export interface ServiceSettingContent {
  sectionTitle?: string;
  technologiesLabel?: string;
  costLabel?: string;
}

export interface ServiceContent {
  title?: string;
  description?: string;
  technologies?: string;
  cost?: string;
  image?: StrapiMedia | null;
  sortOrder?: number;
}

export interface ProductFeatureContent {
  text?: string;
  icon?: StrapiMedia | null;
  sortOrder?: number;
}

export interface ProductContent {
  name?: string;
  slug?: string;
  price?: string;
  headline?: string;
  leadHighlight?: string;
  leadText?: string;
  descriptionBlocks?: string[];
  parametersTitle?: string;
  priceLabel?: string;
  features?: ProductFeatureContent[];
  gallery?: StrapiMedia[] | null;
  video?: StrapiMedia | null;
  sortOrder?: number;
}

export interface ContactSettingContent {
  questionTitle?: string;
  emailLabel?: string;
  emailAddress?: string;
  responseText?: string;
  formEyebrow?: string;
  formTitle?: string;
  formDescription?: string;
  partnersTitle?: string;
  emailIcon?: StrapiMedia | null;
  rightImage?: StrapiMedia | null;
  partnerLogos?: Array<{ name?: string; code?: string; image?: StrapiMedia | null }>;
}

export interface AchievementSettingContent {
  sectionTitle?: string;
}

export interface AchievementContent {
  title?: string;
  image?: StrapiMedia | null;
  desktopRow?: number;
  mobileRow?: number;
  sortOrder?: number;
}

export interface SiteFooterContent {
  text?: string;
}

export interface SiteNavigationContent {
  links?: Array<{ label?: string; sectionIndex?: number }>;
  productLinks?: Array<{ label?: string; sectionIndex?: number }>;
  contactLabel?: string;
  contactSectionIndex?: number;
  logo?: StrapiMedia | null;
}

export interface SiteContent {
  hero?: HeroContent | null;
  aboutCompany?: AboutCompanyContent | null;
  siteNavigation?: SiteNavigationContent | null;
  siteFooter?: SiteFooterContent | null;
  contactSetting?: ContactSettingContent | null;
  activitySetting?: ActivitySettingContent | null;
  serviceSetting?: ServiceSettingContent | null;
  achievementSetting?: AchievementSettingContent | null;
  activityFields?: ActivityFieldContent[];
  services?: ServiceContent[];
  products?: ProductContent[];
  achievements?: AchievementContent[];
}

export const siteContentQueryKey = ['site-content'] as const;

export function getMediaUrl(media: StrapiMedia | null | undefined, fallback: string): string {
  if (typeof media?.url !== 'string' || media.url.length === 0) {
    return fallback;
  }

  if (media.url.startsWith('http')) {
    return media.url;
  }

  return `${STRAPI_API_URL}${media.url}`;
}

async function fetchSiteContent(): Promise<SiteContent> {
  const response = await fetch(`${STRAPI_API_URL}/api/site-content`);

  if (!response.ok) {
    throw new Error('Не удалось загрузить контент сайта из CMS.');
  }

  const result = (await response.json()) as { data?: SiteContent };

  return result.data ?? {};
}

export function useSiteContentQuery() {
  return useQuery({
    queryKey: siteContentQueryKey,
    queryFn: fetchSiteContent,
    staleTime: 60_000,
    retry: 1,
  });
}

export function findProduct(products: ProductContent[] | undefined, slug: string): ProductContent | undefined {
  return products?.find((product) => product.slug === slug);
}
