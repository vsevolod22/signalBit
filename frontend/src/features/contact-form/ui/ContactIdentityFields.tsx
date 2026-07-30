import type { ReactElement } from 'react';
import { useFormContext } from 'react-hook-form';

import type { ContactFormValues } from '@/features/contact-form/model/contact-form-schema';
import { FormTextField } from '@/shared/ui/form/FormControls';

export function ContactIdentityFields(): ReactElement {
  const {
    register,
    formState: { errors },
  } = useFormContext<ContactFormValues>();

  return (
    <div className="contact__row">
      <FormTextField
        id="contact-name"
        label="Имя"
        type="text"
        autoComplete="name"
        error={errors.name?.message}
        registration={register('name')}
      />
      <FormTextField
        id="contact-email"
        label="Email"
        type="email"
        autoComplete="email"
        inputMode="email"
        error={errors.email?.message}
        registration={register('email')}
      />
    </div>
  );
}
