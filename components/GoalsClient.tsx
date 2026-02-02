'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import {
  statusConfig,
  statusOrder,
  categoryConfig,
  categoryOrder,
  type GoalStatus,
  type GoalCategory,
  type Goal,
} from '@/lib/goal-types'

function StatusBadge({ status, interactive = false, active = false, onClick }: {
  status: GoalStatus
  interactive?: boolean
  active?: boolean
  onClick?: () => void
}) {
  const config = statusConfig[status]

  const baseClasses = `inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full border ${config.bgColor} ${config.color}`
  const interactiveClasses = interactive
    ? `cursor-pointer transition-all duration-200 ${active ? 'ring-2 ring-offset-2 ring-offset-background ring-current' : 'opacity-60 hover:opacity-100'}`
    : ''

  return (
    <button
      type="button"
      className={`${baseClasses} ${interactiveClasses}`}
      title={config.description}
      onClick={onClick}
      disabled={!interactive}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {status}
    </button>
  )
}

function CategoryTab({ category, active, count, onClick }: {
  category: GoalCategory
  active: boolean
  count: number
  onClick: () => void
}) {
  const config = categoryConfig[category]
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200
        ${active
          ? 'bg-accent/20 text-accent border border-accent/30'
          : 'text-muted hover:text-foreground hover:bg-card border border-transparent'
        }`}
    >
      {config.label}
      <span className="ml-2 text-xs opacity-60">({count})</span>
    </button>
  )
}

function GoalCard({ goal, expanded, onToggle }: {
  goal: Goal
  expanded: boolean
  onToggle: () => void
}) {
  const hasContent = goal.content.trim().length > 0

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't toggle if clicking on a link or button
    const target = e.target as HTMLElement
    if (target.closest('a') || target.closest('button')) {
      return
    }
    if (hasContent) {
      onToggle()
    }
  }

  return (
    <div
      className={`bg-card hover:bg-card-hover border border-border rounded-xl p-5 transition-all duration-300 ${hasContent ? 'cursor-pointer' : ''}`}
      onClick={handleCardClick}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-4 mb-2">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground">
            {goal.link ? (
              <a
                href={goal.link}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                {goal.title}
                <span className="ml-1 text-xs opacity-60">↗</span>
              </a>
            ) : (
              goal.title
            )}
          </h3>
        </div>
        <StatusBadge status={goal.status} />
      </div>

      {/* Description */}
      <p className="text-muted text-sm mb-3">{goal.description}</p>

      {/* Meta row */}
      <div className="flex items-center justify-between text-xs text-muted/70">
        <div className="flex items-center gap-4">
          {goal.targetDate && goal.status !== 'Complete' && (
            <span>Target: {goal.targetDate}</span>
          )}
          {goal.completedDate && (
            <span>Completed: {goal.completedDate}</span>
          )}
          {goal.projectSlugs && goal.projectSlugs.length > 0 && (
            <div className="flex items-center gap-2">
              <span>Projects:</span>
              {goal.projectSlugs.map((slug, index) => (
                <Link
                  key={slug}
                  href={`/projects/${slug}`}
                  className="text-accent hover:text-accent-dark transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  {slug}{index < goal.projectSlugs!.length - 1 ? ',' : ''}
                </Link>
              ))}
            </div>
          )}
        </div>

        {hasContent && (
          <span className="text-accent flex items-center gap-1">
            {expanded ? (
              <>
                <span>Less</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </>
            ) : (
              <>
                <span>More</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </>
            )}
          </span>
        )}
      </div>

      {/* Expandable content */}
      {expanded && hasContent && (
        <div className="mt-4 pt-4 border-t border-border prose-enhanced">
          <ReactMarkdown>{goal.content}</ReactMarkdown>
        </div>
      )}
    </div>
  )
}

export default function GoalsClient({ goals }: { goals: Goal[] }) {
  const [activeStatus, setActiveStatus] = useState<GoalStatus | null>(null)
  const [activeCategory, setActiveCategory] = useState<GoalCategory | null>(null)
  const [expandedGoal, setExpandedGoal] = useState<string | null>(null)

  // Filter goals
  const filteredGoals = useMemo(() => {
    return goals.filter(goal => {
      if (activeStatus && goal.status !== activeStatus) return false
      if (activeCategory && goal.category !== activeCategory) return false
      return true
    })
  }, [goals, activeStatus, activeCategory])

  // Group goals by category
  const groupedGoals = useMemo(() => {
    const grouped: Record<GoalCategory, Goal[]> = {
      focus: [],
      career: [],
      life: [],
    }
    filteredGoals.forEach(goal => grouped[goal.category].push(goal))
    return grouped
  }, [filteredGoals])

  // Count goals per category (from all goals, not filtered)
  const categoryCounts = useMemo(() => {
    const counts: Record<GoalCategory, number> = {
      focus: 0,
      career: 0,
      life: 0,
    }
    goals.forEach(goal => counts[goal.category]++)
    return counts
  }, [goals])

  const handleStatusClick = (status: GoalStatus) => {
    setActiveStatus(activeStatus === status ? null : status)
  }

  const handleCategoryClick = (category: GoalCategory) => {
    setActiveCategory(activeCategory === category ? null : category)
  }

  const clearFilters = () => {
    setActiveStatus(null)
    setActiveCategory(null)
  }

  const hasActiveFilters = activeStatus !== null || activeCategory !== null

  return (
    <section className="py-12 sm:py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Goals & Life
          </h1>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Tracking what I am working towards - career goals and personal milestones.
          </p>
        </div>

        {/* Status Filter */}
        <div className="mb-6">
          <div className="flex flex-wrap justify-center gap-3">
            {statusOrder.map((status) => (
              <StatusBadge
                key={status}
                status={status}
                interactive
                active={activeStatus === status}
                onClick={() => handleStatusClick(status)}
              />
            ))}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-2">
            {categoryOrder.map((category) => (
              <CategoryTab
                key={category}
                category={category}
                active={activeCategory === category}
                count={categoryCounts[category]}
                onClick={() => handleCategoryClick(category)}
              />
            ))}
          </div>
        </div>

        {/* Active Filters & Clear */}
        {hasActiveFilters && (
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="text-sm text-muted">
              Showing {filteredGoals.length} of {goals.length} goals
            </span>
            <button
              onClick={clearFilters}
              className="text-sm text-accent hover:text-accent-dark transition-colors"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Goals by Category */}
        {filteredGoals.length > 0 ? (
          categoryOrder.map((category) => {
            const categoryGoals = groupedGoals[category]
            if (categoryGoals.length === 0) return null

            const config = categoryConfig[category]

            return (
              <div key={category} className="mb-12">
                <h2 className={`text-xl font-semibold mb-4 flex items-center gap-2 ${config.color}`}>
                  {config.label}
                  <span className="text-sm font-normal text-muted">
                    ({categoryGoals.length})
                  </span>
                </h2>

                <div className="grid gap-4">
                  {categoryGoals.map((goal) => (
                    <GoalCard
                      key={goal.slug}
                      goal={goal}
                      expanded={expandedGoal === goal.slug}
                      onToggle={() => setExpandedGoal(
                        expandedGoal === goal.slug ? null : goal.slug
                      )}
                    />
                  ))}
                </div>
              </div>
            )
          })
        ) : (
          <div className="text-center py-12 text-muted">
            <p>No goals match the selected filters.</p>
            <button
              onClick={clearFilters}
              className="mt-4 text-accent hover:text-accent-dark transition-colors"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
