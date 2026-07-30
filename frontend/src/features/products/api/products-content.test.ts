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

  it('adds new Strapi products to the carousel and orders all products by sortOrder', () => {
    const products = mapProductsContent(
      [
        { slug: 'aist-autonomous', sortOrder: 30 },
        {
          slug: 'administrative-product',
          headline: 'Новый продукт',
          lead: 'Описание нового продукта',
          kitTitle: 'Комплектация',
          kitItems: [{ title: 'Бортовой модуль', description: 'Один комплект', sortOrder: 10 }],
          specsTitle: 'Параметры',
          specItems: [{ text: 'Масса: 200 г', sortOrder: 10 }],
          features: [{ text: 'Новая характеристика' }],
          price: '120 тыс. руб.',
          gallery: [{ url: '/uploads/new-product.jpg' }],
          galleryPositions: [{ offsetX: 18, offsetY: -7, scale: 125 }],
          backgroundColor: '#123456',
          backgroundImage: { url: '/uploads/product-background.jpg' },
          backgroundImagePosition: { offsetX: 4, offsetY: 6, scale: 110 },
          sortOrder: 1,
        },
        { slug: 'sokol', sortOrder: 10 },
        { slug: 'aist-basic', sortOrder: 20 },
        { slug: 'soroka', sortOrder: 40 },
      ],
      DEFAULT_SITE_CONTENT.products,
      CMS_URL,
    );

    expect(products.map((product) => product.slug)).toEqual([
      'administrative-product',
      'sokol',
      'aist-basic',
      'aist-autonomous',
      'soroka',
      'training-bas',
    ]);
    expect(products[0]).toMatchObject({
      title: 'Новый продукт',
      lead: 'Описание нового продукта',
      kitTitle: 'Комплектация',
      kit: [{ title: 'Бортовой модуль', description: 'Один комплект' }],
      specsTitle: 'Параметры',
      specs: ['Масса: 200 г'],
      description: ['Новая характеристика'],
      price: '120 тыс. руб.',
      images: [`${CMS_URL}/uploads/new-product.jpg`],
      imagePositions: [{ offsetX: 18, offsetY: -7, scale: 125 }],
      backgroundColor: '#123456',
      backgroundImage: `${CMS_URL}/uploads/product-background.jpg`,
      backgroundImagePosition: { offsetX: 4, offsetY: 6, scale: 110 },
    });
  });

  it('maps grouped catalog products and their modal table rows from Strapi', () => {
    const products = mapProductsContent(
      [
        {
          slug: 'training-bas',
          slideType: 'catalog',
          slideSubtitle: 'для школ',
          catalogItems: [
            {
              code: 'aist',
              name: 'АИСТ из CMS',
              characteristicsButtonLabel: 'Открыть таблицу',
              characteristics: [
                { name: 'PWM выходы', value: '8', unit: 'шт', section: false, sortOrder: 20 },
                { name: 'Полетный контроллер', value: 'наличие', section: true, sortOrder: 10 },
              ],
              sortOrder: 10,
            },
          ],
        },
      ],
      DEFAULT_SITE_CONTENT.products,
      CMS_URL,
    );
    const product = products.find((item) => item.slug === 'training-bas');

    expect(product).toMatchObject({
      slideType: 'catalog',
      variant: 'для школ',
      catalogItems: [
        {
          code: 'aist',
          name: 'АИСТ из CMS',
          characteristicsButtonLabel: 'Открыть таблицу',
          characteristics: [
            { name: 'Полетный контроллер', value: 'наличие', section: true },
            { name: 'PWM выходы', value: '8', unit: 'шт', section: false },
          ],
        },
      ],
    });
  });
});
