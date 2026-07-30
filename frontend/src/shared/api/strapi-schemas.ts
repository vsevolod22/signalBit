import { z } from 'zod';

import type { ImagePosition } from '@/shared/model/site-content';

export const strapiMediaSchema = z.object({
  url: z.string().min(1).optional(),
  alternativeText: z.string().nullable().optional(),
});

export const optionalStringListSchema = z.array(z.string()).optional();

export const optionalSortOrderSchema = z.number().finite().optional();

export const strapiImagePositionSchema = z
  .object({
    offsetX: z.number().finite().optional(),
    offsetY: z.number().finite().optional(),
    scale: z.number().finite().positive().optional(),
  })
  .nullable()
  .optional();

export type StrapiImagePositionDto = z.infer<typeof strapiImagePositionSchema>;

export function mapStrapiImagePosition(position: StrapiImagePositionDto): ImagePosition | undefined {
  if (position === null || position === undefined) {
    return undefined;
  }

  return {
    offsetX: position.offsetX ?? 0,
    offsetY: position.offsetY ?? 0,
    scale: position.scale ?? 100,
  };
}
