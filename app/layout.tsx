import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://cbrsquadindonesia.vercel.app'),
  title: {
    default: 'CBR Squad Indonesia | One Passion, One Brotherhood',
    template: '%s | CBR Squad Indonesia'
  },
  description:
    'CBR Squad Indonesia adalah komunitas pecinta Honda CBR di Indonesia yang menjunjung tinggi solidaritas, safety riding, dan kebersamaan antar wilayah.',
  applicationName: 'CBR Squad Indonesia',
  keywords: [
    'CBR Squad Indonesia',
    'komunitas CBR Indonesia',
    'Honda CBR club',
    'safety riding',
    'club motor CBR',
    'regional CBR Indonesia'
  ],
  authors: [{ name: 'CBR Squad Indonesia' }],
  creator: 'CBR Squad Indonesia',
  publisher: 'CBR Squad Indonesia',
  alternates: {
    canonical: '/' 
  },
  icons: {
    icon: [{ url: '/csi-favicon.png', type: 'image/png', sizes: '512x512' }],
    shortcut: '/csi-favicon.png',
    apple: [{ url: '/csi-favicon.png', type: 'image/png', sizes: '180x180' }]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  openGraph: {
    title: 'CBR Squad Indonesia',
    description: 'One Passion, One Brotherhood. Komunitas pecinta Honda CBR di Indonesia.',
    url: 'https://cbrsquadindonesia.vercel.app',
    siteName: 'CBR Squad Indonesia',
    locale: 'id_ID',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CBR Squad Indonesia',
    description: 'One Passion, One Brotherhood. Komunitas pecinta Honda CBR di Indonesia.'
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
