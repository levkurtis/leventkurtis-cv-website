import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Levent Kurtis | Data & AI Leader',
  description: 'Personal website of Levent Kurtis - Tech Leader at the Intersection of Data & AI, People, and Delivery.',
  openGraph: {
    title: 'Levent Kurtis',
    description: 'Personal website of Levent Kurtis - Tech Leader at the Intersection of Data & AI, People, and Delivery.',
    type: 'website',
  },
}

type Section = {
  title: string
  description: string
  href: string
  icon: React.ReactNode
  available: boolean
}

const sections: Section[] = [
  {
    title: 'CV',
    description: 'My professional experience, skills, and certifications',
    href: '/cv',
    available: true,
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    title: 'Projects',
    description: 'Things I am building, writing about, and experimenting with',
    href: '/projects',
    available: true,
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    title: 'Photography',
    description: 'A collection of moments captured through my lens',
    href: '/photography',
    available: true,
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: 'Goals',
    description: 'What I am working towards',
    href: '/goals',
    available: true,
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
]

function SectionCard({ section }: { section: Section }) {
  if (!section.available) {
    return (
      <div className="group relative bg-card/50 border border-border/50 rounded-2xl p-8 opacity-50 cursor-not-allowed">
        <div className="text-muted mb-4">{section.icon}</div>
        <h2 className="text-xl font-semibold mb-2 text-foreground/50">{section.title}</h2>
        <p className="text-muted/70 text-sm">{section.description}</p>
        <span className="absolute top-4 right-4 text-xs text-muted bg-card px-2 py-1 rounded">
          Coming soon
        </span>
      </div>
    )
  }

  return (
    <Link
      href={section.href}
      className="group relative bg-card hover:bg-card-hover border border-border rounded-2xl p-8 transition-all duration-300 hover:shadow-lg hover:shadow-accent/5 hover:-translate-y-1"
    >
      <div className="text-accent mb-4 group-hover:scale-110 transition-transform duration-300">
        {section.icon}
      </div>
      <h2 className="text-xl font-semibold mb-2 text-foreground group-hover:text-accent transition-colors">
        {section.title}
      </h2>
      <p className="text-muted text-sm">{section.description}</p>
      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
    </Link>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Main Content */}
      <main className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Profile */}
          <div className="mb-8">
            <img
              src="/photo.jpg"
              alt="Levent Kurtis"
              className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-2 border-accent shadow-lg shadow-accent/20 mx-auto mb-6"
            />
            <h1 className="text-4xl sm:text-5xl font-bold mb-3">Levent Kurtis</h1>
            <p className="text-lg text-muted">
              Tech Leader at the Intersection of Data & AI, People, and Delivery
            </p>
          </div>

          {/* Contact Links */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <a
              href="mailto:levkurtis@gmail.com"
              className="flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              levkurtis@gmail.com
            </a>
            <span className="text-muted/30">•</span>
            <a
              href="https://linkedin.com/in/leventkurtis"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </a>
            <span className="text-muted/30">•</span>
            <span className="flex items-center gap-2 text-sm text-muted">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Copenhagen, Denmark
            </span>
          </div>

          {/* Section Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sections.map((section) => (
              <SectionCard key={section.title} section={section} />
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-muted">
        <p>© {new Date().getFullYear()} Levent Kurtis</p>
      </footer>
    </div>
  )
}
