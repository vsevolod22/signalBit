import { useMutation } from '@tanstack/react-query';

import { contactFormSchema } from '@/features/contact-form/model/contact-form-schema';
import type { ContactFormValues } from '@/features/contact-form/model/contact-form-schema';
import { HTTP_METHOD } from '@/shared/api/http';
import { requestStrapi, STRAPI_API_URL } from '@/shared/api/strapi-client';
import { STRAPI_ENDPOINT } from '@/shared/api/strapi-endpoints';

export interface ContactFormSubmissionResult {
  delivered: boolean;
}

interface ContactRequestPayload {
  fullName: string;
  email: string;
  contactMethod: string;
  question: string;
}

export const contactFormMutationKeys = {
  all: ['contact-form'] as const,
  submit: () => [...contactFormMutationKeys.all, 'submit'] as const,
};

function getPreferredContactMethod(values: ContactFormValues): string {
  const hasPhoneNumber = values.phone.length > 0;
  return hasPhoneNumber ? `Телефон: ${values.phone}` : `Email: ${values.email}`;
}

function toContactRequestPayload(values: ContactFormValues): ContactRequestPayload {
  return {
    fullName: values.name,
    email: values.email,
    contactMethod: getPreferredContactMethod(values),
    question: `Тема: ${values.subject}\n\n${values.message}`,
  };
}

export async function submitContactForm(values: ContactFormValues, apiUrl = STRAPI_API_URL): Promise<ContactFormSubmissionResult> {
  const validatedValues = contactFormSchema.parse(values);

  if (apiUrl === undefined) {
    throw new Error('Strapi CMS URL is not configured.');
  }

  await requestStrapi(STRAPI_ENDPOINT.CONTACT_REQUEST_SUBMIT, {
    apiUrl,
    method: HTTP_METHOD.POST,
    body: { data: toContactRequestPayload(validatedValues) },
  });

  return { delivered: true };
}

export function useContactFormMutation(apiUrl = STRAPI_API_URL) {
  return useMutation<ContactFormSubmissionResult, Error, ContactFormValues>({
    mutationKey: contactFormMutationKeys.submit(),
    mutationFn: (values) => submitContactForm(values, apiUrl),
  });
}
