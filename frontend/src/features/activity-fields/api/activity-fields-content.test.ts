import { describe, expect, it } from 'vitest';

import { DEFAULT_SITE_CONTENT } from '@/app/model/default-site-content';

import { mapActivityFieldsContent } from './activity-fields-content';

describe('mapActivityFieldsContent', () => {
  it('does not create an empty image URL when neither Strapi nor fallback has an image', () => {
    const fields = DEFAULT_SITE_CONTENT.activityCards.map((card, index) => ({
      title: card.title,
      description: card.description,
      image: null,
      sortOrder: (index + 1) * 10,
    }));

    const result = mapActivityFieldsContent(fields, DEFAULT_SITE_CONTENT.activityCards, 'https://cms.example.test');

    expect(result[3]?.image).toBeUndefined();
    expect(result.some((card) => card.image === '')).toBe(false);
  });
});
