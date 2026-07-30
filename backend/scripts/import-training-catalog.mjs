import { createHash } from 'node:crypto';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { createServer as createViteServer } from 'vite';

const require = createRequire(import.meta.url);
const { compileStrapi, createStrapi } = require('@strapi/strapi');
const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const backendRoot = path.resolve(scriptDirectory, '..');
const repositoryRoot = path.resolve(backendRoot, '..');
const frontendRoot = path.join(repositoryRoot, 'frontend');
const productSlug = 'training-bas';

const mimeTypes = {
  '.jpg': 'image/jpeg',
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

async function loadTrainingProduct() {
  const vite = await createViteServer({
    appType: 'custom',
    configFile: path.join(frontendRoot, 'vite.config.ts'),
    logLevel: 'silent',
    server: { middlewareMode: true },
  });

  try {
    const module = await vite.ssrLoadModule('/src/app/model/default-site-content.ts');
    return module.DEFAULT_SITE_CONTENT.products.find((product) => product.slug === productSlug);
  } finally {
    await vite.close();
  }
}

function mediaSourcePath(url) {
  if (url.startsWith('data:image/')) {
    const [metadata, payload] = url.split(',', 2);
    const mimeType = metadata.slice(5).split(';')[0];
    const extension = mimeType === 'image/svg+xml' ? '.svg' : `.${mimeType.split('/')[1]}`;
    const bytes = metadata.includes(';base64')
      ? Buffer.from(payload, 'base64')
      : Buffer.from(decodeURIComponent(payload));
    const digest = createHash('sha256').update(bytes).digest('hex').slice(0, 12);
    const inlinePath = path.join('/tmp', `signalbit-inline-${digest}${extension}`);
    if (!fs.existsSync(inlinePath)) {
      fs.writeFileSync(inlinePath, bytes);
    }
    return inlinePath;
  }

  if (!url.startsWith('/src/')) {
    throw new Error(`Unsupported frontend media URL: ${url}`);
  }

  return path.join(frontendRoot, url.slice(1));
}

async function uploadAsset(strapi, url) {
  const filePath = mediaSourcePath(url);
  const extension = path.extname(filePath).toLowerCase();
  const basename = path.basename(filePath, extension).replace(/[^a-z0-9-]+/gi, '-').toLowerCase();
  const digest = createHash('sha256').update(await fs.promises.readFile(filePath)).digest('hex').slice(0, 12);
  const name = `signalbit-original-${basename}-${digest}${extension}`;
  const [existing] = await strapi.entityService.findMany('plugin::upload.file', {
    filters: { name },
    limit: 1,
  });
  if (existing) return existing;

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

function mapProduct(product, mediaByUrl) {
  return {
    name: `${product.title} ${product.variant ?? ''}`.trim(),
    slug: product.slug,
    headline: product.title,
    slideType: product.slideType,
    slideSubtitle: product.variant,
    lead: product.lead,
    price: product.price,
    featured: product.featured ?? false,
    gallery: product.images.map((url) => mediaByUrl.get(url).id),
    galleryPositions: product.imagePositions?.map((position, index) => ({
      label: `Изображение ${index + 1}`,
      offsetX: position?.offsetX ?? 0,
      offsetY: position?.offsetY ?? 0,
      scale: position?.scale ?? 100,
    })),
    backgroundColor: product.backgroundColor,
    backgroundImage: product.backgroundImage ? mediaByUrl.get(product.backgroundImage).id : undefined,
    ...(product.backgroundImagePosition
      ? { backgroundImagePosition: product.backgroundImagePosition }
      : {}),
    catalogItems: product.catalogItems?.map((item, itemIndex) => ({
      code: item.code,
      name: item.name,
      description: item.description,
      kitTitle: item.kitTitle,
      kitItems: item.kit.map((kitItem, kitIndex) => ({
        ...kitItem,
        sortOrder: (kitIndex + 1) * 10,
      })),
      priceLabel: item.priceLabel,
      price: item.price,
      characteristicsButtonLabel: item.characteristicsButtonLabel,
      characteristicsTitle: item.characteristicsTitle,
      characteristicNameLabel: item.characteristicNameLabel,
      characteristicValueLabel: item.characteristicValueLabel,
      characteristicUnitLabel: item.characteristicUnitLabel,
      characteristics: item.characteristics.map((characteristic, characteristicIndex) => ({
        ...characteristic,
        sortOrder: (characteristicIndex + 1) * 10,
      })),
      sortOrder: (itemIndex + 1) * 10,
    })),
    sortOrder: 50,
  };
}

async function main() {
  const product = await loadTrainingProduct();
  if (!product) {
    throw new Error(`Frontend fallback product "${productSlug}" was not found.`);
  }

  loadEnvFile(path.join(backendRoot, '.env'));
  process.chdir(backendRoot);
  const appContext = await compileStrapi();
  const strapi = await createStrapi(appContext).load();

  try {
    const mediaUrls = [...product.images, product.backgroundImage].filter(Boolean);
    const mediaByUrl = new Map();
    for (const url of mediaUrls) {
      mediaByUrl.set(url, await uploadAsset(strapi, url));
    }

    const [existing] = await strapi.entityService.findMany('api::product.product', {
      filters: { slug: productSlug },
      limit: 1,
    });
    const data = mapProduct(product, mediaByUrl);
    if (existing) {
      await strapi.entityService.update('api::product.product', existing.id, { data });
    } else {
      await strapi.entityService.create('api::product.product', { data });
    }

    console.log(
      `Synced "${productSlug}" to Strapi: ${product.catalogItems.length} products, ` +
        `${product.catalogItems.reduce((total, item) => total + item.characteristics.length, 0)} table rows, ` +
        `${mediaByUrl.size} media files.`,
    );
  } finally {
    await new Promise((resolve) => setTimeout(resolve, 500));
    await strapi.destroy();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
