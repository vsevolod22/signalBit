import { z } from 'zod';

import { optionalSortOrderSchema, optionalStringListSchema, strapiMediaSchema } from '@/shared/api/strapi-schemas';
import { getMediaUrl } from '@/shared/api/strapi-client';
import { nonEmptyStrings, sortByOrder } from '@/shared/lib/content-mapping';
import type { ProductCard } from '@/shared/model/site-content';

const productFeatureCmsSchema = z.object({
  text: z.string().optional(),
  sortOrder: optionalSortOrderSchema,
});

export const productsCmsSchema = z
  .array(
    z.object({
      name: z.string().optional(),
      slug: z.string().optional(),
      headline: z.string().optional(),
      lead: z.string().optional(),
      leadHighlight: z.string().optional(),
      leadText: z.string().optional(),
      bodyBlocks: optionalStringListSchema,
      descriptionBlocks: optionalStringListSchema,
      features: z.array(productFeatureCmsSchema).optional(),
      price: z.string().optional(),
      priceNote: z.string().optional(),
      ctaLabel: z.string().optional(),
      featured: z.boolean().optional(),
      gallery: z.array(strapiMediaSchema).nullable().optional(),
      sortOrder: optionalSortOrderSchema,
    }),
  )
  .optional();

export type ProductsCmsDto = z.infer<typeof productsCmsSchema>;
type ProductCmsDto = NonNullable<ProductsCmsDto>[number];

const LANDING_PRODUCT_SLUGS = ['canary', 'flight-controller', 'sensor'] as const;

function isLandingProductSlug(slug: string | undefined): slug is (typeof LANDING_PRODUCT_SLUGS)[number] {
  return slug === 'canary' || slug === 'flight-controller' || slug === 'sensor';
}

function getFeatureDescriptions(product: ProductCmsDto): string[] | undefined {
  return sortByOrder(product.features)?.flatMap((feature) => {
    const featureText = feature.text?.trim();
    return featureText ? [featureText] : [];
  });
}

function getProductLead(product: ProductCmsDto, fallbackLead: string): string {
  if (product.lead !== undefined) {
    return product.lead;
  }

  const leadParts = [product.leadHighlight, product.leadText].filter(
    (part): part is string => Boolean(part?.trim()),
  );
  return leadParts.join(' ') || fallbackLead;
}

function getProductTextBlocks(
  product: ProductCmsDto,
  fallback: ProductCard,
): Pick<ProductCard, 'body' | 'description'> {
  const modernBody = nonEmptyStrings(product.bodyBlocks);
  const cmsDescription = nonEmptyStrings(product.descriptionBlocks);
  const featureDescriptions = getFeatureDescriptions(product);
  const hasModernContentModel = modernBody !== undefined;

  if (hasModernContentModel) {
    return {
      body: modernBody,
      description: cmsDescription ?? fallback.description,
    };
  }

  const hasLegacyFeatures = featureDescriptions !== undefined && featureDescriptions.length > 0;
  let body = fallback.body;
  if (hasLegacyFeatures) {
    body = cmsDescription ?? fallback.body;
  }

  return {
    body,
    description: featureDescriptions ?? fallback.description,
  };
}

function mapProduct(product: ProductCmsDto, fallback: ProductCard, apiUrl?: string): ProductCard {
  const textBlocks = getProductTextBlocks(product, fallback);

  return {
    ...fallback,
    ...textBlocks,
    title: product.headline ?? product.name ?? fallback.title,
    lead: getProductLead(product, fallback.lead),
    price: product.price ?? fallback.price,
    priceNote: product.priceNote ?? fallback.priceNote,
    cta: product.ctaLabel ?? fallback.cta,
    featured: product.featured ?? fallback.featured,
    images: fallback.images.map((fallbackImage, index) =>
      getMediaUrl(product.gallery?.[index], fallbackImage, apiUrl),
    ),
  };
}

interface OrderedProduct {
  product: ProductCard;
  sortOrder: number;
}

interface ProductMappingContext {
  apiUrl?: string;
  cmsBySlug: Map<string | undefined, ProductCmsDto>;
  fallbackBySlug: Map<string, ProductCard>;
  fallbackProductCount: number;
}

function mapOrderedProduct(
  slug: (typeof LANDING_PRODUCT_SLUGS)[number],
  fallbackIndex: number,
  context: ProductMappingContext,
): OrderedProduct | undefined {
  const fallback = context.fallbackBySlug.get(slug);
  if (fallback === undefined) {
    return undefined;
  }

  const cms = context.cmsBySlug.get(slug);
  const product = cms === undefined ? fallback : mapProduct(cms, fallback, context.apiUrl);
  const fallbackSortOrder = Number.MAX_SAFE_INTEGER - context.fallbackProductCount + fallbackIndex;

  return {
    product,
    sortOrder: cms?.sortOrder ?? fallbackSortOrder,
  };
}

function isOrderedProduct(value: OrderedProduct | undefined): value is OrderedProduct {
  return value !== undefined;
}

export function mapProductsContent(
  products: ProductsCmsDto,
  fallbackProducts: ProductCard[],
  apiUrl?: string,
): ProductCard[] {
  const fallbackBySlug = new Map(fallbackProducts.map((product) => [product.slug, product]));
  const cmsBySlug = new Map(
    (products ?? []).filter((product) => isLandingProductSlug(product.slug)).map((product) => [product.slug, product]),
  );
  const mappingContext: ProductMappingContext = {
    apiUrl,
    cmsBySlug,
    fallbackBySlug,
    fallbackProductCount: fallbackProducts.length,
  };

  return LANDING_PRODUCT_SLUGS.map((slug, fallbackIndex) =>
    mapOrderedProduct(slug, fallbackIndex, mappingContext),
  )
    .filter(isOrderedProduct)
    .sort((first, second) => first.sortOrder - second.sortOrder)
    .map(({ product }) => product);
}
