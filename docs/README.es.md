# HTTP Cats · refined

📖 README: **[English](../README.md)** | **[简体中文](README.zh-CN.md)** | **[繁體中文](README.zh-TW.md)** | **[日本語](README.ja.md)** | **[Français](README.fr.md)** | **[Русский](README.ru.md)** | **Español**

🌐 Demo en vivo: **[hcr.cialo.site](https://hcr.cialo.site)**

![Foto HTTP Cat](../public/images/204.jpg)

> Un fork personal de [httpcats/http.cat](https://github.com/httpcats/http.cat), reconstruido con una interfaz más limpia, mayor cobertura de códigos de estado y soporte para siete idiomas.

## Lo que ha cambiado

- 🌏 **Multiidioma (i18n)** — Interfaz y descripciones de códigos en siete idiomas, con repliegue automático al inglés cuando falta una traducción
- 📊 **120+ códigos de estado** — Códigos estándar ausentes en el original (505, etc.), extensiones Nginx 4xx (444, 494–499), Cloudflare 5xx (520–527, 530) y la serie completa Cloudflare 1xxx (1000–1201)
- 🗂️ **Pestañas por categoría** — Códigos agrupados por clase (1xx / 2xx / 3xx / 4xx / 5xx / Cloudflare 1xxx) con navegación por pestañas y descripciones
- 🖼️ **Imagen de respaldo** — Los códigos sin imagen propia muestran automáticamente un marcador de posición
- ✨ **Interfaz limpia** — Sin anuncios, botones sociales reducidos a GitHub, selector de idioma con efecto vidrio esmerilado en la cabecera

## Idiomas admitidos

| Locale | Idioma | Ruta |
|--------|--------|------|
| `en` | English | `/` |
| `zh-CN` | 简体中文 | `/zh-CN` |
| `zh-TW` | 繁體中文 | `/zh-TW` |
| `ja` | 日本語 | `/ja` |
| `fr` | Français | `/fr` |
| `ru` | Русский | `/ru` |
| `es` | Español | `/es` |

Se aceptan PR para añadir más idiomas. Ver [Añadir un nuevo idioma](#añadir-un-nuevo-idioma) más abajo.

## Desarrollo

### Requisitos

- Node.js 18+
- npm

### Inicio rápido

```bash
npm install
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`.

### Build de producción

```bash
npm run build
```

Los archivos estáticos se exportan al directorio `/out`.

### Rutas

| Ruta | Idioma |
|------|--------|
| `/` | English |
| `/zh-CN` | 简体中文 |
| `/zh-TW` | 繁體中文 |
| `/ja` | 日本語 |
| `/fr` | Français |
| `/ru` | Русский |
| `/es` | Español |
| `/status/<code>` | Detalle del código (inglés) |
| `/<locale>/status/<code>` | Detalle del código (localizado) |

## Stack técnico

| | |
|---|---|
| Framework | Next.js 16 (App Router, exportación estática) |
| UI | React 19 + Tailwind CSS |
| Lenguaje | TypeScript |
| Contenido | Markdown (remark + rehype) |

## Añadir un nuevo código de estado

1. Añadir una entrada en `lib/statuses.js`:

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

2. Añadir una descripción en inglés en `content/en/<code>.md`
3. Añadir `content/<locale>/<code>.md` para cada idioma admitido (los idiomas faltantes recurren al inglés)
4. Si tienes una imagen, colócala en `public/images/` y `public/images-original/`, y establece `hasImage: true`

## Añadir un nuevo idioma

Usa un código BCP 47 para `<locale>` (por ejemplo `de`, `ko`, `pt-BR`).

1. **Contenido** — crea `content/<locale>/<code>.md` para cada código (traducir desde `content/en/`)
2. **Cadenas de UI** — copia `locales/en/common.json` a `locales/<locale>/common.json`, cambia `LOCALE` al nuevo código y traduce los valores
3. **Nombres localizados de los códigos (opcional)** — añade una clave `<locale>` a cada `messageI18n` en `lib/statuses.js`. El h1 de la página de detalle lo mostrará como subtítulo. Sin este paso solo se mostrará el nombre en inglés
4. **Rutas** — crea `app/<locale>/page.tsx` y `app/<locale>/status/[status]/page.tsx` (copia de un locale existente reemplazando el argumento de `getTranslations`, las rutas de los enlaces, la `locale` de OG y la plantilla de descripción)
5. **Selector** — añade una fila al array `LANGUAGES` en `components/LanguageSwitcher/LanguageSwitcher.tsx`
6. **SEO** — en `app/layout.tsx`:
   - añade el locale a `metadata.alternates.languages`
   - añade el locale al map del IIFE inline `<html lang>`
7. **Configuración global de locales** — en `lib/locale.ts`:
   - añade el locale a `SUPPORTED_LOCALES`
   - añade el locale a `HREFLANG_MAP` (las páginas de detalle se actualizan automáticamente vía `buildHrefLangMap()`, sin cableado por página)
8. **README** — escribe `docs/README.<locale>.md` y añade el locale a la barra de navegación y a la tabla de idiomas en todos los README existentes
9. **Repositorio de GitHub** — añade el nombre del idioma a la descripción About y un topic para el idioma
10. **Sitemap** — regenera `public/sitemap.xml`

## Créditos

Gracias a [@girliemac](https://github.com/girliemac) por crear las increíbles imágenes de gatos para los códigos HTTP.

Gracias a [@pfdborges](https://github.com/pfdborges) por crear el logo de http.cat (RIP 🕯️).

Proyecto original por [@rogeriopvl](https://github.com/rogeriopvl).

## Licencia

MIT
