interface ContentManagerConfiguration {
  uid: string;
  type: 'contentType' | 'component';
  labels: Record<string, string>;
  listFields?: string[];
  mainField?: string;
}

const systemFieldLabels: Record<string, string> = {
  id: 'ID',
  documentId: 'ID документа',
  createdAt: 'Создано',
  updatedAt: 'Обновлено',
  publishedAt: 'Опубликовано',
  createdBy: 'Создал',
  updatedBy: 'Обновил',
  publishedBy: 'Опубликовал',
  locale: 'Локаль',
  localizations: 'Локализации',
  strapi_assignee: 'Ответственный',
};

const configurations: ContentManagerConfiguration[] = [
  {
    uid: 'api::seo-setting.seo-setting',
    type: 'contentType',
    labels: {
      metaTitle: 'Заголовок страницы',
      metaDescription: 'Описание страницы',
      keywords: 'Ключевые слова',
      canonicalUrl: 'Канонический адрес',
      robots: 'Индексация robots',
      socialTitle: 'Заголовок для соцсетей',
      socialDescription: 'Описание для соцсетей',
      socialImage: 'Изображение для соцсетей',
      socialImagePosition: 'Позиционирование изображения для соцсетей',
      organizationName: 'Название организации',
      legalName: 'Юридическое название',
      organizationDescription: 'Описание организации',
      organizationAddress: 'Адрес организации',
    },
    listFields: ['metaTitle', 'metaDescription', 'robots'],
    mainField: 'metaTitle',
  },
  {
    uid: 'api::hero.hero',
    type: 'contentType',
    labels: {
      title: 'Заголовок',
      description: 'Описание',
      secondaryTitle: 'Дополнительный заголовок',
      secondaryDescription: 'Дополнительное описание',
      logo: 'Логотип',
      logoPosition: 'Позиционирование логотипа',
      rightHand: 'Изображение справа',
      rightHandPosition: 'Позиционирование изображения справа',
      leftHand: 'Изображение слева',
      leftHandPosition: 'Позиционирование изображения слева',
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
      photoPosition: 'Позиционирование фото',
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
      logoPosition: 'Позиционирование логотипа',
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
      emailIconPosition: 'Позиционирование иконки почты',
      rightImage: 'Изображение справа',
      rightImagePosition: 'Позиционирование изображения справа',
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
      imagePosition: 'Позиционирование изображения',
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
      imagePosition: 'Позиционирование изображения',
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
      lead: 'Вводный текст',
      leadHighlight: 'Выделенный вводный текст',
      leadText: 'Основной вводный текст',
      slideType: 'Вид слайда',
      slideSubtitle: 'Подзаголовок слайда',
      catalogItems: 'Продукты группового слайда',
      bodyBlocks: 'Основные текстовые блоки',
      kitTitle: 'Заголовок состава набора',
      kitItems: 'Состав набора',
      specsTitle: 'Заголовок ТТХ',
      specItems: 'Технические характеристики',
      descriptionBlocks: 'Блоки описания',
      priceNote: 'Примечание к цене',
      ctaLabel: 'Текст кнопки',
      featured: 'Выделенный продукт',
      parametersTitle: 'Заголовок характеристик',
      priceLabel: 'Подпись цены',
      features: 'Характеристики',
      gallery: 'Галерея',
      galleryPositions: 'Позиционирование изображений галереи по порядку',
      backgroundColor: 'Цвет фона слайда',
      backgroundImage: 'Фоновое изображение слайда',
      backgroundImagePosition: 'Позиционирование фонового изображения',
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
      imagePosition: 'Позиционирование изображения',
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
      emailNotificationSent: 'Письмо отправлено',
      emailNotificationError: 'Ошибка отправки письма',
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
      studyPlace: 'Место обучения ученика',
      city: 'Город проживания',
      parentFullName: 'ФИО родителя',
      parentPhone: 'Телефон родителя',
      parentSocialLink: 'Telegram/VK родителя',
      personalDataConsent: 'Согласие на обработку данных',
      source: 'Источник',
      emailNotificationSent: 'Письмо отправлено',
      emailNotificationError: 'Ошибка отправки письма',
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
      iconPosition: 'Позиционирование иконки',
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
      imagePosition: 'Позиционирование логотипа',
    },
    listFields: ['id', 'name', 'code'],
    mainField: 'name',
  },
  {
    uid: 'product.catalog-item',
    type: 'component',
    labels: {
      code: 'Код продукта внутри слайда',
      name: 'Название продукта',
      description: 'Краткое описание',
      kitTitle: 'Заголовок состава',
      kitItems: 'Состав набора',
      priceLabel: 'Подпись цены',
      price: 'Цена',
      characteristicsButtonLabel: 'Текст кнопки характеристик',
      characteristicsTitle: 'Заголовок модального окна',
      characteristicNameLabel: 'Заголовок колонки наименования',
      characteristicValueLabel: 'Заголовок колонки значения',
      characteristicUnitLabel: 'Заголовок колонки единицы измерения',
      characteristics: 'Строки таблицы характеристик',
      sortOrder: 'Порядок сортировки',
    },
    listFields: ['id', 'name', 'code', 'price', 'sortOrder'],
    mainField: 'name',
  },
  {
    uid: 'product.characteristic-row',
    type: 'component',
    labels: {
      name: 'Наименование характеристики',
      value: 'Значение',
      unit: 'Единица измерения',
      section: 'Строка-раздел',
      sortOrder: 'Порядок сортировки',
    },
    listFields: ['id', 'name', 'value', 'unit', 'sortOrder'],
    mainField: 'name',
  },
  {
    uid: 'product.feature',
    type: 'component',
    labels: {
      text: 'Текст характеристики',
      icon: 'Иконка',
      iconPosition: 'Позиционирование иконки',
      sortOrder: 'Порядок сортировки',
    },
    listFields: ['id', 'text', 'sortOrder'],
    mainField: 'text',
  },
  {
    uid: 'common.image-position',
    type: 'component',
    labels: {
      label: 'Название изображения',
      offsetX: 'Смещение по X, px',
      offsetY: 'Смещение по Y, px',
      scale: 'Масштаб, %',
    },
    listFields: ['id', 'label', 'offsetX', 'offsetY', 'scale'],
    mainField: 'label',
  },
  {
    uid: 'product.kit-item',
    type: 'component',
    labels: {
      title: 'Название элемента',
      description: 'Пояснение',
      sortOrder: 'Порядок сортировки',
    },
    listFields: ['id', 'title', 'sortOrder'],
    mainField: 'title',
  },
  {
    uid: 'product.spec-item',
    type: 'component',
    labels: {
      text: 'Техническая характеристика',
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
  const knownFields = new Set(fields);
  const listFields = (configuration.listFields ?? fields.slice(0, 4)).filter((field) => knownFields.has(field));

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
  const metadataLabels =
    configuration.type === 'contentType' ? { ...systemFieldLabels, ...labels } : { id: 'ID', ...labels };

  const nextConfiguration = {
    ...fallbackConfiguration,
    settings: {
      ...fallbackConfiguration.settings,
      ...currentConfiguration.settings,
      mainField: fallbackConfiguration.settings.mainField,
      defaultSortBy: fallbackConfiguration.settings.defaultSortBy,
    },
    metadatas: {
      ...(currentConfiguration.metadatas ?? {}),
    },
    // Do not preserve old layouts from the database: transferred/stale Strapi Cloud layouts can reference
    // removed component fields and crash the admin with "attributes" errors.
    layouts: fallbackConfiguration.layouts,
  };

  for (const [field, label] of Object.entries(metadataLabels)) {
    const metadata = nextConfiguration.metadatas[field] ?? {};
    const isSystemField = !Object.prototype.hasOwnProperty.call(labels, field);

    nextConfiguration.metadatas[field] = {
      ...metadata,
      edit: {
        description: '',
        placeholder: '',
        visible: !isSystemField,
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
