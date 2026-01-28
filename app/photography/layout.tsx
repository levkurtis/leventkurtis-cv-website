import Link from 'next/link'

export default function PhotographyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#f8f7f4] text-[#1a1a1a]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#f8f7f4]/95 backdrop-blur-sm border-b border-[#e5e5e5]">
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/"
              className="text-xl font-semibold text-[#1a1a1a] hover:text-[#666] transition-colors"
            >
              LK
            </Link>
            <Link
              href="/photography"
              className="text-sm text-[#666] hover:text-[#1a1a1a] transition-colors duration-200"
            >
              All Albums
            </Link>
          </div>
        </nav>
      </header>

      <main className="pt-16">
        {children}
      </main>

      {/* Footer */}
      <footer className="py-8 px-4 text-center text-sm text-[#999] border-t border-[#e5e5e5]">
        <Link href="/" className="hover:text-[#1a1a1a] transition-colors">
          leventkurtis.com
        </Link>
      </footer>
    </div>
  )
}
