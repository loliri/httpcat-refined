import Usage from '@/components/Usage';
import ThumbnailGrid from '@/components/ThumbnailGrid';
import Thumbnail from '@/components/Thumbnail';
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
        {categories.map((cat) => (
          <section key={cat.key} className="mb-12">
            <h2 className="text-2xl font-bold mb-4 mt-8 border-b border-[--interactive] pb-2">
              {t[cat.key]}
            </h2>
            <ThumbnailGrid>
              {cat.statuses.map((status) => (
                <Thumbnail
                  code={status.code}
                  key={status.code}
                  description={status.message}
                  t={t}
                />
              ))}
            </ThumbnailGrid>
          </section>
        ))}
      </main>
      <Footer t={t} />
    </>
  );
}
