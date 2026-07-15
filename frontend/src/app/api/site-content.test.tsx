import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import type { PropsWithChildren, ReactElement } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { DEFAULT_SITE_CONTENT } from '@/app/model/default-site-content';
import { StrapiNetworkError } from '@/shared/api/strapi-client';

import {
  fetchSiteContent,
  mapSiteContent,
  siteContentQueryOptions,
  siteContentResponseSchema,
  useSiteContentQuery,
} from './site-content';

const CMS_URL = 'https://cms.example.test';

function createQueryWrapper(): ({ children }: PropsWithChildren) => ReactElement {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return function QueryWrapper({ children }: PropsWithChildren): ReactElement {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  };
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('site-content query', () => {
  it('validates partial content and rejects malformed feature media', () => {
    expect(siteContentResponseSchema.safeParse({ data: { products: [{ slug: 'canary' }] } }).success).toBe(true);
    expect(siteContentResponseSchema.safeParse({ data: { seoSetting: { canonicalUrl: null } } }).success).toBe(true);
    expect(
      siteContentResponseSchema.safeParse({ data: { products: [{ slug: 'canary', gallery: [{ url: 42 }] }] } }).success,
    ).toBe(false);
  });

  it('does not enable the query when the CMS URL is absent', () => {
    expect(siteContentQueryOptions(DEFAULT_SITE_CONTENT, undefined).enabled).toBe(false);
  });

  it('keeps a transport error available for diagnostics', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.reject(new TypeError('offline'))),
    );
    await expect(fetchSiteContent(new AbortController().signal, CMS_URL)).rejects.toBeInstanceOf(StrapiNetworkError);
  });

  it('loads and maps content through a QueryClient wrapper', async () => {
    const fetchMock = vi.fn(() =>
      Promise.resolve(new Response(JSON.stringify({ data: { activitySetting: { sectionTitle: 'CMS сервисы' } } }))),
    );
    vi.stubGlobal('fetch', fetchMock);

    const { result } = renderHook(() => useSiteContentQuery(DEFAULT_SITE_CONTENT, CMS_URL), {
      wrapper: createQueryWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.activityTitle).toBe('CMS сервисы');
  });

  it('retains the fallback shape after a partial response', () => {
    const content = mapSiteContent(
      { products: [{ slug: 'aist-autonomous', featured: true }] },
      DEFAULT_SITE_CONTENT,
      CMS_URL,
    );
    expect(content.products).toHaveLength(4);
    expect(content.navigation).toEqual(DEFAULT_SITE_CONTENT.navigation);
  });

  it('maps editable SEO metadata and resolves the social image through Strapi', () => {
    const content = mapSiteContent(
      {
        seoSetting: {
          metaTitle: 'SEO из админки',
          metaDescription: 'Описание из Strapi',
          keywords: 'дроны, БАС',
          socialImage: { url: '/uploads/social.jpg' },
          organizationName: 'СИГНАЛ-БИТ CMS',
        },
      },
      DEFAULT_SITE_CONTENT,
      CMS_URL,
    );

    expect(content.seo).toMatchObject({
      title: 'SEO из админки',
      description: 'Описание из Strapi',
      keywords: 'дроны, БАС',
      socialImage: `${CMS_URL}/uploads/social.jpg`,
      organizationName: 'СИГНАЛ-БИТ CMS',
    });
    expect(content.seo.legalName).toBe(DEFAULT_SITE_CONTENT.seo.legalName);
  });

  it('keeps the education navigation item when Strapi still has the previous four-link menu', () => {
    const content = mapSiteContent(
      {
        siteNavigation: {
          links: [
            { label: 'CMS сервисы' },
            { label: 'CMS разработки' },
            { label: 'CMS продукты' },
            { label: 'CMS о нас' },
          ],
        },
      },
      DEFAULT_SITE_CONTENT,
      CMS_URL,
    );

    expect(content.navigation.links.map((link) => link.label)).toEqual([
      'CMS сервисы',
      'CMS разработки',
      'Образование',
      'CMS продукты',
      'CMS о нас',
    ]);
  });
});
