import servicePrice1 from '../assets/price1.png';
import servicePrice2 from '../assets/price2.png';
import servicePrice3 from '../assets/price3.png';
import servicePrice4 from '../assets/price4.png';

import type { SiteContent } from '@/shared/model/site-content.types';

export const DEFAULT_DEVELOPMENT_TITLE = 'Разработки';

export const DEFAULT_DEVELOPMENTS: SiteContent['developments'] = [
  {
    title: 'Системы управления беспилотными системами',
    description: 'Проектирование, разработка и внедрение программных платформ управления беспилотными системами.',
    technologies: 'C++, Python (Django), React JS',
    cost: 'от 350 тыс. руб.',
    image: servicePrice1,
  },
  {
    title: 'Интеллектуальные системы реагирования на инциденты',
    description: 'Проектирование и внедрение решений по анализу и выявлению аномалий в киберфизических системах.',
    technologies: 'C++, Python, Django',
    cost: 'от 520 тыс. руб.',
    image: servicePrice2,
  },
  {
    title: 'Программно-аппаратные комплексы управления полетом',
    description: 'Разработка и внедрение компонентов управления БПЛА и интеграции с внешними системами.',
    technologies: 'Python, TensorFlow, Keras',
    cost: 'от 440 тыс. руб.',
    image: servicePrice3,
  },
  {
    title: 'Платы управления и аппаратные датчики',
    description: 'Создание аппаратных компонентов с собственным микропрограммным обеспечением.',
    technologies: 'КОМПАС-3D, Altium Designer, Arm GCC',
    cost: 'от 510 тыс. руб.',
    image: servicePrice4,
  },
];
