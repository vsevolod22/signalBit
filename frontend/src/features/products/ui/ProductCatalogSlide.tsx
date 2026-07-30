import type { ReactElement } from 'react';

import { ProductCharacteristicsModal } from '@/features/products/ui/ProductCharacteristicsModal';
import type { ProductCard, ProductCatalogItem } from '@/shared/model/site-content';
import { PositionedImage } from '@/shared/ui/positioned-image/PositionedImage';

interface ProductCatalogSlideProps {
  isInteractive: boolean;
  product: ProductCard;
}

function CatalogItem({ isInteractive, item }: { isInteractive: boolean; item: ProductCatalogItem }): ReactElement {
  return (
    <section className="products__catalog-item">
      <h4>{item.name}</h4>
      {item.description !== undefined && <p className="products__catalog-description">{item.description}</p>}
      <div className="products__catalog-item-body">
        <div className="products__catalog-kit">
          <strong>{item.kitTitle ?? 'состав набора'}</strong>
          <ul>
            {item.kit.map((kitItem, index) => (
              <li key={`${kitItem.title}-${index}`}>
                {kitItem.title}
                {kitItem.description !== undefined && <small>{kitItem.description}</small>}
              </li>
            ))}
          </ul>
        </div>
        <div className="products__catalog-actions">
          <ProductCharacteristicsModal item={item} isInteractive={isInteractive} />
          <p>
            <strong>{item.priceLabel ?? 'Стоимость'}</strong>
            <span>{item.price}</span>
          </p>
        </div>
      </div>
    </section>
  );
}

export function ProductCatalogSlide({ isInteractive, product }: ProductCatalogSlideProps): ReactElement {
  return (
    <div className="products__catalog">
      <h3>
        {product.title}
        {product.variant !== undefined && <span>{product.variant}</span>}
      </h3>
      <p className="products__catalog-lead">{product.lead}</p>
      <div className="products__catalog-layout">
        <div className="products__catalog-items">
          {product.catalogItems?.map((item) => (
            <CatalogItem isInteractive={isInteractive} item={item} key={item.code} />
          ))}
        </div>
        <div className="products__catalog-gallery" aria-hidden="true">
          {product.images.slice(0, 5).map((image, index) => (
            <PositionedImage
              alt=""
              src={image}
              position={product.imagePositions?.[index]}
              decoding="async"
              loading="lazy"
              key={`${product.slug}-${image}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
