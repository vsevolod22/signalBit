import type { ReactElement } from 'react';
import { useFormContext } from 'react-hook-form';

import type { ContactFormValues } from '@/features/contact-form/model/contact-form-schema';
import { FormCheckboxField } from '@/shared/ui/form/FormControls';
import { PersonalDataConsentLink } from '@/shared/ui/link/PersonalDataConsentLink';

export function ContactConsentField(): ReactElement {
  const {
    register,
    formState: { errors },
  } = useFormContext<ContactFormValues>();

  return (
    <FormCheckboxField
      id="contact-consent"
      label={
        <span>
          Я согласен на <PersonalDataConsentLink /> для ответа на обращение.
        </span>
      }
      error={errors.consent?.message}
      registration={register('consent')}
    />
  );
}
