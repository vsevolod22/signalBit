import type { ProductCard } from '@/shared/model/site-content';

export type ProductPlacement = 'active' | 'side';

export interface CarouselProduct {
  index: number;
  isVisible: boolean;
  offset: number;
  placement: ProductPlacement;
  product: ProductCard;
}

function getProductPlacement(offset: number): ProductPlacement {
  return offset === 0 ? 'active' : 'side';
}

function getCircularOffset(index: number, activeIndex: number, productCount: number): number {
  const directOffset = index - activeIndex;
  const halfProductCount = productCount / 2;

  if (directOffset > halfProductCount) {
    return directOffset - productCount;
  }

  if (directOffset < -halfProductCount) {
    return directOffset + productCount;
  }

  return directOffset;
}

export function createCarouselLayout(products: ProductCard[], activeProductIndex: number): CarouselProduct[] {
  return products
    .map((product, index) => {
      const offset = getCircularOffset(index, activeProductIndex, products.length);

      return {
        index,
        isVisible: Math.abs(offset) <= 1,
        offset,
        placement: getProductPlacement(offset),
        product,
      };
    })
    .sort((firstProduct, secondProduct) => firstProduct.offset - secondProduct.offset);
}
