// 多语言路由前缀和状态码本地化名称的统一入口

type StatusLike = {
  message: string;
  messageI18n?: Record<string, string>;
};

// 站点支持的全部 locale，按显示顺序
export const SUPPORTED_LOCALES = [
  'en',
  'zh-CN',
  'zh-TW',
  'ja',
  'fr',
  'ru',
  'es',
] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

// hreflang 规范化（en → en，zh-CN → zh-CN，ja → ja-JP）
const HREFLANG_MAP: Record<string, string> = {
  en: 'en',
  'zh-CN': 'zh-CN',
  'zh-TW': 'zh-TW',
  ja: 'ja-JP',
  fr: 'fr-FR',
  ru: 'ru-RU',
  es: 'es-ES',
};

// en 是默认语言，没有路径前缀；其他语言走 /<code>/...
export function localePrefix(locale: string): string {
  return locale === 'en' ? '' : `/${locale}`;
}

// 当前语言的首页 href（en → '/'，其他 → '/<code>'）
export function localeHomeHref(locale: string): string {
  return localePrefix(locale) || '/';
}

// 取状态码在指定语言下的本地化名称；无翻译时返回 undefined
export function localizedStatusName(
  status: StatusLike,
  locale: string,
): string | undefined {
  if (locale === 'en') return undefined;
  return status.messageI18n?.[locale];
}

// 给 generateMetadata 用：返回 hreflang map，路径形如 '/' 或 '/status/404'
// suffix 不带 locale 前缀（例如详情页传 '/status/404'，首页传 ''）
export function buildHrefLangMap(suffix: string = ''): Record<string, string> {
  const result: Record<string, string> = {};
  for (const locale of SUPPORTED_LOCALES) {
    const tag = HREFLANG_MAP[locale];
    const path = locale === 'en' ? suffix || '/' : `/${locale}${suffix}`;
    result[tag] = path;
  }
  return result;
}
