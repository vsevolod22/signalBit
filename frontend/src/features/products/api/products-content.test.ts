import { describe, expect, it } from 'vitest';

import { DEFAULT_SITE_CONTENT } from '@/app/model/default-site-content';

import { mapProductsContent } from './products-content';

const CMS_URL = 'https://cms.example.test';

describe('products content mapper', () => {
  it('uses fallback values for fields omitted by Strapi', () => {
    const [product] = mapProductsContent(
      [{ slug: 'sokol', headline: 'Новый заголовок', price: '99 тыс. руб.' }],
      DEFAULT_SITE_CONTENT.products,
      CMS_URL,
    );

    expect(product).toMatchObject({
      slug: 'sokol',
      title: 'Новый заголовок',
      price: '99 тыс. руб.',
      lead: DEFAULT_SITE_CONTENT.products[0].lead,
      description: DEFAULT_SITE_CONTENT.products[0].description,
    });
  });

  it('keeps only landing products and orders them by sortOrder', () => {
    const products = mapProductsContent(
      [
        { slug: 'aist-autonomous', sortOrder: 30 },
        { slug: 'administrative-product', sortOrder: 1 },
        { slug: 'sokol', sortOrder: 10 },
        { slug: 'aist-basic', sortOrder: 20 },
        { slug: 'soroka', sortOrder: 40 },
      ],
      DEFAULT_SITE_CONTENT.products,
      CMS_URL,
    );

    expect(products.map((product) => product.slug)).toEqual(['sokol', 'aist-basic', 'aist-autonomous', 'soroka']);
  });
});
