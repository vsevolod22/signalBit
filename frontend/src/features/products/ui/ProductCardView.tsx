import type { KeyboardEvent, ReactElement } from 'react';
import { animated, config, to, useReducedMotion, useSpring } from '@react-spring/web';

import type { ProductPlacement } from '@/features/products/model/carousel-layout';
import { ProductBody, ProductDetails, ProductImages } from '@/features/products/ui/ProductCardContent';
import type { ProductCard } from '@/shared/model/site-content';
import { MotionLink } from '@/shared/ui/link/MotionLink';

interface ProductCardViewProps {
  isVisible: boolean;
  offset: number;
  product: ProductCard;
  placement: ProductPlacement;
  onSelect?: () => void;
}

interface ProductCardSpringValues {
  blur: number;
  offset: number;
  opacity: number;
  scale: number;
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

export function ProductCardView({ isVisible, offset, product, placement, onSelect }: ProductCardViewProps): ReactElement {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const isActive = placement === 'active';
  const isInteractive = onSelect !== undefined && isVisible;
  const limitedOffset = Math.max(-1.9, Math.min(1.9, offset));
  const visualState = isVisible ? PRODUCT_CARD_VISUAL_STATE.visible : PRODUCT_CARD_VISUAL_STATE.hidden;
  const springConfig = prefersReducedMotion ? { duration: 0 } : { ...config.gentle, clamp: true };
  const featuredClassName = product.featured ? ' product-card--featured' : '';
  const cardZIndex = getProductCardZIndex(isActive, isVisible);
  const interactiveTabIndex = isInteractive ? 0 : undefined;
  const interactiveRole = isInteractive ? 'button' : undefined;
  const shouldShowCta = isActive && product.cta !== undefined;
  const springStyle = useSpring<ProductCardSpringValues>({
    blur: visualState.blur,
    offset: limitedOffset,
    opacity: visualState.opacity,
    scale: visualState.scale,
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
      className={`product-card product-card--${placement}${featuredClassName}`}
      aria-hidden={!isVisible}
      style={{
        filter: springStyle.blur.to((value: number) => `blur(${value}px)`),
        opacity: springStyle.opacity,
        transform: to([springStyle.offset, springStyle.scale], (slideOffset, scale) =>
          `translate3d(calc(-50% + (${slideOffset} * (var(--product-card-size) + var(--product-card-gap)))), 0, 0) scale(${scale})`,
        ),
        zIndex: cardZIndex,
      }}
      tabIndex={interactiveTabIndex}
      role={interactiveRole}
      onClick={onSelect}
      onKeyDown={handleKeyDown}
    >
      <h3>{product.title}</h3>
      <p className="product-lead">{product.lead}</p>
      <ProductBody body={product.body} />
      <ProductImages product={product} />
      <ProductDetails product={product} />
      {shouldShowCta && (
        <MotionLink className="product-cta" href="#contacts" interaction="productCta">
          {product.cta}
        </MotionLink>
      )}
    </animated.article>
  );
}
