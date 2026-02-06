import type { Metadata } from 'next'
import BackLink from '@/components/ui/BackLink'
import PhotoGallery from '@/components/PhotoGallery'
import { japanPhotos } from '@/lib/photography-data'
import { createPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = createPageMetadata(
  "Japan '24 | Photography | Levent Kurtis",
  'A photographic journey through Japan - capturing moments of tradition, nature, and urban life.'
)

export default function JapanPage() {
  return (
    <>
      {/* Breadcrumb */}
      <div className="pt-6 px-4">
        <div className="max-w-5xl mx-auto">
          <BackLink href="/photography" label="All Albums" />
        </div>
      </div>

      <PhotoGallery
        title="Japan '24"
        subtitle="A photographic journey through Japan - capturing moments of tradition, nature, and urban life."
        photos={japanPhotos}
        basePath="/photography-portfolio/japan"
      />
    </>
  )
}
