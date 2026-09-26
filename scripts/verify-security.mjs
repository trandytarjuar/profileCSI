import { existsSync, readFileSync } from 'node:fs';

const fail = (message) => {
  console.error(`Security verification failed: ${message}`);
  process.exitCode = 1;
};

const config = JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url)));
const headers = config.headers?.[0]?.headers ?? [];
const header = (name) => headers.find((entry) => entry.key.toLowerCase() === name.toLowerCase())?.value;
const csp = header('Content-Security-Policy') ?? '';

for (const [name, value] of Object.entries({
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Strict-Transport-Security': 'max-age=31536000',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
})) {
  if (header(name) !== value) fail(`missing or incorrect ${name}`);
}

for (const directive of ["default-src 'self'", "object-src 'none'", "base-uri 'self'", "frame-ancestors 'none'", "script-src-attr 'none'"]) {
  if (!csp.includes(directive)) fail(`CSP is missing ${directive}`);
}
if (csp.includes('unsafe-eval') || csp.includes('*')) fail('CSP contains an unsafe wildcard or unsafe-eval');
if (!csp.includes('https://fonts.googleapis.com') || !csp.includes('https://fonts.gstatic.com')) fail('CSP does not permit the configured Google Fonts resources');

const routes = ['', 'under-construction', ...['jakarta', 'bogor', 'depok', 'tangerang', 'bekasi', 'cikarang', 'karawang', 'purwakarta', 'semarang', 'malang-raya', 'deli-serdang'].map((slug) => `regional/${slug}`)];
for (const route of routes) {
  const path = route ? `out/${route}.html` : 'out/index.html';
  if (!existsSync(new URL(`../${path}`, import.meta.url))) fail(`missing static export for /${route}`);
}

if (!existsSync(new URL('../out/robots.txt', import.meta.url)) || !existsSync(new URL('../out/sitemap.xml', import.meta.url))) fail('missing static metadata output');
if (!existsSync(new URL('../out/favicon.ico', import.meta.url)) || !existsSync(new URL('../out/favicon.png', import.meta.url))) fail('missing exported favicon assets');
if (!process.exitCode) console.log('Security configuration and static route verification passed.');
