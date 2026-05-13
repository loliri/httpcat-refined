import { existsSync, readFileSync } from 'fs';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeStringify from 'rehype-stringify';

export async function getStatusInfo(status: string, locale: string = 'en') {
  // Try locale-specific file first, fall back to English
  const localePath = `./content/${locale}/${status}.md`;
  const englishPath = `./content/en/${status}.md`;

  const filePath = (locale !== 'en' && existsSync(localePath))
    ? localePath
    : englishPath;

  const fileContent = readFileSync(filePath, 'utf8');

  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeExternalLinks, { target: '_blank', rel: ['noopener'] })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(fileContent);

  return result.toString();
}
