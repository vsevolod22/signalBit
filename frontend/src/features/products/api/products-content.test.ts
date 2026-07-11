import { describe, expect, it } from 'vitest';

import { DEFAULT_SITE_CONTENT } from '@/app/model/default-site-content';

import { mapProductsContent } from './products-content';

const CMS_URL = 'https://cms.example.test';

describe('products content mapper', () => {
  it('uses fallback values for fields omitted by Strapi', () => {
    const [product] = mapProductsContent(
      [{ slug: 'canary', headline: 'Новый заголовок', price: '99 тыс. руб.' }],
      DEFAULT_SITE_CONTENT.products,
      CMS_URL,
    );

    expect(product).toMatchObject({
      slug: 'canary',
      title: 'Новый заголовок',
      price: '99 тыс. руб.',
      lead: DEFAULT_SITE_CONTENT.products[0].lead,
      description: DEFAULT_SITE_CONTENT.products[0].description,
    });
  });

  it('keeps only landing products and orders them by sortOrder', () => {
    const products = mapProductsContent(
      [
        { slug: 'sensor', sortOrder: 30 },
        { slug: 'administrative-product', sortOrder: 1 },
        { slug: 'canary', sortOrder: 10 },
        { slug: 'flight-controller', sortOrder: 20 },
      ],
      DEFAULT_SITE_CONTENT.products,
      CMS_URL,
    );

    expect(products.map((product) => product.slug)).toEqual(['canary', 'flight-controller', 'sensor']);
  });
});
