# HTTP Cats · refined

📖 README: **[English](../README.md)** | **[简体中文](README.zh-CN.md)** | **繁體中文** | **[日本語](README.ja.md)** | **[Français](README.fr.md)** | **[Русский](README.ru.md)** | **[Español](README.es.md)**

🌐 線上演示：**[hcr.cialo.site](https://hcr.cialo.site)**

![HTTP Cat 圖片](../public/images/204.jpg)

> [httpcats/http.cat](https://github.com/httpcats/http.cat) 的個人 fork，重構了 UI、擴充了狀態碼覆蓋範圍，並支援七種語言。

## 主要改動

- 🌏 **多語言支援（i18n）** — UI 文案與狀態碼描述支援七種語言，缺少翻譯時自動回退至英文
- 📊 **120+ 狀態碼** — 補全缺失的標準碼（505 等）、Nginx 4xx 擴充（444、494–499）、Cloudflare 5xx（520–527、530）以及完整的 Cloudflare 1xxx 錯誤系列（1000–1201）
- 🗂️ **分類 Tab** — 狀態碼按類別分組（1xx / 2xx / 3xx / 4xx / 5xx / Cloudflare 1xxx），支援 Tab 切換與分類簡介
- 🖼️ **圖片回退** — 沒有專屬貓咪圖片的狀態碼自動顯示佔位圖
- ✨ **更簡潔的 UI** — 移除廣告、社群按鈕僅保留 GitHub、Header 中加入毛玻璃風格語言切換器

## 支援的語言

| Locale | 語言 | 路徑 |
|--------|------|------|
| `en` | English | `/` |
| `zh-CN` | 简体中文 | `/zh-CN` |
| `zh-TW` | 繁體中文 | `/zh-TW` |
| `ja` | 日本語 | `/ja` |
| `fr` | Français | `/fr` |
| `ru` | Русский | `/ru` |
| `es` | Español | `/es` |

歡迎 PR 新增更多語言，參見下方 [新增語言](#新增語言)。

## 開發

### 環境需求

- Node.js 18+
- npm

### 快速開始

```bash
npm install
npm run dev
```

開啟 `http://localhost:3000` 查看效果。

### 正式建置

```bash
npm run build
```

靜態檔案輸出至 `/out` 目錄。

### 路由

| 路徑 | 語言 |
|------|------|
| `/` | English |
| `/zh-CN` | 简体中文 |
| `/zh-TW` | 繁體中文 |
| `/ja` | 日本語 |
| `/fr` | Français |
| `/ru` | Русский |
| `/es` | Español |
| `/status/<code>` | 狀態碼詳情（英文） |
| `/<locale>/status/<code>` | 狀態碼詳情（本地化） |

## 技術棧

| | |
|---|---|
| 框架 | Next.js 16（App Router，靜態匯出） |
| UI | React 19 + Tailwind CSS |
| 語言 | TypeScript |
| 內容 | Markdown（remark + rehype） |

## 新增狀態碼

1. 在 `lib/statuses.js` 中新增條目：

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

2. 新增英文描述 `content/en/<code>.md`
3. 為每種支援的語言新增 `content/<locale>/<code>.md`，缺少的語言會自動回退至英文
4. 如有貓咪圖片，放入 `public/images/` 和 `public/images-original/`，並將 `hasImage` 設為 `true`

## 新增語言

`<locale>` 使用 BCP 47 代碼（例如 `de`、`ko`、`pt-BR`）。

1. **內容** — 為每個狀態碼建立 `content/<locale>/<code>.md`（參考 `content/en/` 翻譯）
2. **UI 文案** — 複製 `locales/en/common.json` 到 `locales/<locale>/common.json`，將 `LOCALE` 改為新代碼，翻譯所有 value
3. **狀態碼本地化名稱（可選）** — 在 `lib/statuses.js` 每條 `messageI18n` 加 `<locale>: '...'`，詳情頁 h1 會顯示為副標題；不加則只顯示英文名
4. **路由** — 建立 `app/<locale>/page.tsx` 和 `app/<locale>/status/[status]/page.tsx`（複製現有 locale，替換 `getTranslations` 參數、連結路徑、OG locale、描述模板）
5. **切換器** — 在 `components/LanguageSwitcher/LanguageSwitcher.tsx` 的 `LANGUAGES` 陣列新增一行
6. **SEO** — 在 `app/layout.tsx`：
   - `metadata.alternates.languages` 新增該 locale
   - 內聯 `<html lang>` IIFE 的對應映射新增該 locale
7. **站點級 locale 配置** — 在 `lib/locale.ts`：
   - `SUPPORTED_LOCALES` 新增該 locale
   - `HREFLANG_MAP` 新增該 locale → 語言標籤映射（詳情頁透過 `buildHrefLangMap()` 自動生效，無需逐頁修改）
8. **README** — 撰寫 `docs/README.<locale>.md`，並在所有現有 README 的導覽列和「支援的語言」表格中新增一行
9. **GitHub 儲存庫** — About 描述追加新語言名，Topics 追加該語種 topic
10. **站點地圖** — 重新產生 `public/sitemap.xml`

## 致謝

感謝 [@girliemac](https://github.com/girliemac) 創作了精彩的 HTTP 狀態碼貓咪圖片。

感謝 [@pfdborges](https://github.com/pfdborges) 設計了 http.cat 的 Logo（RIP 🕯️）。

原專案作者：[@rogeriopvl](https://github.com/rogeriopvl)。

## 授權條款

MIT
