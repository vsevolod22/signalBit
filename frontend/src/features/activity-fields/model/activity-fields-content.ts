import activityNewProducts from '../assets/new_products.png';
import activityResearch from '../assets/research.png';
import activityTeaching from '../assets/teaching.png';

import type { SiteContent } from '@/shared/model/site-content.types';

export const DEFAULT_ACTIVITY_TITLE = 'Сервис и услуги';

export const DEFAULT_ACTIVITY_CARDS: SiteContent['activityCards'] = [
  {
    number: '01',
    title: 'Научные исследования и разработки',
    description:
      'Исследуем новые технологии, фундаментальные принципы защиты и создаем инженерные решения для безопасной робототехники.',
    image: activityResearch,
  },
  {
    number: '02',
    title: 'Разработка новых программных и аппаратных решений',
    description:
      'Проектируем и создаем программные и аппаратные компоненты с учетом требований к доверенной разработке.',
    image: activityNewProducts,
  },
  {
    number: '03',
    title: 'Обучение в рамках федерального проекта «Кадры для БАС»',
    description: 'Развиваем компетенции специалистов и помогаем внедрять эффективные меры безопасности.',
    image: activityTeaching,
  },
  {
    number: '04',
    title: 'Организация и проведение соревнований в области БАС',
    description: 'Создаем площадки, где команды могут испытать идеи, системы и разработки в реальных условиях.',
  },
];
