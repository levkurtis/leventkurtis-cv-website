import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Levent Kurtis | Data & AI Leader',
  description: 'Tech Leader at the Intersection of Data & AI, People, and Delivery. Senior Business Architecture Analyst at Accenture.',
  keywords: ['Data & AI', 'Consultant', 'Team Lead', 'Accenture', 'Copenhagen', 'Digital Transformation'],
  authors: [{ name: 'Levent Kurtis' }],
  openGraph: {
    title: 'Levent Kurtis | Data & AI Leader',
    description: 'Tech Leader at the Intersection of Data & AI, People, and Delivery.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
