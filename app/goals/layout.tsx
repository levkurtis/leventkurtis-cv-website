import ContentLayout from '@/components/ContentLayout'

export default function GoalsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ContentLayout sectionName="All Goals" sectionLink="/goals">
      {children}
    </ContentLayout>
  )
}
