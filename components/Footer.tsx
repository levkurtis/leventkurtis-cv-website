import { CONTACT } from '@/lib/constants'
import { EmailIcon, LinkedInIcon, DownloadIcon, CameraIcon } from './icons'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
          {/* Email */}
          <a
            href={`mailto:${CONTACT.email}`}
            className="flex items-center gap-2 text-muted hover:text-accent transition-colors duration-200"
          >
            <EmailIcon className="w-4 h-4" />
            <span>{CONTACT.email}</span>
          </a>

          <span className="text-muted/50">•</span>

          {/* LinkedIn */}
          <a
            href={CONTACT.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-muted hover:text-accent transition-colors duration-200"
          >
            <LinkedInIcon className="w-4 h-4" />
            <span>LinkedIn</span>
          </a>

          <span className="text-muted/50">•</span>

          {/* CV Download */}
          <a
            href={CONTACT.cvPath}
            download
            className="flex items-center gap-1.5 text-muted hover:text-accent transition-colors duration-200"
          >
            <DownloadIcon className="w-4 h-4" />
            <span>CV</span>
          </a>

          <span className="text-muted/50">•</span>

          {/* Photography */}
          <a
            href="/photography"
            className="flex items-center gap-1.5 text-muted hover:text-accent transition-colors duration-200"
          >
            <CameraIcon className="w-4 h-4" />
            <span>Photography</span>
          </a>

          <span className="text-muted/50">•</span>

          {/* Copyright */}
          <span className="text-muted">
            © {currentYear} {CONTACT.name}
          </span>
        </div>
      </div>
    </footer>
  )
}
