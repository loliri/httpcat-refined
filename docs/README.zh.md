# HTTP Cats · refined

📖 README: **[English](../README.md)** | **[简体中文](README.zh.md)** | **[Français](README.fr.md)** | **[Русский](README.ru.md)**

![HTTP Cat 图片](https://http.cat/204)

> [httpcats/http.cat](https://github.com/httpcats/http.cat) 的个人 fork，重构了 UI、扩充了状态码覆盖范围，并添加了多语言支持。

## 开发

### 环境要求

- Node.js 18+
- npm

### 快速开始

克隆仓库并安装依赖：

```bash
git clone https://github.com/jhll1124/http.cat.refined.git
cd http.cat.refined
npm install
```

启动开发服务器：

```bash
npm run dev
```

访问 `http://localhost:3000` 查看效果。

### 生产构建

```bash
npm run build
```

执行 `next build` 并运行构建后脚本，将静态文件输出到 `/out` 目录。

### 路由

| 路径 | 语言 |
|------|------|
| `/` | English |
| `/zh` | 中文 |
| `/status/<code>` | 状态码详情（英文） |
| `/<locale>/status/<code>` | 状态码详情（本地化） |

## 与原项目的区别

- **更多状态码** — 补全了缺失的标准码（505 等）、全部 Nginx 4xx 扩展（444、494–499）、Cloudflare 5xx（520–527、530）以及完整的 Cloudflare 1xxx 错误系列（1000–1201）
- **多语言支持** — UI 文案和状态码描述均支持多语言，文件位于 `content/<locale>/`，缺少翻译时自动回退到英文。新增语言只需添加 `locales/<locale>/common.json` 和 `content/<locale>/` 文件夹
- **分类 Tab** — 状态码按类别分组（1xx / 2xx / 3xx / 4xx / 5xx / Cloudflare 1xxx），支持 Tab 切换并附有分类简介
- **图片回退** — 没有专属猫咪图片的状态码会自动显示占位图
- **更简洁的 UI** — 移除广告、社交按钮仅保留 GitHub、Header 中加入磨砂玻璃风格语言切换器

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
505: { code: 505, message: 'HTTP Version Not Supported', messageZh: '不支持的 HTTP 版本', hasImage: false },
```

2. 在 `content/en/<code>.md` 添加英文描述
3. 在 `content/<locale>/<code>.md` 添加对应语言的描述
4. 如有猫咪图片，放入 `public/images/` 和 `public/images-original/`，并将 `hasImage` 设为 `true`

## 添加新语言

1. 创建 `locales/<locale>/common.json`，参考 `locales/en/common.json` 翻译
2. 创建 `content/<locale>/`，为每个状态码添加翻译后的 Markdown 文件
3. 在 `components/LanguageSwitcher/LanguageSwitcher.tsx` 中添加该语言
4. 创建 `app/<locale>/page.tsx` 和 `app/<locale>/status/[status]/page.tsx`，参考现有语言页面修改 `getTranslations` 调用

## 致谢

感谢 [@girliemac](https://github.com/girliemac) 创作了精彩的 HTTP 状态码猫咪图片。

感谢 [@pfdborges](https://github.com/pfdborges) 设计了 http.cat 的 Logo（RIP 🕯️）。

原项目作者：[@rogeriopvl](https://github.com/rogeriopvl)。

精修版作者：[@jhll1124](https://github.com/jhll1124)。

## 许可证

MIT
