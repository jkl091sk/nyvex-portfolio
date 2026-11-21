import { existsSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const output = path.join(root, 'out');
const expected = [
  'index.html', '404.html',
  'en/index.html', 'ua/index.html',
  ...['about','projects','services','contact','privacy-policy'].flatMap(slug => [
    `en/${slug}/index.html`, `ua/${slug}/index.html`
  ]),
  ...['initra-app','initra-site'].flatMap(slug => [
    `en/projects/${slug}/index.html`, `ua/projects/${slug}/index.html`
  ]),
  '_headers', '_routes.json', 'robots.txt', 'brand/nyvex-mark.svg'
];

if (!existsSync(output)) {
  console.error('ERROR: out/ does not exist. Run npm run build first.');
  process.exit(1);
}
const missing = expected.filter(file => !existsSync(path.join(output, file)));
const empty = expected.filter(file => {
  if (!file.endsWith('.html') || !existsSync(path.join(output, file))) return false;
  const html = readFileSync(path.join(output, file), 'utf8');
  return !/<html[\s>]/i.test(html) || !/<body[\s>]/i.test(html);
});
if (missing.length || empty.length) {
  for (const f of missing) console.error('MISSING:', f);
  for (const f of empty) console.error('INVALID HTML:', f);
  process.exit(1);
}
const assetDir = path.join(output, '_next', 'static');
if (!existsSync(assetDir) || readdirSync(assetDir).length === 0) {
  console.error('MISSING: Next.js static assets in out/_next/static');
  process.exit(1);
}
console.log(`PASS: ${expected.length} required outputs, EN and UA routes, 404, headers, Pages routes, static assets.`);
console.log('Deployment folder: out/');
