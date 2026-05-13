# HTTP Cats · refined

📖 README: **[English](../README.md)** | **[简体中文](README.zh-CN.md)** | **[繁體中文](README.zh-TW.md)** | **[Français](README.fr.md)** | **Русский**

![Фото HTTP Cat](https://http.cat/204)

> Личный форк [httpcats/http.cat](https://github.com/httpcats/http.cat) с обновлённым интерфейсом, расширенным покрытием кодов состояния и поддержкой i18n.

## Разработка

### Требования

- Node.js 18+
- npm

### Быстрый старт

Клонируйте репозиторий и установите зависимости:

```bash
git clone https://github.com/jhll1124/httpcat-refined.git
cd httpcat-refined
npm install
```

Запустите сервер разработки:

```bash
npm run dev
```

Приложение будет доступно по адресу `http://localhost:3000`.

### Сборка для продакшена

```bash
npm run build
```

Статические файлы экспортируются в директорию `/out`.

### Маршруты

| Путь | Язык |
|------|------|
| `/` | English |
| `/zh` | 中文 |
| `/ja` | 日本語 |
| `/status/<code>` | Детали кода (английский) |
| `/<locale>/status/<code>` | Детали кода (локализованный) |

## Что изменилось

- **Больше кодов состояния** — Недостающие стандартные коды (505 и др.), расширения Nginx 4xx (444, 494–499), Cloudflare 5xx (520–527, 530) и полная серия Cloudflare 1xxx (1000–1201)
- **i18n** — Строки интерфейса и описания кодов по локалям в `content/<locale>/`. Автоматический откат на английский при отсутствии перевода. Для добавления нового языка достаточно файла `locales/<locale>/common.json` и папки `content/<locale>/`
- **Вкладки по категориям** — Коды сгруппированы по классам (1xx / 2xx / 3xx / 4xx / 5xx / Cloudflare 1xxx) с навигацией по вкладкам и описаниями
- **Запасное изображение** — Коды без собственного изображения автоматически отображают заглушку
- **Чистый интерфейс** — Реклама удалена, из кнопок соцсетей оставлена только GitHub, в шапке добавлен переключатель языка в стиле матового стекла

## Стек технологий

| | |
|---|---|
| Фреймворк | Next.js 16 (App Router, статический экспорт) |
| UI | React 19 + Tailwind CSS |
| Язык | TypeScript |
| Контент | Markdown (remark + rehype) |

## Добавление нового кода состояния

1. Добавьте запись в `lib/statuses.js`:

```js
505: { code: 505, message: 'HTTP Version Not Supported', messageZh: '不支持的 HTTP 版本', hasImage: false },
```

2. Добавьте описание на английском в `content/en/<code>.md`
3. Добавьте `content/<locale>/<code>.md` для каждого поддерживаемого языка
4. Если есть изображение, поместите его в `public/images/` и `public/images-original/`, затем установите `hasImage: true`

## Добавление нового языка

1. Создайте `locales/<locale>/common.json` на основе `locales/en/common.json`
2. Создайте `content/<locale>/` с переведёнными Markdown-файлами
3. Добавьте язык в `components/LanguageSwitcher/LanguageSwitcher.tsx`
4. Создайте `app/<locale>/page.tsx` и `app/<locale>/status/[status]/page.tsx` по образцу существующих страниц

## Благодарности

Спасибо [@girliemac](https://github.com/girliemac) за создание замечательных изображений котов для HTTP-кодов.

Спасибо [@pfdborges](https://github.com/pfdborges) за создание логотипа http.cat (RIP 🕯️).

Оригинальный проект: [@rogeriopvl](https://github.com/rogeriopvl).

## Лицензия

MIT
