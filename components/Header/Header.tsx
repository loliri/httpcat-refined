import Logo from '@/components/Logo';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { localeHomeHref } from '@/lib/locale';

type HeaderProps = {
  t: { [key: string]: string };
};

const Header = ({ t }: HeaderProps) => {
  const href = localeHomeHref(t.LOCALE);

  return (
    <header className="flex items-center justify-between py-4">
      <a href={href} className="flex items-center no-underline text-[--interactive]">
        <div className="pt-4">
          <Logo width={80} height={55} color="#d0383e" />
        </div>
        <h1 className="ml-2 text-4xl font-bold my-6 relative">
          HTTP Cats
          <span className="absolute -top-1 -right-16 text-xs font-semibold tracking-wider opacity-50 border border-current rounded px-1 py-0.5">
            refined
          </span>
        </h1>
      </a>
      <LanguageSwitcher currentLocale={t.LOCALE} />
    </header>
  );
};

export default Header;
