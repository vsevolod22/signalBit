import { z } from 'zod';
import { getOptionalMediaUrl } from '@/shared/api/strapi-client';
import { optionalSortOrderSchema, strapiMediaSchema } from '@/shared/api/strapi-schemas';
import { sortByOrder } from '@/shared/lib/content-mapping';
import type { SiteContent } from '@/shared/model/site-content';

export const activitySettingCmsSchema = z.object({ sectionTitle: z.string().optional() }).nullable().optional();
export const activityFieldsCmsSchema = z
  .array(
    z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      image: strapiMediaSchema.nullable().optional(),
      sortOrder: optionalSortOrderSchema,
    }),
  )
  .optional();

export type ActivityFieldsCmsDto = z.infer<typeof activityFieldsCmsSchema>;

export function mapActivityFieldsContent(
  fields: ActivityFieldsCmsDto,
  fallback: SiteContent['activityCards'],
  apiUrl?: string,
): SiteContent['activityCards'] {
  const sorted = sortByOrder(fields);
  if (sorted === undefined || sorted.length === 0) {
    return fallback;
  }

  return sorted.slice(0, 4).map((field, index) => ({
    number: String(index + 1).padStart(2, '0'),
    title: field.title ?? fallback[index]?.title ?? '',
    description: field.description ?? fallback[index]?.description ?? '',
    image: getOptionalMediaUrl(field.image, fallback[index]?.image, apiUrl),
  }));
}
