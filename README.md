# HTTP Cats · refined

📖 README: **English** | **[简体中文](docs/README.zh-CN.md)** | **[繁體中文](docs/README.zh-TW.md)** | **[Français](docs/README.fr.md)** | **[Русский](docs/README.ru.md)**

![HTTP Cat picture](https://http.cat/204)

> A personal fork of [httpcats/http.cat](https://github.com/httpcats/http.cat), rebuilt with a cleaner UI, expanded status code coverage, and i18n support.

## Development

### Prerequisites

- Node.js 18+
- npm

### Getting started

Clone the repo and install dependencies:

```bash
git clone https://github.com/jhll1124/http.cat.refined.git
cd http.cat.refined
npm install
```

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

### Building for production

```bash
npm run build
```

This runs `next build` followed by a post-build script that prepares the static export in `/out`.

### Routes

| Path | Language |
|------|----------|
| `/` | English |
| `/zh` | 中文 |
| `/status/<code>` | Status detail (English) |
| `/<locale>/status/<code>` | Status detail (localized) |

## What's different

- **More status codes** — Standard codes that were missing (505, etc.), all Nginx 4xx extensions (444, 494–499), Cloudflare 5xx (520–527, 530), and the full Cloudflare 1xxx error series (1000–1201)
- **i18n** — Per-locale UI strings and per-status-code description files under `content/<locale>/`. Falls back to English when a translation is missing. Adding a new language only requires a `locales/<locale>/common.json` and a `content/<locale>/` folder
- **Category tabs** — Status codes grouped by class (1xx / 2xx / 3xx / 4xx / 5xx / Cloudflare 1xxx) with tab navigation and category descriptions
- **Image fallback** — Codes without a dedicated cat image gracefully fall back to a placeholder
- **Cleaner UI** — Removed ads, replaced social buttons with GitHub only, frosted-glass language switcher in the header

## Tech stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, static export) |
| UI | React 19 + Tailwind CSS |
| Language | TypeScript |
| Content | Markdown (remark + rehype) |

## Adding a new status code

1. Add an entry to `lib/statuses.js`:

```js
505: { code: 505, message: 'HTTP Version Not Supported', messageZh: '不支持的 HTTP 版本', hasImage: false },
```

2. Add an English description at `content/en/<code>.md`
3. Add a localized description at `content/<locale>/<code>.md` for each supported language
4. If you have a cat image, place it in `public/images/` and `public/images-original/`, then set `hasImage: true`

## Adding a new language

1. Create `locales/<locale>/common.json` — copy from `locales/en/common.json` and translate
2. Create `content/<locale>/` — add translated markdown files for each status code
3. Add the locale to `components/LanguageSwitcher/LanguageSwitcher.tsx`
4. Create `app/<locale>/page.tsx` and `app/<locale>/status/[status]/page.tsx` — copy from the existing locale and update the `getTranslations` call

## Credits

Thanks to [@girliemac](https://github.com/girliemac) for creating the amazing HTTP status cats images.

Thanks to [@pfdborges](https://github.com/pfdborges) for creating the http.cat logo (RIP 🕯️).

Original project by [@rogeriopvl](https://github.com/rogeriopvl).

## License

MIT
