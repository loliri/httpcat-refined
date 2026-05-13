'use client';

import { usePathname } from 'next/navigation';

import GithubButton from '@/components/GithubButton';

import styles from './Footer.module.css';

type FooterProps = {
  t: { [key: string]: string };
};

const Footer = ({ t }: FooterProps) => {
  const pathname = usePathname();

  return (
    <div className={styles.container}>
      <div className={styles.social}>
        <GithubButton width={70} height={70} />
      </div>

      <nav>
      </nav>

      <p>
        {t.REFINED_BY}{' '}
        <a href="https://github.com/jhll1124">@jhll1124</a>
      </p>
      <p>
        {t.DEVELOPED_BY}{' '}
        <a href="https://twitter.com/rogeriopvl">@rogeriopvl</a>
      </p>
      <p>
        {t.IMAGES_BY} Tomomi Imura (
        <a href="https://twitter.com/girlie_mac">@girlie_mac</a>)
      </p>
    </div>
  );
};

export default Footer;
