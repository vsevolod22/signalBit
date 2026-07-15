import { z } from 'zod';
import { getMediaUrl } from '@/shared/api/strapi-client';
import { strapiMediaSchema } from '@/shared/api/strapi-schemas';
import type { SiteContent } from '@/shared/model/site-content';

const partnerLogoCmsSchema = z.object({
  name: z.string().optional(),
  image: strapiMediaSchema.nullable().optional(),
});

export const contactsCmsSchema = z
  .object({
    questionTitle: z.string().optional(),
    emailLabel: z.string().optional(),
    emailAddress: z.string().optional(),
    responseText: z.string().optional(),
    partnersTitle: z.string().optional(),
    emailIcon: strapiMediaSchema.nullable().optional(),
    rightImage: strapiMediaSchema.nullable().optional(),
    partnerLogos: z.array(partnerLogoCmsSchema).optional(),
  })
  .nullable()
  .optional();

export type ContactsCmsDto = z.infer<typeof contactsCmsSchema>;

function mapPartnerLogos(
  cms: ContactsCmsDto,
  fallback: SiteContent['contacts']['partners'],
  apiUrl?: string,
): SiteContent['contacts']['partners'] {
  const cmsPartners = cms?.partnerLogos;
  const hasCmsPartners = cmsPartners !== undefined && cmsPartners.length > 0;
  if (!hasCmsPartners) {
    return fallback;
  }

  return cmsPartners.map((partner, index) => ({
    name: partner.name ?? fallback[index]?.name ?? '',
    image: getMediaUrl(partner.image, fallback[index]?.image ?? '', apiUrl),
  }));
}

export function mapContactsContent(
  cms: ContactsCmsDto,
  fallback: SiteContent['contacts'],
  apiUrl?: string,
): SiteContent['contacts'] {
  return {
    ...fallback,
    title: cms?.questionTitle ?? fallback.title,
    emailLabel: cms?.emailLabel ?? fallback.emailLabel,
    emailAddress: cms?.emailAddress ?? fallback.emailAddress,
    responseText: cms?.responseText ?? fallback.responseText,
    partnersTitle: cms?.partnersTitle ?? fallback.partnersTitle,
    emailIcon: getMediaUrl(cms?.emailIcon, fallback.emailIcon, apiUrl),
    heroImage: getMediaUrl(cms?.rightImage, fallback.heroImage, apiUrl),
    partners: mapPartnerLogos(cms, fallback.partners, apiUrl),
  };
}
