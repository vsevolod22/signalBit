import type { ReactElement } from 'react';
import { useFormContext } from 'react-hook-form';

import type { ContactFormValues } from '@/features/contact-form/model/contact-form-schema';
import { FormCheckboxField } from '@/shared/ui/form/FormControls';

export function ContactConsentField(): ReactElement {
  const {
    register,
    formState: { errors },
  } = useFormContext<ContactFormValues>();

  return (
    <FormCheckboxField
      id="contact-consent"
      label="Я согласен на обработку данных для ответа на обращение."
      error={errors.consent?.message}
      registration={register('consent')}
    />
  );
}
