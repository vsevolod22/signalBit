import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import type { ReactElement } from 'react';
import { useState } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { CAPTCHA_MESSAGE } from '@/shared/lib/smart-captcha';

import { SmartCaptchaField } from './SmartCaptchaField';

vi.mock('@yandex/smart-captcha', () => ({
  SmartCaptcha: ({
    language,
    onJavascriptError,
    onNetworkError,
    onSuccess,
    onTokenExpired,
    sitekey,
  }: {
    language?: string;
    onJavascriptError?: () => void;
    onNetworkError?: () => void;
    onSuccess?: (token: string) => void;
    onTokenExpired?: () => void;
    sitekey: string;
  }) => (
    <div data-testid="smart-captcha" data-language={language} data-sitekey={sitekey}>
      <button type="button" onClick={() => onSuccess?.('one-time-token')}>
        success
      </button>
      <button type="button" onClick={onTokenExpired}>
        expired
      </button>
      <button type="button" onClick={onNetworkError}>
        network
      </button>
      <button type="button" onClick={onJavascriptError}>
        javascript
      </button>
    </div>
  ),
}));

function CaptchaHarness({ label }: { label: string }): ReactElement {
  const [token, setToken] = useState('');
  const [error, setError] = useState('');

  return (
    <section aria-label={label}>
      <output aria-label={`${label} token`}>{token}</output>
      <SmartCaptchaField
        siteKey="ysc1_test_client_key"
        error={error}
        onSuccess={(nextToken) => {
          setToken(nextToken);
          setError('');
        }}
        onError={(message) => {
          setToken('');
          setError(message);
        }}
      />
    </section>
  );
}

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe('SmartCaptchaField', () => {
  it('uses the configured client key and Russian language', () => {
    render(<CaptchaHarness label="captcha" />);

    expect(screen.getByTestId('smart-captcha').getAttribute('data-sitekey')).toBe('ysc1_test_client_key');
    expect(screen.getByTestId('smart-captcha').getAttribute('data-language')).toBe('ru');
  });

  it.each([
    ['expired', CAPTCHA_MESSAGE.expired],
    ['network', CAPTCHA_MESSAGE.network],
    ['javascript', CAPTCHA_MESSAGE.javascript],
  ])('clears the token and displays the %s error', (eventButton, expectedMessage) => {
    render(<CaptchaHarness label="captcha" />);
    fireEvent.click(screen.getByRole('button', { name: 'success' }));
    expect(screen.getByLabelText('captcha token').textContent).toContain('one-time-token');

    fireEvent.click(screen.getByRole('button', { name: eventButton }));

    expect(screen.getByLabelText('captcha token').textContent).toBe('');
    expect(screen.getByRole('alert').textContent).toContain(expectedMessage);
  });

  it('keeps separate tokens for separate fields', () => {
    render(
      <>
        <CaptchaHarness label="first" />
        <CaptchaHarness label="second" />
      </>,
    );
    const firstCaptcha = screen.getByRole('region', { name: 'first' });

    fireEvent.click(firstCaptcha.querySelector('button') as HTMLButtonElement);

    expect(screen.getByLabelText('first token').textContent).toContain('one-time-token');
    expect(screen.getByLabelText('second token').textContent).toBe('');
  });

  it('shows a diagnostic fallback instead of a widget when the key is missing', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    render(<SmartCaptchaField siteKey=" " error="" onSuccess={vi.fn()} onError={vi.fn()} />);

    expect(screen.queryByTestId('smart-captcha')).toBeNull();
    expect(screen.getByRole('alert').textContent).toContain(CAPTCHA_MESSAGE.missing);
    expect(consoleError).toHaveBeenCalledWith(expect.stringContaining('VITE_SMARTCAPTCHA_CLIENT_KEY'));
  });
});
