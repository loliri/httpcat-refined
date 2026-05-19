import { Metadata } from 'next';
import Usage from '@/components/Usage';
import CategoryTabs from '@/components/CategoryTabs';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollRestore from '@/components/ScrollRestore';
import { getTranslations } from '@/lib/translation';
import { getCategories } from '@/lib/categories';

export const metadata: Metadata = {
  title: 'HTTP Cats · refined | 简体中文',
  description: 'HTTP 状态码猫咪图鉴。120+ 个状态码，涵盖标准 RFC、Nginx 4xx 扩展、Cloudflare 5xx 及 1xxx 错误系列。支持简体中文、繁體中文、日本語、Français、Русский、Español。',
  alternates: { canonical: '/zh-CN' },
  openGraph: { locale: 'zh_CN' },
};

export default async function Home() {
  const t = await getTranslations('zh-CN');
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
