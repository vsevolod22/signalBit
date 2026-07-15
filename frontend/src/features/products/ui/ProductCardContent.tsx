import type { ReactElement } from 'react';

import type { ProductCard } from '@/shared/model/site-content';

export function ProductKit({ product }: { product: ProductCard }): ReactElement | null {
  const kitItems = product.kit;
  const fallbackBody = product.body;

  if (kitItems === undefined && fallbackBody === undefined) {
    return null;
  }

  return (
    <section className="products__technical-block">
      <strong className="products__vertical-label">состав набора</strong>
      <div className="products__kit">
        {kitItems?.map((item) => (
          <p key={item.title}>
            <span className="products__kit-title">— {item.title}</span>
            {item.description !== undefined && <span className="products__kit-description">{item.description}</span>}
          </p>
        ))}
        {kitItems === undefined && fallbackBody?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>
    </section>
  );
}

export function ProductSpecs({ product }: { product: ProductCard }): ReactElement | null {
  if (product.specs === undefined) {
    return null;
  }

  return (
    <section className="products__technical-block products__technical-block--specs">
      <strong className="products__vertical-label">ТТХ</strong>
      <ul className="products__specs">
        {product.specs.map((specification) => (
          <li key={specification}>{specification}</li>
        ))}
      </ul>
    </section>
  );
}

export function ProductImages({ product }: { product: ProductCard }): ReactElement {
  return (
    <div className={`products__images products__images--${product.slug}`}>
      {product.images.slice(0, 5).map((image, index) => (
        <figure key={`${product.slug}-${image}`}>
          <img src={image} alt="" aria-hidden="true" decoding="async" loading="lazy" />
          {product.imageLabels?.[index] !== undefined && <figcaption>{product.imageLabels[index]}</figcaption>}
        </figure>
      ))}
    </div>
  );
}

export function ProductDetails({ product }: { product: ProductCard }): ReactElement {
  return (
    <div className="products__details">
      <ul>
        {product.description.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p className="products__price">
        <strong>Стоимость</strong>
        <span>{product.price}</span>
        {product.priceNote !== undefined && <small>{product.priceNote}</small>}
      </p>
    </div>
  );
}
