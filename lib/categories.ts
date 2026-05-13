import statuses from './statuses';

export type Status = {
  code: number;
  message: string;
  messageZh?: string;
  messageJa?: string;
  hasImage: boolean;
};

export type Category = {
  key: string;       // i18n key, e.g. "CAT_1XX"
  descKey: string;   // i18n description key, e.g. "CAT_1XX_DESC"
  statuses: Status[];
};

export function getCategories(): Category[] {
  const all = Object.values(statuses) as Status[];

  const groups: { key: string; descKey: string; test: (code: number) => boolean }[] = [
    { key: 'CAT_1XX', descKey: 'CAT_1XX_DESC', test: (c) => c >= 100 && c < 200 },
    { key: 'CAT_2XX', descKey: 'CAT_2XX_DESC', test: (c) => c >= 200 && c < 300 },
    { key: 'CAT_3XX', descKey: 'CAT_3XX_DESC', test: (c) => c >= 300 && c < 400 },
    { key: 'CAT_4XX', descKey: 'CAT_4XX_DESC', test: (c) => c >= 400 && c < 500 },
    { key: 'CAT_5XX', descKey: 'CAT_5XX_DESC', test: (c) => c >= 500 && c < 600 },
    { key: 'CAT_CF',  descKey: 'CAT_CF_DESC',  test: (c) => c >= 1000 },
  ];

  return groups.map(({ key, descKey, test }) => ({
    key,
    descKey,
    statuses: all.filter((s) => test(s.code)),
  }));
}
