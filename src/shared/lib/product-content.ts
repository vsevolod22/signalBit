import type { ProductContent, ProductFeatureContent } from '@/shared/api/site-content';
import { getMediaUrl } from '@/shared/api/site-content';

export interface ProductParameterFallback {
  img: string;
  text: string;
  isPrice?: boolean;
}

export function getFeatureText(
  features: ProductFeatureContent[] | undefined,
  index: number,
  fallback: string
): string {
  return features?.[index]?.text ?? fallback;
}

export function getDescriptionBlocks(product: ProductContent | undefined, fallback: readonly string[]): string[] {
  return product?.descriptionBlocks?.length ? product.descriptionBlocks : [...fallback];
}

export function buildProductParameterColumns(
  product: ProductContent | undefined,
  fallbackItems: readonly ProductParameterFallback[],
  fallbackPriceItem: ProductParameterFallback
): [ProductParameterFallback[], ProductParameterFallback[]] {
  const features = product?.features?.slice().sort((first, second) => (first.sortOrder ?? 0) - (second.sortOrder ?? 0));
  const items = fallbackItems.map((item, index) => ({
    ...item,
    img: getMediaUrl(features?.[index]?.icon, item.img),
    text: getFeatureText(features, index, item.text),
  }));
  const priceItem = {
    ...fallbackPriceItem,
    text: product?.price ?? fallbackPriceItem.text,
  };

  return [
    [items[0], items[2], items[4], priceItem],
    [items[1], items[3], items[5]],
  ];
}
