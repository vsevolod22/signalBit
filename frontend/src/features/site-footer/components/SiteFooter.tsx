import type { ReactElement } from 'react';

import { EmailLink } from '@/shared/ui/link/EmailLink';

const COMPANY_EMAIL = 'sigbit@yandex.ru';

export function SiteFooter(): ReactElement {
  return (
    <footer className="site-footer">
      <p>© {new Date().getFullYear()} ООО «СИГНАЛ-БИТ»</p>
      <EmailLink email={COMPANY_EMAIL} />
    </footer>
  );
}
