import { CONTACT } from '@/lib/constants'
import { EmailIcon, LinkedInIcon, LocationIcon, DownloadIcon, ScrollArrowIcon } from './icons'

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
            alt={CONTACT.name}
            className="w-44 h-44 sm:w-52 sm:h-52 rounded-full object-cover border-3 border-accent shadow-lg shadow-accent/20"
          />
        </div>

        {/* Name and Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
          {CONTACT.name}
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
            href={`mailto:${CONTACT.email}`}
            className="flex items-center gap-2 px-4 py-2 bg-card hover:bg-card-hover border border-border rounded-lg transition-colors duration-200"
          >
            <EmailIcon className="w-5 h-5 text-accent" />
            <span className="text-sm">{CONTACT.email}</span>
          </a>

          <a
            href={CONTACT.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-card hover:bg-card-hover border border-border rounded-lg transition-colors duration-200"
          >
            <LinkedInIcon className="w-5 h-5 text-accent" />
            <span className="text-sm">LinkedIn</span>
          </a>

          <span className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg">
            <LocationIcon className="w-5 h-5 text-accent" />
            <span className="text-sm text-muted">{CONTACT.location}</span>
          </span>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href={CONTACT.cvPath}
            download
            className="flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-dark text-background font-medium rounded-lg transition-colors duration-200"
          >
            <DownloadIcon className="w-5 h-5" />
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
          <ScrollArrowIcon className="w-6 h-6 mx-auto text-muted" />
        </div>
      </div>
    </section>
  )
}
