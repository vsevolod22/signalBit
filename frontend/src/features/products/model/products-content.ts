import canaryBottom from '../assets/canary/canary-bottom-view.png';
import canaryMiddle from '../assets/canary/canary-middle-view.png';
import canaryTop from '../assets/canary/canary-top-view.png';
import controllerImage from '../assets/flight-controller/controller-board-detail.png';
import controllerFirst from '../assets/flight-controller/controller-gallery-01.png';
import controllerSecond from '../assets/flight-controller/controller-gallery-02.png';
import controllerThird from '../assets/flight-controller/controller-gallery-03.png';
import sensorFirst from '../assets/sensor/sensor-gallery-01.png';
import sensorSecond from '../assets/sensor/sensor-gallery-02.png';
import sensorThird from '../assets/sensor/sensor-gallery-03.png';
import servicePrice1 from '../assets/shared/service-product-01.png';
import servicePrice2 from '../assets/shared/service-product-02.png';
import servicePrice3 from '../assets/shared/service-product-03.png';
import servicePrice4 from '../assets/shared/service-product-04.png';

import type { SiteContent } from '@/shared/model/site-content.types';

export const DEFAULT_PRODUCTS_TITLE = 'Продукты';

export const DEFAULT_PRODUCTS: SiteContent['products'] = [
  {
    slug: 'canary',
    title: 'Канарейка для обнаружения БАС',
    lead: 'Система обнаружения и нейтрализации БАС сканирует эфир, выявляет тип и предполагаемые цели беспилотной системы.',
    description: [
      'Распознавание в реальном времени угроз и радиоуправляемых устройств.',
      'Автоматическое противодействие выбранному сценарию атаки.',
      'Интеграция с существующими решениями защиты объектов критической инфраструктуры.',
    ],
    price: 'от 87 тыс. руб.',
    images: [canaryTop, canaryMiddle, canaryBottom],
  },
  {
    slug: 'flight-controller',
    title: 'Платформа для управления и мониторинга БПЛА «Ласточка»',
    lead: 'Собственные полетные контроллеры, станции и мониторинг для безопасного управления беспилотными аппаратами.',
    description: [
      '3D-модель местности для точного позиционирования и адаптации к полевым условиям.',
      'Режимы совместимости с открытыми прошивками коммерческих производителей.',
      'Минимальная проприетарная зависимость за счет модульной архитектуры.',
    ],
    price: 'стоимость от 100 тыс. руб.',
    images: [controllerFirst, controllerSecond, controllerThird, controllerImage],
    cta: 'Ознакомиться с демонстрационной версией',
    featured: true,
  },
  {
    slug: 'sensor',
    title: '«Сорока» для повышения киберустойчивости БАС',
    lead: 'Программно-аппаратная платформа сканирует радиочастотный спектр и помогает обнаруживать опасные сигналы.',
    description: [
      'Мгновенно обнаруживает угрозы и радиоактивность в выбранном диапазоне.',
      'Автоматически принимает решения и оповещает пользователя.',
      'Работает автономно в радиусе до 2 км при секторе получения данных 140 градусов.',
    ],
    price: 'от 204 тыс. руб.',
    images: [sensorFirst, sensorSecond, sensorThird],
  },
  {
    slug: 'autonomous-control',
    title: 'Системы управления автономными роботами',
    lead: 'Программные комплексы для управления робототехническими системами и интеграции с внешними сервисами мониторинга.',
    description: [
      'Проектирование логики управления под реальные сценарии эксплуатации.',
      'Интеграция с картографией, телеметрией и пользовательскими интерфейсами.',
      'Разработка прототипов и сопровождение внедрения на объекте.',
    ],
    price: 'от 350 тыс. руб.',
    images: [servicePrice1, controllerFirst, controllerSecond],
  },
  {
    slug: 'cyberphysical-safety',
    title: 'Системы безопасности киберфизических систем',
    lead: 'Решения для анализа аномалий, реагирования на инциденты и повышения устойчивости критичных систем.',
    description: [
      'Выявление подозрительной активности в киберфизической среде.',
      'Сценарии реагирования на инциденты безопасности.',
      'Интеграция с существующими средствами защиты и мониторинга.',
    ],
    price: 'от 520 тыс. руб.',
    images: [servicePrice2, sensorFirst, sensorSecond],
  },
  {
    slug: 'hardware-sensors',
    title: 'Платы управления и аппаратные датчики',
    lead: 'Аппаратные компоненты и датчики с собственным микропрограммным обеспечением для робототехники.',
    description: [
      'Разработка печатных плат и аппаратных модулей под задачу.',
      'Микропрограммное обеспечение для работы с датчиками и исполнительными устройствами.',
      'Подготовка к испытаниям, валидации и малосерийному производству.',
    ],
    price: 'от 510 тыс. руб.',
    images: [servicePrice4, controllerImage, servicePrice3],
  },
];
