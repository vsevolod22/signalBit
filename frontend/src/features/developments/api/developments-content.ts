import { z } from 'zod';
import { getOptionalMediaUrl } from '@/shared/api/strapi-client';
import { optionalSortOrderSchema, strapiMediaSchema } from '@/shared/api/strapi-schemas';
import { sortByOrder } from '@/shared/lib/content-mapping';
import type { SiteContent } from '@/shared/model/site-content';

export const serviceSettingCmsSchema = z.object({ sectionTitle: z.string().optional() }).nullable().optional();
export const servicesCmsSchema = z
  .array(
    z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      technologies: z.string().optional(),
      cost: z.string().optional(),
      image: strapiMediaSchema.nullable().optional(),
      sortOrder: optionalSortOrderSchema,
    }),
  )
  .optional();

export type ServicesCmsDto = z.infer<typeof servicesCmsSchema>;

export function mapDevelopmentsContent(
  items: ServicesCmsDto,
  fallback: SiteContent['developments'],
  apiUrl?: string,
): SiteContent['developments'] {
  const sorted = sortByOrder(items);
  if (sorted === undefined || sorted.length === 0) {
    return fallback;
  }

  return sorted.slice(0, 4).map((item, index) => ({
    title: item.title ?? fallback[index]?.title ?? '',
    description: item.description ?? fallback[index]?.description ?? '',
    technologies: item.technologies ?? fallback[index]?.technologies ?? '',
    cost: item.cost ?? fallback[index]?.cost ?? '',
    image: getOptionalMediaUrl(item.image, fallback[index]?.image, apiUrl),
  }));
}
