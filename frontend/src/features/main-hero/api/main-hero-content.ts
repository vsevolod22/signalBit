import { z } from 'zod';
import { getMediaUrl } from '@/shared/api/strapi-client';
import { strapiMediaSchema } from '@/shared/api/strapi-schemas';
import type { SiteContent } from '@/shared/model/site-content';

export const heroCmsSchema = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
    secondaryTitle: z.string().optional(),
    secondaryDescription: z.string().optional(),
    rightHand: strapiMediaSchema.nullable().optional(),
    leftHand: strapiMediaSchema.nullable().optional(),
  })
  .nullable()
  .optional();

export type HeroCmsDto = z.infer<typeof heroCmsSchema>;

export function mapHeroContent(cms: HeroCmsDto, fallback: SiteContent['hero'], apiUrl?: string): SiteContent['hero'] {
  return {
    ...fallback,
    title: cms?.title ?? fallback.title,
    subtitle: cms?.secondaryTitle ?? fallback.subtitle,
    headline: cms?.description ?? fallback.headline,
    description: cms?.secondaryDescription ?? fallback.description,
    image: getMediaUrl(cms?.rightHand, fallback.image, apiUrl),
    arrowImage: getMediaUrl(cms?.leftHand, fallback.arrowImage, apiUrl),
  };
}
