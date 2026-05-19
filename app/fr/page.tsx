import { Metadata } from 'next';
import Usage from '@/components/Usage';
import CategoryTabs from '@/components/CategoryTabs';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollRestore from '@/components/ScrollRestore';
import { getTranslations } from '@/lib/translation';
import { getCategories } from '@/lib/categories';

export const metadata: Metadata = {
  title: 'HTTP Cats · refined | Français',
  description: 'Codes de statut HTTP illustrés par des chats. 120+ codes — RFC standard, extensions Nginx 4xx, Cloudflare 5xx & 1xxx. Disponible en Français, English, 中文, 日本語, Русский, Español.',
  alternates: { canonical: '/fr' },
  openGraph: { locale: 'fr_FR' },
};

export default async function Home() {
  const t = await getTranslations('fr');
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
