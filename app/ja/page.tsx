import { Metadata } from 'next';
import Usage from '@/components/Usage';
import CategoryTabs from '@/components/CategoryTabs';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollRestore from '@/components/ScrollRestore';
import { getTranslations } from '@/lib/translation';
import { getCategories } from '@/lib/categories';

export const metadata: Metadata = {
  title: 'HTTP Cats · refined | 日本語',
  description: 'HTTP ステータスコードを猫の画像で解説。120以上のコードを収録 — 標準 RFC、Nginx 4xx 拡張、Cloudflare 5xx・1xxx エラーシリーズ。日本語・中文・Français・Русский・Español 対応。',
  alternates: { canonical: '/ja' },
  openGraph: { locale: 'ja_JP' },
};

export default async function Home() {
  const t = await getTranslations('ja');
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
