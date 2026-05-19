import { Metadata } from 'next';
import Usage from '@/components/Usage';
import CategoryTabs from '@/components/CategoryTabs';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollRestore from '@/components/ScrollRestore';
import { getTranslations } from '@/lib/translation';
import { getCategories } from '@/lib/categories';

export const metadata: Metadata = {
  title: 'HTTP Cats · refined | 繁體中文',
  description: 'HTTP 狀態碼貓咪圖鑑。120+ 個狀態碼，涵蓋標準 RFC、Nginx 4xx 擴充、Cloudflare 5xx 及 1xxx 錯誤系列。支援繁體中文、简体中文、日本語、Français、Русский、Español。',
  alternates: { canonical: '/zh-TW' },
  openGraph: { locale: 'zh_TW' },
};

export default async function Home() {
  const t = await getTranslations('zh-TW');
  const categories = getCategories();

  return (
    <>
      <ScrollRestore />
      <Header t={t} />
      <main>
        <CategoryTabs categories={categories} t={t} />
        <Usage t={t} />
      </main>
      <Footer t={t} />
    </>
  );
}
