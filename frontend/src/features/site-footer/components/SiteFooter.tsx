import type { ReactElement } from 'react';

import { EmailLink } from '@/shared/ui/link/EmailLink';

const COMPANY_EMAIL = 'sigbit@yandex.ru';
const SOCIAL_LINKS = [
  { label: 'ВК', href: 'https://vk.com/signal_bit' },
  { label: 'Telegram', href: 'https://t.me/sigbit' },
  { label: 'MAX', href: 'https://max.ru/join/ZCNI9textI5ZMefXuzC681kgsJuu7-8jdDPiycYhF1w' },
] as const;

export function SiteFooter(): ReactElement {
  return (
    <footer className="site-footer">
      <p>© {new Date().getFullYear()} ООО «СИГНАЛ-БИТ»</p>
      <nav className="site-footer__socials" aria-label="СИГНАЛ-БИТ в социальных сетях">
        {SOCIAL_LINKS.map((link) => (
          <a href={link.href} target="_blank" rel="noreferrer" key={link.label}>
            {link.label}
          </a>
        ))}
      </nav>
      <EmailLink email={COMPANY_EMAIL} />
    </footer>
  );
}
