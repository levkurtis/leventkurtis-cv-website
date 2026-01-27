'use client'

import { useEffect, useState } from 'react'

export default function ScrollBackground() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = window.scrollY
      const progress = Math.min(scrolled / scrollHeight, 1)
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial call

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Interpolate from #21212f (start) to #0d0d14 (end - very dark)
  // Start: R:33, G:33, B:47
  // End: R:13, G:13, B:20
  const r = Math.round(33 - (33 - 13) * scrollProgress)
  const g = Math.round(33 - (33 - 13) * scrollProgress)
  const b = Math.round(47 - (47 - 20) * scrollProgress)

  return (
    <div
      className="fixed inset-0 -z-10 transition-colors duration-300"
      style={{
        backgroundColor: `rgb(${r}, ${g}, ${b})`,
      }}
    />
  )
}
