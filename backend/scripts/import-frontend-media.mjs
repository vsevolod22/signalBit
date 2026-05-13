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
  'hero-logo': 'src/shared/assets/signal-bit-logo.png',
  'hero-left-hand': 'src/features/main-hero/assets/hand-left.png',
  'hero-right-hand': 'src/features/main-hero/assets/hand-right.png',
  'navigation-logo': 'src/features/site-navigation/assets/logo.png',
  'about-photo': 'src/features/about-company/assets/photo1.png',
  'about-stat-three-plus': 'src/features/about-company/assets/c_three.svg',
  'about-stat-three': 'src/features/about-company/assets/c_three1.svg',
  'about-stat-five': 'src/features/about-company/assets/c_five.svg',
  'activity-research': 'src/features/activity-fields/assets/research.png',
  'activity-new-products': 'src/features/activity-fields/assets/new_products.png',
  'activity-teaching': 'src/features/activity-fields/assets/teaching.png',
  'service-robots': 'src/features/services/assets/price1.png',
  'service-security': 'src/features/services/assets/price2.png',
  'service-intelligent-control': 'src/features/services/assets/price3.png',
  'service-hardware': 'src/features/services/assets/price4.png',
  'canary-gallery-top': 'src/features/product-canary/assets/top.png',
  'canary-gallery-middle': 'src/features/product-canary/assets/middle.png',
  'canary-gallery-bottom': 'src/features/product-canary/assets/bottom.png',
  'canary-video': 'src/features/product-canary/assets/demonstration.mp4',
  'canary-feature-1': 'src/features/product-canary/assets/creation_1.png',
  'canary-feature-2': 'src/features/product-canary/assets/creation_2.png',
  'canary-feature-3': 'src/features/product-canary/assets/creation_3.png',
  'canary-feature-4': 'src/features/product-canary/assets/creation_4.png',
  'canary-feature-5': 'src/features/product-canary/assets/creation_5.png',
  'canary-feature-6': 'src/features/product-canary/assets/creation_6.png',
  'canary-price': 'src/features/product-canary/assets/money.png',
  'sensor-gallery-1': 'src/features/product-sensor/assets/img1.png',
  'sensor-gallery-2': 'src/features/product-sensor/assets/img2.png',
  'sensor-gallery-3': 'src/features/product-sensor/assets/img3.png',
  'sensor-product-1': 'src/features/product-sensor/assets/sen1.png',
  'sensor-product-2': 'src/features/product-sensor/assets/sen2.png',
  'sensor-feature-1': 'src/features/product-sensor/assets/z1.svg',
  'sensor-feature-2': 'src/features/product-sensor/assets/z2.svg',
  'sensor-feature-3': 'src/features/product-sensor/assets/z3.svg',
  'sensor-price': 'src/features/product-sensor/assets/z4.svg',
  'sensor-feature-4': 'src/features/product-sensor/assets/z5.svg',
  'sensor-feature-5': 'src/features/product-sensor/assets/z6.svg',
  'sensor-feature-6': 'src/features/product-sensor/assets/z7.svg',
  'flight-gallery-1': 'src/features/product-flight-controller/assets/img1.png',
  'flight-gallery-2': 'src/features/product-flight-controller/assets/img2.png',
  'flight-gallery-3': 'src/features/product-flight-controller/assets/img3.png',
  'flight-controller': 'src/features/product-flight-controller/assets/fc1.png',
  'flight-feature-1': 'src/features/product-flight-controller/assets/z1.svg',
  'flight-feature-2': 'src/features/product-flight-controller/assets/z2.svg',
  'flight-feature-3': 'src/features/product-flight-controller/assets/z3.svg',
  'flight-price': 'src/features/product-flight-controller/assets/z4.svg',
  'flight-feature-4': 'src/features/product-flight-controller/assets/z5.svg',
  'flight-feature-5': 'src/features/product-flight-controller/assets/z6.svg',
  'flight-feature-6': 'src/features/product-flight-controller/assets/z7.svg',
  'contacts-email': 'src/features/contacts/assets/email.png',
  'contacts-right-image': 'src/features/contacts/assets/right_img.png',
  'partner-sfedu': 'src/features/contacts/assets/logo_sfedu.png',
  'partner-ictis': 'src/features/contacts/assets/logo_ictis.png',
  'partner-integra': 'src/features/contacts/assets/logo_integra.png',
  'achievement-1': 'src/features/achievements/assets/d1.jpg',
  'achievement-2': 'src/features/achievements/assets/d2.jpg',
  'achievement-3': 'src/features/achievements/assets/d3.jpg',
  'achievement-4': 'src/features/achievements/assets/d4.jpg',
  'achievement-5': 'src/features/achievements/assets/d5.jpg',
  'achievement-6': 'src/features/achievements/assets/d6.jpg',
  'achievement-7': 'src/features/achievements/assets/d7.jpg',
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
