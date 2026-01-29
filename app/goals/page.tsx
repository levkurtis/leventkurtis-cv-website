import type { Metadata } from 'next'
import { getAllGoals } from '@/lib/goals'
import GoalsClient from '@/components/GoalsClient'

export const metadata: Metadata = {
  title: 'Goals | Levent Kurtis',
  description: 'Goals, reading list, and life tracking by Levent Kurtis.',
  openGraph: {
    title: 'Goals | Levent Kurtis',
    description: 'Goals, reading list, and life tracking by Levent Kurtis.',
    type: 'website',
  },
}

export default function GoalsPage() {
  const goals = getAllGoals()

  return <GoalsClient goals={goals} />
}
