'use client'

import { useMemo } from 'react'
import Image from 'next/image'
import Lightbox, { type LightboxImage } from './Lightbox'
import { useLightbox } from '@/hooks/useLightbox'
import { seoulSpreads, type Spread } from '@/lib/photography-data'

// Extract all images from spreads for lightbox navigation
function getAllImages(spreads: Spread[]): LightboxImage[] {
  const images: LightboxImage[] = []

  spreads.forEach((spread) => {
    switch (spread.type) {
      case 'hero':
        images.push({ src: spread.image, alt: spread.title, caption: spread.subtitle })
        break
      case 'text-right':
      case 'text-left':
        images.push({ src: spread.image, alt: spread.title })
        break
      case 'full-width':
        images.push({ src: spread.image, alt: spread.caption || 'Photography', caption: spread.caption })
        break
      case 'grid-quote':
        spread.images.forEach((img, i) => images.push({ src: img, alt: `Seoul ${i + 1}` }))
        break
      case 'duo':
        spread.images.forEach((img, i) => images.push({ src: img, alt: spread.caption || `Photo ${i + 1}`, caption: spread.caption }))
        break
    }
  })

  return images
}

type ClickableImageProps = {
  src: string
  alt: string
  fill?: boolean
  sizes: string
  className?: string
  priority?: boolean
  onClick: () => void
}

function ClickableImage({ src, alt, fill, sizes, className, priority, onClick }: ClickableImageProps) {
  return (
    <div className="cursor-pointer" onClick={onClick}>
      {fill ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className={className}
          priority={priority}
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={800}
          sizes={sizes}
          className={className}
          priority={priority}
        />
      )}
    </div>
  )
}

function HeroSpread({ spread, onImageClick }: { spread: Extract<Spread, { type: 'hero' }>; onImageClick: (src: string) => void }) {
  return (
    <div className="mb-16">
      <div
        className="relative aspect-[16/9] w-full overflow-hidden rounded-xl cursor-pointer group"
        onClick={() => onImageClick(spread.image)}
      >
        <Image
          src={spread.image}
          alt={spread.title}
          fill
          sizes="100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority
          quality={70}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <h3 className="text-3xl md:text-5xl font-bold mb-2 text-white">{spread.title}</h3>
          {spread.subtitle && (
            <p className="text-lg md:text-xl text-white/80">{spread.subtitle}</p>
          )}
        </div>
      </div>
    </div>
  )
}

function TextRightSpread({ spread, onImageClick }: { spread: Extract<Spread, { type: 'text-right' }>; onImageClick: (src: string) => void }) {
  return (
    <div className="mb-16 grid md:grid-cols-2 gap-8 items-center">
      <div
        className="relative aspect-[4/5] overflow-hidden rounded-xl shadow-lg cursor-pointer group"
        onClick={() => onImageClick(spread.image)}
      >
        <Image
          src={spread.image}
          alt={spread.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          quality={70}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col justify-center">
        <h4 className="text-2xl md:text-3xl font-semibold mb-4 text-foreground">{spread.title}</h4>
        <p className="text-lg leading-relaxed text-muted">{spread.text}</p>
      </div>
    </div>
  )
}

function TextLeftSpread({ spread, onImageClick }: { spread: Extract<Spread, { type: 'text-left' }>; onImageClick: (src: string) => void }) {
  return (
    <div className="mb-16 grid md:grid-cols-2 gap-8 items-center">
      <div className="flex flex-col justify-center order-2 md:order-1">
        <h4 className="text-2xl md:text-3xl font-semibold mb-4 text-foreground">{spread.title}</h4>
        <p className="text-lg leading-relaxed text-muted">{spread.text}</p>
      </div>
      <div
        className="relative aspect-[4/5] overflow-hidden rounded-xl shadow-lg order-1 md:order-2 cursor-pointer group"
        onClick={() => onImageClick(spread.image)}
      >
        <Image
          src={spread.image}
          alt={spread.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          quality={70}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
    </div>
  )
}

function FullWidthSpread({ spread, onImageClick }: { spread: Extract<Spread, { type: 'full-width' }>; onImageClick: (src: string) => void }) {
  return (
    <div className="mb-16">
      <div
        className="relative aspect-[21/9] w-full overflow-hidden rounded-xl shadow-lg cursor-pointer group"
        onClick={() => onImageClick(spread.image)}
      >
        <Image
          src={spread.image}
          alt={spread.caption || 'Photography'}
          fill
          sizes="100vw"
          quality={70}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      {spread.caption && (
        <p className="mt-4 text-center text-muted italic">{spread.caption}</p>
      )}
    </div>
  )
}

function GridQuoteSpread({ spread, onImageClick }: { spread: Extract<Spread, { type: 'grid-quote' }>; onImageClick: (src: string) => void }) {
  return (
    <div className="mb-16">
      <div className="grid grid-cols-2 gap-4 mb-6">
        {spread.images.slice(0, 2).map((img, i) => (
          <div
            key={i}
            className="relative aspect-square overflow-hidden rounded-xl shadow-lg cursor-pointer group"
            onClick={() => onImageClick(img)}
          >
            <Image
              src={img}
              alt={`Grid image ${i + 1}`}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              quality={70}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        ))}
      </div>
      <blockquote className="text-center py-8 px-4">
        <p className="text-2xl md:text-3xl font-light italic text-foreground">&ldquo;{spread.quote}&rdquo;</p>
      </blockquote>
      <div className="grid grid-cols-2 gap-4">
        {spread.images.slice(2, 4).map((img, i) => (
          <div
            key={i}
            className="relative aspect-square overflow-hidden rounded-xl shadow-lg cursor-pointer group"
            onClick={() => onImageClick(img)}
          >
            <Image
              src={img}
              alt={`Grid image ${i + 3}`}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              quality={70}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

function DuoSpread({ spread, onImageClick }: { spread: Extract<Spread, { type: 'duo' }>; onImageClick: (src: string) => void }) {
  return (
    <div className="mb-16">
      <div className="grid md:grid-cols-2 gap-4">
        {spread.images.map((img, i) => (
          <div
            key={i}
            className="relative aspect-[4/5] overflow-hidden rounded-xl shadow-lg cursor-pointer group"
            onClick={() => onImageClick(img)}
          >
            <Image
              src={img}
              alt={`Duo image ${i + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={70}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        ))}
      </div>
      {spread.caption && (
        <p className="mt-4 text-center text-muted italic">{spread.caption}</p>
      )}
    </div>
  )
}

function SpreadRenderer({ spread, onImageClick }: { spread: Spread; onImageClick: (src: string) => void }) {
  switch (spread.type) {
    case 'hero':
      return <HeroSpread spread={spread} onImageClick={onImageClick} />
    case 'text-right':
      return <TextRightSpread spread={spread} onImageClick={onImageClick} />
    case 'text-left':
      return <TextLeftSpread spread={spread} onImageClick={onImageClick} />
    case 'full-width':
      return <FullWidthSpread spread={spread} onImageClick={onImageClick} />
    case 'grid-quote':
      return <GridQuoteSpread spread={spread} onImageClick={onImageClick} />
    case 'duo':
      return <DuoSpread spread={spread} onImageClick={onImageClick} />
    default:
      return null
  }
}

export default function Photography() {
  const allImages = useMemo(() => getAllImages(seoulSpreads), [])
  const lightbox = useLightbox(allImages)

  return (
    <>
      <section className="py-12 sm:py-20 px-4">
        <div className="max-w-5xl mx-auto">
          {seoulSpreads.map((spread, index) => (
            <SpreadRenderer key={index} spread={spread} onImageClick={lightbox.openBySrc} />
          ))}
        </div>
      </section>

      <Lightbox
        images={allImages}
        currentIndex={lightbox.currentIndex}
        isOpen={lightbox.isOpen}
        onClose={lightbox.close}
        onNavigate={lightbox.onNavigate}
      />
    </>
  )
}
