import { useMemo } from 'react';
import type { ReactElement } from 'react';
import { motion } from 'framer-motion';

import { useSiteContent } from '@/app/providers/SiteContentProvider';
import { createCarouselLayout } from '@/features/products/model/carousel-layout';
import { useProductCarouselStore } from '@/features/products/model/product-carousel-store';
import { ProductCardView } from '@/features/products/ui/ProductCardView';
import { fadeUpVariants } from '@/shared/lib/landing-motion';
import { AnimatedSection } from '@/shared/ui/animated-section/AnimatedSection';
import { AnimatedSectionHeading } from '@/shared/ui/animated-section/AnimatedSectionHeading';
import { RouteConnector, SectionRoute } from '@/shared/ui/section-route';
import './products-carousel.scss';

export function ProductsCarousel(): ReactElement {
  const { content } = useSiteContent();
  const activeProductIndex = useProductCarouselStore((state) => state.activeProductIndex);
  const setActiveProductIndex = useProductCarouselStore((state) => state.selectProduct);
  const carouselProducts = useMemo(
    () => createCarouselLayout(content.products, activeProductIndex),
    [activeProductIndex, content.products],
  );

  const selectProduct = (index: number): void => {
    if (index !== activeProductIndex) {
      setActiveProductIndex(index);
    }
  };

  return (
    <AnimatedSection className="section-shell products-shell" id="products" ariaLabelledBy="products-title">
      <SectionRoute className="products-route" />
      <RouteConnector side="left" />
      <AnimatedSectionHeading id="products-title">{content.productsTitle}</AnimatedSectionHeading>
      <motion.div className="products-carousel" aria-label="Карусель продуктов" variants={fadeUpVariants}>
        <div className="carousel-viewport">
          <div className="carousel-stage">
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
      </motion.div>
    </AnimatedSection>
  );
}
