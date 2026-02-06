import type { Metadata } from 'next'
import { getAllGoals } from '@/lib/goals'
import { createPageMetadata } from '@/lib/metadata'
import GoalsClient from '@/components/GoalsClient'

export const metadata: Metadata = createPageMetadata(
  'Goals | Levent Kurtis',
  'Goals, reading list, and life tracking by Levent Kurtis.'
)

export default function GoalsPage() {
  const goals = getAllGoals()

  return <GoalsClient goals={goals} />
}
