import Link from 'next/link'
import ThemeToggle from '@/components/ThemeToggle'

type ContentLayoutProps = {
  children: React.ReactNode
  sectionName: string
  sectionLink: string
  maxWidth?: 'max-w-5xl' | 'max-w-6xl'
  variant?: 'accent' | 'foreground'
}

export default function ContentLayout({
  children,
  sectionName,
  sectionLink,
  maxWidth = 'max-w-5xl',
  variant = 'accent',
}: ContentLayoutProps) {
  const lkClass = variant === 'accent'
    ? 'text-accent hover:text-accent-dark'
    : 'text-foreground hover:text-muted'
  const footerLinkClass = variant === 'accent'
    ? 'hover:text-accent'
    : 'hover:text-foreground'

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <nav className={`${maxWidth} mx-auto px-4 sm:px-6 lg:px-8`}>
          <div className="flex items-center justify-between h-16">
            <Link
              href="/"
              className={`text-xl font-semibold transition-colors ${lkClass}`}
            >
              LK
            </Link>
            <div className="flex items-center gap-2">
              <Link
                href={sectionLink}
                className="text-sm text-muted hover:text-foreground transition-colors duration-200"
              >
                {sectionName}
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </nav>
      </header>

      <main className="pt-16">
        {children}
      </main>

      {/* Footer */}
      <footer className="py-8 px-4 text-center text-sm text-muted border-t border-border">
        <Link href="/" className={`transition-colors ${footerLinkClass}`}>
          leventkurtis.com
        </Link>
      </footer>
    </div>
  )
}
