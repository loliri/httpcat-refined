import { Metadata, Viewport } from 'next';
import Script from 'next/script';

import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://hcr.cialo.site'),
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
    'HTTP status codes illustrated with cats. A refined fork with more codes, Chinese localization, and a cleaner UI.',
  keywords:
    'http, cats, http cats, http status cats, status cats, error, refined',
  openGraph: {
    type: 'website',
    title: 'HTTP Cats · refined',
    siteName: 'HTTP Cats · refined',
    description:
      'HTTP status codes illustrated with cats. A refined fork with more codes, Chinese localization, and a cleaner UI.',
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
      'HTTP status codes illustrated with cats. A refined fork with more codes, Chinese localization, and a cleaner UI.',
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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var m={zh:'zh-CN'};var s=location.pathname.split('/')[1];document.documentElement.lang=m[s]||'en';})();`,
          }}
        />
      </head>
      <body>
        <div className="p-4 sm:px-16 sm:py-4 lg:px-32 lg:py-4">{children}</div>
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
