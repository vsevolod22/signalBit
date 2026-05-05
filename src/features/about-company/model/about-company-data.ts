import cFive from '../assets/c_five.svg';
import cThreePlus from '../assets/c_three.svg';
import cThree from '../assets/c_three1.svg';
import photo from '../assets/photo1.png';

export interface AboutCompanyStat {
  img: string;
  text: string;
}

export const ABOUT_COMPANY_IMAGES = {
  photo,
} as const;

export const ABOUT_COMPANY_PARAGRAPHS = [
  'Занимаемся разработкой безопасных программных и аппаратных решений, а также ИТ-консалтингом в сфере информационной безопасности.',
  'Залог нашего успеха – постоянное стремление к реализации стратегических целей компании.',
  'В нашей команде работают опытные специалисты в области проектирования и разработки программных и аппаратных решений, а также специалисты в области информационной безопасности.',
] as const;

export const ABOUT_COMPANY_STATS: AboutCompanyStat[] = [
  {
    img: cThreePlus,
    text: 'завершенные научно-исследовательские работы в рамках университета',
  },
  {
    img: cThree,
    text: 'грантовые поддержки на реализацию технологических идей',
  },
  {
    img: cFive,
    text: 'инновационных проектов, которые получили апробацию',
  },
];

export const OFFICIAL_INFO = {
  title: 'Общество с ограниченной ответственностью  «СИГНАЛ-БИТ»',
  items: [
    'ИНН 6154166039',
    'ОГРН 1236100028493',
    'Ростовская область, г. Таганрог, ул. Лесная Биржа, д. 20-б, оф. 2 ',
  ],
} as const;

export const MOBILE_OFFICIAL_INFO = {
  title: 'Общество с ограниченной ответственностью "СИГНАЛ БИТ"',
  items: [
    'ИНН 6154166039',
    'ОГРН 1236100028493',
    'Ростовская область, г. Таганрог, ул. Лесная Биржа, д. 20-б, оф. 2 г',
  ],
} as const;
