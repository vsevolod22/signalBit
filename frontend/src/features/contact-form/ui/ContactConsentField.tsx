import type { ReactElement } from 'react';
import { useFormContext } from 'react-hook-form';

import type { ContactFormValues } from '@/features/contact-form/model/contact-form-schema';
import { ContactFieldError, FIELD_ERROR_ID, getErrorDescriptionId } from '@/features/contact-form/ui/ContactFieldError';

export function ContactConsentField(): ReactElement {
  const { register, formState: { errors } } = useFormContext<ContactFormValues>();

  return (
    <div className="form-consent">
      <input
        id="contact-consent"
        type="checkbox"
        aria-invalid={errors.consent !== undefined}
        aria-describedby={getErrorDescriptionId(errors.consent !== undefined, FIELD_ERROR_ID.consent)}
        {...register('consent')}
      />
      <label htmlFor="contact-consent">Я согласен на обработку данных для ответа на обращение.</label>
      <ContactFieldError id={FIELD_ERROR_ID.consent} message={errors.consent?.message} />
    </div>
  );
}
