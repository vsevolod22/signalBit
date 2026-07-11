import { z } from 'zod';

export const strapiMediaSchema = z.object({
  url: z.string().min(1).optional(),
  alternativeText: z.string().nullable().optional(),
});

export const optionalStringListSchema = z.array(z.string()).optional();

export const optionalSortOrderSchema = z.number().finite().optional();
