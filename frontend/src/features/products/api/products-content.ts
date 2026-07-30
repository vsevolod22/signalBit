import { z } from 'zod';
import { getOptionalMediaUrl } from '@/shared/api/strapi-client';
import {
  mapStrapiImagePosition,
  optionalSortOrderSchema,
  optionalStringListSchema,
  strapiImagePositionSchema,
  strapiMediaSchema,
} from '@/shared/api/strapi-schemas';
import { nonEmptyStrings, sortByOrder } from '@/shared/lib/content-mapping';
import type { ProductCard } from '@/shared/model/site-content';

const productFeatureCmsSchema = z.object({
  text: z.string().optional(),
  sortOrder: optionalSortOrderSchema,
});

const productKitItemCmsSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  sortOrder: optionalSortOrderSchema,
});

const productSpecItemCmsSchema = z.object({
  text: z.string().optional(),
  sortOrder: optionalSortOrderSchema,
});

const productCharacteristicCmsSchema = z.object({
  name: z.string().optional(),
  value: z.string().optional(),
  unit: z.string().optional(),
  section: z.boolean().optional(),
  sortOrder: optionalSortOrderSchema,
});

const productCatalogItemCmsSchema = z.object({
  code: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  kitTitle: z.string().optional(),
  kitItems: z.array(productKitItemCmsSchema).optional(),
  priceLabel: z.string().optional(),
  price: z.string().optional(),
  characteristicsButtonLabel: z.string().optional(),
  characteristicsTitle: z.string().optional(),
  characteristicNameLabel: z.string().optional(),
  characteristicValueLabel: z.string().optional(),
  characteristicUnitLabel: z.string().optional(),
  characteristics: z.array(productCharacteristicCmsSchema).optional(),
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
      slideType: z.enum(['standard', 'catalog']).optional(),
      slideSubtitle: z.string().optional(),
      catalogItems: z.array(productCatalogItemCmsSchema).optional(),
      bodyBlocks: optionalStringListSchema,
      kitTitle: z.string().optional(),
      kitItems: z.array(productKitItemCmsSchema).optional(),
      specsTitle: z.string().optional(),
      specItems: z.array(productSpecItemCmsSchema).optional(),
      descriptionBlocks: optionalStringListSchema,
      features: z.array(productFeatureCmsSchema).optional(),
      price: z.string().optional(),
      priceNote: z.string().optional(),
      ctaLabel: z.string().optional(),
      featured: z.boolean().optional(),
      gallery: z.array(strapiMediaSchema).nullable().optional(),
      galleryPositions: z.array(strapiImagePositionSchema).optional(),
      backgroundColor: z.string().optional(),
      backgroundImage: strapiMediaSchema.nullable().optional(),
      backgroundImagePosition: strapiImagePositionSchema,
      sortOrder: optionalSortOrderSchema,
    }),
  )
  .optional();

export type ProductsCmsDto = z.infer<typeof productsCmsSchema>;
type ProductCmsDto = NonNullable<ProductsCmsDto>[number];
type ProductCmsDtoWithSlug = ProductCmsDto & { slug: string };

function hasProductSlug(product: ProductCmsDto): product is ProductCmsDtoWithSlug {
  return product.slug?.trim().length !== 0 && product.slug !== undefined;
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

  const leadParts = [product.leadHighlight, product.leadText].filter((part): part is string => Boolean(part?.trim()));
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

function getProductKit(product: ProductCmsDto, fallback: ProductCard): ProductCard['kit'] {
  const kitItems = sortByOrder(product.kitItems)?.flatMap((item) => {
    const title = item.title?.trim();
    if (!title) {
      return [];
    }

    return [{ title, description: item.description?.trim() || undefined }];
  });

  return kitItems !== undefined && kitItems.length > 0 ? kitItems : fallback.kit;
}

function getProductSpecs(product: ProductCmsDto, fallback: ProductCard): ProductCard['specs'] {
  const specs = sortByOrder(product.specItems)?.flatMap((item) => {
    const text = item.text?.trim();
    return text ? [text] : [];
  });

  return specs !== undefined && specs.length > 0 ? specs : fallback.specs;
}

function getProductCatalog(product: ProductCmsDto, fallback: ProductCard): ProductCard['catalogItems'] {
  const cmsItems = sortByOrder(product.catalogItems);
  if (cmsItems === undefined || cmsItems.length === 0) {
    return fallback.catalogItems;
  }

  const fallbackByCode = new Map(fallback.catalogItems?.map((item) => [item.code, item]));

  return cmsItems.flatMap((item, itemIndex) => {
    const code = item.code?.trim() || `catalog-item-${itemIndex + 1}`;
    const fallbackItem = fallbackByCode.get(code);
    const name = item.name?.trim() || fallbackItem?.name;
    if (!name) {
      return [];
    }

    const kit = sortByOrder(item.kitItems)?.flatMap((kitItem) => {
      const title = kitItem.title?.trim();
      return title ? [{ title, description: kitItem.description?.trim() || undefined }] : [];
    });
    const characteristics = sortByOrder(item.characteristics)?.flatMap((characteristic) => {
      const characteristicName = characteristic.name?.trim();
      if (!characteristicName) {
        return [];
      }

      return [
        {
          name: characteristicName,
          value: characteristic.value?.trim() || undefined,
          unit: characteristic.unit?.trim() || undefined,
          section: characteristic.section,
        },
      ];
    });

    return [
      {
        code,
        name,
        description: item.description?.trim() || fallbackItem?.description,
        kitTitle: item.kitTitle?.trim() || fallbackItem?.kitTitle,
        kit: kit !== undefined && kit.length > 0 ? kit : (fallbackItem?.kit ?? []),
        priceLabel: item.priceLabel?.trim() || fallbackItem?.priceLabel,
        price: item.price?.trim() || fallbackItem?.price,
        characteristicsButtonLabel: item.characteristicsButtonLabel?.trim() || fallbackItem?.characteristicsButtonLabel,
        characteristicsTitle: item.characteristicsTitle?.trim() || fallbackItem?.characteristicsTitle,
        characteristicNameLabel: item.characteristicNameLabel?.trim() || fallbackItem?.characteristicNameLabel,
        characteristicValueLabel: item.characteristicValueLabel?.trim() || fallbackItem?.characteristicValueLabel,
        characteristicUnitLabel: item.characteristicUnitLabel?.trim() || fallbackItem?.characteristicUnitLabel,
        characteristics:
          characteristics !== undefined && characteristics.length > 0
            ? characteristics
            : (fallbackItem?.characteristics ?? []),
      },
    ];
  });
}

function getProductGallery(
  product: ProductCmsDto,
  fallback: ProductCard,
  apiUrl?: string,
): Pick<ProductCard, 'imageLabels' | 'imagePositions' | 'images'> {
  const gallery = product.gallery ?? [];
  const imageCount = Math.max(gallery.length, fallback.images.length);
  const images = Array.from({ length: imageCount }, (_, index) =>
    getOptionalMediaUrl(gallery[index], fallback.images[index], apiUrl),
  ).filter((image): image is string => image !== undefined);
  const imagePositions = Array.from(
    { length: images.length },
    (_, index) => mapStrapiImagePosition(product.galleryPositions?.[index]) ?? fallback.imagePositions?.[index],
  );
  const imageLabels = Array.from(
    { length: images.length },
    (_, index) => fallback.imageLabels?.[index] ?? gallery[index]?.alternativeText ?? '',
  );

  return {
    images,
    imagePositions: imagePositions.some((position) => position !== undefined) ? imagePositions : undefined,
    imageLabels: imageLabels.some((label) => label.length > 0) ? imageLabels : undefined,
  };
}

function mapProduct(product: ProductCmsDto, fallback: ProductCard, apiUrl?: string): ProductCard {
  const textBlocks = getProductTextBlocks(product, fallback);
  const gallery = getProductGallery(product, fallback, apiUrl);

  return {
    ...fallback,
    ...textBlocks,
    ...gallery,
    title: product.headline ?? product.name ?? fallback.title,
    variant: product.slideSubtitle ?? fallback.variant,
    slideType: product.slideType ?? fallback.slideType,
    catalogItems: getProductCatalog(product, fallback),
    lead: getProductLead(product, fallback.lead),
    kitTitle: product.kitTitle ?? fallback.kitTitle,
    kit: getProductKit(product, fallback),
    specsTitle: product.specsTitle ?? fallback.specsTitle,
    specs: getProductSpecs(product, fallback),
    price: product.price ?? fallback.price,
    priceNote: product.priceNote ?? fallback.priceNote,
    cta: product.ctaLabel ?? fallback.cta,
    featured: product.featured ?? fallback.featured,
    backgroundColor: product.backgroundColor ?? fallback.backgroundColor,
    backgroundImage: getOptionalMediaUrl(product.backgroundImage, fallback.backgroundImage, apiUrl),
    backgroundImagePosition:
      mapStrapiImagePosition(product.backgroundImagePosition) ?? fallback.backgroundImagePosition,
  };
}

function createCmsProductFallback(product: ProductCmsDtoWithSlug): ProductCard {
  return {
    slug: product.slug,
    title: product.headline ?? product.name ?? product.slug,
    lead: '',
    description: [],
    price: '',
    images: [],
  };
}

interface OrderedProduct {
  product: ProductCard;
  sortOrder: number;
  stableIndex: number;
}

export function mapProductsContent(
  products: ProductsCmsDto,
  fallbackProducts: ProductCard[],
  apiUrl?: string,
): ProductCard[] {
  const fallbackBySlug = new Map(fallbackProducts.map((product) => [product.slug, product]));
  const fallbackIndexBySlug = new Map(fallbackProducts.map((product, index) => [product.slug, index]));
  const cmsBySlug = new Map((products ?? []).filter(hasProductSlug).map((product) => [product.slug, product]));
  const cmsProducts: OrderedProduct[] = Array.from(cmsBySlug.values()).map((cmsProduct, cmsIndex) => {
    const fallback = fallbackBySlug.get(cmsProduct.slug) ?? createCmsProductFallback(cmsProduct);
    const fallbackIndex = fallbackIndexBySlug.get(cmsProduct.slug);
    const stableIndex =
      cmsProduct.sortOrder === undefined && fallbackIndex !== undefined
        ? fallbackIndex
        : fallbackProducts.length + cmsIndex;

    return {
      product: mapProduct(cmsProduct, fallback, apiUrl),
      sortOrder: cmsProduct.sortOrder ?? Number.MAX_SAFE_INTEGER,
      stableIndex,
    };
  });
  const missingFallbackProducts: OrderedProduct[] = fallbackProducts.flatMap((fallbackProduct, fallbackIndex) => {
    if (cmsBySlug.has(fallbackProduct.slug)) {
      return [];
    }

    return [{ product: fallbackProduct, sortOrder: Number.MAX_SAFE_INTEGER, stableIndex: fallbackIndex }];
  });

  return [...cmsProducts, ...missingFallbackProducts]
    .sort((first, second) => first.sortOrder - second.sortOrder || first.stableIndex - second.stableIndex)
    .map(({ product }) => product);
}
