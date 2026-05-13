import Link from 'next/link';
import Logo from '@/components/Logo';

type HeaderProps = {
  t: { [key: string]: string };
};

const Header = ({ t }: HeaderProps) => {
  const href = t.LOCALE === 'zh' ? '/zh' : '/';
  const localeHref = t.LOCALE === 'zh' ? '/' : '/zh';

  return (
    <header className="flex items-center justify-between">
      <a href={href} className="flex text-interactive no-underline">
        <div className="pt-4">
          <Logo width={80} height={55} color="#d0383e" />
        </div>
        <h1 className="ml-2 text-4xl font-bold my-6">{t.APP_TITLE}</h1>
      </a>
      <Link
        href={localeHref}
        className="text-sm px-3 py-1.5 rounded border border-current opacity-70 hover:opacity-100 transition-opacity no-underline"
      >
        {t.LANGUAGE_LINK_TEXT}
      </Link>
    </header>
  );
};

export default Header;
