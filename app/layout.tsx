import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { PersonJsonLd, WebsiteJsonLd } from '@/components/JsonLd'
import { ThemeProvider } from '@/lib/theme-context'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://leventkurtis.com'),
  title: {
    default: 'Levent Kurtis | Data & AI Leader',
    template: '%s | Levent Kurtis',
  },
  description: 'Tech Leader at the Intersection of Data & AI, People, and Delivery. Senior Business Architecture Analyst at Accenture.',
  keywords: ['Data & AI', 'Consultant', 'Team Lead', 'Accenture', 'Copenhagen', 'Digital Transformation'],
  authors: [{ name: 'Levent Kurtis' }],
  creator: 'Levent Kurtis',
  icons: {
    icon: '/icon.svg',
    apple: '/apple-icon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://leventkurtis.com',
    siteName: 'Levent Kurtis',
    title: 'Levent Kurtis | Data & AI Leader',
    description: 'Tech Leader at the Intersection of Data & AI, People, and Delivery.',
    images: [
      {
        url: '/opengraph-image.svg',
        width: 1200,
        height: 630,
        alt: 'Levent Kurtis - Data & AI Leader',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Levent Kurtis | Data & AI Leader',
    description: 'Tech Leader at the Intersection of Data & AI, People, and Delivery.',
    images: ['/opengraph-image.svg'],
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme') ||
                  (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
                document.documentElement.setAttribute('data-theme', theme);
              })()
            `,
          }}
        />
        <PersonJsonLd />
        <WebsiteJsonLd />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
