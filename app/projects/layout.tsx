import Link from 'next/link'
import ThemeToggle from '@/components/ThemeToggle'

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <nav className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/"
              className="text-xl font-semibold text-accent hover:text-accent-dark transition-colors"
            >
              LK
            </Link>
            <div className="flex items-center gap-2">
              <Link
                href="/projects"
                className="text-sm text-muted hover:text-foreground transition-colors duration-200"
              >
                All Projects
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
        <Link href="/" className="hover:text-accent transition-colors">
          leventkurtis.com
        </Link>
      </footer>
    </div>
  )
}
