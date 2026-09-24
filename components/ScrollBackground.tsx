'use client'

import { useEffect, useRef } from 'react'

/**
 * Darkens the page background from #21212f to #0d0d14 as you scroll.
 *
 * Implemented as an opacity fade of a dark overlay rather than by animating
 * background-color. Compositing an opacity change avoids repainting the whole
 * viewport on every frame, which keeps scrolling off the main thread's critical
 * path. Blending #0d0d14 at opacity p over #21212f is the same sRGB
 * interpolation the previous colour-lerp produced, so it looks identical.
 */
export default function ScrollBackground() {
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ticking = false

    const update = () => {
      const overlay = overlayRef.current
      if (overlay) {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight
        const progress = scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0
        overlay.style.opacity = String(progress)
      }
      ticking = false
    }

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update)
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })
    update()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  return (
    <div className="fixed inset-0 -z-10 bg-background" aria-hidden="true">
      <div
        ref={overlayRef}
        className="absolute inset-0 will-change-[opacity]"
        style={{ backgroundColor: '#0d0d14', opacity: 0 }}
      />
    </div>
  )
}
