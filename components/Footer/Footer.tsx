'use client';

import GithubButton from '@/components/GithubButton';
import styles from './Footer.module.css';

type FooterProps = {
  t: { [key: string]: string };
};

const Footer = ({ t }: FooterProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.social}>
        <GithubButton width={70} height={70} />
      </div>
      <p>
        {t.REFINED_BY}{' '}
        <a href="https://github.com/jhll1124" target="_blank" rel="noopener noreferrer">@jhll1124</a>
      </p>
      <p>
        {t.DEVELOPED_BY}{' '}
        <a href="https://twitter.com/rogeriopvl" target="_blank" rel="noopener noreferrer">@rogeriopvl</a>
      </p>
      <p>
        {t.IMAGES_BY} Tomomi Imura (
        <a href="https://twitter.com/girlie_mac" target="_blank" rel="noopener noreferrer">@girlie_mac</a>)
      </p>
    </div>
  );
};

export default Footer;
