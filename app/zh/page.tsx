import Usage from '@/components/Usage';
import CategoryTabs from '@/components/CategoryTabs';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollRestore from '@/components/ScrollRestore';
import { getTranslations } from '@/lib/translation';
import { getCategories } from '@/lib/categories';

export default async function Home() {
  const t = await getTranslations('zh');
  const categories = getCategories();

  return (
    <>
      <ScrollRestore />
      <Header t={t} />
      <main>
        <Usage t={t} />
        <CategoryTabs categories={categories} t={t} />
      </main>
      <Footer t={t} />
    </>
  );
}
