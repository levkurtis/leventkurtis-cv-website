import type { Metadata } from 'next'
import Link from 'next/link'
import Photography from '@/components/Photography'

export const metadata: Metadata = {
  title: 'Seoul, South Korea | Photography | Levent Kurtis',
  description: 'A photographic journey through Seoul, South Korea - exploring tradition and modernity.',
  openGraph: {
    title: 'Seoul, South Korea | Photography | Levent Kurtis',
    description: 'A photographic journey through Seoul, South Korea.',
    type: 'website',
  },
}

export default function SeoulPage() {
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

      <Photography />
    </>
  )
}
