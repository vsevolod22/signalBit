import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import type { PropsWithChildren, ReactElement } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import type { ContactFormValues } from '@/features/contact-form/model/contact-form-schema';
import { StrapiHttpError } from '@/shared/api/strapi-client';

import { submitContactForm, useContactFormMutation } from './submit-contact-form';

const CMS_URL = 'https://cms.example.test';
const validValues: ContactFormValues = {
  name: 'Иван Петров',
  email: 'ivan@example.test',
  phone: '+7 900 123-45-67',
  subject: 'Консультация',
  message: 'Нужна консультация по безопасной разработке беспилотной системы.',
  consent: true,
};

function createQueryWrapper(): ({ children }: PropsWithChildren) => ReactElement {
  const queryClient = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
  return function QueryWrapper({ children }: PropsWithChildren): ReactElement {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  };
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('contact form mutation', () => {
  it('submits the contact request successfully without exposing consent as CMS data', async () => {
    const fetchMock = vi.fn(() => Promise.resolve(new Response(JSON.stringify({ data: { id: 1 } }), { status: 200 })));
    vi.stubGlobal('fetch', fetchMock);

    await expect(submitContactForm(validValues, CMS_URL)).resolves.toEqual({ delivered: true });
    expect(fetchMock).toHaveBeenCalledWith(
      `${CMS_URL}/api/contact-requests/submit`,
      expect.objectContaining({ method: 'POST', body: expect.stringContaining('fullName') }),
    );
  });

  it('surfaces a failed mutation so the form can retain the entered values', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.resolve(new Response(null, { status: 500 }))),
    );
    const { result } = renderHook(() => useContactFormMutation(CMS_URL), { wrapper: createQueryWrapper() });

    result.current.mutate(validValues);

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error).toBeInstanceOf(StrapiHttpError);
  });
});
