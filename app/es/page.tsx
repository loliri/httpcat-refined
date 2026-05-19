import { Metadata } from 'next';
import Usage from '@/components/Usage';
import CategoryTabs from '@/components/CategoryTabs';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollRestore from '@/components/ScrollRestore';
import { getTranslations } from '@/lib/translation';
import { getCategories } from '@/lib/categories';

export const metadata: Metadata = {
  title: 'HTTP Cats · refined | Español',
  description: 'Códigos de estado HTTP ilustrados con gatos. 120+ códigos — RFC estándar, extensiones Nginx 4xx, Cloudflare 5xx y 1xxx. Disponible en Español, English, 中文, 日本語, Français, Русский.',
  alternates: { canonical: '/es' },
  openGraph: { locale: 'es_ES' },
};

export default async function Home() {
  const t = await getTranslations('es');
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
