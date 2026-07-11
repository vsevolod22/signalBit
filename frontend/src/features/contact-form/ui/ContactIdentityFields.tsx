import type { ReactElement } from 'react';
import { useFormContext } from 'react-hook-form';

import type { ContactFormValues } from '@/features/contact-form/model/contact-form-schema';
import { ContactFieldError, FIELD_ERROR_ID, getErrorDescriptionId } from '@/features/contact-form/ui/ContactFieldError';

export function ContactIdentityFields(): ReactElement {
  const { register, formState: { errors } } = useFormContext<ContactFormValues>();

  return (
    <div className="form-row">
      <div className="form-field">
        <label htmlFor="contact-name">Имя</label>
        <input
          id="contact-name"
          type="text"
          autoComplete="name"
          aria-invalid={errors.name !== undefined}
          aria-describedby={getErrorDescriptionId(errors.name !== undefined, FIELD_ERROR_ID.name)}
          {...register('name')}
        />
        <ContactFieldError id={FIELD_ERROR_ID.name} message={errors.name?.message} />
      </div>
      <div className="form-field">
        <label htmlFor="contact-email">Email</label>
        <input
          id="contact-email"
          type="email"
          autoComplete="email"
          inputMode="email"
          aria-invalid={errors.email !== undefined}
          aria-describedby={getErrorDescriptionId(errors.email !== undefined, FIELD_ERROR_ID.email)}
          {...register('email')}
        />
        <ContactFieldError id={FIELD_ERROR_ID.email} message={errors.email?.message} />
      </div>
    </div>
  );
}
