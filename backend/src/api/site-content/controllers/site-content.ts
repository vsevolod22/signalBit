type RecordValue = Record<string, unknown>;

interface MediaDto {
  alternativeText?: string | null;
  url?: string;
}

interface SiteContentDto {
  aboutCompany: RecordValue | null;
  achievementSetting: RecordValue | null;
  achievements: RecordValue[];
  activityFields: RecordValue[];
  activitySetting: RecordValue | null;
  contactSetting: RecordValue | null;
  hero: RecordValue | null;
  products: RecordValue[];
  seoSetting: RecordValue | null;
  serviceSetting: RecordValue | null;
  services: RecordValue[];
  siteFooter: RecordValue | null;
  siteNavigation: RecordValue | null;
}

interface StrapiInstance {
  entityService: {
    findMany: (uid: string, options: RecordValue) => Promise<unknown>;
  };
  log: {
    error: (message: string, error: unknown) => void;
  };
}

const singleTypes = {
  hero: 'api::hero.hero',
  aboutCompany: 'api::about-company.about-company',
  siteNavigation: 'api::site-navigation.site-navigation',
  siteFooter: 'api::site-footer.site-footer',
  contactSetting: 'api::contact-setting.contact-setting',
  activitySetting: 'api::activity-setting.activity-setting',
  serviceSetting: 'api::service-setting.service-setting',
  achievementSetting: 'api::achievement-setting.achievement-setting',
  seoSetting: 'api::seo-setting.seo-setting',
} as const;

const collectionTypes = {
  activityFields: 'api::activity-field.activity-field',
  services: 'api::service.service',
  products: 'api::product.product',
  achievements: 'api::achievement.achievement',
} as const;

function asRecord(value: unknown): RecordValue | null {
  const isRecord = typeof value === 'object' && value !== null && !Array.isArray(value);
  if (!isRecord) {
    return null;
  }

  return Object.fromEntries(Object.entries(value));
}

function asRecords(value: unknown): RecordValue[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.flatMap((item) => {
    const record = asRecord(item);
    if (record === null) {
      return [];
    }

    return [record];
  });
}

function stringValue(record: RecordValue, field: string): string | undefined {
  const value = record[field];
  if (typeof value !== 'string') {
    return undefined;
  }

  return value;
}

function numberValue(record: RecordValue, field: string): number | undefined {
  const value = record[field];
  const isFiniteNumber = typeof value === 'number' && Number.isFinite(value);
  if (!isFiniteNumber) {
    return undefined;
  }

  return value;
}

function booleanValue(record: RecordValue, field: string): boolean | undefined {
  const value = record[field];
  if (typeof value !== 'boolean') {
    return undefined;
  }

  return value;
}

function stringArrayValue(record: RecordValue, field: string): string[] | undefined {
  const value = record[field];
  const isStringArray = Array.isArray(value) && value.every((item) => typeof item === 'string');
  if (!isStringArray) {
    return undefined;
  }

  return value;
}

function mediaValue(value: unknown): MediaDto | undefined {
  const media = asRecord(value);
  if (media === null) {
    return undefined;
  }

  const url = stringValue(media, 'url');
  const alternativeText = stringValue(media, 'alternativeText');
  if (url === undefined) {
    return undefined;
  }

  if (alternativeText !== undefined) {
    return { url, alternativeText };
  }

  return { url };
}

function mediaArrayValue(value: unknown): MediaDto[] {
  return asRecords(value).flatMap((media) => {
    const dto = mediaValue(media);
    if (dto === undefined) {
      return [];
    }

    return [dto];
  });
}

function select(record: RecordValue | null, fields: string[]): RecordValue | null {
  if (record === null) {
    return null;
  }

  return fields.reduce<RecordValue>((dto, field) => {
    const value = record[field];
    if (value !== undefined) {
      dto[field] = value;
    }
    return dto;
  }, {});
}

function selectMedia(record: RecordValue | null, fields: string[]): RecordValue | null {
  const dto = select(record, fields);
  if (dto === null || record === null) {
    return dto;
  }

  for (const field of [
    'logo',
    'rightHand',
    'leftHand',
    'photo',
    'emailIcon',
    'rightImage',
    'image',
    'socialImage',
  ]) {
    if (field in record) {
      dto[field] = mediaValue(record[field]) ?? null;
    }
  }

  return dto;
}

function selectCollection(items: RecordValue[], fields: string[], mediaFields: string[] = []): RecordValue[] {
  return items.map((item) => {
    const dto = select(item, fields) ?? {};
    for (const field of mediaFields) {
      dto[field] = mediaValue(item[field]) ?? null;
    }
    return dto;
  });
}

function selectProducts(items: RecordValue[]): RecordValue[] {
  return items.map((item) => ({
    name: stringValue(item, 'name'),
    slug: stringValue(item, 'slug'),
    headline: stringValue(item, 'headline'),
    lead: stringValue(item, 'lead'),
    leadHighlight: stringValue(item, 'leadHighlight'),
    leadText: stringValue(item, 'leadText'),
    bodyBlocks: stringArrayValue(item, 'bodyBlocks'),
    descriptionBlocks: stringArrayValue(item, 'descriptionBlocks'),
    features: asRecords(item.features).map((feature) => ({
      text: stringValue(feature, 'text'),
      sortOrder: numberValue(feature, 'sortOrder'),
    })),
    price: stringValue(item, 'price'),
    priceNote: stringValue(item, 'priceNote'),
    ctaLabel: stringValue(item, 'ctaLabel'),
    featured: booleanValue(item, 'featured'),
    gallery: mediaArrayValue(item.gallery),
    sortOrder: numberValue(item, 'sortOrder'),
  }));
}

function selectContactSetting(record: RecordValue | null): RecordValue | null {
  const dto = selectMedia(record, ['questionTitle', 'emailLabel', 'emailAddress', 'responseText', 'partnersTitle']);
  if (dto === null || record === null) {
    return dto;
  }

  dto.partnerLogos = asRecords(record.partnerLogos).map((partner) => ({
    name: stringValue(partner, 'name'),
    image: mediaValue(partner.image) ?? null,
  }));
  return dto;
}

async function getSingleType(strapi: StrapiInstance, uid: string, populate: unknown = '*'): Promise<unknown> {
  return strapi.entityService.findMany(uid, { populate });
}

async function getCollectionType(strapi: StrapiInstance, uid: string): Promise<unknown> {
  return strapi.entityService.findMany(uid, { populate: '*', sort: { sortOrder: 'asc' } });
}

export default ({ strapi }: { strapi: StrapiInstance }) => ({
  async find(ctx: { body?: unknown }): Promise<void> {
    try {
      const [
        hero,
        aboutCompany,
        siteNavigation,
        siteFooter,
        contactSetting,
        activitySetting,
        serviceSetting,
        achievementSetting,
        seoSetting,
        activityFields,
        services,
        products,
        achievements,
      ] = await Promise.all([
        getSingleType(strapi, singleTypes.hero),
        getSingleType(strapi, singleTypes.aboutCompany),
        getSingleType(strapi, singleTypes.siteNavigation),
        getSingleType(strapi, singleTypes.siteFooter),
        getSingleType(strapi, singleTypes.contactSetting, {
          emailIcon: true,
          rightImage: true,
          partnerLogos: { populate: { image: true } },
        }),
        getSingleType(strapi, singleTypes.activitySetting),
        getSingleType(strapi, singleTypes.serviceSetting),
        getSingleType(strapi, singleTypes.achievementSetting),
        getSingleType(strapi, singleTypes.seoSetting),
        getCollectionType(strapi, collectionTypes.activityFields),
        getCollectionType(strapi, collectionTypes.services),
        getCollectionType(strapi, collectionTypes.products),
        getCollectionType(strapi, collectionTypes.achievements),
      ]);

      const data: SiteContentDto = {
        hero: selectMedia(asRecord(hero), ['title', 'description', 'secondaryTitle', 'secondaryDescription']),
        aboutCompany: selectMedia(asRecord(aboutCompany), ['missionTitle', 'paragraphs', 'officialTitle', 'officialItems', 'stats']),
        siteNavigation: selectMedia(asRecord(siteNavigation), ['links', 'contactLabel']),
        siteFooter: select(asRecord(siteFooter), ['text']),
        contactSetting: selectContactSetting(asRecord(contactSetting)),
        activitySetting: select(asRecord(activitySetting), ['sectionTitle']),
        serviceSetting: select(asRecord(serviceSetting), ['sectionTitle']),
        achievementSetting: select(asRecord(achievementSetting), ['sectionTitle']),
        seoSetting: selectMedia(asRecord(seoSetting), [
          'metaTitle',
          'metaDescription',
          'keywords',
          'canonicalUrl',
          'robots',
          'socialTitle',
          'socialDescription',
          'organizationName',
          'legalName',
          'organizationDescription',
          'organizationAddress',
        ]),
        activityFields: selectCollection(asRecords(activityFields), ['title', 'description', 'sortOrder'], ['image']),
        services: selectCollection(asRecords(services), ['title', 'description', 'technologies', 'cost', 'sortOrder'], ['image']),
        products: selectProducts(asRecords(products)),
        achievements: selectCollection(asRecords(achievements), ['title', 'sortOrder'], ['image']),
      };

      ctx.body = { data };
    } catch (error: unknown) {
      strapi.log.error('Failed to assemble site-content DTO.', error);
      throw error;
    }
  },
});
