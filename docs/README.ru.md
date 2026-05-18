# HTTP Cats · refined

📖 README: **[English](../README.md)** | **[简体中文](README.zh-CN.md)** | **[繁體中文](README.zh-TW.md)** | **[日本語](README.ja.md)** | **[Français](README.fr.md)** | **Русский** | **[Español](README.es.md)**

🌐 Демо: **[hcr.cialo.site](https://hcr.cialo.site)**

![Фото HTTP Cat](../public/images/204.jpg)

> Личный форк [httpcats/http.cat](https://github.com/httpcats/http.cat) с обновлённым интерфейсом, расширенным покрытием кодов состояния и поддержкой семи языков.

## Что изменилось

- 🌏 **Многоязычность (i18n)** — Интерфейс и описания кодов на семи языках, автоматический откат на английский при отсутствии перевода
- 📊 **120+ кодов состояния** — Недостающие стандартные коды (505 и др.), расширения Nginx 4xx (444, 494–499), Cloudflare 5xx (520–527, 530), полная серия Cloudflare 1xxx (1000–1201)
- 🗂️ **Вкладки по категориям** — Коды сгруппированы по классам (1xx / 2xx / 3xx / 4xx / 5xx / Cloudflare 1xxx) с навигацией по вкладкам и описаниями
- 🖼️ **Запасное изображение** — Коды без собственного изображения автоматически отображают заглушку
- ✨ **Чистый интерфейс** — Реклама удалена, из соцсетей оставлен только GitHub, в шапке переключатель языка в стиле матового стекла

## Поддерживаемые языки

| Locale | Язык | Путь |
|--------|------|------|
| `en` | English | `/` |
| `zh-CN` | 简体中文 | `/zh-CN` |
| `zh-TW` | 繁體中文 | `/zh-TW` |
| `ja` | 日本語 | `/ja` |
| `fr` | Français | `/fr` |
| `ru` | Русский | `/ru` |
| `es` | Español | `/es` |

PR для добавления других языков приветствуются. См. [Добавление нового языка](#добавление-нового-языка) ниже.

## Разработка

### Требования

- Node.js 18+
- npm

### Быстрый старт

```bash
npm install
npm run dev
```

Приложение будет доступно по адресу `http://localhost:3000`.

### Сборка для продакшена

```bash
npm run build
```

Статические файлы экспортируются в директорию `/out`.

### Маршруты

| Путь | Язык |
|------|------|
| `/` | English |
| `/zh-CN` | 简体中文 |
| `/zh-TW` | 繁體中文 |
| `/ja` | 日本語 |
| `/fr` | Français |
| `/ru` | Русский |
| `/es` | Español |
| `/status/<code>` | Детали кода (английский) |
| `/<locale>/status/<code>` | Детали кода (локализованный) |

## Стек технологий

| | |
|---|---|
| Фреймворк | Next.js 16 (App Router, статический экспорт) |
| UI | React 19 + Tailwind CSS |
| Язык | TypeScript |
| Контент | Markdown (remark + rehype) |

## Добавление нового кода состояния

1. Добавьте запись в `lib/statuses.js`:

```js
505: {
  code: 505,
  message: 'HTTP Version Not Supported',
  messageI18n: {
    'zh-CN': '不支持的 HTTP 版本',
    'zh-TW': '不支援的 HTTP 版本',
    ja: 'サポートされていない HTTP バージョン',
    fr: 'Version HTTP non prise en charge',
    ru: 'Версия HTTP не поддерживается',
    es: 'Versión HTTP no soportada',
  },
  hasImage: false,
},
```

2. Добавьте описание на английском в `content/en/<code>.md`
3. Добавьте `content/<locale>/<code>.md` для каждого поддерживаемого языка (отсутствующие языки откатываются на английский)
4. Если есть изображение, поместите его в `public/images/` и `public/images-original/`, затем установите `hasImage: true`

## Добавление нового языка

Используйте код BCP 47 для `<locale>` (например `de`, `ko`, `pt-BR`).

1. **Контент** — создайте `content/<locale>/<code>.md` для каждого кода (переводите из `content/en/`)
2. **Строки UI** — скопируйте `locales/en/common.json` в `locales/<locale>/common.json`, измените `LOCALE` на новый код, переведите значения
3. **Локализованные имена кодов (опционально)** — добавьте ключ `<locale>` в каждый `messageI18n` в `lib/statuses.js`. Заголовок страницы детали покажет это как подзаголовок. Без этого шага будет показано только английское имя
4. **Маршруты** — создайте `app/<locale>/page.tsx` и `app/<locale>/status/[status]/page.tsx` (скопируйте с существующей локали, заменив аргумент `getTranslations`, пути ссылок, OG locale и шаблон описания)
5. **Переключатель** — добавьте строку в массив `LANGUAGES` в `components/LanguageSwitcher/LanguageSwitcher.tsx`
6. **SEO** — в `app/layout.tsx`:
   - добавьте локаль в `metadata.alternates.languages`
   - добавьте локаль в map встроенного IIFE `<html lang>`
7. **Глобальная конфигурация локалей** — в `lib/locale.ts`:
   - добавьте локаль в `SUPPORTED_LOCALES`
   - добавьте локаль в `HREFLANG_MAP` (страницы деталей подхватывают её автоматически через `buildHrefLangMap()`, доработка по страницам не требуется)
8. **README** — напишите `docs/README.<locale>.md` и добавьте локаль в навигацию и таблицу языков во всех существующих README
9. **Репозиторий GitHub** — добавьте название языка в описание About и topic для языка
10. **Sitemap** — пересоздайте `public/sitemap.xml`

## Благодарности

Спасибо [@girliemac](https://github.com/girliemac) за создание замечательных изображений котов для HTTP-кодов.

Спасибо [@pfdborges](https://github.com/pfdborges) за создание логотипа http.cat (RIP 🕯️).

Оригинальный проект: [@rogeriopvl](https://github.com/rogeriopvl).

## Лицензия

MIT
