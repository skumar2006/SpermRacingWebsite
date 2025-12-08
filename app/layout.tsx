import type { Metadata } from 'next';
import './globals.css';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/react';
import { BackgroundProvider } from './context/BackgroundContext';
import GlobalBlur from './components/GlobalBlur';
import { PostHogProvider } from './providers';
import Navbar from './components/Navbar';
import localFont from 'next/font/local';
import { Inter } from 'next/font/google';

export const monoFont = localFont({
  src: [
    {
      path: '../public/fonts/JetBrainsMono-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/JetBrainsMono-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-mono',
});

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://spermracing.com'),
  title: 'Sperm Racing',
  description:
    "The world's first sperm race. Microscopic competition. Macroscopic stakes.",
  icons: {
    icon: '/icon.png',
  },
  openGraph: {
    title: 'Sperm Racing',
    description:
      "The world's first sperm race. Microscopic competition. Macroscopic stakes.",
    images: [
      {
        url: '/images/logo/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Sperm Racing Logo',
      },
    ],
    siteName: 'Sperm Racing',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sperm Racing',
    description:
      "The world's first sperm race. Microscopic competition. Macroscopic stakes.",
    images: ['/images/logo/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-5MHBNH72P6"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-5MHBNH72P6');
          `}
        </Script>
      </head>
      <body
        suppressHydrationWarning={true}
        style={{ backgroundColor: 'black' }}
        className={`${monoFont.variable} ${inter.variable}`}
      >
        <BackgroundProvider>
          <PostHogProvider>
            <main className="relative">
              <GlobalBlur />
              {children}
            </main>
            <Analytics />
          </PostHogProvider>
        </BackgroundProvider>
      </body>
    </html>
  );
}
