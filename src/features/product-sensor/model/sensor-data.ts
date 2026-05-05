import introFirst from '../assets/img1.png';
import introSecond from '../assets/img2.png';
import introThird from '../assets/img3.png';
import productFirst from '../assets/sen1.png';
import productSecond from '../assets/sen2.png';
import z1 from '../assets/z1.svg';
import z2 from '../assets/z2.svg';
import z3 from '../assets/z3.svg';
import z4 from '../assets/z4.svg';
import z5 from '../assets/z5.svg';
import z6 from '../assets/z6.svg';
import z7 from '../assets/z7.svg';

export interface SensorParameter {
  img: string;
  text: string;
  isPrice?: boolean;
}

export const SENSOR_INTRO_IMAGES = {
  first: introFirst,
  second: introSecond,
  third: introThird,
} as const;

export const SENSOR_PRODUCT_IMAGES = {
  first: productFirst,
  second: productSecond,
} as const;

export const SENSOR_PARAMETER_ITEMS: SensorParameter[] = [
  {
    img: z1,
    text: 'Возможность сканирования диапазонов частот 820-920 МГц, 2,4-2,485 ГГц, 5,6-5,9 ГГц',
  },
  {
    img: z2,
    text: 'Звуковое и световое оповещение пользователя при обнаружении БАС или радиоуправляемого устройства',
  },
  {
    img: z3,
    text: 'Возможность работы в трех режимах:\n- сканирование радиочастотного спектра без обнаружения,\n- сканирование радиочастотного спектра с применением алгоритмов обнаружения,\n- глушение',
  },
  {
    img: z5,
    text: 'Наличие алгоритма обнаружения, который определяет опасность по ширине столбцов, плотности сигнала или по количеству истинных срабатываний',
  },
  {
    img: z6,
    text: 'Дальность работы в пределах 2 км с сектором получения данных в 140',
  },
  {
    img: z7,
    text: 'Возможность использовать как индивидуальное носимое устройство и выносимое на стойке устройство',
  },
];

export const SENSOR_PRICE_ITEM: SensorParameter = {
  img: z4,
  text: '7 тыс. руб.',
  isPrice: true,
};

export const SENSOR_PARAMETER_COLUMNS = [
  [SENSOR_PARAMETER_ITEMS[0], SENSOR_PARAMETER_ITEMS[1], SENSOR_PARAMETER_ITEMS[2], SENSOR_PRICE_ITEM],
  [SENSOR_PARAMETER_ITEMS[3], SENSOR_PARAMETER_ITEMS[4], SENSOR_PARAMETER_ITEMS[5]],
] as const;
