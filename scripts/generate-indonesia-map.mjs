import { mkdirSync, writeFileSync } from 'node:fs';

// Build-time utility only. No network request is made by the website's map.
const source = 'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/v5.1.2/geojson/ne_50m_admin_0_countries.geojson';
const response = await fetch(source);
if (!response.ok) throw new Error(`Natural Earth download failed: ${response.status}`);
const collection = await response.json();
const indonesia = collection.features.find(feature => feature.properties.ADM0_A3 === 'IDN');
if (!indonesia || indonesia.geometry.type !== 'MultiPolygon') throw new Error('Expected Indonesian multipolygon');
const project = ([longitude, latitude]) => [(longitude - 94) / 48 * 1000, (7 - latitude) / 19 * 396];
const path = indonesia.geometry.coordinates.map(polygon => polygon.map(ring => ring.map((point, index) => {
  const [x, y] = project(point);
  return `${index ? 'L' : 'M'}${x.toFixed(2)},${y.toFixed(2)}`;
}).join('') + 'Z').join('')).join('');
const output = new URL('../public/maps/', import.meta.url);
mkdirSync(output, { recursive: true });
writeFileSync(new URL('indonesia.svg', output), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 396"><title>Indonesia — Natural Earth</title><path fill="#42454b" stroke="#74777c" stroke-width="0.6" stroke-linejoin="round" d="${path}"/></svg>`);
console.log(`Generated Indonesia SVG (${path.length} path bytes).`);
