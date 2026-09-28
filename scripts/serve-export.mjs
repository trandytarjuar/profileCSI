// Local smoke-test server for the static export and Vercel header configuration.
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, sep, extname } from 'node:path';

const root = resolve('out');
const config = JSON.parse(await readFile('vercel.json', 'utf8'));
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.ico': 'image/x-icon', '.txt': 'text/plain', '.xml': 'application/xml' };
createServer(async (request, response) => {
  for (const header of config.headers[0].headers) response.setHeader(header.key, header.value);
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    if (/^\/regional\/[^/]+\/?$/.test(pathname)) {
      response.writeHead(308, { Location: pathname.replace('/regional/', '/chapter/') }); response.end(); return;
    }
    let file = resolve(root, '.' + pathname);
    if (file !== root && !file.startsWith(root + sep)) { response.writeHead(403); response.end(); return; }
    if (file === root) file = resolve(root, 'index.html');
    if (!extname(file)) file = file.replace(/[\\/]$/, '') + '.html';
    if (!(await stat(file)).isFile()) throw new Error('Not a file');
    response.setHeader('Content-Type', types[extname(file)] ?? 'application/octet-stream');
    response.writeHead(200);
    response.end(request.method === 'HEAD' ? undefined : await readFile(file));
  } catch {
    response.writeHead(404); response.end('Not found');
  }
}).listen(Number(process.env.PORT ?? 4173), '127.0.0.1', () => console.log('Static test server ready'));
