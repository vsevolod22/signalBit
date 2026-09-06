import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { CAPTCHA_MESSAGE } from '@/shared/lib/smart-captcha';

import { ContactForm } from './ContactForm';

vi.mock('@yandex/smart-captcha', () => ({
  SmartCaptcha: ({ onSuccess }: { onSuccess?: (token: string) => void }) => (
    <button type="button" onClick={() => onSuccess?.('contact-captcha-token')}>
      Пройти проверку
    </button>
  ),
}));

vi.mock('framer-motion', () => ({
  motion: {
    div: ({
      children,
      initial: _initial,
      variants: _variants,
      viewport: _viewport,
      whileInView: _whileInView,
      ...props
    }: React.HTMLAttributes<HTMLDivElement> & Record<string, unknown>) => <div {...props}>{children}</div>,
    form: ({
      children,
      variants: _variants,
      ...props
    }: React.FormHTMLAttributes<HTMLFormElement> & Record<string, unknown>) => <form {...props}>{children}</form>,
  },
}));

const CMS_URL = 'https://cms.example.test';

function renderContactForm(captchaSiteKey = 'ysc1_test_client_key'): void {
  const queryClient = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
  render(
    <QueryClientProvider client={queryClient}>
      <ContactForm apiUrl={CMS_URL} captchaSiteKey={captchaSiteKey} />
    </QueryClientProvider>,
  );
}

function fillValidForm(): HTMLFormElement {
  fireEvent.change(screen.getByLabelText('Имя'), { target: { value: 'Иван Петров' } });
  fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'ivan@example.test' } });
  fireEvent.change(screen.getByLabelText('Тема обращения'), { target: { value: 'Консультация' } });
  fireEvent.change(screen.getByLabelText('Сообщение'), {
    target: { value: 'Нужна консультация по безопасной разработке беспилотной системы.' },
  });
  fireEvent.click(screen.getByLabelText('Я согласен на обработку персональных данных для ответа на обращение.'));
  return document.querySelector('.contact__form') as HTMLFormElement;
}

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe('ContactForm SmartCaptcha integration', () => {
  it('does not call the API until captcha succeeds and sends the token inside data', async () => {
    const fetchMock = vi.fn<typeof fetch>(() =>
      Promise.resolve(new Response(JSON.stringify({ data: { id: 1 } }), { status: 201 })),
    );
    vi.stubGlobal('fetch', fetchMock);
    renderContactForm();
    const form = fillValidForm();

    fireEvent.submit(form);
    expect((await screen.findByRole('alert')).textContent).toContain(CAPTCHA_MESSAGE.required);
    expect(fetchMock).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole('button', { name: 'Пройти проверку' }));
    fireEvent.submit(form);

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    const requestBody = JSON.parse(String(fetchMock.mock.calls[0]?.[1]?.body));
    expect(requestBody.data.smartCaptchaToken).toBe('contact-captcha-token');
    expect(requestBody).not.toHaveProperty('smartCaptchaToken');
  });

  it('blocks the submit button and explains that the form is unavailable without a client key', () => {
    renderContactForm(' ');

    expect(screen.getByRole('alert').textContent).toContain(CAPTCHA_MESSAGE.missing);
    expect((screen.getByRole('button', { name: 'Отправить заявку' }) as HTMLButtonElement).disabled).toBe(true);
  });

  it('prevents duplicate requests while the first request is pending', async () => {
    let resolveRequest: ((response: Response) => void) | undefined;
    const fetchMock = vi.fn<typeof fetch>(
      () =>
        new Promise<Response>((resolve) => {
          resolveRequest = resolve;
        }),
    );
    vi.stubGlobal('fetch', fetchMock);
    renderContactForm();
    const form = fillValidForm();
    fireEvent.click(screen.getByRole('button', { name: 'Пройти проверку' }));

    fireEvent.submit(form);
    fireEvent.submit(form);

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    resolveRequest?.(new Response(JSON.stringify({ data: { id: 1 } }), { status: 201 }));
    await screen.findByText(/Спасибо! Заявка отправлена/);
  });

  it('maps a captcha rejection and resets the one-time token', async () => {
    const fetchMock = vi.fn<typeof fetch>(() =>
      Promise.resolve(
        new Response(JSON.stringify({ error: { message: 'Captcha verification failed' } }), { status: 403 }),
      ),
    );
    vi.stubGlobal('fetch', fetchMock);
    renderContactForm();
    const form = fillValidForm();
    fireEvent.click(screen.getByRole('button', { name: 'Пройти проверку' }));
    fireEvent.submit(form);

    expect((await screen.findByRole('alert')).textContent).toContain(CAPTCHA_MESSAGE.failed);
    fireEvent.submit(form);
    await waitFor(() => expect(screen.getByRole('alert').textContent).toContain(CAPTCHA_MESSAGE.required));
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
