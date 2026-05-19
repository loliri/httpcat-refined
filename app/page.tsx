import { Metadata } from 'next';
import Usage from '@/components/Usage';
import CategoryTabs from '@/components/CategoryTabs';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollRestore from '@/components/ScrollRestore';
import { getTranslations } from '@/lib/translation';
import { getCategories } from '@/lib/categories';

export const metadata: Metadata = {
  title: 'HTTP Cats · refined',
  description: 'HTTP status codes illustrated with cats. 120+ codes — standard RFC, Nginx 4xx, Cloudflare 5xx & 1xxx. Available in EN, 简体中文, 繁體中文, 日本語, Français, Русский, Español.',
  alternates: { canonical: '/' },
};

export default async function Home() {
  const t = await getTranslations('en');
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
