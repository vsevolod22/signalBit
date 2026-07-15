import { applyRussianContentManagerLabels } from './admin/content-manager-labels';

const singleTypes = [
  {
    uid: 'api::hero.hero',
    data: {
      title: 'ТЕХНОЛОГИИ,',
      description: 'Ваши задачи – наше профессиональное решение',
      secondaryTitle: 'которые летают за вас',
      secondaryDescription:
        'Ваша безопасность и надежность – наш главный приоритет! Мы разрабатываем передовые интегрированные решения для беспилотных авиационных систем, которые минимизируют риски безопасности и гарантируют максимальную защиту на каждом этапе работы.',
    },
  },
  {
    uid: 'api::about-company.about-company',
    data: {
      missionTitle: 'СИГНАЛ-БИТ создает передовые беспилотные решения, которым можно доверять',
      companyLabel: 'Мы ИТ-компания',
      paragraphs: [
        'Залог нашего успеха – постоянное стремление к реализации стратегических целей компании.',
        'В нашей команде работают опытные специалисты в области проектирования и разработки программных и аппаратных решений для беспилотных авиационных систем, а также специалисты в области информационной безопасности.',
        'Являемся резидентами АНО «НПЦ БАС ТО» и АНО «НПЦ БАС «ТулаДрон».',
      ],
      stats: [
        { value: '3+', text: 'завершенные научно-исследовательские работы в рамках университета' },
        { value: '3', text: 'грантовые поддержки на реализацию технологических идей' },
        { value: '5', text: 'инновационных проектов, которые получили апробацию' },
      ],
      officialTitle: 'Общество с ограниченной ответственностью «СИГНАЛ-БИТ»',
      officialItems: [
        'ИНН 6154166039',
        'ОГРН 1236100028493',
        'Ростовская область, г. Таганрог, ул. Лесная Биржа, д. 20-б, оф. 2',
      ],
    },
  },
  {
    uid: 'api::site-navigation.site-navigation',
    data: {
      links: [
        { label: 'Сервис и услуги', sectionIndex: 1 },
        { label: 'Разработки', sectionIndex: 2 },
        { label: 'Образование', sectionIndex: 3 },
        { label: 'Продукты', sectionIndex: 4 },
        { label: 'О нас', sectionIndex: 5 },
      ],
      productLinks: [],
      contactLabel: 'Свяжитесь с нами',
      contactSectionIndex: 6,
    },
  },
  {
    uid: 'api::site-footer.site-footer',
    data: {
      text: 'Проект выполнен при поддержке Фонда содействия развитию малых форм предприятий в научно-технической сфере',
    },
  },
  {
    uid: 'api::contact-setting.contact-setting',
    data: {
      questionTitle: 'Остались вопросы?',
      emailLabel: 'Напишите нам на почту',
      emailAddress: 'sigbit@yandex.ru',
      responseText: 'Мы свяжемся с вами на следующий рабочий день и ответим на все интересующие вопросы.',
      formEyebrow: 'Обратная связь',
      formTitle: 'Расскажите, чем мы можем помочь',
      formDescription:
        'Оставьте удобный способ связи и коротко опишите вопрос. Заявка сразу появится в админ-панели Strapi.',
      partnersTitle: 'Наши партнеры',
      partnerLogos: [
        { name: 'ЮФУ', code: 'sfedu' },
        { name: 'ИКТИБ', code: 'ictis' },
        { name: 'Интегра', code: 'integra' },
      ],
    },
  },
  {
    uid: 'api::activity-setting.activity-setting',
    data: {
      sectionTitle: 'Сервис и услуги',
      educationEyebrow: 'Образование',
      educationTitle: 'Регистрация на образовательные курсы',
      parentFieldsTitle: 'Данные родителя для детского курса',
    },
  },
  {
    uid: 'api::service-setting.service-setting',
    data: {
      sectionTitle: 'Разработки',
      technologiesLabel: 'Используемые технологии',
      costLabel: 'Стоимость',
    },
  },
  {
    uid: 'api::achievement-setting.achievement-setting',
    data: {
      sectionTitle: 'Наши достижения',
    },
  },
  {
    uid: 'api::seo-setting.seo-setting',
    data: {
      metaTitle: 'СИГНАЛ-БИТ — беспилотные системы и кибербезопасность БАС',
      metaDescription:
        'СИГНАЛ-БИТ разрабатывает системы управления, обнаружения и киберзащиты БАС, полётные контроллеры и аппаратные решения для беспилотной авиации.',
      keywords:
        'СИГНАЛ-БИТ, беспилотные авиационные системы, БАС, БПЛА, кибербезопасность, полётные контроллеры',
      robots: 'index, follow',
      socialTitle: 'СИГНАЛ-БИТ — беспилотные системы и кибербезопасность',
      socialDescription:
        'Системы управления, обнаружения и киберзащиты для безопасной эксплуатации беспилотной авиации.',
      organizationName: 'СИГНАЛ-БИТ',
      legalName: 'Общество с ограниченной ответственностью «СИГНАЛ-БИТ»',
      organizationDescription:
        'Разработка безопасных программных и аппаратных решений для робототехники и беспилотных авиационных систем.',
      organizationAddress: 'Ростовская область, г. Таганрог, ул. Лесная Биржа, д. 20-б, оф. 2',
    },
  },
];

const collectionTypes = [
  {
    uid: 'api::activity-field.activity-field',
    uniqueField: 'title',
    items: [
      {
        title: 'Научные исследования\nи разработки',
        description:
          'Наша команда глубоко исследует фундаментальные принципы науки и инженерии, чтобы предложить уникальные, эффективные и готовые к внедрению решения',
        sortOrder: 10,
      },
      {
        title: 'Разработка новых программных и аппаратных решений',
        description:
          'Весь цикл разработки, начиная от проектирования и заканчивая созданием, строится с учётом требований к доверенной разработке и пожеланий заказчика',
        sortOrder: 20,
      },
      {
        title: 'Обучение в рамках Федерального проекта «Кадры для БАС»',
        description:
          'Помогаем развивать компетенции в области пилотирования, проектирования и сборки беспилотных авиационных систем',
        sortOrder: 30,
      },
      {
        title: 'Организация и проведение соревнований в области БАС',
        description:
          'Создаем площадку, где каждый может показать себя и прокачать свои навыки в разработке беспилотных решений',
        sortOrder: 40,
      },
    ],
  },
  {
    uid: 'api::service.service',
    uniqueField: 'title',
    items: [
      {
        title: 'Системы управления беспилотными системами',
        description: 'Проектирование, разработка и внедрение программных платформ управления беспилотными системами',
        technologies: 'Python (Django), React JS (HTML, CSS, JS, Redux Toolkit)',
        cost: 'от 50 тыс. руб.',
        sortOrder: 10,
      },
      {
        title: 'Интеллектуальные системы реагирования на инциденты',
        description:
          'Проектирование, разработка и внедрение решений по анализу и выявлению непредвиденного поведения в автоматизированном комплексе, а также своевременное реагирование на инциденты безопасности',
        technologies: 'C++, Python, tensorflow+keras',
        cost: 'от 120 тыс. руб.',
        sortOrder: 20,
      },
      {
        title: 'Программно-аппаратные комплексы управления полетом',
        description:
          'Проектирование, разработка и внедрение комплексных решений для автоматизации управления беспилотными системами',
        technologies: 'C#, C++, OSM, Avalonia, BruTile, Mapsui, ScottPlot',
        cost: 'от 30 тыс. руб.',
        sortOrder: 30,
      },
      {
        title: 'Платы управления и аппаратные датчики',
        description:
          'Проектирование, разработка и создание аппаратных компонентов с собственным микропрограммным обеспечением',
        technologies: 'КОМПАС-3D, Altium Designer, Arm gcc none eabi, Eigen3',
        cost: 'от 10 тыс. руб.',
        sortOrder: 40,
      },
    ],
  },
  {
    uid: 'api::product.product',
    uniqueField: 'slug',
    items: [
      {
        name: 'СОКОЛ',
        slug: 'sokol',
        price: 'от 100 000 руб.',
        headline: 'СОКОЛ',
        lead:
          'Платформа для автономного пилотирования БАС, обеспечивающая позиционирование, удержание высоты и выполнение миссии по видеопотоку без участия оператора.',
        sortOrder: 10,
        features: [
          { text: 'Высокая частота обновления данных и низкая задержка выдачи решения, система восстанавливает захват за ≤ 1.5 секунды без перезагрузки', sortOrder: 10 },
          { text: 'Способность алгоритмов работать на низкоконтрастных поверхностях', sortOrder: 20 },
          { text: 'Конструкция подвеса и платформы рассчитана на пиковые нагрузки силовой установки БАС', sortOrder: 30 },
          { text: 'При пропадании данных ГНСС переход на визуальную навигацию занимает ≤ 1 секунды', sortOrder: 40 },
        ],
      },
      {
        name: 'АИСТ',
        slug: 'aist-basic',
        price: 'от 30 000 руб.',
        headline: 'АИСТ',
        lead:
          'Программно-аппаратный комплекс управления полетом и модуль оптической навигации для визуального пилотирования и полета от первого лица.',
        featured: true,
        sortOrder: 20,
        features: [
          { text: 'Собственное решение: полный цикл разработки от аппаратного обеспечения до прикладного ПО, собственная прошивка полетного контроллера на основе математической модели', sortOrder: 10 },
          { text: 'Интеграция: изделие может использоваться как самостоятельное решение для управления полётом БАС, так и встраиваться в существующую систему управления за счёт модульной архитектуры', sortOrder: 20 },
          { text: 'Инженерная надежность: виброразвязка датчиков с их размещением в центре масс БАС + возможность замены силового модуля без демонтажа всей системы', sortOrder: 30 },
        ],
      },
      {
        name: 'АИСТ',
        slug: 'aist-autonomous',
        price: 'от 50 000 руб.',
        headline: 'АИСТ',
        lead:
          'Программно-аппаратный комплекс управления полетом и модуль оптической навигации для визуального пилотирования и полета от первого лица.',
        sortOrder: 30,
        features: [
          { text: 'Высокая автономность и точность, которая обеспечивается комплексированием данных от инерциальной навигационной системы и бортовыми сенсорами', sortOrder: 10 },
          { text: 'Модульная и гибкая архитектура, которая обеспечивает легкую интеграцию в существующие системы', sortOrder: 20 },
          { text: 'Полный цикл разработки от аппаратного обеспечения до прикладного ПО, собственная прошивка полетного контроллера на основе математической модели', sortOrder: 30 },
          { text: 'Интеграция: изделие может использоваться как самостоятельное решение для управления полётом БАС, так и встраиваться в существующую систему управления за счёт модульной архитектуры', sortOrder: 40 },
        ],
      },
      {
        name: 'СОРОКА',
        slug: 'soroka',
        price: 'от 70 000 руб.',
        headline: 'СОРОКА',
        lead:
          'Платформа со встроенными механизмами повышения киберустойчивости и автономного пилотирования, реализованная на полетном контроллере.',
        sortOrder: 40,
        features: [
          { text: 'Комплексная киберустойчивость, которая обеспечивается на аппаратном уровне, интегрируясь во все критические компоненты БАС: от полетного контроллера до внешних датчиков', sortOrder: 10 },
          { text: 'Обнаружение атак и принятие решений в режиме реального времени, что повышает живучесть и отказоустойчивость БАС', sortOrder: 20 },
          { text: 'Решение принимается на борту без участия оператора, даже если была потеряна связь с БАС, Сорока продолжает управлять БАС по резервным датчикам', sortOrder: 30 },
        ],
      },
    ],
  },
  {
    uid: 'api::achievement.achievement',
    uniqueField: 'sortOrder',
    items: [
      { title: 'Сертификат подтверждения технических характеристик', sortOrder: 10 },
      { title: 'Сертификат подтверждения технических характеристик', sortOrder: 20 },
      { title: 'Сертификат подтверждения технических характеристик «Сорока»', sortOrder: 30 },
      { title: 'Сертификат подтверждения технических характеристик учебного БВС «АИСТ»', sortOrder: 40 },
      { title: 'Диплом за третье место в Премьер-лиге', sortOrder: 50 },
      { title: 'Свидетельство о государственной регистрации программы для ЭВМ', sortOrder: 60 },
      { title: 'Свидетельство о государственной регистрации программы для ЭВМ', sortOrder: 70 },
      { title: 'Свидетельство о государственной регистрации программы для ЭВМ', sortOrder: 80 },
      { title: 'Свидетельство о государственной регистрации программы для ЭВМ', sortOrder: 90 },
      { title: 'Свидетельство о государственной регистрации программы для ЭВМ', sortOrder: 100 },
      { title: 'Диплом победителя Премьер-лиги', sortOrder: 110 },
    ],
  },
];

function getMissingData(existing, data) {
  return Object.entries(data).reduce((missingData, [key, value]) => {
    const existingValue = existing?.[key];

    if (existingValue === undefined || existingValue === null || existingValue === '') {
      missingData[key] = value;
    }

    return missingData;
  }, {});
}

async function seedSingleType(strapi, uid, data) {
  const existing = await strapi.entityService.findMany(uid, { limit: 1, populate: '*' });

  if (!existing) {
    await strapi.entityService.create(uid, { data });
    return;
  }

  const missingData = getMissingData(existing, data);

  if (Object.keys(missingData).length > 0) {
    await strapi.entityService.update(uid, existing.id, { data: missingData });
  }
}

async function seedCollectionType(strapi, uid, uniqueField, items) {
  for (const item of items) {
    const existing = await strapi.entityService.findMany(uid, {
      filters: { [uniqueField]: item[uniqueField] },
      limit: 1,
      populate: '*',
    });

    if (existing.length === 0) {
      await strapi.entityService.create(uid, { data: item });
      continue;
    }

    const missingData = getMissingData(existing[0], item);

    if (Object.keys(missingData).length > 0) {
      await strapi.entityService.update(uid, existing[0].id, { data: missingData });
    }
  }
}

export default {
  register() {},
  async bootstrap({ strapi }) {
    await applyRussianContentManagerLabels(strapi);

    for (const { uid, data } of singleTypes) {
      await seedSingleType(strapi, uid, data);
    }

    for (const { uid, uniqueField, items } of collectionTypes) {
      await seedCollectionType(strapi, uid, uniqueField, items);
    }

    await applyRussianContentManagerLabels(strapi);
  },
};
