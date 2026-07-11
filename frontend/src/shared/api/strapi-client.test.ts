import { describe, expect, it } from 'vitest';

import { getMediaUrl } from './strapi-client';

describe('getMediaUrl', () => {
  it('supports relative, absolute and fallback media URLs', () => {
    const cmsUrl = 'https://cms.example.test';
    expect(getMediaUrl({ url: '/uploads/drone.png' }, 'fallback.png', cmsUrl)).toBe(`${cmsUrl}/uploads/drone.png`);
    expect(getMediaUrl({ url: 'https://cdn.example.test/drone.png' }, 'fallback.png', cmsUrl)).toBe(
      'https://cdn.example.test/drone.png',
    );
    expect(getMediaUrl({ url: '/uploads/drone.png' }, 'fallback.png', undefined)).toBe('fallback.png');
  });
});
