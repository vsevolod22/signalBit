import bottom from '../assets/bottom.png';
import creation1 from '../assets/creation_1.png';
import creation2 from '../assets/creation_2.png';
import creation3 from '../assets/creation_3.png';
import creation4 from '../assets/creation_4.png';
import creation5 from '../assets/creation_5.png';
import creation6 from '../assets/creation_6.png';
import demonstrationVideo from '../assets/demonstration.mp4';
import middle from '../assets/middle.png';
import money from '../assets/money.png';
import top from '../assets/top.png';

export interface ProductParameter {
  img: string;
  text: string;
  isPrice?: boolean;
}

export const CANARY_SHOWCASE_IMAGES = {
  top,
  middle,
  bottom,
} as const;

export const CANARY_VIDEO = demonstrationVideo;

export const CANARY_PARAMETER_ITEMS: ProductParameter[] = [
  {
    img: creation1,
    text: 'Возможность выявления и классификации БПЛА в радиочастотном диапазоне с повышенной точностью',
  },
  {
    img: creation2,
    text: 'Выявление координат БПЛА и расстояние до БПЛА',
  },
  {
    img: creation3,
    text: 'Определение функциональных возможностей БПЛА на основе собранной о нем информации',
  },
  {
    img: creation4,
    text: 'Определение типа сценария для активного противодействия БПЛА позволяющего повысить эффективность системы защиты и безопасность охраняемого объекта критической информационной инфраструктуры',
  },
  {
    img: creation5,
    text: 'Возможность интеграции с существующими решениями по противодействию БПЛА с целью повышения эффективности их работы, в частности, для управления системами глушения связи и реализации интеллектуального глушения',
  },
  {
    img: creation6,
    text: 'Повышенная длительность работы за счет переключения между режимами пассивного ожидания и активного противодействия',
  },
];

export const CANARY_PRICE_ITEM: ProductParameter = {
  img: money,
  text: '80 тыс. руб.',
  isPrice: true,
};

export const CANARY_PARAMETER_COLUMNS = [
  [CANARY_PARAMETER_ITEMS[0], CANARY_PARAMETER_ITEMS[2], CANARY_PARAMETER_ITEMS[4], CANARY_PRICE_ITEM],
  [CANARY_PARAMETER_ITEMS[1], CANARY_PARAMETER_ITEMS[3], CANARY_PARAMETER_ITEMS[5]],
] as const;
