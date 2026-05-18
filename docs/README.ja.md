# HTTP Cats · refined

📖 README: **[English](../README.md)** | **[简体中文](README.zh-CN.md)** | **[繁體中文](README.zh-TW.md)** | **日本語** | **[Français](README.fr.md)** | **[Русский](README.ru.md)** | **[Español](README.es.md)**

🌐 ライブデモ：**[hcr.cialo.site](https://hcr.cialo.site)**

![HTTP Cat 画像](../public/images/204.jpg)

> [httpcats/http.cat](https://github.com/httpcats/http.cat) の個人フォーク。UI を再構築し、ステータスコードのカバー範囲を拡張、7 言語に対応しました。

## 主な変更点

- 🌏 **多言語対応（i18n）** — UI とステータスコード説明が 7 言語に対応、翻訳がない場合は自動的に英語へフォールバック
- 📊 **120+ ステータスコード** — 元プロジェクトに欠けていた標準コード（505 など）、Nginx 4xx 拡張（444、494–499）、Cloudflare 5xx（520–527、530）、Cloudflare 1xxx エラー全系列（1000–1201）
- 🗂️ **カテゴリタブ** — クラスごとにグループ化（1xx / 2xx / 3xx / 4xx / 5xx / Cloudflare 1xxx）、タブ切り替えと簡易説明付き
- 🖼️ **画像フォールバック** — 専用画像のないコードは自動的にプレースホルダーを表示
- ✨ **クリーンな UI** — 広告削除、ソーシャルボタンは GitHub のみ、ヘッダーにすりガラス風言語切替

## 対応言語

| Locale | 言語 | パス |
|--------|------|------|
| `en` | English | `/` |
| `zh-CN` | 简体中文 | `/zh-CN` |
| `zh-TW` | 繁體中文 | `/zh-TW` |
| `ja` | 日本語 | `/ja` |
| `fr` | Français | `/fr` |
| `ru` | Русский | `/ru` |
| `es` | Español | `/es` |

他の言語の追加 PR を歓迎します。下記 [新しい言語の追加](#新しい言語の追加) 参照。

## 開発

### 動作環境

- Node.js 18+
- npm

### クイックスタート

```bash
npm install
npm run dev
```

`http://localhost:3000` でアプリが起動します。

### プロダクションビルド

```bash
npm run build
```

静的ファイルは `/out` ディレクトリに出力されます。

### ルート

| パス | 言語 |
|------|------|
| `/` | English |
| `/zh-CN` | 简体中文 |
| `/zh-TW` | 繁體中文 |
| `/ja` | 日本語 |
| `/fr` | Français |
| `/ru` | Русский |
| `/es` | Español |
| `/status/<code>` | ステータス詳細（英語） |
| `/<locale>/status/<code>` | ステータス詳細（ローカライズ） |

## 技術スタック

| | |
|---|---|
| フレームワーク | Next.js 16（App Router、静的エクスポート） |
| UI | React 19 + Tailwind CSS |
| 言語 | TypeScript |
| コンテンツ | Markdown（remark + rehype） |

## ステータスコードの追加

1. `lib/statuses.js` にエントリを追加：

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

2. 英語の説明を `content/en/<code>.md` に追加
3. 対応する各言語に `content/<locale>/<code>.md` を追加（不足言語は英語へフォールバック）
4. 猫の画像があれば `public/images/` と `public/images-original/` に配置し、`hasImage` を `true` に設定

## 新しい言語の追加

`<locale>` には BCP 47 コードを使用（例：`de`、`ko`、`pt-BR`）。

1. **コンテンツ** — 各ステータスコードについて `content/<locale>/<code>.md` を作成（`content/en/` を参考に翻訳）
2. **UI 文字列** — `locales/en/common.json` を `locales/<locale>/common.json` にコピーし、`LOCALE` を新コードに変更、value を翻訳
3. **ステータスコードのローカル名（任意）** — `lib/statuses.js` の各 `messageI18n` に `<locale>: '...'` を追加。詳細ページ h1 で副題として表示される。追加しなければ英語名のみ表示
4. **ルート** — `app/<locale>/page.tsx` と `app/<locale>/status/[status]/page.tsx` を作成（既存 locale をコピーし、`getTranslations` 引数、リンクパス、OG locale、description テンプレートを置換）
5. **スイッチャー** — `components/LanguageSwitcher/LanguageSwitcher.tsx` の `LANGUAGES` 配列に一行追加
6. **SEO** — `app/layout.tsx` で：
   - `metadata.alternates.languages` に locale 追加
   - インライン `<html lang>` IIFE の map に locale 追加
7. **サイト全体の locale 設定** — `lib/locale.ts` で：
   - `SUPPORTED_LOCALES` に locale 追加
   - `HREFLANG_MAP` に locale → 言語タグのマッピングを追加（詳細ページは `buildHrefLangMap()` で自動反映、ページごとの修正不要）
8. **README** — `docs/README.<locale>.md` を作成し、既存全 README のナビゲーションと「対応言語」表に行を追加
9. **GitHub リポジトリ** — About 説明に新言語名を追記、Topics に該当言語の topic を追加
10. **サイトマップ** — `public/sitemap.xml` を再生成

## クレジット

[@girliemac](https://github.com/girliemac) による素晴らしい HTTP ステータス猫画像に感謝します。

[@pfdborges](https://github.com/pfdborges) による http.cat ロゴに感謝します（RIP 🕯️）。

オリジナルプロジェクト：[@rogeriopvl](https://github.com/rogeriopvl)。

## ライセンス

MIT
