import { motion } from 'framer-motion';
import type { PointerEvent, ReactElement } from 'react';
import { useMemo, useRef } from 'react';

import { useSiteContent } from '@/app/providers/SiteContentProvider';
import { createCarouselLayout } from '@/features/products/model/carousel-layout';
import { getAdjacentCarouselIndex, getSwipeDirection } from '@/features/products/model/carousel-navigation';
import { useProductCarouselStore } from '@/features/products/model/product-carousel-store';
import { ProductCardView } from '@/features/products/ui/ProductCardView';
import { fadeUpVariants } from '@/shared/lib/landing-motion';
import { AnimatedSection } from '@/shared/ui/animated-section/AnimatedSection';
import { AnimatedSectionHeading } from '@/shared/ui/animated-section/AnimatedSectionHeading';
import { RouteConnector, SectionRoute } from '@/shared/ui/section-route';
import './products-carousel.scss';

interface SwipeStart {
  pointerId: number;
  x: number;
  y: number;
}

export function ProductsCarousel(): ReactElement {
  const { content } = useSiteContent();
  const swipeStartRef = useRef<SwipeStart | null>(null);
  const activeProductIndex = useProductCarouselStore((state) => state.activeProductIndex);
  const setActiveProductIndex = useProductCarouselStore((state) => state.selectProduct);
  const normalizedActiveIndex = content.products.length === 0 ? 0 : activeProductIndex % content.products.length;
  const carouselProducts = useMemo(
    () => createCarouselLayout(content.products, normalizedActiveIndex),
    [content.products, normalizedActiveIndex],
  );
  const isCatalogActive = content.products[normalizedActiveIndex]?.slideType === 'catalog';

  const selectProduct = (index: number): void => {
    if (index !== normalizedActiveIndex) {
      setActiveProductIndex(index);
    }
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>): void => {
    if (!event.isPrimary || (event.pointerType !== 'touch' && event.pointerType !== 'pen')) {
      return;
    }

    swipeStartRef.current = {
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const finishSwipe = (event: PointerEvent<HTMLDivElement>): void => {
    const swipeStart = swipeStartRef.current;
    swipeStartRef.current = null;

    if (swipeStart === null || swipeStart.pointerId !== event.pointerId) {
      return;
    }

    const direction = getSwipeDirection({
      deltaX: event.clientX - swipeStart.x,
      deltaY: event.clientY - swipeStart.y,
      viewportWidth: event.currentTarget.clientWidth,
    });

    if (direction !== null) {
      selectProduct(getAdjacentCarouselIndex(normalizedActiveIndex, content.products.length, direction));
    }
  };

  const cancelSwipe = (): void => {
    swipeStartRef.current = null;
  };

  return (
    <AnimatedSection className="section-shell products" id="products" ariaLabelledBy="products-title">
      <SectionRoute className="products__route" variant="left-to-right" />
      <RouteConnector side="right" />
      <AnimatedSectionHeading id="products-title">{content.productsTitle}</AnimatedSectionHeading>
      <motion.div
        className={`products__carousel${isCatalogActive ? ' products__carousel--catalog-active' : ''}`}
        aria-label="Карусель продуктов"
        variants={fadeUpVariants}
      >
        <div
          className="products__viewport"
          onPointerDown={handlePointerDown}
          onPointerUp={finishSwipe}
          onPointerCancel={cancelSwipe}
        >
          <div className="products__stage">
            {carouselProducts.map(({ index, isVisible, offset, placement, product }) => {
              const selectSideProduct = placement === 'side' ? () => selectProduct(index) : undefined;

              return (
                <ProductCardView
                  isVisible={isVisible}
                  offset={offset}
                  product={product}
                  placement={placement}
                  key={product.slug}
                  onSelect={selectSideProduct}
                />
              );
            })}
          </div>
        </div>
        <nav className="products__controls" aria-label="Выбор продукта">
          {content.products.map((product, index) => {
            const productName = product.variant === undefined ? product.title : `${product.title} ${product.variant}`;

            return (
              <button
                type="button"
                onClick={() => selectProduct(index)}
                aria-label={`Показать продукт ${productName}`}
                aria-current={index === normalizedActiveIndex ? 'true' : undefined}
                key={product.slug}
              >
                <span aria-hidden="true" />
              </button>
            );
          })}
        </nav>
      </motion.div>
      <p className="products__note">{content.productsNote}</p>
    </AnimatedSection>
  );
}
