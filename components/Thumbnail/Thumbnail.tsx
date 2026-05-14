'use client';

import Link from 'next/link';
import Image from 'next/image';

import statuses from '@/lib/statuses';
import { localePrefix, localizedStatusName } from '@/lib/locale';

type ThumbnailProps = {
  code: number;
  description: string;
  t: { [key: string]: string };
};

const Thumbnail = ({ code, description, t }: ThumbnailProps) => {
  const status = statuses[code as unknown as keyof typeof statuses];
  const hrefBase = localePrefix(t.LOCALE);
  const imageSrc = status?.hasImage ? `/images/${code}.jpg` : '/images/0.jpg';
  const localizedName = status ? localizedStatusName(status, t.LOCALE) : undefined;

  const saveScrollPosition = () => {
    sessionStorage.setItem('homeScrollPosition', window.scrollY.toString());
    if (window.location.hash) {
      sessionStorage.setItem('homeCategoryHash', window.location.hash);
    }
  };

  return (
    <div id={`${code}`} className="flex flex-col flex-grow h-full text-white overflow-hidden rounded shadow bg-[--interactive]">
      <Link
        href={`${hrefBase}/status/${code}`}
        onClick={saveScrollPosition}
        className="text-white no-underline"
      >
        <div className="pt-[56.25%] relative overflow-hidden">
          <Image
            src={imageSrc}
            alt=""
            loading="lazy"
            fill
            className="contrast-[70%] hover:contrast-100 transition duration-500 object-cover scale-[140%]"
          />
        </div>
        <div className="flex flex-col px-4 pt-4">
          <div className="text-[2rem] tracking-[2px] font-semibold uppercase">
            {code}
          </div>
          <p className="font-semibold">{description}</p>
          {localizedName && (
            <p className="text-sm opacity-75 mt-0">
              {localizedName}
            </p>
          )}
        </div>
      </Link>
    </div>
  );
};

export default Thumbnail;
