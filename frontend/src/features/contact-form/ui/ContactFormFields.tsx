import type { ReactElement } from 'react';

import { ContactConsentField } from '@/features/contact-form/ui/ContactConsentField';
import { ContactIdentityFields } from '@/features/contact-form/ui/ContactIdentityFields';
import { ContactRequestFields } from '@/features/contact-form/ui/ContactRequestFields';

export function ContactFormFields(): ReactElement {
  return (
    <>
      <ContactIdentityFields />
      <ContactRequestFields />
      <ContactConsentField />
    </>
  );
}
