// scripts/gen-sitemap.js
// Generates public/sitemap.xml before next build.
// Run automatically via the build script in package.json.

const fs = require('fs');
const path = require('path');
const statuses = require('../lib/statuses.js');

const BASE_URL = 'https://hcr.cialo.site';
const LASTMOD = new Date().toISOString().split('T')[0];

// Locale → hreflang tag mapping (BCP 47)
const LOCALES = [
  { code: 'en',    hreflang: 'en',    prefix: '' },
  { code: 'zh-CN', hreflang: 'zh-CN', prefix: '/zh-CN' },
  { code: 'zh-TW', hreflang: 'zh-TW', prefix: '/zh-TW' },
  { code: 'ja',    hreflang: 'ja-JP', prefix: '/ja' },
  { code: 'fr',    hreflang: 'fr-FR', prefix: '/fr' },
  { code: 'ru',    hreflang: 'ru-RU', prefix: '/ru' },
  { code: 'es',    hreflang: 'es-ES', prefix: '/es' },
];

const statusCodes = Object.keys(statuses);

function buildAlternates(path) {
  return LOCALES.map(({ hreflang, prefix }) =>
    `      <xhtml:link rel="alternate" hreflang="${hreflang}" href="${BASE_URL}${prefix}${path}"/>`
  ).join('\n') +
  `\n      <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}${path}"/>`;
}

function buildUrl(loc, alternates, priority = '0.8') {
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${LASTMOD}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
${alternates}
  </url>`;
}

const urls = [];

// Home pages (one per locale)
for (const { prefix } of LOCALES) {
  const pagePath = prefix || '/';
  urls.push(buildUrl(
    `${BASE_URL}${pagePath}`,
    buildAlternates('/'),
    '1.0'
  ));
}

// Status detail pages (one per code × locale)
for (const code of statusCodes) {
  for (const { prefix } of LOCALES) {
    const pagePath = `${prefix}/status/${code}`;
    urls.push(buildUrl(
      `${BASE_URL}${pagePath}`,
      buildAlternates(`/status/${code}`),
      '0.7'
    ));
  }
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`;

const outPath = path.join(__dirname, '../public/sitemap.xml');
fs.writeFileSync(outPath, xml, 'utf8');
console.log(`✓ sitemap.xml generated: ${urls.length} URLs → ${outPath}`);
