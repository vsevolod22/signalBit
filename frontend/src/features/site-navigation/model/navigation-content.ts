import logo from '../assets/signal-bit-logo.png';

import type { SiteContent } from '@/shared/model/site-content.types';

export const DEFAULT_NAVIGATION_CONTENT: SiteContent['navigation'] = {
  logo,
  contactLabel: 'Свяжитесь с нами',
  links: [
    { label: 'Сервис и услуги', href: '#services' },
    { label: 'Разработки', href: '#development' },
    { label: 'Продукты', href: '#products' },
    { label: 'О нас', href: '#about' },
  ],
};
