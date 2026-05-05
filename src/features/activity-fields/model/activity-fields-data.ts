import newProducts from '../assets/new_products.png';
import research from '../assets/research.png';
import teaching from '../assets/teaching.png';

export interface ActivityField {
  img: string;
  title: string;
  description: string;
}

export const ACTIVITY_FIELDS: ActivityField[] = [
  {
    img: research,
    title: 'Научные исследования и разработки',
    description:
      'Постоянное изучение новых технологий, исследование фундаментальных принципов и создание новых научных и инженерных решений.',
  },
  {
    img: newProducts,
    title: 'Разработка новых программных и аппаратных решений',
    description:
      'Весь цикл разработки, начиная от проектирования и заканчивая созданием, строится с учётом требований к доверенной разработке, что очень важно для обеспечения безопасности.',
  },
  {
    img: teaching,
    title: 'Обучение и консультация в сфере безопасности',
    description:
      'Помогаем развивать компетенции и принимать эффективные меры для предотвращения угроз и минимизации рисков безопасности. Также предоставляем эффективные рекомендации, советы и экспертное мнение по вопросам безопасности.',
  },
];
