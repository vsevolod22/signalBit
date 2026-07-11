import { z } from 'zod';

import { optionalSortOrderSchema, strapiMediaSchema } from '@/shared/api/strapi-schemas';
import { getMediaUrl } from '@/shared/api/strapi-client';
import { sortByOrder } from '@/shared/lib/content-mapping';
import type { SiteContent } from '@/shared/model/site-content';

export const achievementSettingCmsSchema = z.object({ sectionTitle: z.string().optional() }).nullable().optional();
export const achievementsCmsSchema = z
  .array(
    z.object({
      title: z.string().optional(),
      image: strapiMediaSchema.nullable().optional(),
      sortOrder: optionalSortOrderSchema,
    }),
  )
  .optional();

export type AchievementsCmsDto = z.infer<typeof achievementsCmsSchema>;

export function mapAchievementsContent(
  cms: AchievementsCmsDto,
  fallback: SiteContent['achievements'],
  apiUrl?: string,
): SiteContent['achievements'] {
  const sorted = sortByOrder(cms);
  if (sorted === undefined || sorted.length === 0) {
    return fallback;
  }

  return sorted.map((achievement, index) => ({
    title: achievement.title ?? fallback[index]?.title ?? '',
    image: getMediaUrl(achievement.image, fallback[index]?.image ?? '', apiUrl),
  }));
}
