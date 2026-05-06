import type { Schema, Struct } from '@strapi/strapi';

export interface CommonNavLink extends Struct.ComponentSchema {
  collectionName: 'components_common_nav_links';
  info: {
    description: '\u0421\u0441\u044B\u043B\u043A\u0430 \u0448\u0430\u043F\u043A\u0438 \u0441\u0430\u0439\u0442\u0430 \u0441 \u043D\u043E\u043C\u0435\u0440\u043E\u043C \u0441\u0435\u043A\u0446\u0438\u0438 \u0444\u0440\u043E\u043D\u0442\u0435\u043D\u0434\u0430';
    displayName: '\u0421\u0441\u044B\u043B\u043A\u0430 \u043D\u0430\u0432\u0438\u0433\u0430\u0446\u0438\u0438';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    sectionIndex: Schema.Attribute.Integer & Schema.Attribute.Required;
  };
}

export interface CommonPartnerLogo extends Struct.ComponentSchema {
  collectionName: 'components_common_partner_logos';
  info: {
    description: '\u041B\u043E\u0433\u043E\u0442\u0438\u043F \u043F\u0430\u0440\u0442\u043D\u0451\u0440\u0430 \u0432 \u0431\u043B\u043E\u043A\u0435 \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u043E\u0432';
    displayName: '\u041B\u043E\u0433\u043E\u0442\u0438\u043F \u043F\u0430\u0440\u0442\u043D\u0451\u0440\u0430';
  };
  attributes: {
    code: Schema.Attribute.String & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface CommonStatItem extends Struct.ComponentSchema {
  collectionName: 'components_common_stat_items';
  info: {
    description: '\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u0443\u0435\u043C\u044B\u0439 \u043F\u043E\u043A\u0430\u0437\u0430\u0442\u0435\u043B\u044C \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u0438';
    displayName: '\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u0435\u043B\u044C';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images'>;
    text: Schema.Attribute.Text & Schema.Attribute.Required;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ProductFeature extends Struct.ComponentSchema {
  collectionName: 'components_product_features';
  info: {
    description: '\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u0443\u0435\u043C\u0430\u044F \u0445\u0430\u0440\u0430\u043A\u0442\u0435\u0440\u0438\u0441\u0442\u0438\u043A\u0430 \u0438\u043B\u0438 \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440 \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u0430';
    displayName: '\u0425\u0430\u0440\u0430\u043A\u0442\u0435\u0440\u0438\u0441\u0442\u0438\u043A\u0430 \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u0430';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images'>;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    text: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'common.nav-link': CommonNavLink;
      'common.partner-logo': CommonPartnerLogo;
      'common.stat-item': CommonStatItem;
      'product.feature': ProductFeature;
    }
  }
}
