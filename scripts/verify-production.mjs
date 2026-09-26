const baseUrl = process.env.SITE_URL ?? 'https://cbrsquadindonesia.vercel.app';
const routes = [
  '/', '/under-construction', '/regional/jakarta', '/regional/bogor',
  '/regional/depok', '/regional/tangerang', '/regional/bekasi',
  '/regional/cikarang', '/regional/karawang', '/regional/purwakarta',
  '/regional/semarang', '/regional/malang-raya', '/regional/deli-serdang',
];
const requiredHeaders = {
  'content-security-policy': "default-src 'self'",
  'strict-transport-security': 'max-age=31536000',
  'x-frame-options': 'DENY',
  'x-content-type-options': 'nosniff',
  'referrer-policy': 'strict-origin-when-cross-origin',
  'permissions-policy': 'camera=(), microphone=(), geolocation=()',
};

const fail = (message) => {
  console.error(`Production verification failed: ${message}`);
  process.exitCode = 1;
};
const response = await fetch(`${baseUrl}/`);
console.log(`GET /: ${response.status}`);
for (const [name, expected] of Object.entries(requiredHeaders)) {
  if (!response.headers.get(name)?.includes(expected)) fail(`missing or incorrect ${name}`);
}

const results = await Promise.all(routes.map(async (route) => [route, (await fetch(`${baseUrl}${route}`)).status]));
for (const [route, status] of results) {
  console.log(`GET ${route}: ${status}`);
  if (status !== 200) fail(`${route} returned ${status}`);
}

const assets = ['/hero.jpg', '/concept.png', '/favicon.ico', '/favicon.png'];
for (const asset of assets) {
  const assetResponse = await fetch(`${baseUrl}${asset}`, { method: 'HEAD' });
  console.log(`HEAD ${asset}: ${assetResponse.status}`);
  if (assetResponse.status !== 200) fail(`${asset} returned ${assetResponse.status}`);
}

if (!process.exitCode) console.log('Production header, route, and public-asset smoke test passed.');
