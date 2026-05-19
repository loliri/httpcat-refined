import { Metadata } from 'next';
import Usage from '@/components/Usage';
import CategoryTabs from '@/components/CategoryTabs';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollRestore from '@/components/ScrollRestore';
import { getTranslations } from '@/lib/translation';
import { getCategories } from '@/lib/categories';

export const metadata: Metadata = {
  title: 'HTTP Cats · refined | Русский',
  description: 'Коды состояния HTTP с иллюстрациями котов. 120+ кодов — стандарт RFC, расширения Nginx 4xx, Cloudflare 5xx и 1xxx. Доступно на Русском, English, 中文, 日本語, Français, Español.',
  alternates: { canonical: '/ru' },
  openGraph: { locale: 'ru_RU' },
};

export default async function Home() {
  const t = await getTranslations('ru');
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
