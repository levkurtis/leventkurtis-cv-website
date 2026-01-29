import ScrollBackground from '@/components/ScrollBackground'
import ThemeToggle from '@/components/ThemeToggle'

export default function CVLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen text-foreground">
      <ScrollBackground />
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      {children}
    </div>
  )
}
