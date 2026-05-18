# HTTP Cats · refined

📖 README: **[English](../README.md)** | **简体中文** | **[繁體中文](README.zh-TW.md)** | **[日本語](README.ja.md)** | **[Français](README.fr.md)** | **[Русский](README.ru.md)** | **[Español](README.es.md)**

🌐 在线演示：**[hcr.cialo.site](https://hcr.cialo.site)**

![HTTP Cat 图片](../public/images/204.jpg)

> [httpcats/http.cat](https://github.com/httpcats/http.cat) 的个人 fork，重构了 UI、扩充了状态码覆盖范围，并支持七种语言。

## 主要改动

- 🌏 **多语言（i18n）** — UI 文案与状态码描述支持七种语言，缺少翻译时自动回退到英文
- 📊 **120+ 状态码** — 补全缺失的标准码（505 等）、Nginx 4xx 扩展（444、494–499）、Cloudflare 5xx（520–527、530）以及完整的 Cloudflare 1xxx 错误系列（1000–1201）
- 🗂️ **分类 Tab** — 状态码按类别分组（1xx / 2xx / 3xx / 4xx / 5xx / Cloudflare 1xxx），支持 Tab 切换和分类简介
- 🖼️ **图片回退** — 没有专属猫咪图片的状态码自动显示占位图
- ✨ **更简洁的 UI** — 移除广告、社交按钮仅保留 GitHub、Header 中加入磨砂玻璃风格语言切换器

## 支持的语言

| Locale | 语言 | 路径 |
|--------|------|------|
| `en` | English | `/` |
| `zh-CN` | 简体中文 | `/zh-CN` |
| `zh-TW` | 繁體中文 | `/zh-TW` |
| `ja` | 日本語 | `/ja` |
| `fr` | Français | `/fr` |
| `ru` | Русский | `/ru` |
| `es` | Español | `/es` |

欢迎 PR 添加更多语言，参见下方 [添加新语言](#添加新语言)。

## 开发

### 环境要求

- Node.js 18+
- npm

### 快速开始

```bash
npm install
npm run dev
```

访问 `http://localhost:3000` 查看效果。

### 生产构建

```bash
npm run build
```

静态文件输出至 `/out` 目录。

### 路由

| 路径 | 语言 |
|------|------|
| `/` | English |
| `/zh-CN` | 简体中文 |
| `/zh-TW` | 繁體中文 |
| `/ja` | 日本語 |
| `/fr` | Français |
| `/ru` | Русский |
| `/es` | Español |
| `/status/<code>` | 状态码详情（英文） |
| `/<locale>/status/<code>` | 状态码详情（本地化） |

## 技术栈

| | |
|---|---|
| 框架 | Next.js 16（App Router，静态导出） |
| UI | React 19 + Tailwind CSS |
| 语言 | TypeScript |
| 内容 | Markdown（remark + rehype） |

## 添加新状态码

1. 在 `lib/statuses.js` 中添加条目：

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

2. 添加英文描述 `content/en/<code>.md`
3. 为每种支持的语言添加 `content/<locale>/<code>.md`，缺少的语言会自动回退到英文
4. 如有猫咪图片，放入 `public/images/` 和 `public/images-original/`，并将 `hasImage` 设为 `true`

## 添加新语言

`<locale>` 使用 BCP 47 代码（例如 `de`、`ko`、`pt-BR`）。

1. **内容** — 为每个状态码创建 `content/<locale>/<code>.md`（参考 `content/en/` 翻译）
2. **UI 文案** — 复制 `locales/en/common.json` 到 `locales/<locale>/common.json`，将 `LOCALE` 改为新代码，翻译所有 value
3. **状态码本地化名（可选）** — 在 `lib/statuses.js` 每条 `messageI18n` 加 `<locale>: '...'`，详情页 h1 会显示为副标题；不加只会显示英文名
4. **路由** — 创建 `app/<locale>/page.tsx` 和 `app/<locale>/status/[status]/page.tsx`（复制现有 locale，替换 `getTranslations` 参数、链接路径、OG locale、描述模板）
5. **切换器** — 在 `components/LanguageSwitcher/LanguageSwitcher.tsx` 的 `LANGUAGES` 数组添加一行
6. **SEO** — 在 `app/layout.tsx`：
   - `metadata.alternates.languages` 添加该 locale
   - 内联 `<html lang>` IIFE 的映射对象添加该 locale
7. **站点级 locale 配置** — 在 `lib/locale.ts`：
   - `SUPPORTED_LOCALES` 添加该 locale
   - `HREFLANG_MAP` 添加该 locale → 语言标签映射（详情页通过 `buildHrefLangMap()` 自动生效，无需逐页改）
8. **README** — 编写 `docs/README.<locale>.md`，并在所有已有 README 的导航条和「支持的语言」表中添加一行
9. **GitHub 仓库** — About 描述追加新语言名，Topics 追加该语种 topic
10. **站点地图** — 重新生成 `public/sitemap.xml`

## 致谢

感谢 [@girliemac](https://github.com/girliemac) 创作了精彩的 HTTP 状态码猫咪图片。

感谢 [@pfdborges](https://github.com/pfdborges) 设计了 http.cat 的 Logo（RIP 🕯️）。

原项目作者：[@rogeriopvl](https://github.com/rogeriopvl)。

## 许可证

MIT
