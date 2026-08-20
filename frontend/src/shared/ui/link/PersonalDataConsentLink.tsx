import type { ReactElement } from 'react';

const PERSONAL_DATA_CONSENT_URL = `${import.meta.env.BASE_URL}personal-data-consent.pdf`;

export function PersonalDataConsentLink(): ReactElement {
  return (
    <a className="form-checkbox__document-link" href={PERSONAL_DATA_CONSENT_URL} target="_blank" rel="noreferrer">
      обработку персональных данных
    </a>
  );
}
