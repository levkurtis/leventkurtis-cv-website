import type { Metadata } from 'next'
import BackLink from '@/components/ui/BackLink'
import Photography from '@/components/Photography'
import { createPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = createPageMetadata(
  'Seoul, South Korea | Photography | Levent Kurtis',
  'A photographic journey through Seoul, South Korea - exploring tradition and modernity.'
)

export default function SeoulPage() {
  return (
    <>
      {/* Breadcrumb */}
      <div className="pt-6 px-4">
        <div className="max-w-5xl mx-auto">
          <BackLink href="/photography" label="All Albums" />
        </div>
      </div>

      <Photography />
    </>
  )
}
