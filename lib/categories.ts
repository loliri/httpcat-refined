import statuses from './statuses';

export type Status = {
  code: number;
  message: string;
  messageZh?: string;
  hasImage: boolean;
};

export type Category = {
  key: string;       // i18n key, e.g. "CAT_1XX"
  statuses: Status[];
};

export function getCategories(): Category[] {
  const all = Object.values(statuses) as Status[];

  const groups: { key: string; test: (code: number) => boolean }[] = [
    { key: 'CAT_1XX', test: (c) => c >= 100 && c < 200 },
    { key: 'CAT_2XX', test: (c) => c >= 200 && c < 300 },
    { key: 'CAT_3XX', test: (c) => c >= 300 && c < 400 },
    { key: 'CAT_4XX', test: (c) => c >= 400 && c < 500 },
    { key: 'CAT_5XX', test: (c) => c >= 500 && c < 600 },
    { key: 'CAT_CF',  test: (c) => c >= 1000 },
  ];

  return groups.map(({ key, test }) => ({
    key,
    statuses: all.filter((s) => test(s.code)),
  }));
}
