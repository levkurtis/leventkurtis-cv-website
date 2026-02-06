'use client'

import { useState } from 'react'
import type { LightboxImage } from '@/components/Lightbox'

export function useLightbox(images: LightboxImage[]) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const openAtIndex = (index: number) => {
    setCurrentIndex(index)
    setIsOpen(true)
  }

  const openBySrc = (src: string) => {
    const index = images.findIndex((img) => img.src === src)
    if (index !== -1) {
      openAtIndex(index)
    }
  }

  const close = () => setIsOpen(false)

  return {
    isOpen,
    currentIndex,
    openAtIndex,
    openBySrc,
    close,
    onNavigate: setCurrentIndex,
  }
}
