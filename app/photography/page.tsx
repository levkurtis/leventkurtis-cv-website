import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Photography | Levent Kurtis',
  description: 'A collection of moments captured through my lens - photography portfolio by Levent Kurtis.',
  openGraph: {
    title: 'Photography | Levent Kurtis',
    description: 'A collection of moments captured through my lens.',
    type: 'website',
  },
}

type Album = {
  slug: string
  title: string
  subtitle?: string
  thumbnail: string
  gradientColors: [string, string] // [primary, secondary] for gradient
}

const albums: Album[] = [
  {
    slug: 'seoul',
    title: 'Seoul',
    subtitle: 'South Korea',
    thumbnail: '/photography-portfolio/card1.jpg',
    gradientColors: ['#e8b4b8', '#a7c7e7'], // Soft pink to soft blue (Korean aesthetic)
  },
  // Future albums can be added here:
  // {
  //   slug: 'copenhagen',
  //   title: 'Copenhagen',
  //   subtitle: 'Denmark',
  //   thumbnail: '/photography-portfolio/future.jpg',
  //   gradientColors: ['#...', '#...'],
  // },
]

function AlbumCard({ album }: { album: Album }) {
  return (
    <Link href={`/photography/${album.slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
        {/* Gradient background - visible on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out"
          style={{
            background: `linear-gradient(135deg, ${album.gradientColors[0]} 0%, ${album.gradientColors[1]} 100%)`,
          }}
        />

        {/* Thumbnail image */}
        <div className="absolute inset-0 p-3 sm:p-4">
          <div className="relative w-full h-full overflow-hidden rounded-md shadow-lg group-hover:shadow-2xl transition-shadow duration-500">
            <Image
              src={album.thumbnail}
              alt={album.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
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
          {albums.map((album) => (
            <AlbumCard key={album.slug} album={album} />
          ))}
        </div>

        {/* Empty state hint for future */}
        {albums.length === 1 && (
          <p className="text-center text-muted mt-12 text-sm">
            More albums coming soon...
          </p>
        )}
      </div>
    </section>
  )
}
