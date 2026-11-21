# NYVEX — Cloudflare Pages source package (v5.2)

Portfolio for Dmitriy Savva. Includes English (`/en/`) and Ukrainian (`/ua/`) site, Initra App and Initra Website portfolio, About, Services, Contact and Privacy Policy.

## Run locally
```bash
npm install
npm run dev
```
Visit http://localhost:3000/en/.

## Build a static site
```bash
npm install
npm run build
npm run verify:export
```
The compiled static site will be in `out/`, ready for Cloudflare Pages.

**For a Russian step-by-step deployment guide, see `CLOUDFLARE_DEPLOY_RU.md`.**

### Cloudflare Pages preset
- Framework preset: `Next.js (Static HTML Export)`
- Build command: `npm run build`
- Output directory: `out`
- Node.js: `22`
- Root directory: `/`

Contact form submits directly to FormSubmit.co using AJAX; HTML POST remains available without JavaScript. No API keys, paid domain, Cloudflare Functions or extra build variables are required.
**First-use activation required:** FormSubmit sends a confirmation email to `dimasavva63@gmail.com` after the first submission. Until that address is confirmed, delivery is not ready. See `CONTACT_FORMSUBMIT_RU.md`.

## Verification status
Deployment configuration, EN/UA route mappings and TSX syntax checked in the authoring environment. Real `next build`, export verification, Cloudflare deploy and physical-device testing **not yet verified** because the npm registry was unreachable there. Use the commands above or build on Cloudflare.
