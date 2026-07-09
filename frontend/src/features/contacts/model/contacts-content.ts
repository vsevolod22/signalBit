import contactDrone from '../assets/contact-drone.png';
import emailIcon from '../assets/email.png';
import logoIctis from '../assets/logo_ictis.png';
import logoIntegra from '../assets/logo_integra.png';
import logoSfedu from '../assets/logo_sfedu.png';

import type { SiteContent } from '@/shared/model/site-content.types';

export const DEFAULT_CONTACTS_CONTENT: SiteContent['contacts'] = {
  title: 'Остались вопросы?',
  emailLabel: 'Напишите нам на почту',
  emailAddress: 'sigbit@yandex.ru',
  responseText: 'Мы свяжемся с вами на следующий рабочий день и ответим на все интересующие вопросы.',
  partnersTitle: 'Наши партнеры',
  emailIcon,
  heroImage: contactDrone,
  partners: [
    { name: 'ЮФУ', image: logoSfedu },
    { name: 'ИКТИБ', image: logoIctis },
    { name: 'Интегра', image: logoIntegra },
  ],
};
