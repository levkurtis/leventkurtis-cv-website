import ContentLayout from '@/components/ContentLayout'

export default function PhotographyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ContentLayout
      sectionName="All Albums"
      sectionLink="/photography"
      maxWidth="max-w-6xl"
      variant="foreground"
    >
      {children}
    </ContentLayout>
  )
}
