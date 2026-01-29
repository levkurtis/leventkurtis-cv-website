import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { type Goal, type GoalStatus, type GoalCategory, categoryOrder } from './goal-types'

// Re-export types and config for server-side usage
export * from './goal-types'

const goalsDirectory = path.join(process.cwd(), 'content/goals')

export function getAllGoals(): Goal[] {
  // Check if directory exists
  if (!fs.existsSync(goalsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(goalsDirectory)
  const allGoals = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '')
      const fullPath = path.join(goalsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      // Ensure date is a string (gray-matter may parse it as Date object)
      const dateValue = data.date instanceof Date
        ? data.date.toISOString().split('T')[0]
        : data.date || new Date().toISOString().split('T')[0]

      const targetDateValue = data.targetDate instanceof Date
        ? data.targetDate.toISOString().split('T')[0]
        : data.targetDate

      const completedDateValue = data.completedDate instanceof Date
        ? data.completedDate.toISOString().split('T')[0]
        : data.completedDate

      return {
        slug,
        content,
        title: data.title || slug,
        description: data.description || '',
        category: (data.category as GoalCategory) || 'life',
        status: (data.status as GoalStatus) || 'Not Started',
        date: dateValue,
        priority: data.priority,
        tags: data.tags || [],
        targetDate: targetDateValue,
        completedDate: completedDateValue,
        link: data.link,
        rating: data.rating,
        author: data.author,
        director: data.director,
        year: data.year,
      }
    })

  // Sort by category order, then priority (high to low), then date (newest first)
  return allGoals.sort((a, b) => {
    // Category order first
    const aOrder = categoryOrder.indexOf(a.category)
    const bOrder = categoryOrder.indexOf(b.category)
    if (aOrder !== bOrder) return aOrder - bOrder

    // Then by priority (higher first)
    const aPriority = a.priority || 0
    const bPriority = b.priority || 0
    if (aPriority !== bPriority) return bPriority - aPriority

    // Then by date (newest first)
    return a.date > b.date ? -1 : 1
  })
}

export function getGoalsByCategory(category: GoalCategory): Goal[] {
  return getAllGoals().filter(goal => goal.category === category)
}

export function getGoalsByStatus(status: GoalStatus): Goal[] {
  return getAllGoals().filter(goal => goal.status === status)
}
