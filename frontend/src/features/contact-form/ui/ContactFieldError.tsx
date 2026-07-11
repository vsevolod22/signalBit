import type { ReactElement } from 'react';

export const FIELD_ERROR_ID = {
  name: 'contact-name-error',
  email: 'contact-email-error',
  phone: 'contact-phone-error',
  subject: 'contact-subject-error',
  message: 'contact-message-error',
  consent: 'contact-consent-error',
} as const;

export function getErrorDescriptionId(hasError: boolean, errorId: string): string | undefined {
  return hasError ? errorId : undefined;
}

export function ContactFieldError({ id, message }: { id: string; message?: string }): ReactElement | null {
  if (message === undefined) {
    return null;
  }

  return (
    <span className="form-error" id={id} role="alert">
      {message}
    </span>
  );
}
