import { loadAllContent, loadContentBySlug, normalizeDate } from './content-loader'
import { type Project, type ProjectStatus, statusOrder } from './project-types'

// Re-export types and config for server-side usage
export * from './project-types'

export function getAllProjects(): Project[] {
  const allProjects = loadAllContent<Project>(
    'content/projects',
    (data, slug, content) => ({
      slug,
      content,
      title: (data.title as string) || slug,
      description: (data.description as string) || '',
      status: (data.status as ProjectStatus) || 'Pending',
      date: normalizeDate(data.date),
      tags: (data.tags as string[]) || [],
      coverImage: data.coverImage as string | undefined,
    })
  )

  // Sort by status order first, then by date (newest first)
  return allProjects.sort((a, b) => {
    const aStatusIndex = statusOrder.indexOf(a.status)
    const bStatusIndex = statusOrder.indexOf(b.status)
    if (aStatusIndex !== bStatusIndex) return aStatusIndex - bStatusIndex
    return a.date > b.date ? -1 : 1
  })
}

export function getProjectBySlug(slug: string): Project | null {
  return loadContentBySlug<Project>(
    'content/projects',
    slug,
    (data, slug, content) => ({
      slug,
      content,
      title: (data.title as string) || slug,
      description: (data.description as string) || '',
      status: (data.status as ProjectStatus) || 'Pending',
      date: normalizeDate(data.date),
      tags: (data.tags as string[]) || [],
      coverImage: data.coverImage as string | undefined,
    })
  )
}

export function getAllProjectSlugs(): string[] {
  return getAllProjects().map(p => p.slug)
}
