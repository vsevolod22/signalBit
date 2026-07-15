import { z } from 'zod';
import { getMediaUrl } from '@/shared/api/strapi-client';
import { optionalStringListSchema, strapiMediaSchema } from '@/shared/api/strapi-schemas';
import { nonEmptyStrings } from '@/shared/lib/content-mapping';
import type { SiteContent } from '@/shared/model/site-content';

export const aboutCompanyCmsSchema = z
  .object({
    missionTitle: z.string().optional(),
    paragraphs: optionalStringListSchema,
    photo: strapiMediaSchema.nullable().optional(),
    officialTitle: z.string().optional(),
    officialItems: optionalStringListSchema,
    stats: z.array(z.object({ value: z.string().optional(), text: z.string().optional() })).optional(),
  })
  .nullable()
  .optional();

export type AboutCompanyCmsDto = z.infer<typeof aboutCompanyCmsSchema>;

function mapCompanyStats(
  cms: AboutCompanyCmsDto,
  fallback: SiteContent['about']['stats'],
): SiteContent['about']['stats'] {
  const cmsStats = cms?.stats;
  const hasCmsStats = cmsStats !== undefined && cmsStats.length > 0;
  if (!hasCmsStats) {
    return fallback;
  }

  return cmsStats.map((stat, index) => ({
    value: stat.value ?? fallback[index]?.value ?? '',
    label: stat.text ?? fallback[index]?.label ?? '',
  }));
}

export function mapAboutCompanyContent(
  cms: AboutCompanyCmsDto,
  fallback: SiteContent['about'],
  apiUrl?: string,
): SiteContent['about'] {
  return {
    ...fallback,
    title: cms?.missionTitle ?? fallback.title,
    paragraphs: nonEmptyStrings(cms?.paragraphs) ?? fallback.paragraphs,
    photo: getMediaUrl(cms?.photo, fallback.photo, apiUrl),
    officialTitle: cms?.officialTitle ?? fallback.officialTitle,
    officialItems: nonEmptyStrings(cms?.officialItems) ?? fallback.officialItems,
    stats: mapCompanyStats(cms, fallback.stats),
  };
}
