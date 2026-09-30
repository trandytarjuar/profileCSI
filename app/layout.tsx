import type { Metadata } from 'next';
import './globals.css';

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://cbrsquadindonesia.vercel.app/#organization',
      name: 'CBR Squad Indonesia',
      alternateName: 'CSI',
      url: 'https://cbrsquadindonesia.vercel.app/',
      logo: 'https://cbrsquadindonesia.vercel.app/csi-favicon.png',
      description:
        'CBR Squad Indonesia adalah komunitas pecinta Honda CBR di Indonesia yang menjunjung tinggi solidaritas, safety riding, dan kebersamaan antar wilayah.',
      sameAs: ['https://www.instagram.com/cbrsquadindonesia_official?stkn=MWV2OXl0M2Y3ODl0YQ==']
    },
    {
      '@type': 'WebSite',
      '@id': 'https://cbrsquadindonesia.vercel.app/#website',
      name: 'CBR Squad Indonesia',
      alternateName: 'CSI',
      url: 'https://cbrsquadindonesia.vercel.app/',
      inLanguage: 'id-ID',
      publisher: { '@id': 'https://cbrsquadindonesia.vercel.app/#organization' }
    }
  ]
};

export const metadata: Metadata = {
  metadataBase: new URL('https://cbrsquadindonesia.vercel.app'),
  title: {
    default: 'CBR Squad Indonesia | Satu Hobi, Satu Persaudaraan',
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
    'chapter CBR Indonesia'
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
  verification: {
    google: 'Gss8F_eVL13tn_L0ooIxnmrHVO2IVtRjEDbBcyueyY4'
  },
  openGraph: {
    title: 'CBR Squad Indonesia',
    description: 'Satu hobi, satu persaudaraan. Komunitas pecinta Honda CBR di Indonesia.',
    url: 'https://cbrsquadindonesia.vercel.app',
    siteName: 'CBR Squad Indonesia',
    locale: 'id_ID',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CBR Squad Indonesia',
    description: 'Satu hobi, satu persaudaraan. Komunitas pecinta Honda CBR di Indonesia.'
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
