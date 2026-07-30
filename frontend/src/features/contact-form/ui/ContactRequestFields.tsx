import type { ReactElement } from 'react';
import { useFormContext } from 'react-hook-form';

import type { ContactFormValues } from '@/features/contact-form/model/contact-form-schema';
import { FormTextareaField, FormTextField } from '@/shared/ui/form/FormControls';

export function ContactRequestFields(): ReactElement {
  const {
    register,
    formState: { errors },
  } = useFormContext<ContactFormValues>();

  return (
    <>
      <div className="contact__row">
        <FormTextField
          id="contact-phone"
          label={
            <>
              Телефон <span>(необязательно)</span>
            </>
          }
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          error={errors.phone?.message}
          registration={register('phone')}
        />
        <FormTextField
          id="contact-subject"
          label="Тема обращения"
          type="text"
          autoComplete="off"
          error={errors.subject?.message}
          registration={register('subject')}
        />
      </div>
      <FormTextareaField
        id="contact-message"
        label="Сообщение"
        rows={6}
        error={errors.message?.message}
        registration={register('message')}
      />
    </>
  );
}
