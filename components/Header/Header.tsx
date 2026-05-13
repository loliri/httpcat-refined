import Logo from '@/components/Logo';
import LanguageSwitcher from '@/components/LanguageSwitcher';

type HeaderProps = {
  t: { [key: string]: string };
};

const Header = ({ t }: HeaderProps) => {
  const href = t.LOCALE === 'zh' ? '/zh' : '/';

  return (
    <header className="flex items-center justify-between">
      <a href={href} className="flex text-interactive no-underline">
        <div className="pt-4">
          <Logo width={80} height={55} color="#d0383e" />
        </div>
        <h1 className="ml-2 text-4xl font-bold my-6">{t.APP_TITLE}</h1>
      </a>
      <LanguageSwitcher currentLocale={t.LOCALE} />
    </header>
  );
};

export default Header;
