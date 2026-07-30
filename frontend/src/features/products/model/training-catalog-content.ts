import trainingGallery01 from '@/features/products/assets/training-bas/training-01.jpg';
import trainingGallery02 from '@/features/products/assets/training-bas/training-02.jpg';
import trainingGallery03 from '@/features/products/assets/training-bas/training-03.jpg';
import trainingGallery04 from '@/features/products/assets/training-bas/training-04.jpg';
import trainingGallery05 from '@/features/products/assets/training-bas/training-05.jpg';
import trainingWave from '@/features/products/assets/training-bas/training-wave.svg';
import trainingCharacteristics from '@/features/products/model/training-characteristics.json';
import type { ProductCard, ProductCharacteristic } from '@/shared/model/site-content';

interface TrainingCharacteristicRow extends ProductCharacteristic {
  sortOrder: number;
}

function mapCharacteristics(rows: TrainingCharacteristicRow[]): ProductCharacteristic[] {
  return rows.map(({ name, section, unit, value }) => ({ name, section, unit, value }));
}

export const TRAINING_CATALOG_PRODUCT: ProductCard = {
  slug: 'training-bas',
  title: 'БАС',
  variant: 'учебные',
  slideType: 'catalog',
  theme: 'deep',
  lead: 'Базовые наборы учебных беспилотных летательных аппаратов позволят обучить навыкам пилотирования, сборки, настройки и программирования БАС.',
  description: [],
  price: '',
  images: [trainingGallery01, trainingGallery02, trainingGallery03, trainingGallery04, trainingGallery05],
  imagePositions: [
    { offsetX: -12, offsetY: 4, scale: 120 },
    { offsetX: 0, offsetY: 0, scale: 104 },
    { offsetX: -5, offsetY: 0, scale: 108 },
    { offsetX: 0, offsetY: -3, scale: 120 },
    { offsetX: -7, offsetY: 0, scale: 118 },
  ],
  backgroundColor: '#00536a',
  backgroundImage: trainingWave,
  catalogItems: [
    {
      code: 'aist',
      name: 'АИСТ',
      description: 'Отечественный учебный комплекс для обучения пилотированию и сборке.',
      kitTitle: 'состав набора',
      kit: [
        { title: 'полетный контроллер – 1 шт.' },
        { title: 'блок инерциальной навигационной системы – 1 шт.' },
        { title: 'плата распределения питания – 1 шт.' },
        { title: 'регуляторы скорости – 4 шт.' },
        { title: 'рама – 1 шт.' },
        { title: 'аккумулятор – 1 шт.' },
        { title: 'зарядное устройство – 1 шт.' },
        { title: 'приемник – 1 шт.' },
        { title: 'набор FPV (шлем/приемник + передатчик) – 1 шт.' },
        { title: 'камера – 1 шт.' },
        { title: 'встроенное программное обеспечение полётного контроллера' },
      ],
      priceLabel: 'Стоимость',
      price: 'от 45 000 руб.',
      characteristicsButtonLabel: 'Подробные характеристики',
      characteristicsTitle: 'Подробные характеристики — АИСТ',
      characteristics: mapCharacteristics(trainingCharacteristics.aist),
    },
    {
      code: 'colibri',
      name: 'КОЛИБРИ',
      description: 'Отечественный БАС для обучения внешнему пилотированию и пилотированию от первого лица.',
      kitTitle: 'состав набора',
      kit: [
        { title: 'полетный контроллер – 1 шт.' },
        { title: 'коллекторные моторы – 4 шт.' },
        { title: 'винты – 4 шт.' },
        { title: 'рама – 1 шт.' },
        { title: 'аккумулятор – 1 шт.' },
        { title: 'зарядное устройство – 1 шт.' },
        { title: 'встроенное программное обеспечение полётного контроллера' },
      ],
      priceLabel: 'Стоимость',
      price: 'от 20 000 руб.',
      characteristicsButtonLabel: 'Подробные характеристики',
      characteristicsTitle: 'Подробные характеристики — КОЛИБРИ',
      characteristics: mapCharacteristics(trainingCharacteristics.colibri),
    },
    {
      code: 'colibri-fpv',
      name: 'КОЛИБРИ FPV',
      description: 'Отечественный БАС для обучения внешнему пилотированию и пилотированию от первого лица.',
      kitTitle: 'состав набора',
      kit: [
        { title: 'полетный контроллер – 1 шт.' },
        { title: 'коллекторные моторы – 4 шт.' },
        { title: 'винты – 4 шт.' },
        { title: 'рама – 1 шт.' },
        { title: 'аккумулятор – 1 шт.' },
        { title: 'зарядное устройство – 1 шт.' },
        { title: 'набор FPV (шлем/приемник + передатчик) – 1 шт.' },
        { title: 'камера – 1 шт.' },
        { title: 'встроенное программное обеспечение полётного контроллера' },
      ],
      priceLabel: 'Стоимость',
      price: 'от 20 000 руб.',
      characteristicsButtonLabel: 'Подробные характеристики',
      characteristicsTitle: 'Подробные характеристики — КОЛИБРИ FPV',
      characteristics: mapCharacteristics(trainingCharacteristics.colibriFpv),
    },
  ],
};
