import { useMemo } from 'react';
import type { KeyboardEvent, ReactElement } from 'react';
import { animated, config, to, useReducedMotion, useSpring } from '@react-spring/web';
import { motion } from 'framer-motion';

import { useSiteContent } from '@/app/providers/SiteContentProvider';
import { useProductCarouselStore } from '@/features/products/model/product-carousel-store';
import type { ProductCard } from '@/shared/model/site-content';
import { fadeUpVariants, pageSectionVariants, revealViewport, SECTION_ROUTE_PATHS } from '@/shared/lib/landing-motion';
import { RouteConnector, SectionRoute } from '@/shared/ui/section-route';
import './products-carousel.scss';

interface ProductImagesProps {
  product: ProductCard;
}

function ProductImages({ product }: ProductImagesProps): ReactElement {
  return (
    <div className="product-images">
      {product.images.slice(0, 3).map((image, index) => (
        <img src={image} alt="" aria-hidden="true" decoding="async" loading="lazy" key={`${product.slug}-${index}`} />
      ))}
    </div>
  );
}

interface ProductCardViewProps {
  isVisible: boolean;
  offset: number;
  product: ProductCard;
  placement: 'active' | 'side';
  onSelect?: () => void;
}

interface ProductCardSpringValues {
  blur: number;
  offset: number;
  opacity: number;
  scale: number;
  y: number;
}

function ProductCardView({ isVisible, offset, product, placement, onSelect }: ProductCardViewProps): ReactElement {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const isActive = placement === 'active';
  const isInteractive = onSelect !== undefined && isVisible;
  const limitedOffset = Math.max(-1.9, Math.min(1.9, offset));
  const springStyle = useSpring<ProductCardSpringValues>({
    blur: isVisible ? 0 : 8,
    offset: limitedOffset,
    opacity: isVisible ? 1 : 0,
    scale: isVisible ? 1 : 0.9,
    y: isActive ? -34 : 0,
    immediate: prefersReducedMotion,
    config: prefersReducedMotion ? { duration: 0 } : { ...config.gentle, clamp: true },
  });

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>): void => {
    if (!isInteractive) {
      return;
    }

    if (event.key !== 'Enter' && event.key !== ' ') {
      return;
    }

    event.preventDefault();
    onSelect?.();
  };

  return (
    <animated.article
      className={`product-card product-card--${placement}${product.featured ? ' product-card--featured' : ''}`}
      aria-hidden={!isVisible}
      style={{
        filter: springStyle.blur.to((value: number) => `blur(${value}px)`),
        opacity: springStyle.opacity,
        transform: to(
          [springStyle.offset, springStyle.y, springStyle.scale],
          (slideOffset, y, scale) =>
            `translate3d(calc(-50% + (${slideOffset} * (var(--product-card-size) + var(--product-card-gap)))), ${y}px, 0) scale(${scale})`,
        ),
        zIndex: isActive ? 5 : isVisible ? 4 : 1,
      }}
      tabIndex={isInteractive ? 0 : undefined}
      role={isInteractive ? 'button' : undefined}
      onClick={onSelect}
      onKeyDown={handleKeyDown}
    >
      <h3>{product.title}</h3>
      <p className="product-lead">{product.lead}</p>
      <ProductImages product={product} />
      <ul>
        {product.description.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p className="product-price">{product.price}</p>
      {isActive && product.cta !== undefined && (
        <motion.a className="product-cta" href="#contacts" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
          {product.cta}
        </motion.a>
      )}
    </animated.article>
  );
}

export function ProductsCarousel(): ReactElement {
  const { content } = useSiteContent();
  const activeProductIndex = useProductCarouselStore((state) => state.activeProductIndex);
  const setActiveProductIndex = useProductCarouselStore((state) => state.selectProduct);
  const carouselProducts = useMemo(() => {
    return content.products
      .map((product, index) => {
        let offset = index - activeProductIndex;

        if (offset > content.products.length / 2) {
          offset -= content.products.length;
        }

        if (offset < -content.products.length / 2) {
          offset += content.products.length;
        }

        return {
          index,
          isVisible: Math.abs(offset) <= 1,
          offset,
          placement: offset === 0 ? ('active' as const) : ('side' as const),
          product,
        };
      })
      .sort((firstProduct, secondProduct) => firstProduct.offset - secondProduct.offset);
  }, [activeProductIndex, content.products]);

  const selectProduct = (index: number): void => {
    if (index === activeProductIndex) {
      return;
    }

    setActiveProductIndex(index);
  };

  const selectPreviousProduct = (): void => {
    setActiveProductIndex((activeProductIndex - 1 + content.products.length) % content.products.length);
  };

  const selectNextProduct = (): void => {
    setActiveProductIndex((activeProductIndex + 1) % content.products.length);
  };

  return (
    <motion.section
      className="section-shell products-shell"
      id="products"
      aria-labelledby="products-title"
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      variants={pageSectionVariants}
    >
      <SectionRoute className="products-route" path={SECTION_ROUTE_PATHS.products} />
      <RouteConnector side="left" />
      <motion.h2 id="products-title" variants={fadeUpVariants}>
        {content.productsTitle}
      </motion.h2>
      <motion.div className="products-carousel" aria-label="Карусель продуктов" variants={fadeUpVariants}>
        <motion.button
          className="carousel-button carousel-button--prev"
          type="button"
          onClick={selectPreviousProduct}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
        >
          <span aria-hidden="true">‹</span>
          <span className="sr-only">Предыдущий продукт</span>
        </motion.button>
        <div className="carousel-viewport">
          <div className="carousel-stage">
            {carouselProducts.map(({ index, isVisible, offset, placement, product }) => (
              <ProductCardView
                isVisible={isVisible}
                offset={offset}
                product={product}
                placement={placement}
                key={product.slug}
                onSelect={placement === 'side' ? () => selectProduct(index) : undefined}
              />
            ))}
          </div>
        </div>
        <motion.button
          className="carousel-button carousel-button--next"
          type="button"
          onClick={selectNextProduct}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
        >
          <span aria-hidden="true">›</span>
          <span className="sr-only">Следующий продукт</span>
        </motion.button>
        <div className="carousel-dots" aria-label="Выбор продукта">
          {content.products.map((product, index) => (
            <motion.button
              className={index === activeProductIndex ? 'is-active' : undefined}
              type="button"
              key={product.slug}
              onClick={() => selectProduct(index)}
              aria-label={`Показать ${product.title}`}
              aria-current={index === activeProductIndex ? 'true' : undefined}
              whileHover={{ scale: 1.22 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
}
