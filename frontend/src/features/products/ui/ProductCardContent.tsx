import type { ReactElement } from 'react';

import type { ProductCard } from '@/shared/model/site-content';

export function ProductBody({ body }: { body: ProductCard['body'] }): ReactElement | null {
  if (body === undefined) {
    return null;
  }

  return (
    <div className="product-body">
      {body.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
  );
}

export function ProductImages({ product }: { product: ProductCard }): ReactElement {
  return (
    <div className="product-images">
      {product.images.slice(0, 3).map((image, index) => (
        <img src={image} alt="" aria-hidden="true" decoding="async" loading="lazy" key={`${product.slug}-${index}`} />
      ))}
    </div>
  );
}

export function ProductDetails({ product }: { product: ProductCard }): ReactElement {
  return (
    <div className="product-details">
      <ul>
        {product.description.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p className="product-price">
        <strong>Стоимость</strong>
        <span>{product.price}</span>
        {product.priceNote !== undefined && <small>{product.priceNote}</small>}
      </p>
    </div>
  );
}
