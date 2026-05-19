import { Metadata, Viewport } from 'next';
import Script from 'next/script';

import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://hcr.cialo.site'),
  alternates: {
    canonical: '/',
    languages: {
      en: '/',
      'zh-CN': '/zh-CN',
      'zh-TW': '/zh-TW',
      'ja-JP': '/ja',
      'fr-FR': '/fr',
      'ru-RU': '/ru',
      'es-ES': '/es',
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.png',
    apple: '/apple-touch-icon.png',
    other: [
      { rel: 'apple-touch-icon-precomposed', url: '/apple-touch-icon.png' },
    ],
  },
  title: 'HTTP Cats · refined',
  description:
    'HTTP status codes illustrated with cats. 120+ codes — standard RFC, Nginx 4xx, Cloudflare 5xx & 1xxx. Available in EN, 简体中文, 繁體中文, 日本語, Français, Русский, Español.',
  keywords:
    'http, cats, http cats, http status codes, http status cats, nginx, cloudflare, error codes, refined, multilingual, i18n',
  openGraph: {
    type: 'website',
    title: 'HTTP Cats · refined',
    siteName: 'HTTP Cats · refined',
    description:
      'HTTP status codes illustrated with cats. 120+ codes — standard RFC, Nginx 4xx, Cloudflare 5xx & 1xxx. Available in EN, 简体中文, 繁體中文, 日本語, Français, Русский, Español.',
    images: [
      {
        url: '/images/204.jpg',
        alt: 'HTTP Cats',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HTTP Cats · refined',
    description:
      'HTTP status codes illustrated with cats. 120+ codes — standard RFC, Nginx 4xx, Cloudflare 5xx & 1xxx. Available in EN, 简体中文, 繁體中文, 日本語, Français, Русский, Español.',
    images: ['/images/204.jpg'],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#d0383e',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="p-4 sm:px-16 sm:py-4 lg:px-32 lg:py-4">{children}</div>
        {/* Set <html lang> based on URL after hydration to avoid SSR mismatch */}
        <Script id="html-lang-setter" strategy="afterInteractive">
          {`(function(){var m={'zh-CN':'zh-CN','zh-TW':'zh-TW',ja:'ja-JP',fr:'fr-FR',ru:'ru-RU',es:'es-ES'};var s=location.pathname.split('/')[1];document.documentElement.lang=m[s]||'en';})();`}
        </Script>
        {/* Google tag (gtag.js) */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-335RH1BJLW"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-335RH1BJLW');
          `}
        </Script>
      </body>
    </html>
  );
}
