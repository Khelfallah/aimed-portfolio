import type { Metadata } from 'next';
import { Geist, Geist_Mono, IBM_Plex_Sans_Arabic } from 'next/font/google';
import { siteUrl, socialDescription, socialImage, socialImageUrl, socialTitle } from './social-metadata';
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
  metadataBase: new URL(siteUrl),
  title: socialTitle,
  description: socialDescription,
  openGraph: {
    type: 'website',
    siteName: 'Aimed',
    images: [socialImage],
  },
  twitter: {
    card: 'summary_large_image',
    images: [socialImageUrl],
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
