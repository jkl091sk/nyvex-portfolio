import {existsSync,readFileSync,readdirSync} from 'node:fs';
import path from 'node:path';
const output=path.join(process.cwd(),'out');
const expected=[
 'index.html','404.html','sitemap.xml',
 'en/index.html','ua/index.html',
 ...['about','projects','services','contact','privacy-policy'].flatMap(x=>[`en/${x}/index.html`,`ua/${x}/index.html`]),
 ...['initra-app','initra-site','roundtrace'].flatMap(x=>[`en/projects/${x}/index.html`,`ua/projects/${x}/index.html`]),
 'roundtrace/RoundTrace-0.3.1.zip','roundtrace/logo.svg','_headers','robots.txt','brand/nyvex-mark.svg','og/nyvex-social.png','favicon.ico','apple-touch-icon.png','icon-192.png'
];
if(!existsSync(output)){console.error('ERROR: out/ is missing; run npm run build');process.exit(1);}
let errors=[];
for(const file of expected){const filename=path.join(output,file);
 if(!existsSync(filename)){errors.push('MISSING: '+file);continue;}
 if(file.endsWith('.html')){const html=readFileSync(filename,'utf8');
  if(!/<html[\s>]/i.test(html)||!/<body[\s>]/i.test(html))errors.push('INVALID HTML: '+file);
  if(!html.includes('og:image'))errors.push('MISSING OG IMAGE: '+file);
  if(!html.includes('canonical'))errors.push('MISSING CANONICAL: '+file);
  if(file.startsWith('en/')||file.startsWith('ua/')){
   if(!html.toLowerCase().includes('hreflang'))errors.push('MISSING HREFLANG: '+file);
  }
 }
}
const sitemapPath=path.join(output,'sitemap.xml');
if(existsSync(sitemapPath)){
 const map=readFileSync(sitemapPath,'utf8');
 for(const route of ['/en/','/ua/','/en/contact/','/ua/contact/','/en/projects/initra-app/','/ua/projects/initra-site/'])
  if(!map.includes(route))errors.push('SITEMAP ROUTE MISSING: '+route);
}
const assets=path.join(output,'_next','static');
if(!existsSync(assets)||readdirSync(assets).length===0)errors.push('MISSING NEXT STATIC ASSETS');
if(errors.length){console.error(errors.join('\n'));process.exit(1);}
console.log(`PASS: ${expected.length} files, localized metadata, sitemap, social image, favicon, static assets.`);
