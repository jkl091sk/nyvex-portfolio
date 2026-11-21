# NYVEX — SEO, Open Graph и публикация

Сайт: https://nyvex-bq4.pages.dev
Языки: English и Українська.

Что добавлено:
- Уникальные метаданные Home, Projects, 2 страниц Initra, About, Services, Contact, Privacy Policy на EN/UA
- Canonical и hreflang для каждой локализованной страницы
- Open Graph и Twitter Card с изображением 1200×630
- Favicon, Apple Touch icon, 192px icon
- sitemap.xml, ссылка на sitemap в robots.txt
- Разметка Schema.org Person + WebSite
- Исправлена verify:export: не требует удалённый ранее _routes.json

Cloudflare Pages: `npm run build` → каталог `out`. Перед публикацией проверить `npm run verify:export` после сборки.

После публикации проверить:
1. Открывается `/sitemap.xml` и `/robots.txt`.
2. Во вкладке браузера отображается иконка.
3. Ссылка на `/en/` и `/ua/` даёт карточку в Telegram/Discord/LinkedIn. Некоторые платформы кэшируют старые карточки.
4. Все страницы на телефоне, включая меню и форму Contact.
5. По желанию добавить сайт в Google Search Console и отправить sitemap URL.

Настройки Contact с FormSubmit.co не изменялись. Дизайн CSS не менялся. SEO не гарантирует позиции в поисковой выдаче.
