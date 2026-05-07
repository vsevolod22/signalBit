const systemLabels = {
  id: 'ID',
  documentId: 'Технический ID документа',
  createdAt: 'Создано',
  updatedAt: 'Обновлено',
  publishedAt: 'Опубликовано',
  createdBy: 'Создал',
  updatedBy: 'Обновил',
  locale: 'Локаль',
} as const;

interface ContentManagerConfiguration {
  uid: string;
  type: 'contentType' | 'component';
  labels: Record<string, string>;
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
    mainField: 'contactLabel',
  },
  {
    uid: 'api::site-footer.site-footer',
    type: 'contentType',
    labels: {
      text: 'Текст подвала',
    },
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
    mainField: 'partnerLogos',
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
    mainField: 'sectionTitle',
  },
  {
    uid: 'api::achievement-setting.achievement-setting',
    type: 'contentType',
    labels: {
      sectionTitle: 'Заголовок секции',
    },
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
    mainField: 'value',
  },
  {
    uid: 'common.nav-link',
    type: 'component',
    labels: {
      label: 'Текст ссылки',
      sectionIndex: 'Номер секции',
    },
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

function createFallbackConfiguration(configuration: ContentManagerConfiguration): Record<string, any> {
  const fields = Object.keys(configuration.labels);

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
      list: fields.slice(0, 4),
      edit: fields.reduce<Array<Array<{ name: string; size: number }>>>((rows, field, index) => {
        if (index % 2 === 0) {
          rows.push([]);
        }

        rows[rows.length - 1].push({ name: field, size: 6 });

        return rows;
      }, []),
    },
    uid: configuration.uid,
    ...(configuration.type === 'component' ? { isComponent: true } : {}),
  };
}

function localizeConfiguration(
  currentConfiguration: Record<string, any>,
  configuration: ContentManagerConfiguration
): Record<string, any> {
  const nextConfiguration = {
    ...createFallbackConfiguration(configuration),
    ...currentConfiguration,
    settings: {
      ...createFallbackConfiguration(configuration).settings,
      ...currentConfiguration.settings,
      mainField: configuration.mainField ?? currentConfiguration.settings?.mainField,
    },
    metadatas: {
      ...currentConfiguration.metadatas,
    },
  };

  const labels = {
    ...systemLabels,
    ...configuration.labels,
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
