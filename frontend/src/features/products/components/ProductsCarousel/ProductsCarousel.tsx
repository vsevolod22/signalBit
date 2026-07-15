import { motion } from 'framer-motion';
import type { ReactElement } from 'react';
import { useMemo } from 'react';

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
    <AnimatedSection className="section-shell products" id="products" ariaLabelledBy="products-title">
      <SectionRoute className="products__route" variant="left-to-right" />
      <RouteConnector side="right" />
      <AnimatedSectionHeading id="products-title">{content.productsTitle}</AnimatedSectionHeading>
      <motion.div className="products__carousel" aria-label="Карусель продуктов" variants={fadeUpVariants}>
        <div className="products__viewport">
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
                aria-current={index === activeProductIndex ? 'true' : undefined}
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
