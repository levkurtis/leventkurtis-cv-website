export type GoalStatus = 'Not Started' | 'In Progress' | 'Complete'

export type GoalCategory = 'focus' | 'career' | 'reading' | 'life' | 'movies'

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
  rating?: number
  // Reading specific
  author?: string
  // Movie specific
  director?: string
  year?: number
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

export const categoryConfig: Record<GoalCategory, { label: string; description: string; color: string }> = {
  focus: {
    label: 'Currently Working On',
    description: 'Active focus areas right now',
    color: 'text-orange-400',
  },
  career: {
    label: 'Career',
    description: 'Professional milestones and certifications',
    color: 'text-purple-400',
  },
  reading: {
    label: 'Reading List',
    description: 'Books to read and have read',
    color: 'text-amber-400',
  },
  life: {
    label: 'Life Goals',
    description: 'Personal achievements and milestones',
    color: 'text-emerald-400',
  },
  movies: {
    label: 'Movie List',
    description: 'Films to watch and have watched',
    color: 'text-rose-400',
  },
}

export const categoryOrder: GoalCategory[] = ['focus', 'career', 'reading', 'life', 'movies']
