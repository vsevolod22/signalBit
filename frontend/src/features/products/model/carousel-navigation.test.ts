import { describe, expect, it } from 'vitest';

import { getAdjacentCarouselIndex, getSwipeDirection } from './carousel-navigation';

describe('carousel navigation', () => {
  it('wraps around in both directions', () => {
    expect(getAdjacentCarouselIndex(4, 5, 'next')).toBe(0);
    expect(getAdjacentCarouselIndex(0, 5, 'previous')).toBe(4);
  });

  it('recognizes a deliberate horizontal swipe', () => {
    expect(getSwipeDirection({ deltaX: -70, deltaY: 8, viewportWidth: 390 })).toBe('next');
    expect(getSwipeDirection({ deltaX: 70, deltaY: 8, viewportWidth: 390 })).toBe('previous');
  });

  it('ignores short and predominantly vertical gestures', () => {
    expect(getSwipeDirection({ deltaX: 20, deltaY: 2, viewportWidth: 390 })).toBeNull();
    expect(getSwipeDirection({ deltaX: 70, deltaY: 100, viewportWidth: 390 })).toBeNull();
  });
});
