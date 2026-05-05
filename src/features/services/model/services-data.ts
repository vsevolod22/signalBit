import price1 from '../assets/price1.png';
import price2 from '../assets/price2.png';
import price3 from '../assets/price3.png';
import price4 from '../assets/price4.png';

export interface ServiceItem {
  img: string;
  title: string;
  description: string;
  technologies: string;
  cost: string;
}

export const SERVICE_ITEMS: ServiceItem[] = [
  {
    img: price1,
    title: 'Системы управления автономными роботами',
    description:
      'Проектирование, разработка и внедрение собственных систем управления автоматизированными комплексами',
    technologies: 'C++, Python (Django), React JS (HTML, CSS, JS, Redux Toolkit)',
    cost: 'от 350 тыс. руб.',
  },
  {
    img: price2,
    title: 'Системы безопасности киберфизических систем',
    description:
      'Проектирование, разработка и внедрение решений по анализу и выявлению аномалий в киберфизической системе, а также своевременное реагирование на инциденты безопасности',
    technologies: ' C++, Python (Django)',
    cost: 'от 520 тыс. руб.',
  },
  {
    img: price3,
    title: 'Системы интеллектуального управления',
    description:
      'Проектирование, разработка и внедрение комплексных решений для автоматизации управления киберфизическими системами',
    technologies: 'Python, tensorflow+keras',
    cost: 'от 440 тыс. руб.',
  },
  {
    img: price4,
    title: 'Платы управления и аппаратные датчики',
    description:
      'Проектирование, разработка и создание аппаратных компонентов с собственным микропрограммным обеспечением',
    technologies: 'КОМПАС-3D, Altium Designer, Arm gcc none eabi, Cmake, Eigen3',
    cost: 'от 510 тыс. руб.',
  },
];
