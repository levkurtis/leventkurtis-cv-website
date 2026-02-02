import type { Metadata } from 'next'
import Link from 'next/link'
import PhotoGallery from '@/components/PhotoGallery'

export const metadata: Metadata = {
  title: "Japan '24 | Photography | Levent Kurtis",
  description: 'A photographic journey through Japan - capturing moments of tradition, nature, and urban life.',
  openGraph: {
    title: "Japan '24 | Photography | Levent Kurtis",
    description: 'A photographic journey through Japan.',
    type: 'website',
  },
}

const photos = [
  'card1.JPG',
  'card2.JPG',
  'card3.JPG',
  'card4.JPG',
  'card5.JPG',
  'card6.JPG',
  'card7.JPG',
  'card8.JPG',
]

export default function JapanPage() {
  return (
    <>
      {/* Breadcrumb */}
      <div className="pt-6 px-4">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/photography"
            className="inline-flex items-center gap-2 text-sm text-[#666] hover:text-[#1a1a1a] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            All Albums
          </Link>
        </div>
      </div>

      <PhotoGallery
        title="Japan '24"
        subtitle="A photographic journey through Japan - capturing moments of tradition, nature, and urban life."
        photos={photos}
        basePath="/photography-portfolio/japan"
      />
    </>
  )
}
