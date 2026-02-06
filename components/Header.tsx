'use client'

import { useState, useEffect } from 'react'
import { CONTACT } from '@/lib/constants'
import { DownloadIcon, MenuIcon } from './icons'

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Education', href: '#education' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#" className="text-xl font-semibold text-accent">
            LK
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-muted hover:text-foreground transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
            <a
              href={CONTACT.cvPath}
              download
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-background bg-accent hover:bg-accent-dark rounded-lg transition-colors duration-200"
            >
              <DownloadIcon className="w-4 h-4" />
              CV
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-muted hover:text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <MenuIcon isOpen={isMobileMenuOpen} />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block py-2 text-muted hover:text-foreground transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href={CONTACT.cvPath}
              download
              className="flex items-center justify-center gap-1.5 mt-4 px-4 py-2 text-sm font-medium text-background bg-accent hover:bg-accent-dark rounded-lg transition-colors duration-200"
            >
              <DownloadIcon className="w-4 h-4" />
              CV
            </a>
          </div>
        )}
      </nav>
    </header>
  )
}
