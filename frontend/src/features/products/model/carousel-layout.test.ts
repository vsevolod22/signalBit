import { describe, expect, it } from 'vitest';

import type { ProductCard } from '@/shared/model/site-content';

import { createCarouselLayout } from './carousel-layout';

function createProducts(count: number): ProductCard[] {
  return Array.from({ length: count }, (_, index) => ({
    slug: `product-${index}`,
    title: `Продукт ${index}`,
    lead: '',
    description: [],
    price: '',
    images: [],
  }));
}

function getVisiblePositions(productCount: number, activeIndex: number): Array<{ index: number; offset: number }> {
  return createCarouselLayout(createProducts(productCount), activeIndex)
    .filter((item) => item.isVisible)
    .map(({ index, offset }) => ({ index, offset }));
}

describe('product carousel layout', () => {
  it('keeps previous, active and next products visible in a four-item loop', () => {
    expect(getVisiblePositions(4, 0)).toEqual([
      { index: 3, offset: -1 },
      { index: 0, offset: 0 },
      { index: 1, offset: 1 },
    ]);
  });

  it('wraps both directions with more than four products', () => {
    expect(getVisiblePositions(5, 4)).toEqual([
      { index: 3, offset: -1 },
      { index: 4, offset: 0 },
      { index: 0, offset: 1 },
    ]);
  });
});
