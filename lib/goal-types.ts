export type GoalStatus = 'Not Started' | 'In Progress' | 'Complete'

export type GoalCategory = 'focus' | 'career' | 'life'

export type GoalFrontmatter = {
  title: string
  description: string
  category: GoalCategory
  status: GoalStatus
  date: string
  priority?: number
  tags?: string[]
  targetDate?: string
  completedDate?: string
  link?: string
  projectSlugs?: string[] // Links to related projects
}

export type Goal = GoalFrontmatter & {
  slug: string
  content: string
}

export const statusConfig: Record<GoalStatus, { color: string; bgColor: string; description: string }> = {
  'Not Started': {
    color: 'text-gray-400',
    bgColor: 'bg-gray-400/10 border-gray-400/30',
    description: 'Planned but not yet started',
  },
  'In Progress': {
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/10 border-blue-400/30',
    description: 'Currently working on this',
  },
  'Complete': {
    color: 'text-green-400',
    bgColor: 'bg-green-400/10 border-green-400/30',
    description: 'Goal achieved!',
  },
}

export const statusOrder: GoalStatus[] = ['In Progress', 'Not Started', 'Complete']

export const categoryConfig: Record<GoalCategory, { label: string; description: string; color: string }> = {
  focus: {
    label: 'Technical',
    description: 'Technical skills and learning goals',
    color: 'text-orange-400',
  },
  career: {
    label: 'Career',
    description: 'Professional milestones and certifications',
    color: 'text-purple-400',
  },
  life: {
    label: 'Life Goals',
    description: 'Personal achievements and milestones',
    color: 'text-emerald-400',
  },
}

export const categoryOrder: GoalCategory[] = ['focus', 'career', 'life']
