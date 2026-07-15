import { readFile, rm, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const clientDirectory = resolve(root, 'dist-frontend');
const serverDirectory = resolve(root, 'dist-frontend-ssr');
const siteUrl = process.env.VITE_SITE_URL?.replace(/\/$/, '');
const cmsUrl = process.env.VITE_STRAPI_API_URL?.replace(/\/$/, '');
const { render } = await import(pathToFileURL(resolve(serverDirectory, 'entry-server.js')).href);

function nonEmptyString(value) {
  return typeof value === 'string' && value.trim() ? value.trim() : undefined;
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function escapeHtml(value) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}

function replaceMetaContent(source, attribute, key, value) {
  const tagPattern = new RegExp(`<meta\\b(?=[^>]*\\b${attribute}=["']${escapeRegExp(key)}["'])[^>]*>`, 'i');
  return source.replace(tagPattern, (tag) => tag.replace(/content=("[^"]*"|'[^']*')/i, `content="${escapeHtml(value)}"`));
}

function replaceCanonical(source, value) {
  return source.replace(/<link\b(?=[^>]*\brel=["']canonical["'])[^>]*>/i, (tag) =>
    tag.replace(/href=("[^"]*"|'[^']*')/i, `href="${escapeHtml(value)}"`),
  );
}

function getMediaUrl(media) {
  const url = nonEmptyString(media?.url);
  if (!url) {
    return undefined;
  }
  if (/^https?:\/\//i.test(url)) {
    return url;
  }
  return cmsUrl ? new URL(url, `${cmsUrl}/`).href : undefined;
}

async function loadCmsContent() {
  if (!cmsUrl) {
    return undefined;
  }

  try {
    const response = await fetch(`${cmsUrl}/api/site-content`, { signal: AbortSignal.timeout(4_000) });
    if (!response.ok) {
      return undefined;
    }
    const payload = await response.json();
    return payload?.data && typeof payload.data === 'object' ? payload.data : undefined;
  } catch {
    return undefined;
  }
}

const indexPath = resolve(clientDirectory, 'index.html');
let html = await readFile(indexPath, 'utf8');
html = html.replace('<div id="root"></div>', `<div id="root">${render()}</div>`);

if (siteUrl) {
  html = html
    .replace('href="/" data-canonical', `href="${siteUrl}/" data-canonical`)
    .replace('content="/social-preview.png"', `content="${siteUrl}/social-preview.png"`)
    .replace('content="__SITE_URL__"', `content="${siteUrl}/"`)
    .replaceAll('__SITE_URL__', `${siteUrl}/`);
} else {
  html = html.replaceAll('__SITE_URL__', '/');
}

const cmsContent = await loadCmsContent();
const seo = cmsContent?.seoSetting;
if (seo && typeof seo === 'object') {
  const title = nonEmptyString(seo.metaTitle);
  const description = nonEmptyString(seo.metaDescription);
  const keywords = nonEmptyString(seo.keywords);
  const robotsValue = nonEmptyString(seo.robots);
  const socialTitle = nonEmptyString(seo.socialTitle) ?? title;
  const socialDescription = nonEmptyString(seo.socialDescription) ?? description;
  const canonicalUrl = nonEmptyString(seo.canonicalUrl) ?? (siteUrl ? `${siteUrl}/` : undefined);
  const socialImage = getMediaUrl(seo.socialImage) ?? (siteUrl ? `${siteUrl}/social-preview.png` : undefined);

  if (title) {
    html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(title)}</title>`);
  }
  if (description) {
    html = replaceMetaContent(html, 'name', 'description', description);
  }
  if (keywords) {
    html = replaceMetaContent(html, 'name', 'keywords', keywords);
  }
  if (robotsValue) {
    html = replaceMetaContent(html, 'name', 'robots', robotsValue);
  }
  if (socialTitle) {
    html = replaceMetaContent(html, 'property', 'og:title', socialTitle);
    html = replaceMetaContent(html, 'name', 'twitter:title', socialTitle);
  }
  if (socialDescription) {
    html = replaceMetaContent(html, 'property', 'og:description', socialDescription);
    html = replaceMetaContent(html, 'name', 'twitter:description', socialDescription);
  }
  if (canonicalUrl) {
    html = replaceCanonical(html, canonicalUrl);
    html = replaceMetaContent(html, 'property', 'og:url', canonicalUrl);
  }
  if (socialImage) {
    html = replaceMetaContent(html, 'property', 'og:image', socialImage);
    html = replaceMetaContent(html, 'name', 'twitter:image', socialImage);
  }

  const organizationName = nonEmptyString(seo.organizationName) ?? 'СИГНАЛ-БИТ';
  const legalName = nonEmptyString(seo.legalName) ?? organizationName;
  const organizationDescription = nonEmptyString(seo.organizationDescription) ?? description;
  const organizationAddress = nonEmptyString(seo.organizationAddress);
  const organizationUrl = canonicalUrl ?? (siteUrl ? `${siteUrl}/` : '/');
  const structuredData = JSON.stringify(
    {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          '@id': `${organizationUrl}#organization`,
          name: organizationName,
          legalName,
          url: organizationUrl,
          logo: socialImage,
          email: nonEmptyString(cmsContent?.contactSetting?.emailAddress),
          address: organizationAddress
            ? { '@type': 'PostalAddress', addressCountry: 'RU', streetAddress: organizationAddress }
            : undefined,
          description: organizationDescription,
        },
        {
          '@type': 'WebSite',
          '@id': `${organizationUrl}#website`,
          url: organizationUrl,
          name: organizationName,
          inLanguage: 'ru-RU',
          publisher: { '@id': `${organizationUrl}#organization` },
        },
      ],
    },
    null,
    2,
  ).replaceAll('<', '\\u003c');
  html = html.replace(
    /(<script\b[^>]*\bid=["']site-structured-data["'][^>]*>)[\s\S]*?(<\/script>)/i,
    `$1\n${structuredData}\n$2`,
  );
}

await writeFile(indexPath, html, 'utf8');

const robots = [
  'User-agent: *',
  'Allow: /',
  siteUrl ? `Sitemap: ${siteUrl}/sitemap.xml` : '',
  '',
].filter(Boolean).join('\n');
await writeFile(resolve(clientDirectory, 'robots.txt'), robots, 'utf8');

if (siteUrl) {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${siteUrl}/</loc></url>
</urlset>
`;
  await writeFile(resolve(clientDirectory, 'sitemap.xml'), sitemap, 'utf8');
}

await rm(serverDirectory, { recursive: true, force: true });
