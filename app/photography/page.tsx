import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { albums, type Album } from '@/lib/photography-data'
import { createPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = createPageMetadata(
  'Photography | Levent Kurtis',
  'A collection of moments captured through my lens - photography portfolio by Levent Kurtis.'
)

function AlbumCard({ album, priority }: { album: Album; priority?: boolean }) {
  return (
    <Link href={`/photography/${album.slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
        {/* Thumbnail image */}
        <div className="absolute inset-0">
          <Image
            src={album.thumbnail}
            alt={album.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={priority}
            quality={70}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
          <div className="bg-card/90 backdrop-blur-sm rounded-lg px-4 py-3 shadow-sm">
            <h3 className="text-lg sm:text-xl font-semibold text-foreground">
              {album.title}
            </h3>
            {album.subtitle && (
              <p className="text-sm text-muted">{album.subtitle}</p>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default function PhotographyPage() {
  return (
    <section className="py-12 sm:py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
            Photography
          </h1>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            A collection of moments captured through my lens while exploring the world.
          </p>
        </div>

        {/* Album Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {albums.map((album, index) => (
            <AlbumCard key={album.slug} album={album} priority={index < 3} />
          ))}
        </div>

      </div>
    </section>
  )
}
