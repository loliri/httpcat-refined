import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StatusDescription from '@/components/StatusDescription';

import statuses from '@/lib/statuses';
import { getStatusInfo } from '@/lib/status-info';
import { getTranslations } from '@/lib/translation';
import { localizedStatusName, buildHrefLangMap } from '@/lib/locale';

export default async function Info(props: { params: Promise<{ status: string }> }) {
  const params = await props.params;
  const t = await getTranslations('ru');

  const statusObj = statuses[params.status as unknown as keyof typeof statuses];
  const statusInfoHTML = await getStatusInfo(params.status, t.LOCALE);
  const localizedName = localizedStatusName(statusObj, 'ru');

  return (
    <>
      <Header t={t} />
      <main>
        <nav>
          <Link href="/ru" className="text-white">{`< ${t.BACK_TO_HOME}`}</Link>
        </nav>

        <h1 className="text-center my-12">
          {statusObj.code} {statusObj.message}
          {localizedName && (
            <span className="block text-xl font-normal opacity-80 mt-1">
              {localizedName}
            </span>
          )}
        </h1>

        <div className="text-center">
          <Image
            src={statusObj.hasImage ? `/images/${statusObj.code.toString()}.jpg` : '/images/0.jpg'}
            alt={statusObj.message}
            width={750}
            height={600}
            className="w-full h-full max-w-3xl"
          />
        </div>
        <section className="flex justify-center tracking-wider">
          <StatusDescription>
            <div dangerouslySetInnerHTML={{ __html: statusInfoHTML }} />
          </StatusDescription>
        </section>
      </main>
      <Footer t={t} />
    </>
  );
}

export function generateStaticParams() {
  return Object.keys(statuses).map((status) => ({ status }));
}

export async function generateMetadata(
  props: {
    params: Promise<{ status: string }>;
  }
): Promise<Metadata> {
  const params = await props.params;
  const statusObj = statuses[params.status as unknown as keyof typeof statuses];
  const ruName = localizedStatusName(statusObj, 'ru');
  const localizedName = ruName
    ? `${statusObj.message} (${ruName})`
    : statusObj.message;
  const title = `${statusObj.code} ${localizedName} | HTTP Cats · refined`;
  const description = `HTTP-кот для статуса ${statusObj.code} ${localizedName}`;
  const imagePath = statusObj.hasImage ? `/images/${statusObj.code}.jpg` : '/images/0.jpg';

  return {
    title,
    description,
    alternates: {
      canonical: `/ru/status/${statusObj.code}`,
      languages: buildHrefLangMap(`/status/${statusObj.code}`),
    },
    openGraph: {
      title,
      description,
      url: `/ru/status/${statusObj.code}`,
      images: [{ url: imagePath, alt: statusObj.message }],
      locale: 'ru_RU',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imagePath],
    },
  };
}
