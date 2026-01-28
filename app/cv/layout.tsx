import ScrollBackground from '@/components/ScrollBackground'

export default function CVLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen text-foreground">
      <ScrollBackground />
      {children}
    </div>
  )
}
