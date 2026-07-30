export type CarouselDirection = 'next' | 'previous';

interface SwipeGesture {
  deltaX: number;
  deltaY: number;
  viewportWidth: number;
}

export function getAdjacentCarouselIndex(
  activeIndex: number,
  productCount: number,
  direction: CarouselDirection,
): number {
  if (productCount <= 0) {
    return 0;
  }

  const indexChange = direction === 'next' ? 1 : -1;

  return (activeIndex + indexChange + productCount) % productCount;
}

export function getSwipeDirection({ deltaX, deltaY, viewportWidth }: SwipeGesture): CarouselDirection | null {
  const swipeThreshold = Math.max(44, Math.min(96, viewportWidth * 0.12));
  const isHorizontalGesture = Math.abs(deltaX) > Math.abs(deltaY) * 1.2;

  if (!isHorizontalGesture || Math.abs(deltaX) < swipeThreshold) {
    return null;
  }

  return deltaX < 0 ? 'next' : 'previous';
}
