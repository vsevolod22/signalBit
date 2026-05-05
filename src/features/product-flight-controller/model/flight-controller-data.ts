import controller from '../assets/fc1.png';
import introFirst from '../assets/img1.png';
import introSecond from '../assets/img2.png';
import introThird from '../assets/img3.png';
import z1 from '../assets/z1.svg';
import z2 from '../assets/z2.svg';
import z3 from '../assets/z3.svg';
import z4 from '../assets/z4.svg';
import z5 from '../assets/z5.svg';
import z6 from '../assets/z6.svg';
import z7 from '../assets/z7.svg';

export interface FlightControllerParameter {
  img: string;
  text: string;
  isPrice?: boolean;
}

export const FLIGHT_CONTROLLER_IMAGES = {
  first: introFirst,
  second: introSecond,
  third: introThird,
  controller,
} as const;

export const FLIGHT_CONTROLLER_PARAMETER_ITEMS: FlightControllerParameter[] = [
  {
    img: z1,
    text: 'Собственное аппаратное и программное решение',
  },
  {
    img: z2,
    text: 'Режим совместимости с открытыми прошивками коммерческих производителей полетных контроллеров',
  },
  {
    img: z3,
    text: 'Открытая схема платформы для реализации своего автопилота',
  },
  {
    img: z5,
    text: 'Возможность установить на БПЛА мультироторного типа с различным числом лучей',
  },
  {
    img: z6,
    text: 'Минимальная проприетарная зависимость, обеспечиваемая модульностью',
  },
  {
    img: z7,
    text: 'Возможность комбинирования навигационных систем, повышение отказоустойчивости глобальных навигационных систем',
  },
];

export const FLIGHT_CONTROLLER_PRICE_ITEM: FlightControllerParameter = {
  img: z4,
  text: '7,2 тыс. руб.',
  isPrice: true,
};

export const FLIGHT_CONTROLLER_PARAMETER_COLUMNS = [
  [
    FLIGHT_CONTROLLER_PARAMETER_ITEMS[0],
    FLIGHT_CONTROLLER_PARAMETER_ITEMS[1],
    FLIGHT_CONTROLLER_PARAMETER_ITEMS[2],
    FLIGHT_CONTROLLER_PRICE_ITEM,
  ],
  [
    FLIGHT_CONTROLLER_PARAMETER_ITEMS[3],
    FLIGHT_CONTROLLER_PARAMETER_ITEMS[4],
    FLIGHT_CONTROLLER_PARAMETER_ITEMS[5],
  ],
] as const;
