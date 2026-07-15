import type { SiteContent } from '@/shared/model/site-content.types';
import activityNewProducts from '../assets/product-development-icon.png';
import activityResearch from '../assets/research-icon.png';
import activityTeaching from '../assets/training-icon.png';

export const DEFAULT_ACTIVITY_TITLE = 'Сервис и услуги';

export const DEFAULT_ACTIVITY_CARDS: SiteContent['activityCards'] = [
  {
    number: '01',
    title: 'Научные исследования\nи разработки',
    description:
      'Наша команда глубоко исследует фундаментальные принципы науки и инженерии, чтобы предложить уникальные, эффективные и готовые к внедрению решения',
    image: activityResearch,
  },
  {
    number: '02',
    title: 'Разработка новых программных и аппаратных решений',
    description:
      'Весь цикл разработки, начиная от проектирования и заканчивая созданием, строится с учётом требований к доверенной разработке и пожеланий заказчика',
    image: activityNewProducts,
  },
  {
    number: '03',
    title: 'Обучение в рамках Федерального проекта «Кадры для БАС»',
    description:
      'Помогаем развивать компетенции в области пилотирования, проектирования и сборки беспилотных авиационных систем',
    image: activityTeaching,
  },
  {
    number: '04',
    title: 'Организация и проведение соревнований в области БАС',
    description:
      'Создаем площадку, где каждый может показать себя и прокачать свои навыки в разработке беспилотных решений',
  },
];
