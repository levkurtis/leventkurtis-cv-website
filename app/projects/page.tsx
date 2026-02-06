import type { Metadata } from 'next'
import { getAllProjects } from '@/lib/projects'
import { createPageMetadata } from '@/lib/metadata'
import ProjectsClient from '@/components/ProjectsClient'

export const metadata: Metadata = createPageMetadata(
  'Projects | Levent Kurtis',
  'Projects, experiments, and writings by Levent Kurtis.'
)

export default function ProjectsPage() {
  const projects = getAllProjects()

  return <ProjectsClient projects={projects} />
}
