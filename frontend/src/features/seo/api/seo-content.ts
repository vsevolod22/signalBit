import { z } from 'zod';

import { getMediaUrl } from '@/shared/api/strapi-client';
import { strapiMediaSchema } from '@/shared/api/strapi-schemas';
import type { SeoContent } from '@/shared/model/site-content';

export const seoSettingCmsSchema = z
  .object({
    metaTitle: z.string().nullable().optional(),
    metaDescription: z.string().nullable().optional(),
    keywords: z.string().nullable().optional(),
    canonicalUrl: z.string().nullable().optional(),
    robots: z.string().nullable().optional(),
    socialTitle: z.string().nullable().optional(),
    socialDescription: z.string().nullable().optional(),
    socialImage: strapiMediaSchema.nullable().optional(),
    organizationName: z.string().nullable().optional(),
    legalName: z.string().nullable().optional(),
    organizationDescription: z.string().nullable().optional(),
    organizationAddress: z.string().nullable().optional(),
  })
  .nullable()
  .optional();

export type SeoSettingCmsDto = z.infer<typeof seoSettingCmsSchema>;

function optionalNonEmpty(value: string | null | undefined): string | undefined {
  const normalized = value?.trim();
  return normalized ? normalized : undefined;
}

export function mapSeoContent(cms: SeoSettingCmsDto, fallback: SeoContent, apiUrl?: string): SeoContent {
  return {
    ...fallback,
    title: optionalNonEmpty(cms?.metaTitle) ?? fallback.title,
    description: optionalNonEmpty(cms?.metaDescription) ?? fallback.description,
    keywords: optionalNonEmpty(cms?.keywords) ?? fallback.keywords,
    canonicalUrl: optionalNonEmpty(cms?.canonicalUrl) ?? fallback.canonicalUrl,
    robots: optionalNonEmpty(cms?.robots) ?? fallback.robots,
    socialTitle: optionalNonEmpty(cms?.socialTitle) ?? fallback.socialTitle,
    socialDescription: optionalNonEmpty(cms?.socialDescription) ?? fallback.socialDescription,
    socialImage: getMediaUrl(cms?.socialImage, fallback.socialImage, apiUrl),
    organizationName: optionalNonEmpty(cms?.organizationName) ?? fallback.organizationName,
    legalName: optionalNonEmpty(cms?.legalName) ?? fallback.legalName,
    organizationDescription: optionalNonEmpty(cms?.organizationDescription) ?? fallback.organizationDescription,
    organizationAddress: optionalNonEmpty(cms?.organizationAddress) ?? fallback.organizationAddress,
  };
}
