# NYVEX — Cloudflare Pages release (v2.11)

Готовые **исходники для production-сборки на Cloudflare Pages**. Это НЕ уже скомпилированная папка `out/`: Cloudflare создаст её автоматически при деплое. Используется Next.js 16 + TypeScript, статический экспорт HTML, EN / UA / RU, Webpack, Pages Functions для опциональной отправки формы.

## 1. GitHub — обязательно для рекомендованного сценария

1. Создай **новый** репозиторий, например `nyvex-portfolio`. Не загружай файлы в репозиторий Initra.
2. Распакуй архив. Перенеси **содержимое** этой папки в корень нового GitHub-репозитория так, чтобы `package.json`, `next.config.ts`, `src/`, `public/`, `functions/` лежали в корне.
3. Не добавляй `node_modules`, `.next`, `out`, `.env.local`, `.dev.vars` или секретные ключи.
4. Основная ветка: `main`.

## 2. Cloudflare Pages — настройки деплоя

1. Открой https://dash.cloudflare.com/ → **Workers & Pages** → **Create application** → **Pages** → **Connect to Git / Import an existing Git repository** (названия могут немного отличаться).
2. Подключи GitHub и выбери новый репозиторий `nyvex-portfolio`.
3. Project name: `nyvex` (если доступно).
4. Framework preset: **Next.js (Static HTML Export)**.
5. Production branch: `main`.
6. Root directory: `/` (или оставь стандартное пустое поле, если файлы в корне).
7. **Build command:** `npm run build` (ВАЖНО: запускает Next.js с Webpack).
8. **Build output directory:** `out`.
9. **Node version:** `22` (в проекте есть `.nvmrc`, при необходимости добавь переменную `NODE_VERSION=22`).
10. На первом этапе **не указывай** `NEXT_PUBLIC_CONTACT_ENDPOINT`: форма будет открывать email-черновик и сохранит работоспособность без платного домена.
11. Нажми **Save and Deploy / Deploy site**. Дождись успешного завершения сборки и открой выданный URL `*.pages.dev`.

Если после настройки переменных меняешь их значение, запускай новый деплой, потому что `NEXT_PUBLIC_*` внедряются в клиентский код **во время сборки**.

## 3. Проверка после публикации

- Проверь `/`, `/en/`, `/ua/`, `/ru/`, `/en/projects/`, `/en/about/`, `/en/services/`, `/en/contact/`, `/en/privacy-policy/`.
- Проверь оба Initra-проекта, меню на телефоне, ссылки, переключение языков, карточки и анимации.
- Заполни контактную форму: **без API она открывает почтовое приложение; письмо нужно отправить там вручную**.
- Проверь на телефоне через мобильный интернет (не только Wi-Fi).

## 4. Необязательная автоматическая отправка контактов через Resend

**Нужен подтверждённый домен отправителя в Resend** (для полноценной отправки пользователям); бесплатный `*.pages.dev` сам по себе доменом отправителя не является. Если домена пока нет, оставь форму в режиме открытия почтового приложения — сайт всё равно можно публиковать.

Когда домен готов:
1. Зарегистрируйся на https://resend.com/, добавь свой домен и подтвердить DNS-записи. Создай Resend API Key.
2. В Cloudflare Pages открой проект → **Settings → Variables and Secrets** и для окружения **Production** добавь:
   - `RESEND_API_KEY` = API-ключ Resend (**Encrypted secret**)
   - `CONTACT_FROM` = `NYVEX <contact@YOUR_VERIFIED_DOMAIN>` (замени домен на подтверждённый)
   - `CONTACT_TO` = `dimasavva63@gmail.com`
   - `NEXT_PUBLIC_CONTACT_ENDPOINT` = `/api/contact` (открытая build-time переменная)
3. Рекомендовано добавить Cloudflare Turnstile: `TURNSTILE_SECRET_KEY` (секрет), `NEXT_PUBLIC_TURNSTILE_SITE_KEY` (публичный). Не задавай секрет без сайта-ключа.
4. **Redeploy** (новая сборка нужна, чтобы фронтенд увидел `NEXT_PUBLIC_CONTACT_ENDPOINT`).
5. Отправь **одно реальное тестовое сообщение** на опубликованной странице Contact и убедись, что письмо пришло в почтовый ящик. Проверь ошибочный и пустой ввод.

`functions/api/contact.ts` уже реализует API `/api/contact`. Файл `public/_routes.json` ограничивает вызовы Functions только `/api/*`. При Git-интеграции Cloudflare Pages Functions будут обнаружены автоматически.

⚠️ **Не загружай ZIP с исходниками через Pages drag-and-drop** — такой способ не собирает Next.js и не компилирует каталог `functions/`. Используй Git-интеграцию (рекомендовано) либо Wrangler CLI с предварительно собранным `out/`.

## 5. Локальная проверка на Windows

В распакованной папке проекта:

```powershell
npm.cmd install
npm.cmd run build
```

Если сборка прошла, папка `out/` появится автоматически. Или используй `BUILD_NYVEX_WINDOWS.bat`. Для запуска dev-сервера — `START_NYVEX_WINDOWS.bat`. Сохраняется прежний `next dev --webpack`.

## Важное уточнение по статусу

В среде подготовки `npm` не смог подключиться к реестру (`EAI_AGAIN`), поэтому здесь нельзя честно подтвердить сборку Next.js/создание `out/`. Проверены структура, настройки статического экспорта, синтаксис TypeScript и локальные сценарии API. **Настоящая production-сборка произойдёт в Cloudflare Pages после подключения GitHub**. Если она выдаст ошибку, скопируй Build log.
