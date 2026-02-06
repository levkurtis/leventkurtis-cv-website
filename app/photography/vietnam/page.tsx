import type { Metadata } from 'next'
import BackLink from '@/components/ui/BackLink'
import PhotoGallery from '@/components/PhotoGallery'
import { vietnamPhotos } from '@/lib/photography-data'
import { createPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = createPageMetadata(
  "Vietnam '25 | Photography | Levent Kurtis",
  'A photographic journey through Vietnam - capturing the vibrant culture, landscapes, and street life.'
)

export default function VietnamPage() {
  return (
    <>
      {/* Breadcrumb */}
      <div className="pt-6 px-4">
        <div className="max-w-5xl mx-auto">
          <BackLink href="/photography" label="All Albums" />
        </div>
      </div>

      <PhotoGallery
        title="Vietnam '25"
        subtitle="A photographic journey through Vietnam - capturing the vibrant culture, landscapes, and street life."
        photos={vietnamPhotos}
        basePath="/photography-portfolio/vietnam"
      />
    </>
  )
}
