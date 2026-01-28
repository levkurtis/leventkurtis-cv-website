export type ProjectStatus = 'Done' | 'Ongoing' | 'Pending' | 'Paused' | 'Cancelled'

export type ProjectFrontmatter = {
  title: string
  description: string
  status: ProjectStatus
  date: string
  tags?: string[]
  coverImage?: string
}

export type Project = ProjectFrontmatter & {
  slug: string
  content: string
}

export const statusConfig: Record<ProjectStatus, { color: string; bgColor: string; description: string }> = {
  Done: {
    color: 'text-green-400',
    bgColor: 'bg-green-400/10 border-green-400/30',
    description: 'Project completed',
  },
  Ongoing: {
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/10 border-blue-400/30',
    description: 'Currently working on this',
  },
  Pending: {
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-400/10 border-yellow-400/30',
    description: 'Planned for the future',
  },
  Paused: {
    color: 'text-orange-400',
    bgColor: 'bg-orange-400/10 border-orange-400/30',
    description: 'Temporarily on hold',
  },
  Cancelled: {
    color: 'text-red-400',
    bgColor: 'bg-red-400/10 border-red-400/30',
    description: 'No longer pursuing',
  },
}
