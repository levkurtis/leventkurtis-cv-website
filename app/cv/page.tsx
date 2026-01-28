import type { Metadata } from 'next'
import Link from 'next/link'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Experience from '@/components/Experience'
import Skills from '@/components/Skills'
import Certifications from '@/components/Certifications'
import Education from '@/components/Education'

export const metadata: Metadata = {
  title: 'CV | Levent Kurtis',
  description: 'Tech Leader at the Intersection of Data & AI, People, and Delivery. Senior Business Architecture Analyst at Accenture.',
  openGraph: {
    title: 'CV | Levent Kurtis',
    description: 'Tech Leader at the Intersection of Data & AI, People, and Delivery.',
    type: 'website',
  },
}

export default function CVPage() {
  return (
    <>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm">
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-xl font-semibold text-accent hover:text-accent-dark transition-colors">
              LK
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#about" className="text-sm text-muted hover:text-foreground transition-colors duration-200">
                About
              </a>
              <a href="#experience" className="text-sm text-muted hover:text-foreground transition-colors duration-200">
                Experience
              </a>
              <a href="#skills" className="text-sm text-muted hover:text-foreground transition-colors duration-200">
                Skills
              </a>
              <a href="#certifications" className="text-sm text-muted hover:text-foreground transition-colors duration-200">
                Certifications
              </a>
              <a href="#education" className="text-sm text-muted hover:text-foreground transition-colors duration-200">
                Education
              </a>
              <a
                href="/levent_kurtis_cv.pdf"
                download
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-background bg-accent hover:bg-accent-dark rounded-lg transition-colors duration-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                CV
              </a>
            </div>

            {/* Back to Home (mobile) */}
            <Link
              href="/"
              className="md:hidden text-sm text-muted hover:text-foreground transition-colors"
            >
              Home
            </Link>
          </div>
        </nav>
      </header>

      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Certifications />
        <Education />
      </main>

      {/* Footer */}
      <footer className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <a
              href="mailto:levkurtis@gmail.com"
              className="flex items-center gap-2 text-muted hover:text-accent transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>levkurtis@gmail.com</span>
            </a>

            <span className="text-muted/50">•</span>

            <a
              href="https://linkedin.com/in/leventkurtis"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted hover:text-accent transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <span>LinkedIn</span>
            </a>

            <span className="text-muted/50">•</span>

            <Link
              href="/"
              className="text-muted hover:text-accent transition-colors duration-200"
            >
              leventkurtis.com
            </Link>
          </div>
        </div>
      </footer>
    </>
  )
}
