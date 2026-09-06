import { StrapiHttpError } from '@/shared/api/strapi-client';
import { CAPTCHA_MESSAGE } from '@/shared/lib/smart-captcha';

const CAPTCHA_TOKEN_REQUIRED_ERROR = 'Captcha token is required';

export function getCaptchaSubmissionError(error: unknown): string | undefined {
  if (!(error instanceof StrapiHttpError)) {
    return undefined;
  }

  if (error.status === 400 && error.serverMessage === CAPTCHA_TOKEN_REQUIRED_ERROR) {
    return CAPTCHA_MESSAGE.required;
  }
  if (error.status === 403) {
    return CAPTCHA_MESSAGE.failed;
  }
  if (error.status === 503) {
    return CAPTCHA_MESSAGE.unavailable;
  }

  return undefined;
}
