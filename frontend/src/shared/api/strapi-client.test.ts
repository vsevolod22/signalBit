import { afterEach, describe, expect, it, vi } from 'vitest';

import { getMediaUrl, getOptionalMediaUrl, requestStrapi, type StrapiHttpError } from './strapi-client';

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('getMediaUrl', () => {
  it('supports relative, absolute and fallback media URLs', () => {
    const cmsUrl = 'https://cms.example.test';
    expect(getMediaUrl({ url: '/uploads/drone.png' }, 'fallback.png', cmsUrl)).toBe(`${cmsUrl}/uploads/drone.png`);
    expect(getMediaUrl({ url: 'https://cdn.example.test/drone.png' }, 'fallback.png', cmsUrl)).toBe(
      'https://cdn.example.test/drone.png',
    );
    expect(getMediaUrl({ url: '/uploads/drone.png' }, 'fallback.png', undefined)).toBe('fallback.png');
  });

  it('omits an optional image instead of producing an empty src', () => {
    expect(getOptionalMediaUrl(undefined, undefined, 'https://cms.example.test')).toBeUndefined();
    expect(getOptionalMediaUrl(null, '', 'https://cms.example.test')).toBeUndefined();
  });

  it('keeps the backend error message for endpoint-specific error handling', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn<typeof fetch>(() =>
        Promise.resolve(
          new Response(JSON.stringify({ error: { message: 'Captcha token is required' } }), { status: 400 }),
        ),
      ),
    );

    await expect(requestStrapi('/api/contact-requests/submit', { apiUrl: 'https://cms.example.test' })).rejects.toEqual(
      expect.objectContaining<Partial<StrapiHttpError>>({
        status: 400,
        serverMessage: 'Captcha token is required',
      }),
    );
  });
});
