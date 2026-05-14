// 多语言路由前缀和状态码本地化名称的统一入口

type StatusLike = {
  message: string;
  messageI18n?: Record<string, string>;
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
