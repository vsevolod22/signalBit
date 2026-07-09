import heroArrow from '../assets/hero-arrow.png';
import heroDrone from '../assets/hero-drone.png';

import type { SiteContent } from '@/shared/model/site-content.types';

export const DEFAULT_HERO_CONTENT: SiteContent['hero'] = {
  title: 'ТЕХНОЛОГИИ',
  subtitle: 'которые летают за вас',
  headline: 'Ваши задачи - наше профессиональное решение',
  description:
    'Ваша безопасность и надежность - наш главный приоритет. Мы разрабатываем передовые интегрированные решения для беспилотных авиационных систем, которые минимизируют риски безопасности и гарантируют максимальную защиту на каждом этапе работы.',
  image: heroDrone,
  arrowImage: heroArrow,
};
