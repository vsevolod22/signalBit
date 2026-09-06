import { describe, expect, it } from 'vitest';

import { getCaptchaSubmissionError } from '@/shared/api/captcha-errors';
import { StrapiHttpError } from '@/shared/api/strapi-client';
import { CAPTCHA_MESSAGE } from '@/shared/lib/smart-captcha';

describe('getCaptchaSubmissionError', () => {
  it.each([
    [new StrapiHttpError(400, 'Captcha token is required'), CAPTCHA_MESSAGE.required],
    [new StrapiHttpError(403, 'Captcha verification failed'), CAPTCHA_MESSAGE.failed],
    [new StrapiHttpError(503, 'Captcha verification is temporarily unavailable'), CAPTCHA_MESSAGE.unavailable],
  ])('maps captcha backend errors to Russian messages', (error, expectedMessage) => {
    expect(getCaptchaSubmissionError(error)).toBe(expectedMessage);
  });

  it('preserves existing handling for unrelated HTTP errors', () => {
    expect(getCaptchaSubmissionError(new StrapiHttpError(400, 'Missing required field: fullName'))).toBeUndefined();
    expect(getCaptchaSubmissionError(new StrapiHttpError(500))).toBeUndefined();
  });
});
