import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'
import ScrollBackground from '@/components/ScrollBackground'
import StructuredData, { SITE_URL } from '@/components/StructuredData'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
})

const TITLE = 'Levent Kurtis | Data & AI Leader'
const DESCRIPTION =
  'Data & AI consultant and team lead at Accenture in Copenhagen. Data migration, data quality and analytics delivery. Full CV, experience and certifications.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: '/',
  },
  authors: [{ name: 'Levent Kurtis', url: SITE_URL }],
  creator: 'Levent Kurtis',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'profile',
    firstName: 'Levent',
    lastName: 'Kurtis',
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: 'Levent Kurtis',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
}

export const viewport: Viewport = {
  themeColor: '#21212f',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Preload the LCP image. type="image/avif" makes non-supporting browsers skip it. */}
        <link
          rel="preload"
          as="image"
          type="image/avif"
          href="/photo-234.avif"
          imageSrcSet="/photo-234.avif 1x, /photo-468.avif 2x"
          fetchPriority="high"
        />
      </head>
      <body className="antialiased">
        <ScrollBackground />
        {children}
        <Analytics />
        <StructuredData />
      </body>
    </html>
  )
}
