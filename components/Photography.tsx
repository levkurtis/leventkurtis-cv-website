'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Lightbox, { type LightboxImage } from './Lightbox'

type Spread =
  | { type: 'hero'; image: string; title: string; subtitle?: string }
  | { type: 'text-right'; image: string; title: string; text: string }
  | { type: 'text-left'; image: string; title: string; text: string }
  | { type: 'full-width'; image: string; caption?: string }
  | { type: 'grid-quote'; images: string[]; quote: string }
  | { type: 'duo'; images: [string, string]; caption?: string }

// Seoul, South Korea album
const seoulSpreads: Spread[] = [
  {
    type: 'hero',
    image: '/photography-portfolio/card1.jpg',
    title: 'Seoul, South Korea',
    subtitle: 'A journey through tradition and modernity',
  },
  {
    type: 'text-right',
    image: '/photography-portfolio/card2.jpg',
    title: 'First Impressions',
    text: 'Landing in Seoul feels like stepping into the future while being surrounded by centuries of history. The city pulses with an energy that is uniquely Korean.',
  },
  {
    type: 'duo',
    images: ['/photography-portfolio/card3.jpg', '/photography-portfolio/card4.jpg'],
    caption: 'Where ancient palaces meet neon lights',
  },
  {
    type: 'text-left',
    image: '/photography-portfolio/card5.jpg',
    title: 'Street Life',
    text: 'The streets of Seoul tell their own stories. From the bustling markets of Myeongdong to the quiet alleys of Bukchon, every corner reveals something unexpected.',
  },
  {
    type: 'full-width',
    image: '/photography-portfolio/card6.jpg',
    caption: 'Golden hour over the Han River',
  },
  {
    type: 'grid-quote',
    images: [
      '/photography-portfolio/card7.jpg',
      '/photography-portfolio/card8.jpg',
      '/photography-portfolio/card9.jpg',
      '/photography-portfolio/card10.jpg',
    ],
    quote: 'In Seoul, tradition is not preserved — it is lived',
  },
  {
    type: 'text-right',
    image: '/photography-portfolio/card11.jpg',
    title: 'Temple Mornings',
    text: 'Waking up early to visit the temples before the crowds. The silence, broken only by distant chanting, creates a sense of peace that stays with you.',
  },
  {
    type: 'duo',
    images: ['/photography-portfolio/card12.jpg', '/photography-portfolio/card13.jpg'],
    caption: 'Details in the architecture',
  },
  {
    type: 'full-width',
    image: '/photography-portfolio/card14.jpg',
  },
  {
    type: 'text-left',
    image: '/photography-portfolio/card15.jpg',
    title: 'Night Falls',
    text: 'As darkness settles, Seoul transforms. The city lights up in ways that make you understand why they call it the city that never sleeps.',
  },
  {
    type: 'grid-quote',
    images: [
      '/photography-portfolio/card16.jpg',
      '/photography-portfolio/card17.jpg',
      '/photography-portfolio/card18.jpg',
      '/photography-portfolio/card19.jpg',
    ],
    quote: 'Every photograph is a memory I can revisit',
  },
  {
    type: 'full-width',
    image: '/photography-portfolio/card20.jpg',
    caption: 'Until next time, Seoul',
  },
]

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
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const allImages = useMemo(() => getAllImages(seoulSpreads), [])

  const handleImageClick = (src: string) => {
    const index = allImages.findIndex((img) => img.src === src)
    if (index !== -1) {
      setLightboxIndex(index)
      setLightboxOpen(true)
    }
  }

  return (
    <>
      <section className="py-12 sm:py-20 px-4">
        <div className="max-w-5xl mx-auto">
          {seoulSpreads.map((spread, index) => (
            <SpreadRenderer key={index} spread={spread} onImageClick={handleImageClick} />
          ))}
        </div>
      </section>

      <Lightbox
        images={allImages}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={setLightboxIndex}
      />
    </>
  )
}
