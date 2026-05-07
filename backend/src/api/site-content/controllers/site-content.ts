const singleTypes = {
  hero: 'api::hero.hero',
  aboutCompany: 'api::about-company.about-company',
  siteNavigation: 'api::site-navigation.site-navigation',
  siteFooter: 'api::site-footer.site-footer',
  contactSetting: 'api::contact-setting.contact-setting',
  activitySetting: 'api::activity-setting.activity-setting',
  serviceSetting: 'api::service-setting.service-setting',
  achievementSetting: 'api::achievement-setting.achievement-setting',
} as const;

const collectionTypes = {
  activityFields: 'api::activity-field.activity-field',
  services: 'api::service.service',
  products: 'api::product.product',
  achievements: 'api::achievement.achievement',
} as const;

async function getSingleType(strapi, uid: string) {
  try {
    return await strapi.entityService.findMany(uid, { populate: '*' });
  } catch {
    return null;
  }
}

async function getCollectionType(strapi, uid: string) {
  try {
    return await strapi.entityService.findMany(uid, {
      sort: { sortOrder: 'asc' },
      populate: '*',
    });
  } catch {
    return [];
  }
}

export default {
  async find(ctx) {
    const [
      hero,
      aboutCompany,
      siteNavigation,
      siteFooter,
      contactSetting,
      activitySetting,
      serviceSetting,
      achievementSetting,
      activityFields,
      services,
      products,
      achievements,
    ] = await Promise.all([
      getSingleType(strapi, singleTypes.hero),
      getSingleType(strapi, singleTypes.aboutCompany),
      getSingleType(strapi, singleTypes.siteNavigation),
      getSingleType(strapi, singleTypes.siteFooter),
      getSingleType(strapi, singleTypes.contactSetting),
      getSingleType(strapi, singleTypes.activitySetting),
      getSingleType(strapi, singleTypes.serviceSetting),
      getSingleType(strapi, singleTypes.achievementSetting),
      getCollectionType(strapi, collectionTypes.activityFields),
      getCollectionType(strapi, collectionTypes.services),
      getCollectionType(strapi, collectionTypes.products),
      getCollectionType(strapi, collectionTypes.achievements),
    ]);

    ctx.body = {
      data: {
        hero,
        aboutCompany,
        siteNavigation,
        siteFooter,
        contactSetting,
        activitySetting,
        serviceSetting,
        achievementSetting,
        activityFields,
        services,
        products,
        achievements,
      },
    };
  },
};
