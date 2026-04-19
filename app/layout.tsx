import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import './globals.css'

const serif = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-serif',
  display: 'swap',
})

const sans = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
})

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://versani.ai'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Versani — Beauty Meets Intelligence',
    template: '%s | Versani',
  },
  description:
    'Versani is the AI consultation platform built exclusively for professional hair colorists. Every formula, adapted to you. Every client, remembered. Every outcome, elevated.',
  applicationName: 'Versani',
  keywords: [
    'hair color AI',
    'professional colorist software',
    'salon consultation platform',
    'hair formula assistant',
    'color correction AI',
    'Versani',
    'beauty technology',
  ],
  authors: [{ name: 'Versani' }],
  creator: 'Versani',
  publisher: 'Versani',
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: {
    type: 'website',
    siteName: 'Versani',
    title: 'Versani — Beauty Meets Intelligence',
    description:
      'The AI consultation platform built exclusively for professional hair colorists.',
    url: SITE_URL,
    locale: 'en_US',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Versani — Beauty Meets Intelligence',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Versani — Beauty Meets Intelligence',
    description:
      'AI consultation built for professional hair colorists.',
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: { canonical: SITE_URL },
  icons: {
    icon: [
      { url: '/versani-monogram.png', type: 'image/png' },
    ],
    apple: [{ url: '/versani-monogram.png' }],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0b0d12' },
    { media: '(prefers-color-scheme: light)', color: '#0b0d12' },
  ],
  colorScheme: 'dark',
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Versani',
  url: SITE_URL,
  logo: `${SITE_URL}/versani-monogram.png`,
  description:
    'AI consultation platform for professional hair colorists.',
  sameAs: [],
}

const softwareJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Versani',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web, iOS, Android',
  description:
    'Professional AI hair color consultation. Formulation, client memory, and on-demand advisor for colorists.',
  offers: [
    {
      '@type': 'Offer',
      name: 'Free Trial',
      price: '0',
      priceCurrency: 'USD',
    },
    {
      '@type': 'Offer',
      name: 'Pro',
      price: '24.99',
      priceCurrency: 'USD',
    },
    {
      '@type': 'Offer',
      name: 'Studio',
      price: '39.99',
      priceCurrency: 'USD',
    },
    {
      '@type': 'Offer',
      name: 'Salon',
      description: 'Per-seat pricing for multi-chair salons.',
      priceCurrency: 'USD',
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          // Schema.org structured data — Organization
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          // Schema.org structured data — SoftwareApplication
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(softwareJsonLd),
          }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  )
}
