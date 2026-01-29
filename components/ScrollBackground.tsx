'use client'

import { useEffect, useRef } from 'react'
import { useTheme } from '@/lib/theme-context'

export default function ScrollBackground() {
  const bgRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    let ticking = false

    const updateBackground = () => {
      if (!bgRef.current) return

      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = window.scrollY
      const progress = scrollHeight > 0 ? Math.min(scrolled / scrollHeight, 1) : 0

      let r, g, b

      if (theme === 'dark') {
        // Dark mode: Interpolate from #21212f (start) to #0d0d14 (end)
        // Start: R:33, G:33, B:47
        // End: R:13, G:13, B:20
        r = Math.round(33 - (33 - 13) * progress)
        g = Math.round(33 - (33 - 13) * progress)
        b = Math.round(47 - (47 - 20) * progress)
      } else {
        // Light mode: Interpolate from #f8f7f4 (start) to #e8e7e4 (end)
        // Start: R:248, G:247, B:244
        // End: R:232, G:231, B:228
        r = Math.round(248 - (248 - 232) * progress)
        g = Math.round(247 - (247 - 231) * progress)
        b = Math.round(244 - (244 - 228) * progress)
      }

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
  }, [theme])

  const initialColor = theme === 'dark' ? 'rgb(33, 33, 47)' : 'rgb(248, 247, 244)'

  return (
    <div
      ref={bgRef}
      className="fixed inset-0 -z-10"
      style={{ backgroundColor: initialColor }}
    />
  )
}
