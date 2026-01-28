import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { type Project, type ProjectStatus } from './project-types'

// Re-export types and config for server-side usage
export * from './project-types'

const projectsDirectory = path.join(process.cwd(), 'content/projects')

export function getAllProjects(): Project[] {
  // Check if directory exists
  if (!fs.existsSync(projectsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(projectsDirectory)
  const allProjects = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '')
      const fullPath = path.join(projectsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      // Ensure date is a string (gray-matter may parse it as Date object)
      const dateValue = data.date instanceof Date
        ? data.date.toISOString().split('T')[0]
        : data.date || new Date().toISOString().split('T')[0]

      return {
        slug,
        content,
        title: data.title || slug,
        description: data.description || '',
        status: (data.status as ProjectStatus) || 'Pending',
        date: dateValue,
        tags: data.tags || [],
        coverImage: data.coverImage,
      }
    })

  // Sort by date (newest first)
  return allProjects.sort((a, b) => (a.date > b.date ? -1 : 1))
}

export function getProjectBySlug(slug: string): Project | null {
  const fullPath = path.join(projectsDirectory, `${slug}.md`)

  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  // Ensure date is a string (gray-matter may parse it as Date object)
  const dateValue = data.date instanceof Date
    ? data.date.toISOString().split('T')[0]
    : data.date || new Date().toISOString().split('T')[0]

  return {
    slug,
    content,
    title: data.title || slug,
    description: data.description || '',
    status: (data.status as ProjectStatus) || 'Pending',
    date: dateValue,
    tags: data.tags || [],
    coverImage: data.coverImage,
  }
}

export function getAllProjectSlugs(): string[] {
  if (!fs.existsSync(projectsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(projectsDirectory)
  return fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => fileName.replace(/\.md$/, ''))
}
