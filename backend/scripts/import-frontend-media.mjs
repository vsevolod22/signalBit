import { createHash } from 'node:crypto';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { createServer as createViteServer } from 'vite';

const require = createRequire(import.meta.url);
const { compileStrapi, createStrapi } = require('@strapi/strapi');

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const backendRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(backendRoot, '..');
const frontendRoot = path.join(repoRoot, 'frontend');

const mimeTypes = {
  '.gif': 'image/gif',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
};

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

async function loadFrontendContent() {
  const vite = await createViteServer({
    appType: 'custom',
    configFile: path.join(frontendRoot, 'vite.config.ts'),
    logLevel: 'silent',
    server: { middlewareMode: true },
  });

  try {
    const module = await vite.ssrLoadModule('/src/app/model/default-site-content.ts');
    return module.DEFAULT_SITE_CONTENT;
  } finally {
    await vite.close();
  }
}

function collectMediaUrls(content) {
  return [
    content.navigation.logo,
    content.hero.image,
    content.hero.arrowImage,
    ...content.activityCards.map((item) => item.image),
    ...content.developments.map((item) => item.image),
    ...content.education.programs.map((item) => item.image),
    ...content.products.flatMap((item) => item.images),
    content.about.photo,
    ...content.achievements.map((item) => item.image),
    content.contacts.emailIcon,
    content.contacts.heroImage,
    ...content.contacts.partners.map((item) => item.image),
  ].filter((url) => typeof url === 'string' && url.length > 0);
}

function mediaSourcePath(url) {
  if (!url.startsWith('/src/')) {
    throw new Error(`Unsupported frontend media URL: ${url}`);
  }

  return path.join(frontendRoot, url.slice(1));
}

async function uploadName(filePath) {
  const extension = path.extname(filePath).toLowerCase();
  const basename = path.basename(filePath, extension).replace(/[^a-z0-9-]+/gi, '-').toLowerCase();
  const digest = createHash('sha256').update(await fs.promises.readFile(filePath)).digest('hex').slice(0, 12);
  return `signalbit-original-${basename}-${digest}${extension}`;
}

async function uploadAsset(strapi, url) {
  const filePath = mediaSourcePath(url);
  const name = await uploadName(filePath);
  const [existing] = await strapi.entityService.findMany('plugin::upload.file', {
    filters: { name },
    limit: 1,
  });

  if (existing) return existing;

  const extension = path.extname(filePath).toLowerCase();
  const stat = await fs.promises.stat(filePath);
  const [uploadedFile] = await strapi.plugin('upload').service('upload').upload({
    data: {
      fileInfo: {
        name,
        alternativeText: path.basename(filePath, extension),
      },
    },
    files: {
      filepath: filePath,
      originalFilename: path.basename(filePath),
      mimetype: mimeTypes[extension] ?? 'application/octet-stream',
      size: stat.size,
    },
  });

  return uploadedFile;
}

async function uploadFrontendMedia(strapi, content) {
  const mediaByUrl = new Map();
  const urls = [...new Set(collectMediaUrls(content))];

  for (const url of urls) {
    mediaByUrl.set(url, await uploadAsset(strapi, url));
  }

  return mediaByUrl;
}

function mediaId(mediaByUrl, url) {
  const media = mediaByUrl.get(url);
  if (!media) {
    throw new Error(`Frontend media was not uploaded: ${url}`);
  }
  return media.id;
}

async function updateSingleType(strapi, uid, data) {
  const existing = await strapi.entityService.findMany(uid, { limit: 1 });

  if (existing) {
    await strapi.entityService.update(uid, existing.id, { data });
    return;
  }

  await strapi.entityService.create(uid, { data });
}

async function replaceCollection(strapi, uid, items) {
  const existing = await strapi.entityService.findMany(uid, { limit: 1000 });
  await Promise.all(existing.map((entry) => strapi.entityService.delete(uid, entry.id)));

  for (const data of items) {
    await strapi.entityService.create(uid, { data });
  }
}

async function syncSingleTypes(strapi, content, mediaByUrl) {
  await updateSingleType(strapi, 'api::hero.hero', {
    title: content.hero.title,
    description: content.hero.headline,
    secondaryTitle: content.hero.subtitle,
    secondaryDescription: content.hero.description,
    rightHand: mediaId(mediaByUrl, content.hero.image),
    leftHand: mediaId(mediaByUrl, content.hero.arrowImage),
  });

  await updateSingleType(strapi, 'api::site-navigation.site-navigation', {
    links: content.navigation.links.map((link, index) => ({
      label: link.label,
      sectionIndex: index + 1,
    })),
    productLinks: [],
    contactLabel: content.navigation.contactLabel,
    contactSectionIndex: content.navigation.links.length + 1,
    logo: mediaId(mediaByUrl, content.navigation.logo),
  });

  await updateSingleType(strapi, 'api::about-company.about-company', {
    missionTitle: content.about.title,
    companyLabel: 'Мы ИТ-компания',
    paragraphs: content.about.paragraphs,
    stats: content.about.stats.map((stat) => ({
      value: stat.value,
      text: stat.label,
    })),
    officialTitle: content.about.officialTitle,
    officialItems: content.about.officialItems,
    photo: mediaId(mediaByUrl, content.about.photo),
  });

  await updateSingleType(strapi, 'api::contact-setting.contact-setting', {
    questionTitle: content.contacts.title,
    emailLabel: content.contacts.emailLabel,
    emailAddress: content.contacts.emailAddress,
    responseText: content.contacts.responseText,
    partnersTitle: content.contacts.partnersTitle,
    emailIcon: mediaId(mediaByUrl, content.contacts.emailIcon),
    rightImage: mediaId(mediaByUrl, content.contacts.heroImage),
    partnerLogos: content.contacts.partners.map((partner, index) => ({
      name: partner.name,
      code: ['sfedu', 'ictis', 'integra'][index] ?? `partner-${index + 1}`,
    })),
  });

  const contactSetting = await strapi.entityService.findMany('api::contact-setting.contact-setting', {
    populate: { partnerLogos: true },
  });
  await updateSingleType(strapi, 'api::contact-setting.contact-setting', {
    partnerLogos: contactSetting.partnerLogos.map((component, index) => ({
      id: component.id,
      name: component.name,
      code: component.code,
      image: mediaId(mediaByUrl, content.contacts.partners[index].image),
    })),
  });

  await updateSingleType(strapi, 'api::activity-setting.activity-setting', {
    sectionTitle: content.activityTitle,
  });

  await updateSingleType(strapi, 'api::service-setting.service-setting', {
    sectionTitle: content.developmentTitle,
  });

  await updateSingleType(strapi, 'api::achievement-setting.achievement-setting', {
    sectionTitle: content.achievementsTitle,
  });
}

async function syncCollections(strapi, content, mediaByUrl) {
  await replaceCollection(
    strapi,
    'api::activity-field.activity-field',
    content.activityCards.map((item, index) => ({
      title: item.title,
      description: item.description,
      sortOrder: (index + 1) * 10,
      ...(item.image ? { image: mediaId(mediaByUrl, item.image) } : {}),
    }))
  );

  await replaceCollection(
    strapi,
    'api::service.service',
    content.developments.map((item, index) => ({
      title: item.title,
      description: item.description,
      technologies: item.technologies,
      cost: item.cost,
      image: mediaId(mediaByUrl, item.image),
      sortOrder: (index + 1) * 10,
    }))
  );

  await replaceCollection(
    strapi,
    'api::product.product',
    content.products.map((item, index) => ({
      name: item.title,
      slug: item.slug,
      headline: item.title,
      lead: item.lead,
      price: item.price,
      priceNote: item.priceNote,
      ctaLabel: item.cta,
      featured: item.featured ?? false,
      features: item.description.map((text, featureIndex) => ({
        text,
        sortOrder: (featureIndex + 1) * 10,
      })),
      gallery: item.images.map((url) => mediaId(mediaByUrl, url)),
      sortOrder: (index + 1) * 10,
    }))
  );

  await replaceCollection(
    strapi,
    'api::achievement.achievement',
    content.achievements.map((item, index) => ({
      title: item.title,
      image: mediaId(mediaByUrl, item.image),
      sortOrder: (index + 1) * 10,
    }))
  );
}

async function main() {
  const content = await loadFrontendContent();
  loadEnvFile(path.join(backendRoot, '.env'));
  process.chdir(backendRoot);

  const appContext = await compileStrapi();
  const strapi = await createStrapi(appContext).load();
  const uploadService = strapi.plugin('upload').service('upload');
  const uploadSettings = await uploadService.getSettings();

  try {
    await uploadService.setSettings({
      ...uploadSettings,
      autoOrientation: false,
      responsiveDimensions: false,
      sizeOptimization: false,
    });
    const mediaByUrl = await uploadFrontendMedia(strapi, content);
    await syncSingleTypes(strapi, content, mediaByUrl);
    await syncCollections(strapi, content, mediaByUrl);
    console.log(
      `Synced frontend mock content to Strapi: ${mediaByUrl.size} media files, ` +
        `${content.activityCards.length} activities, ${content.developments.length} developments, ` +
        `${content.products.length} products, ${content.achievements.length} achievements.`
    );
  } finally {
    await uploadService.setSettings(uploadSettings);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    await strapi.destroy();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
