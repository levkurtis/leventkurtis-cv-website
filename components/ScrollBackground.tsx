'use client'

import { useEffect, useRef } from 'react'

export default function ScrollBackground() {
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ticking = false

    const updateBackground = () => {
      if (!bgRef.current) return

      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = window.scrollY
      const progress = scrollHeight > 0 ? Math.min(scrolled / scrollHeight, 1) : 0

      // Interpolate from #21212f (start) to #0d0d14 (end - very dark)
      // Start: R:33, G:33, B:47
      // End: R:13, G:13, B:20
      const r = Math.round(33 - (33 - 13) * progress)
      const g = Math.round(33 - (33 - 13) * progress)
      const b = Math.round(47 - (47 - 20) * progress)

      bgRef.current.style.backgroundColor = `rgb(${r}, ${g}, ${b})`
      ticking = false
    }

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateBackground)
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    updateBackground() // Initial call

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      ref={bgRef}
      className="fixed inset-0 -z-10"
      style={{ backgroundColor: 'rgb(33, 33, 47)' }}
    />
  )
}
