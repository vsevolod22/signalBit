import { queryOptions, useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { aboutCompanyCmsSchema, mapAboutCompanyContent } from '@/features/about-company/api/about-company-content';
import {
  achievementSettingCmsSchema,
  achievementsCmsSchema,
  mapAchievementsContent,
} from '@/features/achievements/api/achievements-content';
import {
  activityFieldsCmsSchema,
  activitySettingCmsSchema,
  mapActivityFieldsContent,
} from '@/features/activity-fields/api/activity-fields-content';
import { contactsCmsSchema, mapContactsContent } from '@/features/contacts/api/contacts-content';
import {
  mapDevelopmentsContent,
  serviceSettingCmsSchema,
  servicesCmsSchema,
} from '@/features/developments/api/developments-content';
import { heroCmsSchema, mapHeroContent } from '@/features/main-hero/api/main-hero-content';
import { mapProductsContent, productsCmsSchema } from '@/features/products/api/products-content';
import { mapSeoContent, seoSettingCmsSchema } from '@/features/seo';
import {
  mapSiteNavigationContent,
  siteNavigationCmsSchema,
} from '@/features/site-navigation/api/site-navigation-content';
import { fetchStrapiJson, STRAPI_API_URL } from '@/shared/api/strapi-client';
import { STRAPI_ENDPOINT } from '@/shared/api/strapi-endpoints';
import type { SiteContent } from '@/shared/model/site-content';

export const siteContentResponseSchema = z.object({
  data: z
    .object({
      hero: heroCmsSchema,
      seoSetting: seoSettingCmsSchema,
      aboutCompany: aboutCompanyCmsSchema,
      siteNavigation: siteNavigationCmsSchema,
      contactSetting: contactsCmsSchema,
      activitySetting: activitySettingCmsSchema,
      serviceSetting: serviceSettingCmsSchema,
      achievementSetting: achievementSettingCmsSchema,
      activityFields: activityFieldsCmsSchema,
      services: servicesCmsSchema,
      products: productsCmsSchema,
      achievements: achievementsCmsSchema,
    })
    .optional(),
});

export type StrapiSiteContentDto = z.infer<typeof siteContentResponseSchema>['data'];

export class StrapiValidationError extends Error {
  public constructor(public readonly issues: z.core.$ZodIssue[]) {
    super('Strapi returned an invalid site-content response.');
    this.name = 'StrapiValidationError';
  }
}

export const siteContentKeys = {
  all: ['site-content'] as const,
  detail: () => [...siteContentKeys.all, 'detail'] as const,
};

export function mapSiteContent(cms: StrapiSiteContentDto, fallback: SiteContent, apiUrl = STRAPI_API_URL): SiteContent {
  return {
    ...fallback,
    seo: mapSeoContent(cms?.seoSetting, fallback.seo, apiUrl),
    navigation: mapSiteNavigationContent(cms?.siteNavigation, fallback.navigation, apiUrl),
    hero: mapHeroContent(cms?.hero, fallback.hero, apiUrl),
    activityTitle: cms?.activitySetting?.sectionTitle ?? fallback.activityTitle,
    activityCards: mapActivityFieldsContent(cms?.activityFields, fallback.activityCards, apiUrl),
    developmentTitle: cms?.serviceSetting?.sectionTitle ?? fallback.developmentTitle,
    developments: mapDevelopmentsContent(cms?.services, fallback.developments, apiUrl),
    products: mapProductsContent(cms?.products, fallback.products, apiUrl),
    about: mapAboutCompanyContent(cms?.aboutCompany, fallback.about, apiUrl),
    achievementsTitle: cms?.achievementSetting?.sectionTitle ?? fallback.achievementsTitle,
    achievements: mapAchievementsContent(cms?.achievements, fallback.achievements, apiUrl),
    contacts: mapContactsContent(cms?.contactSetting, fallback.contacts, apiUrl),
  };
}

export async function fetchSiteContent(signal: AbortSignal, apiUrl = STRAPI_API_URL): Promise<StrapiSiteContentDto> {
  const payload = await fetchStrapiJson(STRAPI_ENDPOINT.SITE_CONTENT, signal, apiUrl);
  const parsed = siteContentResponseSchema.safeParse(payload);

  if (!parsed.success) {
    throw new StrapiValidationError(parsed.error.issues);
  }

  return parsed.data.data;
}

export function siteContentQueryOptions(fallback: SiteContent, apiUrl = STRAPI_API_URL) {
  return queryOptions({
    queryKey: siteContentKeys.detail(),
    enabled: apiUrl !== undefined,
    queryFn: ({ signal }) => fetchSiteContent(signal, apiUrl).then((cms) => mapSiteContent(cms, fallback, apiUrl)),
  });
}

export function useSiteContentQuery(fallback: SiteContent, apiUrl = STRAPI_API_URL) {
  return useQuery(siteContentQueryOptions(fallback, apiUrl));
}
