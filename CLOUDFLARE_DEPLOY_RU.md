# NYVEX — публикация на Cloudflare Pages

**Подготовлено:** 21 ноября 2026 года. **Версия:** 5.1.0, на основе NYVEX v5.

## Перед публикацией

Проект использует Next.js + TypeScript, `output: 'export'`, два языка `/en/` и `/ua/`, без `/ru/`.
Контактная форма **по умолчанию открывает почтовое приложение посетителя**; она не отправляет письмо сама.
Потребуется настроить серверную отправку отдельно, если ты хочешь полноценную форму.

## Рекомендуемый вариант: GitHub + Cloudflare Pages

1. Распакуй этот архив. В корне папки должны быть `package.json`, `src/`, `public/`, `functions/`.
2. На GitHub создай **новый отдельный репозиторий** (например `nyvex-portfolio`). Не загружай сайт в репозиторий Initra.
3. Загрузи **содержимое** папки NYVEX_Cloudflare_Ready в корень этого репозитория.
   `node_modules/`, `.next/`, `out/`, `.env.local` в Git не добавлять.
4. Перейди на https://dash.cloudflare.com/ → Workers & Pages → Create application → Pages → Import an existing Git repository.
5. Подключи GitHub, выбери репозиторий NYVEX.
6. Установи параметры:
   - Framework preset: **Next.js (Static HTML Export)**
   - Production branch: **main**
   - Build command: **npm run build**
   - Build output directory: **out**
   - Root directory: **/** (или поле оставить пустым)
   - Node: из файла `.nvmrc` (22), при необходимости **NODE_VERSION = 22**.
7. Нажми **Save and Deploy**. В Cloudflare смотри логи установки и сборки.
8. После успешного деплоя проверь `/en/`, `/ua/`, `/en/projects/`, `/en/contact/`, `/ua/privacy-policy/` и мобильное меню.

Сайт получит поддомен вида `PROJECT-NAME.pages.dev`; точное имя зависит от доступности.
При последующих изменениях в GitHub Cloudflare автоматически пересоберёт сайт.

### Если пользуешься терминалом Git (не обязательно)

```powershell
git init
git add .
git commit -m "Prepare NYVEX for Cloudflare Pages"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/nyvex-portfolio.git
git push -u origin main
```

Заменить `YOUR_USERNAME` и убедиться, что пустой репозиторий создан заранее.

## Вариант без GitHub: Direct Upload

1. На компьютере установи Node.js 22+, запусти `CHECK_AND_BUILD_WINDOWS.bat`.
2. Скрипт выполнит `npm.cmd install`, `npm.cmd run build`, проверит нужные страницы и создаст `NYVEX_STATIC_UPLOAD.zip`.
3. В Cloudflare Workers & Pages создай проект через **Drag and drop** и загрузи **только `NYVEX_STATIC_UPLOAD.zip`** (либо `out/`).

**Важно:** исходный ZIP с кодом нельзя напрямую загружать как готовый статический сайт. Для Direct Upload
сначала обязательна успешная локальная сборка. Папка `functions/` не подключается через dashboard drag-and-drop;
если в будущем нужна работающая контактная API-форма — удобнее Git-интеграция.

## Проверка локально

```powershell
npm.cmd install
npm.cmd run dev
```

Открыть http://localhost:3000/en/

Проверка production-вывода:

```powershell
npm.cmd run build
npm.cmd run verify:export
```

## Контактная форма

- Сейчас без серверной настройки отправка происходит через `mailto:` и требует отправки письма посетителем.
- Для отправки с сайта есть необязательная Cloudflare Pages Function `functions/api/contact.ts`.
- Для её включения нужны проверенный домен отправителя, провайдер email (Resend), секреты в Cloudflare Pages,
  `NEXT_PUBLIC_CONTACT_ENDPOINT=/api/contact` при сборке, а для защиты от спама рекомендован Turnstile.
- **Не включай `NEXT_PUBLIC_CONTACT_ENDPOINT`**, пока API-почта не настроена и не протестирована.
- Не вставляй API-ключи в `.env.example` или в GitHub.
- Политику конфиденциальности нужно актуализировать после включения новых обработчиков данных.

## Перед тем, как сообщать клиентам о сайте

- Убедись, что сборка на Cloudflare прошла успешно.
- Проверь EN/UA, ссылки на Initra, Upwork и адрес `dimasavva63@gmail.com`.
- Проверь на настоящем смартфоне, включая длинные заголовки, меню, карточки About и Contact.
- Проверь поведение формы: `mailto:` не означает, что письмо уже отправлено.
- При желании добавь реальный домен, метаданные с каноническим URL и sitemap после выбора адреса.

**Примечание о тестировании:** в среде подготовки отсутствовал доступ к npm Registry, поэтому собрать `out/`
здесь не удалось. В архиве исходный проект, но не подтверждённая production-сборка. Проверка обязательно
выполняется на твоём ПК либо в Cloudflare Pages.

Официальная инструкция: https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/
