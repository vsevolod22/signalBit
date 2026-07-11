import { contactFormSchema } from '@/features/contact-form/model/contact-form-schema';
import type { ContactFormValues } from '@/features/contact-form/model/contact-form-schema';

const CONTACT_FORM_ENDPOINT = import.meta.env.VITE_CONTACT_FORM_ENDPOINT;

export interface ContactFormSubmissionResult {
  delivered: boolean;
}

export async function submitContactForm(values: ContactFormValues): Promise<ContactFormSubmissionResult> {
  const payload = contactFormSchema.parse(values);

  if (typeof CONTACT_FORM_ENDPOINT !== 'string' || CONTACT_FORM_ENDPOINT.length === 0) {
    return { delivered: false };
  }

  const response = await fetch(CONTACT_FORM_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Contact form request failed.');
  }

  return { delivered: true };
}
