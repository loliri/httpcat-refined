# HTTP Cats · refined

📖 README: **[English](../README.md)** | **[简体中文](README.zh-CN.md)** | **繁體中文** | **[Français](README.fr.md)** | **[Русский](README.ru.md)**

![HTTP Cat 圖片](https://http.cat/204)

> [httpcats/http.cat](https://github.com/httpcats/http.cat) 的個人 fork，重構了 UI、擴充了狀態碼覆蓋範圍，並新增了多語言支援。

## 開發

### 環境需求

- Node.js 18+
- npm

### 快速開始

複製儲存庫並安裝相依套件：

```bash
git clone https://github.com/jhll1124/httpcat-refined.git
cd httpcat-refined
npm install
```

啟動開發伺服器：

```bash
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
| `/zh` | 中文 |
| `/ja` | 日本語 |
| `/status/<code>` | 狀態碼詳情（英文） |
| `/<locale>/status/<code>` | 狀態碼詳情（本地化） |

## 主要改動

- **更多狀態碼** — 補全了缺失的標準碼（505 等）、Nginx 4xx 擴充（444、494–499）、Cloudflare 5xx（520–527、530）以及完整的 Cloudflare 1xxx 錯誤系列（1000–1201）
- **多語言支援（i18n）** — UI 文案和狀態碼描述均支援多語言，缺少翻譯時自動回退至英文。新增語言只需添加 `locales/<locale>/common.json` 和 `content/<locale>/` 資料夾
- **分類 Tab** — 狀態碼按類別分組（1xx / 2xx / 3xx / 4xx / 5xx / Cloudflare 1xxx），支援 Tab 切換與分類簡介
- **圖片回退** — 沒有專屬貓咪圖片的狀態碼自動顯示佔位圖
- **更簡潔的 UI** — 移除廣告、社群按鈕僅保留 GitHub、Header 中加入毛玻璃風格語言切換器

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
505: { code: 505, message: 'HTTP Version Not Supported', messageI18n: { zh: '不支援的 HTTP 版本', ja: 'サポートされていない HTTP バージョン' }, hasImage: false },
```

2. 新增英文描述 `content/en/<code>.md`
3. 為每種支援的語言新增 `content/<locale>/<code>.md`
4. 如有貓咪圖片，放入 `public/images/` 和 `public/images-original/`，並將 `hasImage` 設為 `true`

## 新增語言

1. 建立 `locales/<locale>/common.json`，參考 `locales/en/common.json` 翻譯
2. 建立 `content/<locale>/`，為每個狀態碼新增翻譯後的 Markdown 檔案
3. 在 `components/LanguageSwitcher/LanguageSwitcher.tsx` 中新增該語言
4. 建立 `app/<locale>/page.tsx` 和 `app/<locale>/status/[status]/page.tsx`，參考現有語言的頁面檔案修改

## 致謝

感謝 [@girliemac](https://github.com/girliemac) 創作了精彩的 HTTP 狀態碼貓咪圖片。

感謝 [@pfdborges](https://github.com/pfdborges) 設計了 http.cat 的 Logo（RIP 🕯️）。

原專案作者：[@rogeriopvl](https://github.com/rogeriopvl)。

## 授權條款

MIT
