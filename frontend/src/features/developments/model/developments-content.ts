import type { SiteContent } from '@/shared/model/site-content.types';
import servicePrice1 from '../assets/development-service-01.png';
import servicePrice2 from '../assets/development-service-02.png';
import servicePrice3 from '../assets/development-service-03.png';
import servicePrice4 from '../assets/development-service-04.png';

export const DEFAULT_DEVELOPMENT_TITLE = 'Разработки';

export const DEFAULT_DEVELOPMENTS: SiteContent['developments'] = [
  {
    title: 'Системы управления беспилотными системами',
    description: 'Проектирование, разработка и внедрение программных платформ управления беспилотными системами',
    technologies: 'Python (Django), React JS (HTML, CSS, JS, Redux Toolkit)',
    cost: 'от 50 тыс. руб.',
    image: servicePrice1,
  },
  {
    title: 'Интеллектуальные системы реагирования на инциденты',
    description:
      'Проектирование, разработка и внедрение решений по анализу и выявлению непредвиденного поведения в автоматизированном комплексе, а также своевременное реагирование на инциденты безопасности',
    technologies: 'C++, Python, tensorflow+keras',
    cost: 'от 120 тыс. руб.',
    image: servicePrice2,
  },
  {
    title: 'Программно-аппаратные комплексы управления полетом',
    description:
      'Проектирование, разработка и внедрение комплексных решений для автоматизации управления беспилотными системами',
    technologies: 'C#, C++, OSM, Avalonia, BruTile, Mapsui, ScottPlot',
    cost: 'от 30 тыс. руб.',
    image: servicePrice3,
  },
  {
    title: 'Платы управления и аппаратные датчики',
    description:
      'Проектирование, разработка и создание аппаратных компонентов с собственным микропрограммным обеспечением',
    technologies: 'КОМПАС-3D, Altium Designer, Arm gcc none eabi, Eigen3',
    cost: 'от 10 тыс. руб.',
    image: servicePrice4,
  },
];
