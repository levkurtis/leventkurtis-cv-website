import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export function loadAllContent<T>(
  dir: string,
  mapFrontmatter: (data: Record<string, unknown>, slug: string, content: string) => T
): T[] {
  const directory = path.join(process.cwd(), dir)

  if (!fs.existsSync(directory)) {
    return []
  }

  const fileNames = fs.readdirSync(directory)
  return fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '')
      const fullPath = path.join(directory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)
      return mapFrontmatter(data, slug, content)
    })
}

export function loadContentBySlug<T>(
  dir: string,
  slug: string,
  mapFrontmatter: (data: Record<string, unknown>, slug: string, content: string) => T
): T | null {
  const fullPath = path.join(process.cwd(), dir, `${slug}.md`)

  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  return mapFrontmatter(data, slug, content)
}

export function normalizeDate(value: unknown): string {
  if (value instanceof Date) {
    return value.toISOString().split('T')[0]
  }
  return (value as string) || new Date().toISOString().split('T')[0]
}

export function normalizeDateOptional(value: unknown): string | undefined {
  if (value === undefined || value === null) return undefined
  if (value instanceof Date) {
    return value.toISOString().split('T')[0]
  }
  return value as string
}
