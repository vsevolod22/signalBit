interface ContentManagerConfiguration {
  uid: string;
  type: 'contentType' | 'component';
  labels: Record<string, string>;
  listFields?: string[];
  mainField?: string;
}

const configurations: ContentManagerConfiguration[] = [
  {
    uid: 'api::hero.hero',
    type: 'contentType',
    labels: {
      title: 'Заголовок',
      description: 'Описание',
      secondaryTitle: 'Дополнительный заголовок',
      secondaryDescription: 'Дополнительное описание',
      logo: 'Логотип',
      rightHand: 'Изображение справа',
      leftHand: 'Изображение слева',
    },
    listFields: ['id', 'title', 'description', 'secondaryTitle'],
    mainField: 'title',
  },
  {
    uid: 'api::about-company.about-company',
    type: 'contentType',
    labels: {
      missionTitle: 'Заголовок миссии',
      companyLabel: 'Подпись компании',
      paragraphs: 'Абзацы описания',
      stats: 'Показатели',
      officialTitle: 'Официальное наименование',
      officialItems: 'Реквизиты',
      photo: 'Фото',
    },
    listFields: ['id', 'missionTitle', 'officialTitle', 'companyLabel'],
    mainField: 'officialTitle',
  },
  {
    uid: 'api::site-navigation.site-navigation',
    type: 'contentType',
    labels: {
      links: 'Основные ссылки',
      productLinks: 'Ссылки продуктов',
      contactLabel: 'Текст кнопки связи',
      contactSectionIndex: 'Номер секции контактов',
      logo: 'Логотип',
    },
    listFields: ['id', 'contactLabel', 'contactSectionIndex'],
    mainField: 'contactLabel',
  },
  {
    uid: 'api::site-footer.site-footer',
    type: 'contentType',
    labels: {
      text: 'Текст подвала',
    },
    listFields: ['id', 'text', 'createdAt', 'updatedAt'],
    mainField: 'text',
  },
  {
    uid: 'api::contact-setting.contact-setting',
    type: 'contentType',
    labels: {
      questionTitle: 'Заголовок блока вопросов',
      emailLabel: 'Подпись почты',
      emailAddress: 'Адрес почты',
      responseText: 'Текст ответа',
      formEyebrow: 'Надзаголовок формы',
      formTitle: 'Заголовок формы',
      formDescription: 'Описание формы',
      partnersTitle: 'Заголовок партнёров',
      emailIcon: 'Иконка почты',
      rightImage: 'Изображение справа',
      partnerLogos: 'Логотипы партнёров',
    },
    listFields: ['id', 'questionTitle', 'emailAddress', 'partnersTitle'],
    mainField: 'questionTitle',
  },
  {
    uid: 'api::activity-field.activity-field',
    type: 'contentType',
    labels: {
      title: 'Название',
      description: 'Описание',
      image: 'Изображение',
      sortOrder: 'Порядок сортировки',
    },
    listFields: ['id', 'title', 'description', 'sortOrder'],
    mainField: 'title',
  },
  {
    uid: 'api::service.service',
    type: 'contentType',
    labels: {
      title: 'Название',
      description: 'Описание',
      technologies: 'Технологии',
      cost: 'Стоимость',
      image: 'Изображение',
      sortOrder: 'Порядок сортировки',
    },
    listFields: ['id', 'title', 'technologies', 'cost'],
    mainField: 'title',
  },
  {
    uid: 'api::product.product',
    type: 'contentType',
    labels: {
      name: 'Название',
      slug: 'Код продукта',
      price: 'Цена',
      headline: 'Заголовок продукта',
      leadHighlight: 'Выделенный вводный текст',
      leadText: 'Основной вводный текст',
      descriptionBlocks: 'Блоки описания',
      parametersTitle: 'Заголовок характеристик',
      priceLabel: 'Подпись цены',
      features: 'Характеристики',
      gallery: 'Галерея',
      video: 'Видео',
      sortOrder: 'Порядок сортировки',
    },
    listFields: ['id', 'name', 'slug', 'price'],
    mainField: 'name',
  },
  {
    uid: 'api::activity-setting.activity-setting',
    type: 'contentType',
    labels: {
      sectionTitle: 'Заголовок секции',
      educationEyebrow: 'Надзаголовок формы обучения',
      educationTitle: 'Заголовок формы обучения',
      parentFieldsTitle: 'Заголовок полей родителя',
    },
    listFields: ['id', 'sectionTitle', 'educationEyebrow', 'educationTitle'],
    mainField: 'sectionTitle',
  },
  {
    uid: 'api::service-setting.service-setting',
    type: 'contentType',
    labels: {
      sectionTitle: 'Заголовок секции',
      technologiesLabel: 'Подпись технологий',
      costLabel: 'Подпись стоимости',
    },
    listFields: ['id', 'sectionTitle', 'technologiesLabel', 'costLabel'],
    mainField: 'sectionTitle',
  },
  {
    uid: 'api::achievement-setting.achievement-setting',
    type: 'contentType',
    labels: {
      sectionTitle: 'Заголовок секции',
    },
    listFields: ['id', 'sectionTitle', 'createdAt', 'updatedAt'],
    mainField: 'sectionTitle',
  },
  {
    uid: 'api::achievement.achievement',
    type: 'contentType',
    labels: {
      title: 'Название',
      image: 'Изображение',
      desktopRow: 'Ряд на десктопе',
      mobileRow: 'Ряд на мобильном',
      sortOrder: 'Порядок сортировки',
    },
    listFields: ['id', 'title', 'desktopRow', 'mobileRow'],
    mainField: 'title',
  },
  {
    uid: 'api::contact-request.contact-request',
    type: 'contentType',
    labels: {
      fullName: 'ФИО',
      email: 'Почта',
      contactMethod: 'Способ связи',
      question: 'Вопрос',
      source: 'Источник',
    },
    listFields: ['id', 'fullName', 'email', 'contactMethod'],
    mainField: 'fullName',
  },
  {
    uid: 'api::course-registration.course-registration',
    type: 'contentType',
    labels: {
      courseAudience: 'Тип курса',
      courseName: 'Название курса',
      studentFullName: 'ФИО ученика',
      studentBirthDate: 'Дата рождения ученика',
      studentPhone: 'Телефон ученика',
      studentSocialLink: 'Telegram/VK ученика',
      city: 'Город проживания',
      parentFullName: 'ФИО родителя',
      parentPhone: 'Телефон родителя',
      parentSocialLink: 'Telegram/VK родителя',
      personalDataConsent: 'Согласие на обработку данных',
      source: 'Источник',
    },
    listFields: ['id', 'courseAudience', 'courseName', 'studentFullName'],
    mainField: 'studentFullName',
  },
  {
    uid: 'common.stat-item',
    type: 'component',
    labels: {
      value: 'Значение',
      text: 'Подпись',
      icon: 'Иконка',
    },
    listFields: ['id', 'value', 'text'],
    mainField: 'value',
  },
  {
    uid: 'common.nav-link',
    type: 'component',
    labels: {
      label: 'Текст ссылки',
      sectionIndex: 'Номер секции',
    },
    listFields: ['id', 'label', 'sectionIndex'],
    mainField: 'label',
  },
  {
    uid: 'common.partner-logo',
    type: 'component',
    labels: {
      name: 'Название партнёра',
      code: 'Код партнёра',
      image: 'Логотип',
    },
    listFields: ['id', 'name', 'code'],
    mainField: 'name',
  },
  {
    uid: 'product.feature',
    type: 'component',
    labels: {
      text: 'Текст характеристики',
      icon: 'Иконка',
      sortOrder: 'Порядок сортировки',
    },
    listFields: ['id', 'text', 'sortOrder'],
    mainField: 'text',
  },
];

function getConfigurationKey(configuration: ContentManagerConfiguration): string {
  const scope = configuration.type === 'component' ? 'components' : 'content_types';

  return `plugin_content_manager_configuration_${scope}::${configuration.uid}`;
}

function parseConfiguration(value: string | null | undefined): Record<string, any> {
  if (typeof value !== 'string' || value.length === 0) {
    return {};
  }

  try {
    return JSON.parse(value);
  } catch {
    return {};
  }
}

function createEditLayout(fields: string[]): Array<Array<{ name: string; size: number }>> {
  return fields.reduce<Array<Array<{ name: string; size: number }>>>((rows, field, index) => {
    if (index % 2 === 0) {
      rows.push([]);
    }

    rows[rows.length - 1].push({ name: field, size: 6 });

    return rows;
  }, []);
}

function createFallbackConfiguration(configuration: ContentManagerConfiguration): Record<string, any> {
  const fields = Object.keys(configuration.labels);
  const listFields = configuration.listFields ?? fields.slice(0, 4);

  return {
    settings: {
      bulkable: true,
      filterable: true,
      searchable: true,
      pageSize: 10,
      relationOpenMode: 'modal',
      mainField: configuration.mainField ?? fields[0],
      defaultSortBy: configuration.mainField ?? fields[0],
      defaultSortOrder: 'ASC',
    },
    metadatas: {},
    layouts: {
      list: listFields,
      edit: createEditLayout(fields),
    },
    uid: configuration.uid,
    ...(configuration.type === 'component' ? { isComponent: true } : {}),
  };
}

function localizeConfiguration(
  currentConfiguration: Record<string, any>,
  configuration: ContentManagerConfiguration
): Record<string, any> {
  const labels = configuration.labels;
  const fallbackConfiguration = createFallbackConfiguration(configuration);

  const nextConfiguration = {
    ...fallbackConfiguration,
    settings: {
      ...fallbackConfiguration.settings,
      ...currentConfiguration.settings,
      mainField: fallbackConfiguration.settings.mainField,
      defaultSortBy: fallbackConfiguration.settings.defaultSortBy,
    },
    metadatas: {},
    // Do not preserve old layouts from the database: transferred/stale Strapi Cloud layouts can reference
    // removed component fields and crash the admin with "attributes" errors.
    layouts: fallbackConfiguration.layouts,
  };

  for (const [field, label] of Object.entries(labels)) {
    const metadata = nextConfiguration.metadatas[field] ?? {};

    nextConfiguration.metadatas[field] = {
      ...metadata,
      edit: {
        description: '',
        placeholder: '',
        visible: true,
        editable: true,
        ...metadata.edit,
        label,
      },
      list: {
        searchable: true,
        sortable: true,
        ...metadata.list,
        label,
      },
    };
  }

  return nextConfiguration;
}

export async function applyRussianContentManagerLabels(strapi): Promise<void> {
  for (const configuration of configurations) {
    const key = getConfigurationKey(configuration);
    const existing = await strapi.db.connection('strapi_core_store_settings').where({ key }).first();
    const currentValue = parseConfiguration(existing?.value);
    const nextValue = JSON.stringify(localizeConfiguration(currentValue, configuration));

    if (existing) {
      await strapi.db
        .connection('strapi_core_store_settings')
        .where({ key })
        .update({ value: nextValue, type: 'object' });
    } else {
      await strapi.db.connection('strapi_core_store_settings').insert({
        key,
        value: nextValue,
        type: 'object',
        environment: null,
        tag: null,
      });
    }
  }
}
