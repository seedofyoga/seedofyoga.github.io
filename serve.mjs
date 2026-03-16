import http from 'http';
import fs from 'fs';
import path from 'path';

const PORT = 3000;
const ROOT = process.cwd();

const MIME = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.mjs': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

const server = http.createServer((req, res) => {
  let urlPath = req.url.split('?')[0];
  if (urlPath === '/') urlPath = '/index.html';

  const filepath = path.join(ROOT, urlPath);

  if (!filepath.startsWith(ROOT)) {
    res.writeHead(403); res.end('Forbidden'); return;
  }

  fs.readFile(filepath, (err, data) => {
    if (err) {
      res.writeHead(404); res.end('Not found'); return;
    }
    const ext = path.extname(filepath);
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(data);
  });
});

server.listen(PORT, () => console.log(`Serving ${ROOT} at http://localhost:${PORT}`));
