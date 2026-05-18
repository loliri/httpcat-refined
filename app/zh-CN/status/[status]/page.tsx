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
  const t = await getTranslations('zh-CN');

  const statusObj = statuses[params.status as unknown as keyof typeof statuses];
  const statusInfoHTML = await getStatusInfo(params.status, t.LOCALE);
  const localizedName = localizedStatusName(statusObj, 'zh-CN');

  return (
    <>
      <Header t={t} />
      <main>
        <nav>
          <Link href="/zh-CN" className="text-white">{`< ${t.BACK_TO_HOME}`}</Link>
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
  const zhName = localizedStatusName(statusObj, 'zh-CN');
  const localizedName = zhName
    ? `${statusObj.message}（${zhName}）`
    : statusObj.message;
  const title = `${statusObj.code} ${localizedName} | HTTP Cats · refined`;
  const description = `${statusObj.code} ${localizedName} 的 HTTP 猫咪图片`;
  const imagePath = statusObj.hasImage ? `/images/${statusObj.code}.jpg` : '/images/0.jpg';

  return {
    title,
    description,
    alternates: {
      canonical: `/zh-CN/status/${statusObj.code}`,
      languages: buildHrefLangMap(`/status/${statusObj.code}`),
    },
    openGraph: {
      title,
      description,
      url: `/zh-CN/status/${statusObj.code}`,
      images: [{ url: imagePath, alt: statusObj.message }],
      locale: 'zh_CN',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imagePath],
    },
  };
}
