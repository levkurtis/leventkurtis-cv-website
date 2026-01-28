'use client'

import { useEffect, useCallback } from 'react'
import Image from 'next/image'

export type LightboxImage = {
  src: string
  alt: string
  caption?: string
}

type LightboxProps = {
  images: LightboxImage[]
  currentIndex: number
  isOpen: boolean
  onClose: () => void
  onNavigate: (index: number) => void
}

export default function Lightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}: LightboxProps) {
  const currentImage = images[currentIndex]
  const hasMultipleImages = images.length > 1

  const goToPrevious = useCallback(() => {
    const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1
    onNavigate(newIndex)
  }, [currentIndex, images.length, onNavigate])

  const goToNext = useCallback(() => {
    const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1
    onNavigate(newIndex)
  }, [currentIndex, images.length, onNavigate])

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose()
          break
        case 'ArrowLeft':
          if (hasMultipleImages) goToPrevious()
          break
        case 'ArrowRight':
          if (hasMultipleImages) goToNext()
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, hasMultipleImages, goToPrevious, goToNext, onClose])

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen || !currentImage) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 text-white/70 hover:text-white transition-colors"
        aria-label="Close lightbox"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Image counter */}
      {hasMultipleImages && (
        <div className="absolute top-4 left-4 text-white/70 text-sm">
          {currentIndex + 1} / {images.length}
        </div>
      )}

      {/* Previous button */}
      {hasMultipleImages && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            goToPrevious()
          }}
          className="absolute left-4 z-10 p-2 text-white/70 hover:text-white transition-colors"
          aria-label="Previous image"
        >
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Image container */}
      <div
        className="relative max-w-[90vw] max-h-[85vh] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src={currentImage.src}
            alt={currentImage.alt}
            width={1920}
            height={1080}
            className="max-w-full max-h-[80vh] w-auto h-auto object-contain"
            priority
          />
        </div>

        {/* Caption */}
        {currentImage.caption && (
          <p className="mt-4 text-white/80 text-center text-sm sm:text-base max-w-2xl px-4">
            {currentImage.caption}
          </p>
        )}
      </div>

      {/* Next button */}
      {hasMultipleImages && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            goToNext()
          }}
          className="absolute right-4 z-10 p-2 text-white/70 hover:text-white transition-colors"
          aria-label="Next image"
        >
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Keyboard hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/40 text-xs hidden sm:block">
        {hasMultipleImages ? 'Use ← → to navigate, Esc to close' : 'Press Esc to close'}
      </div>
    </div>
  )
}
