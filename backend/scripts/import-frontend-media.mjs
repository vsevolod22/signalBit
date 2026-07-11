import fs from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const { compileStrapi, createStrapi } = require('@strapi/strapi');

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const backendRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(backendRoot, '..');

process.chdir(backendRoot);

const mimeTypes = {
  '.gif': 'image/gif',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.mp4': 'video/mp4',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webm': 'video/webm',
  '.webp': 'image/webp',
};

const assets = {
  'hero-logo': 'frontend/src/features/site-navigation/assets/signal-bit-logo.png',
  'hero-left-hand': 'src/features/main-hero/assets/hand-left.png',
  'hero-right-hand': 'src/features/main-hero/assets/hand-right.png',
  'navigation-logo': 'frontend/src/features/site-navigation/assets/signal-bit-logo.png',
  'about-photo': 'frontend/src/features/about-company/assets/drone-system-demonstration.png',
  'about-stat-three-plus': 'frontend/src/features/about-company/assets/stat-three-plus-icon.svg',
  'about-stat-three': 'frontend/src/features/about-company/assets/stat-three-icon.svg',
  'about-stat-five': 'frontend/src/features/about-company/assets/stat-five-icon.svg',
  'activity-research': 'frontend/src/features/activity-fields/assets/research-icon.png',
  'activity-new-products': 'frontend/src/features/activity-fields/assets/product-development-icon.png',
  'activity-teaching': 'frontend/src/features/activity-fields/assets/training-icon.png',
  'service-robots': 'frontend/src/features/developments/assets/development-service-01.png',
  'service-security': 'frontend/src/features/developments/assets/development-service-02.png',
  'service-intelligent-control': 'frontend/src/features/developments/assets/development-service-03.png',
  'service-hardware': 'frontend/src/features/developments/assets/development-service-04.png',
  'canary-gallery-top': 'frontend/src/features/products/assets/canary/canary-top-view.png',
  'canary-gallery-middle': 'frontend/src/features/products/assets/canary/canary-middle-view.png',
  'canary-gallery-bottom': 'frontend/src/features/products/assets/canary/canary-bottom-view.png',
  'canary-video': 'frontend/src/features/products/assets/canary/demonstration.mp4',
  'canary-feature-1': 'frontend/src/features/products/assets/canary/canary-feature-01.png',
  'canary-feature-2': 'frontend/src/features/products/assets/canary/canary-feature-02.png',
  'canary-feature-3': 'frontend/src/features/products/assets/canary/canary-feature-03.png',
  'canary-feature-4': 'frontend/src/features/products/assets/canary/canary-feature-04.png',
  'canary-feature-5': 'frontend/src/features/products/assets/canary/canary-feature-05.png',
  'canary-feature-6': 'frontend/src/features/products/assets/canary/canary-feature-06.png',
  'canary-price': 'frontend/src/features/products/assets/canary/canary-price-icon.png',
  'sensor-gallery-1': 'frontend/src/features/products/assets/sensor/sensor-gallery-01.png',
  'sensor-gallery-2': 'frontend/src/features/products/assets/sensor/sensor-gallery-02.png',
  'sensor-gallery-3': 'frontend/src/features/products/assets/sensor/sensor-gallery-03.png',
  'sensor-product-1': 'frontend/src/features/products/assets/sensor/sensor-product-01.png',
  'sensor-product-2': 'frontend/src/features/products/assets/sensor/sensor-product-02.png',
  'sensor-feature-1': 'frontend/src/features/products/assets/sensor/sensor-feature-01.svg',
  'sensor-feature-2': 'frontend/src/features/products/assets/sensor/sensor-feature-02.svg',
  'sensor-feature-3': 'frontend/src/features/products/assets/sensor/sensor-feature-03.svg',
  'sensor-price': 'frontend/src/features/products/assets/sensor/sensor-price-icon.svg',
  'sensor-feature-4': 'frontend/src/features/products/assets/sensor/sensor-feature-04.svg',
  'sensor-feature-5': 'frontend/src/features/products/assets/sensor/sensor-feature-05.svg',
  'sensor-feature-6': 'frontend/src/features/products/assets/sensor/sensor-feature-06.svg',
  'flight-gallery-1': 'frontend/src/features/products/assets/flight-controller/controller-gallery-01.png',
  'flight-gallery-2': 'frontend/src/features/products/assets/flight-controller/controller-gallery-02.png',
  'flight-gallery-3': 'frontend/src/features/products/assets/flight-controller/controller-gallery-03.png',
  'flight-controller': 'frontend/src/features/products/assets/flight-controller/controller-board-detail.png',
  'flight-feature-1': 'frontend/src/features/products/assets/flight-controller/controller-feature-01.svg',
  'flight-feature-2': 'frontend/src/features/products/assets/flight-controller/controller-feature-02.svg',
  'flight-feature-3': 'frontend/src/features/products/assets/flight-controller/controller-feature-03.svg',
  'flight-price': 'frontend/src/features/products/assets/flight-controller/controller-price-icon.svg',
  'flight-feature-4': 'frontend/src/features/products/assets/flight-controller/controller-feature-04.svg',
  'flight-feature-5': 'frontend/src/features/products/assets/flight-controller/controller-feature-05.svg',
  'flight-feature-6': 'frontend/src/features/products/assets/flight-controller/controller-feature-06.svg',
  'contacts-email': 'frontend/src/features/contacts/assets/email-icon.png',
  'contacts-right-image': 'frontend/src/features/contacts/assets/contact-illustration.png',
  'partner-sfedu': 'frontend/src/features/contacts/assets/sfedu-logo.png',
  'partner-ictis': 'frontend/src/features/contacts/assets/ictis-logo.png',
  'partner-integra': 'frontend/src/features/contacts/assets/integra-logo.png',
  'achievement-1': 'frontend/src/features/achievements/assets/achievement-certificate-01.png',
  'achievement-2': 'frontend/src/features/achievements/assets/achievement-certificate-02.png',
  'achievement-3': 'frontend/src/features/achievements/assets/achievement-certificate-03.png',
  'achievement-4': 'frontend/src/features/achievements/assets/achievement-certificate-04.png',
  'achievement-5': 'frontend/src/features/achievements/assets/achievement-certificate-05.png',
  'achievement-6': 'frontend/src/features/achievements/assets/achievement-certificate-06.png',
  'achievement-7': 'frontend/src/features/achievements/assets/achievement-certificate-07.png',
  'vite-logo': 'src/logo.svg',
};

const activityImages = {
  'Научные исследования и разработки': 'activity-research',
  'Разработка новых программных и аппаратных решений': 'activity-new-products',
  'Обучение и консультация в сфере безопасности': 'activity-teaching',
};

const serviceImages = {
  'Системы управления автономными роботами': 'service-robots',
  'Системы безопасности киберфизических систем': 'service-security',
  'Системы интеллектуального управления': 'service-intelligent-control',
  'Платы управления и аппаратные датчики': 'service-hardware',
};

const productMedia = [
  {
    slug: 'canary',
    gallery: ['canary-gallery-top', 'canary-gallery-middle', 'canary-gallery-bottom'],
    video: 'canary-video',
    features: ['canary-feature-1', 'canary-feature-2', 'canary-feature-3', 'canary-feature-4', 'canary-feature-5', 'canary-feature-6'],
  },
  {
    slug: 'sensor',
    gallery: ['sensor-gallery-1', 'sensor-gallery-2', 'sensor-gallery-3', 'sensor-product-1', 'sensor-product-2'],
    features: ['sensor-feature-1', 'sensor-feature-2', 'sensor-feature-3', 'sensor-feature-4', 'sensor-feature-5', 'sensor-feature-6'],
  },
  {
    slug: 'flight-controller',
    gallery: ['flight-gallery-1', 'flight-gallery-2', 'flight-gallery-3', 'flight-controller'],
    features: ['flight-feature-1', 'flight-feature-2', 'flight-feature-3', 'flight-feature-4', 'flight-feature-5', 'flight-feature-6'],
  },
];

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;

  for (const line of fs.readFileSync(filePath, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const separatorIndex = trimmed.indexOf('=');
    if (separatorIndex === -1) continue;

    const key = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed.slice(separatorIndex + 1).trim().replace(/^['"]|['"]$/g, '');
    process.env[key] ??= value;
  }
}

function assetPath(key) {
  return path.join(repoRoot, assets[key]);
}

function mediaId(uploadedAssets, key) {
  return uploadedAssets[key].id;
}

function uploadName(key) {
  return `signalbit-${key}${path.extname(assets[key]).toLowerCase()}`;
}

async function uploadAsset(strapi, key) {
  const [existing] = await strapi.entityService.findMany('plugin::upload.file', {
    filters: { name: uploadName(key) },
    limit: 1,
  });

  if (existing) return existing;

  const filePath = assetPath(key);
  const stat = await fs.promises.stat(filePath);
  const [uploadedFile] = await strapi.plugin('upload').service('upload').upload({
    data: { fileInfo: { name: uploadName(key), alternativeText: key } },
    files: {
      filepath: filePath,
      originalFilename: path.basename(filePath),
      mimetype: mimeTypes[path.extname(filePath).toLowerCase()] ?? 'application/octet-stream',
      size: stat.size,
    },
  });

  return uploadedFile;
}

async function uploadAssets(strapi) {
  const uploadedAssets = {};

  for (const key of Object.keys(assets)) {
    uploadedAssets[key] = await uploadAsset(strapi, key);
  }

  return uploadedAssets;
}

async function single(strapi, uid, populate = '*') {
  const entry = await strapi.entityService.findMany(uid, { populate });
  if (!entry) throw new Error(`Single type not found: ${uid}`);
  return entry;
}

async function collectionEntry(strapi, uid, filters, populate = '*') {
  const [entry] = await strapi.entityService.findMany(uid, { filters, limit: 1, populate });
  if (!entry) throw new Error(`Collection entry not found: ${uid} ${JSON.stringify(filters)}`);
  return entry;
}

async function attachSingleMedia(strapi, uploadedAssets) {
  const hero = await single(strapi, 'api::hero.hero');
  await strapi.entityService.update('api::hero.hero', hero.id, {
    data: {
      logo: mediaId(uploadedAssets, 'hero-logo'),
      leftHand: mediaId(uploadedAssets, 'hero-left-hand'),
      rightHand: mediaId(uploadedAssets, 'hero-right-hand'),
    },
  });

  const navigation = await single(strapi, 'api::site-navigation.site-navigation');
  await strapi.entityService.update('api::site-navigation.site-navigation', navigation.id, {
    data: { logo: mediaId(uploadedAssets, 'navigation-logo') },
  });

  const about = await single(strapi, 'api::about-company.about-company', { stats: true });
  const iconsByValue = { '3+': 'about-stat-three-plus', '3': 'about-stat-three', '5': 'about-stat-five' };
  await strapi.entityService.update('api::about-company.about-company', about.id, {
    data: {
      photo: mediaId(uploadedAssets, 'about-photo'),
      stats: about.stats.map((stat) => ({
        id: stat.id,
        value: stat.value,
        text: stat.text,
        icon: mediaId(uploadedAssets, iconsByValue[stat.value]),
      })),
    },
  });

  const contacts = await single(strapi, 'api::contact-setting.contact-setting', { partnerLogos: true });
  const logoByCode = { sfedu: 'partner-sfedu', ictis: 'partner-ictis', integra: 'partner-integra' };
  await strapi.entityService.update('api::contact-setting.contact-setting', contacts.id, {
    data: {
      emailIcon: mediaId(uploadedAssets, 'contacts-email'),
      rightImage: mediaId(uploadedAssets, 'contacts-right-image'),
      partnerLogos: contacts.partnerLogos.map((partner) => ({
        id: partner.id,
        name: partner.name,
        code: partner.code,
        image: mediaId(uploadedAssets, logoByCode[partner.code]),
      })),
    },
  });
}

async function attachCollectionMedia(strapi, uploadedAssets) {
  for (const [title, key] of Object.entries(activityImages)) {
    const entry = await collectionEntry(strapi, 'api::activity-field.activity-field', { title });
    await strapi.entityService.update('api::activity-field.activity-field', entry.id, { data: { image: mediaId(uploadedAssets, key) } });
  }

  for (const [title, key] of Object.entries(serviceImages)) {
    const entry = await collectionEntry(strapi, 'api::service.service', { title });
    await strapi.entityService.update('api::service.service', entry.id, { data: { image: mediaId(uploadedAssets, key) } });
  }

  for (const config of productMedia) {
    const product = await collectionEntry(strapi, 'api::product.product', { slug: config.slug }, { features: true });
    const features = product.features
      .slice()
      .sort((first, second) => (first.sortOrder ?? 0) - (second.sortOrder ?? 0))
      .map((feature, index) => ({
        id: feature.id,
        text: feature.text,
        sortOrder: feature.sortOrder,
        icon: mediaId(uploadedAssets, config.features[index]),
      }));
    const data = {
      gallery: config.gallery.map((key) => mediaId(uploadedAssets, key)),
      features,
      ...(config.video ? { video: mediaId(uploadedAssets, config.video) } : {}),
    };

    await strapi.entityService.update('api::product.product', product.id, { data });
  }

  for (let index = 1; index <= 7; index += 1) {
    const entry = await collectionEntry(strapi, 'api::achievement.achievement', { title: `Достижение ${index}` });
    await strapi.entityService.update('api::achievement.achievement', entry.id, {
      data: { image: mediaId(uploadedAssets, `achievement-${index}`) },
    });
  }
}

async function main() {
  loadEnvFile(path.join(backendRoot, '.env'));

  const appContext = await compileStrapi();
  const strapi = await createStrapi(appContext).load();

  try {
    const uploadedAssets = await uploadAssets(strapi);
    await attachSingleMedia(strapi, uploadedAssets);
    await attachCollectionMedia(strapi, uploadedAssets);
    console.log(`Imported ${Object.keys(uploadedAssets).length} frontend media files into local Strapi.`);
  } finally {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    await strapi.destroy();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
