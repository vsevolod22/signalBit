import type { ReactElement } from 'react';
import { useFormContext } from 'react-hook-form';

import type { ContactFormValues } from '@/features/contact-form/model/contact-form-schema';
import { ContactFieldError, FIELD_ERROR_ID, getErrorDescriptionId } from '@/features/contact-form/ui/ContactFieldError';

export function ContactRequestFields(): ReactElement {
  const { register, formState: { errors } } = useFormContext<ContactFormValues>();

  return (
    <>
      <div className="form-row">
        <div className="form-field">
          <label htmlFor="contact-phone">Телефон <span>(необязательно)</span></label>
          <input
            id="contact-phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            aria-invalid={errors.phone !== undefined}
            aria-describedby={getErrorDescriptionId(errors.phone !== undefined, FIELD_ERROR_ID.phone)}
            {...register('phone')}
          />
          <ContactFieldError id={FIELD_ERROR_ID.phone} message={errors.phone?.message} />
        </div>
        <div className="form-field">
          <label htmlFor="contact-subject">Тема обращения</label>
          <input
            id="contact-subject"
            type="text"
            autoComplete="off"
            aria-invalid={errors.subject !== undefined}
            aria-describedby={getErrorDescriptionId(errors.subject !== undefined, FIELD_ERROR_ID.subject)}
            {...register('subject')}
          />
          <ContactFieldError id={FIELD_ERROR_ID.subject} message={errors.subject?.message} />
        </div>
      </div>
      <div className="form-field">
        <label htmlFor="contact-message">Сообщение</label>
        <textarea
          id="contact-message"
          rows={6}
          aria-invalid={errors.message !== undefined}
          aria-describedby={getErrorDescriptionId(errors.message !== undefined, FIELD_ERROR_ID.message)}
          {...register('message')}
        />
        <ContactFieldError id={FIELD_ERROR_ID.message} message={errors.message?.message} />
      </div>
    </>
  );
}
