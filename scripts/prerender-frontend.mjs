import { readFile, rm, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const clientDirectory = resolve(root, 'dist-frontend');
const serverDirectory = resolve(root, 'dist-frontend-ssr');
const siteUrl = process.env.VITE_SITE_URL?.replace(/\/$/, '');
const { render } = await import(pathToFileURL(resolve(serverDirectory, 'entry-server.js')).href);

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
