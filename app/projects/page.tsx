import type { Metadata } from 'next'
import { getAllProjects } from '@/lib/projects'
import ProjectsClient from '@/components/ProjectsClient'

export const metadata: Metadata = {
  title: 'Projects | Levent Kurtis',
  description: 'Projects, experiments, and writings by Levent Kurtis.',
  openGraph: {
    title: 'Projects | Levent Kurtis',
    description: 'Projects, experiments, and writings by Levent Kurtis.',
    type: 'website',
  },
}

export default function ProjectsPage() {
  const projects = getAllProjects()

  return <ProjectsClient projects={projects} />
}
