'use client'

import { useState } from 'react'
import Image from 'next/image'
import Lightbox, { type LightboxImage } from './Lightbox'

type PhotoGalleryProps = {
  title: string
  subtitle?: string
  photos: string[]
  basePath: string
}

export default function PhotoGallery({ title, subtitle, photos, basePath }: PhotoGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const images: LightboxImage[] = photos.map((photo, i) => ({
    src: `${basePath}/${photo}`,
    alt: `${title} photo ${i + 1}`,
  }))

  const handleImageClick = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  return (
    <>
      <section className="py-12 sm:py-20 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Hero */}
          <div className="mb-12 text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
              {title}
            </h1>
            {subtitle && (
              <p className="text-lg text-muted max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {photos.map((photo, index) => (
              <div
                key={photo}
                className="relative aspect-[4/5] overflow-hidden rounded-xl shadow-lg cursor-pointer group"
                onClick={() => handleImageClick(index)}
              >
                <Image
                  src={`${basePath}/${photo}`}
                  alt={`${title} photo ${index + 1}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Lightbox
        images={images}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={setLightboxIndex}
      />
    </>
  )
}
