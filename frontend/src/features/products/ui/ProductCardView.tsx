import { animated, config, useReducedMotion, useSpring } from '@react-spring/web';
import type { KeyboardEvent, ReactElement } from 'react';

import type { ProductPlacement } from '@/features/products/model/carousel-layout';
import { ProductDetails, ProductImages, ProductKit, ProductSpecs } from '@/features/products/ui/ProductCardContent';
import { ProductCatalogSlide } from '@/features/products/ui/ProductCatalogSlide';
import type { ProductCard } from '@/shared/model/site-content';
import { MotionLink } from '@/shared/ui/link/MotionLink';
import { PositionedImage } from '@/shared/ui/positioned-image/PositionedImage';

interface ProductCardViewProps {
  isVisible: boolean;
  offset: number;
  product: ProductCard;
  placement: ProductPlacement;
  onSelect?: () => void;
}

interface ProductCardSpringValues {
  blur: number;
  opacity: number;
}

const PRODUCT_CARD_VISUAL_STATE = {
  hidden: { blur: 8, opacity: 0, scale: 0.9 },
  visible: { blur: 0, opacity: 1, scale: 1 },
} as const;

function getProductCardZIndex(isActive: boolean, isVisible: boolean): number {
  if (isActive) {
    return 5;
  }

  return isVisible ? 4 : 1;
}

function getProductCardLeft(offset: number): string {
  if (offset < 0) {
    return 'calc(50% - var(--product-card-step))';
  }

  if (offset > 0) {
    return 'calc(50% + var(--product-card-step))';
  }

  return '50%';
}

export function ProductCardView({
  isVisible,
  offset,
  product,
  placement,
  onSelect,
}: ProductCardViewProps): ReactElement {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const isActive = placement === 'active';
  const isInteractive = onSelect !== undefined && isVisible;
  const limitedOffset = Math.max(-1.9, Math.min(1.9, offset));
  const visualState = isVisible ? PRODUCT_CARD_VISUAL_STATE.visible : PRODUCT_CARD_VISUAL_STATE.hidden;
  const springConfig = prefersReducedMotion ? { duration: 0 } : { ...config.gentle, clamp: true };
  const featuredClassName = product.featured ? ' products__card--featured' : '';
  const themeClassName = ` products__card--${product.theme ?? 'teal'}`;
  const productClassName = ` products__card--${product.slug}`;
  const cardZIndex = getProductCardZIndex(isActive, isVisible);
  const interactiveTabIndex = isInteractive ? 0 : undefined;
  const interactiveRole = isInteractive ? 'button' : undefined;
  const shouldShowCta = isActive && product.cta !== undefined;
  const springStyle = useSpring<ProductCardSpringValues>({
    from: {
      blur: visualState.blur,
      opacity: visualState.opacity,
    },
    blur: visualState.blur,
    opacity: visualState.opacity,
    immediate: prefersReducedMotion,
    config: springConfig,
  });

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>): void => {
    if (!isInteractive) {
      return;
    }

    const isSelectionKey = event.key === 'Enter' || event.key === ' ';
    if (!isSelectionKey) {
      return;
    }

    event.preventDefault();
    onSelect?.();
  };

  return (
    <animated.article
      className={`products__card products__card--${placement}${featuredClassName}${themeClassName}${productClassName}`}
      aria-hidden={!isVisible}
      style={{
        backgroundColor: product.backgroundColor,
        filter: springStyle.blur.to((value: number) => `blur(${value}px)`),
        left: getProductCardLeft(limitedOffset),
        opacity: springStyle.opacity,
        transform: `translate3d(-50%, 0, 0) scale(${visualState.scale})`,
        zIndex: cardZIndex,
      }}
      tabIndex={interactiveTabIndex}
      role={interactiveRole}
      onClick={onSelect}
      onKeyDown={handleKeyDown}
    >
      {product.backgroundImage !== undefined && (
        <PositionedImage
          className="products__background-image"
          src={product.backgroundImage}
          position={product.backgroundImagePosition}
          alt=""
          aria-hidden="true"
          decoding="async"
          loading="lazy"
        />
      )}
      {product.slideType === 'catalog' ? (
        <ProductCatalogSlide isInteractive={isActive} product={product} />
      ) : (
        <>
          <h3>
            {product.title}
            {product.variant !== undefined && <span>{product.variant}</span>}
          </h3>
          <p className="products__lead">{product.lead}</p>
          <div className="products__overview">
            <ProductImages product={product} />
            <div className="products__technical">
              <ProductKit product={product} />
              <ProductSpecs product={product} />
            </div>
          </div>
          <ProductDetails product={product} />
          {shouldShowCta && (
            <MotionLink className="products__cta" href="#contacts" interaction="productCta">
              {product.cta}
            </MotionLink>
          )}
        </>
      )}
    </animated.article>
  );
}
