import { SmartCaptcha } from '@yandex/smart-captcha';
import type { ReactElement } from 'react';
import { useEffect } from 'react';

import { CAPTCHA_MESSAGE, getSmartCaptchaSiteKey } from '@/shared/lib/smart-captcha';

import './smart-captcha-field.scss';

interface SmartCaptchaFieldProps {
  error: string;
  onError: (message: string) => void;
  onSuccess: (token: string) => void;
  siteKey?: string;
}

let didReportMissingSiteKey = false;

export function SmartCaptchaField({ error, onError, onSuccess, siteKey }: SmartCaptchaFieldProps): ReactElement {
  const configuredSiteKey = getSmartCaptchaSiteKey(siteKey);

  useEffect(() => {
    if (import.meta.env.DEV && configuredSiteKey === undefined && !didReportMissingSiteKey) {
      console.error('[SmartCaptcha] VITE_SMARTCAPTCHA_CLIENT_KEY is not configured. Form submission is disabled.');
      didReportMissingSiteKey = true;
    }
  }, [configuredSiteKey]);

  if (configuredSiteKey === undefined) {
    return (
      <div className="smart-captcha-field smart-captcha-field--unavailable" role="alert">
        {CAPTCHA_MESSAGE.missing}
      </div>
    );
  }

  return (
    <div className="smart-captcha-field">
      <SmartCaptcha
        sitekey={configuredSiteKey}
        language="ru"
        onSuccess={onSuccess}
        onTokenExpired={() => onError(CAPTCHA_MESSAGE.expired)}
        onNetworkError={() => onError(CAPTCHA_MESSAGE.network)}
        onJavascriptError={() => onError(CAPTCHA_MESSAGE.javascript)}
      />
      {error !== '' && (
        <div className="smart-captcha-field__error" role="alert" aria-live="polite">
          {error}
        </div>
      )}
    </div>
  );
}
