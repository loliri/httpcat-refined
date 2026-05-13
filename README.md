# HTTP Cats · refined

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Languages](https://img.shields.io/badge/languages-English_%7C_中文_%7C_日本語-d0383e)](#languages)

📖 README: **English** | **[简体中文](docs/README.zh-CN.md)** | **[繁體中文](docs/README.zh-TW.md)** | **[Français](docs/README.fr.md)** | **[Русский](docs/README.ru.md)**

🌐 Live demo: **[hcr.cialo.site](https://hcr.cialo.site)**

![HTTP Cat picture](https://http.cat/204)

**HTTP Cats · refined** is a multilingual HTTP status code reference site built with Next.js. It covers 120+ status codes — including standard RFC codes, Nginx 4xx extensions, Cloudflare 5xx, and the full Cloudflare 1xxx error series — each illustrated with a cat picture, organized by category, and translated into multiple languages. A refined fork of [httpcats/http.cat](https://github.com/httpcats/http.cat).

## Highlights

- 🌏 **Multilingual** — Full UI and per-status-code descriptions translated. English and Simplified Chinese (简体中文) ship out of the box. Adding a new language is a one-folder change
- 📊 **120+ status codes** — Standard codes missing from the original (505, etc.), Nginx extensions (444, 494–499), Cloudflare 5xx (520–527, 530), and all Cloudflare 1xxx errors (1000–1201)
- 🗂️ **Category tabs** — Codes grouped by class (1xx / 2xx / 3xx / 4xx / 5xx / Cloudflare 1xxx) with descriptions
- 🖼️ **Image fallback** — Codes without dedicated images use a graceful placeholder
- ✨ **Cleaner UI** — Ads removed, social cruft trimmed, frosted-glass language switcher

## Languages

### Available now

| Locale | Language | Path |
|--------|----------|------|
| `en` | English | `/` |
| `zh-CN` | 简体中文 (Simplified Chinese) | `/zh` |
| `ja` | 日本語 (Japanese) | `/ja` |

### On the roadmap

Translations welcome. PRs gladly accepted for:

- 繁體中文 (Traditional Chinese)
- 한국어 (Korean)
- Français (French)
- Deutsch (German)
- Español (Spanish)
- Русский (Russian)

See [Adding a new language](#adding-a-new-language) below.

## Development

### Prerequisites

- Node.js 18+
- npm

### Getting started

Clone the repo and install dependencies:

```bash
git clone https://github.com/jhll1124/httpcat-refined.git
cd httpcat-refined
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
