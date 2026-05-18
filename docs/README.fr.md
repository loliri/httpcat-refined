# HTTP Cats · refined

📖 README: **[English](../README.md)** | **[简体中文](README.zh-CN.md)** | **[繁體中文](README.zh-TW.md)** | **[日本語](README.ja.md)** | **Français** | **[Русский](README.ru.md)** | **[Español](README.es.md)**

🌐 Démo en ligne : **[hcr.cialo.site](https://hcr.cialo.site)**

![Photo HTTP Cat](../public/images/204.jpg)

> Un fork personnel de [httpcats/http.cat](https://github.com/httpcats/http.cat), reconstruit avec une interface plus propre, une couverture étendue des codes de statut et la prise en charge de sept langues.

## Ce qui a changé

- 🌏 **Multilingue (i18n)** — Interface et descriptions des codes en sept langues, repli automatique sur l'anglais en cas de traduction manquante
- 📊 **120+ codes de statut** — Codes standard manquants dans l'original (505, etc.), extensions Nginx 4xx (444, 494–499), Cloudflare 5xx (520–527, 530), série complète Cloudflare 1xxx (1000–1201)
- 🗂️ **Onglets par catégorie** — Codes regroupés par classe (1xx / 2xx / 3xx / 4xx / 5xx / Cloudflare 1xxx) avec navigation par onglets et descriptions
- 🖼️ **Image de repli** — Les codes sans image dédiée affichent automatiquement une image par défaut
- ✨ **Interface épurée** — Publicités supprimées, boutons sociaux réduits à GitHub, sélecteur de langue en verre dépoli dans l'en-tête

## Langues prises en charge

| Locale | Langue | Chemin |
|--------|--------|--------|
| `en` | English | `/` |
| `zh-CN` | 简体中文 | `/zh-CN` |
| `zh-TW` | 繁體中文 | `/zh-TW` |
| `ja` | 日本語 | `/ja` |
| `fr` | Français | `/fr` |
| `ru` | Русский | `/ru` |
| `es` | Español | `/es` |

Les PR pour ajouter d'autres langues sont les bienvenues. Voir [Ajouter une nouvelle langue](#ajouter-une-nouvelle-langue) ci-dessous.

## Développement

### Prérequis

- Node.js 18+
- npm

### Démarrage rapide

```bash
npm install
npm run dev
```

L'application sera disponible sur `http://localhost:3000`.

### Build de production

```bash
npm run build
```

Les fichiers statiques sont exportés dans le répertoire `/out`.

### Routes

| Chemin | Langue |
|--------|--------|
| `/` | English |
| `/zh-CN` | 简体中文 |
| `/zh-TW` | 繁體中文 |
| `/ja` | 日本語 |
| `/fr` | Français |
| `/ru` | Русский |
| `/es` | Español |
| `/status/<code>` | Détail du code (anglais) |
| `/<locale>/status/<code>` | Détail du code (localisé) |

## Stack technique

| | |
|---|---|
| Framework | Next.js 16 (App Router, export statique) |
| UI | React 19 + Tailwind CSS |
| Langage | TypeScript |
| Contenu | Markdown (remark + rehype) |

## Ajouter un nouveau code de statut

1. Ajouter une entrée dans `lib/statuses.js` :

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

2. Ajouter une description anglaise dans `content/en/<code>.md`
3. Ajouter `content/<locale>/<code>.md` pour chaque langue (les langues manquantes retombent sur l'anglais)
4. Si vous avez une image, placez-la dans `public/images/` et `public/images-original/`, puis définissez `hasImage: true`

## Ajouter une nouvelle langue

Utilisez un code BCP 47 pour `<locale>` (par exemple `de`, `ko`, `pt-BR`).

1. **Contenu** — créer `content/<locale>/<code>.md` pour chaque code de statut (à traduire depuis `content/en/`)
2. **Chaînes UI** — copier `locales/en/common.json` vers `locales/<locale>/common.json`, changer `LOCALE` pour le nouveau code, traduire les valeurs
3. **Noms localisés des codes (optionnel)** — ajouter une clé `<locale>` à chaque `messageI18n` dans `lib/statuses.js`. Le titre de la page de détail affichera ce nom comme sous-titre. Sans cette étape, seul le nom anglais sera affiché
4. **Routes** — créer `app/<locale>/page.tsx` et `app/<locale>/status/[status]/page.tsx` (copier depuis une locale existante en remplaçant l'argument de `getTranslations`, les chemins de liens, la `locale` OG et le modèle de description)
5. **Sélecteur** — ajouter une ligne au tableau `LANGUAGES` dans `components/LanguageSwitcher/LanguageSwitcher.tsx`
6. **SEO** — dans `app/layout.tsx` :
   - ajouter la locale à `metadata.alternates.languages`
   - ajouter la locale à la map de l'IIFE inline `<html lang>`
7. **Configuration globale des locales** — dans `lib/locale.ts` :
   - ajouter la locale à `SUPPORTED_LOCALES`
   - ajouter la locale à `HREFLANG_MAP` (les pages de détail s'adaptent automatiquement via `buildHrefLangMap()`, aucun câblage par page nécessaire)
8. **README** — rédiger `docs/README.<locale>.md` et ajouter la locale à la barre de navigation + tableau des langues dans tous les README existants
9. **Dépôt GitHub** — ajouter le nom de la langue à la description About et un topic pour la langue
10. **Sitemap** — régénérer `public/sitemap.xml`

## Crédits

Merci à [@girliemac](https://github.com/girliemac) pour les magnifiques images de chats HTTP.

Merci à [@pfdborges](https://github.com/pfdborges) pour la création du logo http.cat (RIP 🕯️).

Projet original par [@rogeriopvl](https://github.com/rogeriopvl).

## Licence

MIT
