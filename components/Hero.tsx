export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-16 px-4 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Profile Photo */}
        <div className="mb-6 flex justify-center">
          <img
            src="/photo.jpg"
            alt="Levent Kurtis"
            className="w-44 h-44 sm:w-52 sm:h-52 rounded-full object-cover border-3 border-accent shadow-lg shadow-accent/20"
          />
        </div>

        {/* Name and Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
          Levent Kurtis
        </h1>
        <p className="text-xl sm:text-2xl text-accent font-medium mb-6">
          Senior Business Architecture Analyst, Accenture
        </p>

        {/* Tagline */}
        <p className="text-lg sm:text-xl text-muted max-w-2xl mx-auto mb-8">
          Tech Leader at the Intersection of Data & AI, People, and Delivery
        </p>

        {/* Contact Links */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <a
            href="mailto:levkurtis@gmail.com"
            className="flex items-center gap-2 px-4 py-2 bg-card hover:bg-card-hover border border-border rounded-lg transition-colors duration-200"
          >
            <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="text-sm">levkurtis@gmail.com</span>
          </a>

          <a
            href="https://linkedin.com/in/leventkurtis"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-card hover:bg-card-hover border border-border rounded-lg transition-colors duration-200"
          >
            <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            <span className="text-sm">LinkedIn</span>
          </a>

          <span className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg">
            <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-sm text-muted">Copenhagen, Denmark</span>
          </span>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="/levent_kurtis_cv.pdf"
            download
            className="flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-dark text-background font-medium rounded-lg transition-colors duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            CV
          </a>
          <a
            href="#experience"
            className="px-6 py-3 bg-card hover:bg-card-hover border border-border rounded-lg transition-colors duration-200"
          >
            View Experience
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-16 animate-bounce">
          <svg className="w-6 h-6 mx-auto text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  )
}
