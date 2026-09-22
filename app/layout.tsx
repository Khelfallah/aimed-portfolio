import type { Metadata } from 'next';
import { Geist, Geist_Mono, IBM_Plex_Sans_Arabic } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const ibmArabic = IBM_Plex_Sans_Arabic({
  variable: '--font-ibm-arabic',
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://aimed-portfolio.vercel.app'),
  title: 'Aimed — Creative Director & Designer',
  description:
    'Aimed designs brands, digital products, and experiences from Algeria.',
  openGraph: {
    type: 'website',
    images: [
      {
        url: '/link-preview.png',
        width: 1228,
        height: 658,
        alt: 'Aimed designs brands, digital products and experiences.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/link-preview.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${ibmArabic.variable}`}>
        {children}
      </body>
    </html>
  );
}
