# HTTP Cats · refined

📖 README: **[English](../README.md)** | **[简体中文](README.zh-CN.md)** | **[繁體中文](README.zh-TW.md)** | **Français** | **[Русский](README.ru.md)**

![Photo HTTP Cat](https://http.cat/204)

> Un fork personnel de [httpcats/http.cat](https://github.com/httpcats/http.cat), reconstruit avec une interface plus propre, une couverture étendue des codes de statut et la prise en charge de l'i18n.

## Développement

### Prérequis

- Node.js 18+
- npm

### Démarrage rapide

Cloner le dépôt et installer les dépendances :

```bash
git clone https://github.com/jhll1124/httpcat-refined.git
cd httpcat-refined
npm install
```

Démarrer le serveur de développement :

```bash
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
| `/zh` | 中文 |
| `/status/<code>` | Détail du code (anglais) |
| `/<locale>/status/<code>` | Détail du code (localisé) |

## Ce qui a changé

- **Plus de codes de statut** — Codes standard manquants (505, etc.), extensions Nginx 4xx (444, 494–499), Cloudflare 5xx (520–527, 530) et la série complète Cloudflare 1xxx (1000–1201)
- **i18n** — Chaînes UI et descriptions des codes par locale dans `content/<locale>/`. Repli automatique sur l'anglais si la traduction est absente. Ajouter une langue ne nécessite qu'un fichier `locales/<locale>/common.json` et un dossier `content/<locale>/`
- **Onglets par catégorie** — Codes regroupés par classe (1xx / 2xx / 3xx / 4xx / 5xx / Cloudflare 1xxx) avec navigation par onglets et descriptions
- **Image de repli** — Les codes sans image dédiée affichent automatiquement une image par défaut
- **Interface épurée** — Publicités supprimées, boutons sociaux réduits à GitHub, sélecteur de langue en verre dépoli dans l'en-tête

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
505: { code: 505, message: 'HTTP Version Not Supported', messageZh: '不支持的 HTTP 版本', hasImage: false },
```

2. Ajouter une description en anglais dans `content/en/<code>.md`
3. Ajouter `content/<locale>/<code>.md` pour chaque langue supportée
4. Si vous avez une image, placez-la dans `public/images/` et `public/images-original/`, puis définissez `hasImage: true`

## Ajouter une nouvelle langue

1. Créer `locales/<locale>/common.json` en s'inspirant de `locales/en/common.json`
2. Créer `content/<locale>/` avec les fichiers Markdown traduits
3. Ajouter la langue dans `components/LanguageSwitcher/LanguageSwitcher.tsx`
4. Créer `app/<locale>/page.tsx` et `app/<locale>/status/[status]/page.tsx` en s'inspirant des pages existantes

## Crédits

Merci à [@girliemac](https://github.com/girliemac) pour les magnifiques images de chats HTTP.

Merci à [@pfdborges](https://github.com/pfdborges) pour la création du logo http.cat (RIP 🕯️).

Projet original par [@rogeriopvl](https://github.com/rogeriopvl).

## Licence

MIT
