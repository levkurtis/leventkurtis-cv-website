import { loadAllContent, normalizeDate, normalizeDateOptional } from './content-loader'
import { type Goal, type GoalStatus, type GoalCategory, categoryOrder, statusOrder } from './goal-types'

// Re-export types and config for server-side usage
export * from './goal-types'

export function getAllGoals(): Goal[] {
  const allGoals = loadAllContent<Goal>(
    'content/goals',
    (data, slug, content) => ({
      slug,
      content,
      title: (data.title as string) || slug,
      description: (data.description as string) || '',
      category: (data.category as GoalCategory) || 'life',
      status: (data.status as GoalStatus) || 'Not Started',
      date: normalizeDate(data.date),
      priority: data.priority as number | undefined,
      tags: (data.tags as string[]) || [],
      targetDate: normalizeDateOptional(data.targetDate),
      completedDate: normalizeDateOptional(data.completedDate),
      link: data.link as string | undefined,
      projectSlugs: (data.projectSlugs as string[]) || [],
    })
  )

  // Sort by category order, then status order, then priority (high to low), then date (newest first)
  return allGoals.sort((a, b) => {
    // Category order first
    const aCatOrder = categoryOrder.indexOf(a.category)
    const bCatOrder = categoryOrder.indexOf(b.category)
    if (aCatOrder !== bCatOrder) return aCatOrder - bCatOrder

    // Then by status order
    const aStatusOrder = statusOrder.indexOf(a.status)
    const bStatusOrder = statusOrder.indexOf(b.status)
    if (aStatusOrder !== bStatusOrder) return aStatusOrder - bStatusOrder

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
