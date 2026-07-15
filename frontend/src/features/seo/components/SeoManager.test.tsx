import { render, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { DEFAULT_SITE_CONTENT } from '@/app/model/default-site-content';

import { SeoManager } from './SeoManager';

const initialTitle = document.title;
const initialHead = document.head.innerHTML;

afterEach(() => {
  document.title = initialTitle;
  document.head.innerHTML = initialHead;
});

describe('SeoManager', () => {
  it('applies CMS metadata, canonical URL and structured data to the document head', async () => {
    const content = {
      ...DEFAULT_SITE_CONTENT,
      seo: {
        ...DEFAULT_SITE_CONTENT.seo,
        title: 'SEO из Strapi',
        description: 'Описание страницы из Strapi',
        keywords: 'БАС, БПЛА',
        canonicalUrl: '/catalog',
        socialImage: '/social-cms.png',
      },
    };

    render(<SeoManager content={content} />);

    await waitFor(() => expect(document.title).toBe('SEO из Strapi'));
    expect(document.head.querySelector<HTMLMetaElement>('meta[name="description"]')?.content).toBe(
      'Описание страницы из Strapi',
    );
    expect(document.head.querySelector<HTMLMetaElement>('meta[name="keywords"]')?.content).toBe('БАС, БПЛА');
    expect(document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href).toBe(
      'http://localhost:3000/catalog',
    );
    expect(document.head.querySelector<HTMLMetaElement>('meta[property="og:image"]')?.content).toBe(
      'http://localhost:3000/social-cms.png',
    );

    const structuredData = document.getElementById('site-structured-data')?.textContent;
    expect(structuredData).toContain('Organization');
    expect(structuredData).toContain(DEFAULT_SITE_CONTENT.seo.legalName);
  });
});
