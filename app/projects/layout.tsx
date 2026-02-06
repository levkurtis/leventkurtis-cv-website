import ContentLayout from '@/components/ContentLayout'

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ContentLayout sectionName="All Projects" sectionLink="/projects">
      {children}
    </ContentLayout>
  )
}
