import type { Schema, Struct } from '@strapi/strapi';

export interface CommonImagePosition extends Struct.ComponentSchema {
  collectionName: 'components_common_image_positions';
  info: {
    description: '\u041D\u0435\u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u0435 \u0441\u043C\u0435\u0449\u0435\u043D\u0438\u0435 \u0438 \u043C\u0430\u0441\u0448\u0442\u0430\u0431 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F \u0431\u0435\u0437 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F \u0438\u0441\u0445\u043E\u0434\u043D\u043E\u0433\u043E \u0444\u0430\u0439\u043B\u0430';
    displayName: '\u041F\u043E\u0437\u0438\u0446\u0438\u043E\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F';
  };
  attributes: {
    label: Schema.Attribute.String;
    offsetX: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 1000;
          min: -1000;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    offsetY: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 1000;
          min: -1000;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    scale: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 300;
          min: 10;
        },
        number
      > &
      Schema.Attribute.DefaultTo<100>;
  };
}

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
    imagePosition: Schema.Attribute.Component<'common.image-position', false>;
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
    iconPosition: Schema.Attribute.Component<'common.image-position', false>;
    text: Schema.Attribute.Text & Schema.Attribute.Required;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ProductCatalogItem extends Struct.ComponentSchema {
  collectionName: 'components_product_catalog_items';
  info: {
    description: '\u041F\u0440\u043E\u0434\u0443\u043A\u0442 \u0432\u043D\u0443\u0442\u0440\u0438 \u043D\u043E\u0432\u043E\u0433\u043E \u0433\u0440\u0443\u043F\u043F\u043E\u0432\u043E\u0433\u043E \u0432\u0438\u0434\u0430 \u0441\u043B\u0430\u0439\u0434\u0430';
    displayName: '\u041F\u0440\u043E\u0434\u0443\u043A\u0442 \u0433\u0440\u0443\u043F\u043F\u043E\u0432\u043E\u0433\u043E \u0441\u043B\u0430\u0439\u0434\u0430';
  };
  attributes: {
    characteristicNameLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'\u041D\u0430\u0438\u043C\u0435\u043D\u043E\u0432\u0430\u043D\u0438\u0435 \u0445\u0430\u0440\u0430\u043A\u0442\u0435\u0440\u0438\u0441\u0442\u0438\u043A\u0438'>;
    characteristics: Schema.Attribute.Component<'product.characteristic-row', true>;
    characteristicsButtonLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'\u041F\u043E\u0434\u0440\u043E\u0431\u043D\u044B\u0435 \u0445\u0430\u0440\u0430\u043A\u0442\u0435\u0440\u0438\u0441\u0442\u0438\u043A\u0438'>;
    characteristicsTitle: Schema.Attribute.String;
    characteristicUnitLabel: Schema.Attribute.String & Schema.Attribute.DefaultTo<'\u0415\u0434. \u0438\u0437\u043C.'>;
    characteristicValueLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435'>;
    code: Schema.Attribute.String & Schema.Attribute.Required;
    description: Schema.Attribute.Text;
    kitItems: Schema.Attribute.Component<'product.kit-item', true>;
    kitTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'\u0441\u043E\u0441\u0442\u0430\u0432 \u043D\u0430\u0431\u043E\u0440\u0430'>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    price: Schema.Attribute.String;
    priceLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'\u0421\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C'>;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
  };
}

export interface ProductCharacteristicRow extends Struct.ComponentSchema {
  collectionName: 'components_product_characteristic_rows';
  info: {
    description: '\u041E\u0434\u043D\u0430 \u0441\u0442\u0440\u043E\u043A\u0430 \u043C\u043E\u0434\u0430\u043B\u044C\u043D\u043E\u0439 \u0442\u0430\u0431\u043B\u0438\u0446\u044B \u0445\u0430\u0440\u0430\u043A\u0442\u0435\u0440\u0438\u0441\u0442\u0438\u043A \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u0430';
    displayName: '\u0421\u0442\u0440\u043E\u043A\u0430 \u0442\u0430\u0431\u043B\u0438\u0446\u044B \u0445\u0430\u0440\u0430\u043A\u0442\u0435\u0440\u0438\u0441\u0442\u0438\u043A';
  };
  attributes: {
    name: Schema.Attribute.Text & Schema.Attribute.Required;
    section: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    unit: Schema.Attribute.String;
    value: Schema.Attribute.String;
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
    iconPosition: Schema.Attribute.Component<'common.image-position', false>;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    text: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface ProductKitItem extends Struct.ComponentSchema {
  collectionName: 'components_product_kit_items';
  info: {
    description: '\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0438 \u043F\u043E\u044F\u0441\u043D\u0435\u043D\u0438\u0435 \u0434\u043B\u044F \u0431\u043B\u043E\u043A\u0430 \u00AB\u0421\u043E\u0441\u0442\u0430\u0432 \u043D\u0430\u0431\u043E\u0440\u0430\u00BB';
    displayName: '\u042D\u043B\u0435\u043C\u0435\u043D\u0442 \u0441\u043E\u0441\u0442\u0430\u0432\u0430 \u043D\u0430\u0431\u043E\u0440\u0430';
  };
  attributes: {
    description: Schema.Attribute.Text;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    title: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface ProductSpecItem extends Struct.ComponentSchema {
  collectionName: 'components_product_spec_items';
  info: {
    description: '\u041E\u0442\u0434\u0435\u043B\u044C\u043D\u0430\u044F \u0441\u0442\u0440\u043E\u043A\u0430 \u0431\u043B\u043E\u043A\u0430 \u0442\u0435\u0445\u043D\u0438\u0447\u0435\u0441\u043A\u0438\u0445 \u0445\u0430\u0440\u0430\u043A\u0442\u0435\u0440\u0438\u0441\u0442\u0438\u043A';
    displayName: '\u041F\u0443\u043D\u043A\u0442 \u0422\u0422\u0425';
  };
  attributes: {
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    text: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'common.image-position': CommonImagePosition;
      'common.nav-link': CommonNavLink;
      'common.partner-logo': CommonPartnerLogo;
      'common.stat-item': CommonStatItem;
      'product.catalog-item': ProductCatalogItem;
      'product.characteristic-row': ProductCharacteristicRow;
      'product.feature': ProductFeature;
      'product.kit-item': ProductKitItem;
      'product.spec-item': ProductSpecItem;
    }
  }
}
