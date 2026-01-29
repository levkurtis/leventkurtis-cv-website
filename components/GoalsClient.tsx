'use client'

import { useState, useMemo } from 'react'
import ReactMarkdown from 'react-markdown'
import {
  statusConfig,
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

function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={star <= rating ? 'text-amber-400' : 'text-gray-600'}
        >
          ★
        </span>
      ))}
    </div>
  )
}

function GoalCard({ goal, expanded, onToggle }: {
  goal: Goal
  expanded: boolean
  onToggle: () => void
}) {
  const hasContent = goal.content.trim().length > 0

  return (
    <div className="bg-card hover:bg-card-hover border border-border rounded-xl p-5 transition-all duration-300">
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
              >
                {goal.title}
                <span className="ml-1 text-xs opacity-60">↗</span>
              </a>
            ) : (
              goal.title
            )}
          </h3>
          {/* Author for reading */}
          {goal.author && (
            <p className="text-sm text-muted">by {goal.author}</p>
          )}
          {/* Director for movies */}
          {goal.director && (
            <p className="text-sm text-muted">
              dir. {goal.director}{goal.year ? ` (${goal.year})` : ''}
            </p>
          )}
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
          {goal.rating && <RatingStars rating={goal.rating} />}
        </div>

        {hasContent && (
          <button
            onClick={onToggle}
            className="text-accent hover:text-accent-dark transition-colors"
          >
            {expanded ? 'Show less' : 'Show more'}
          </button>
        )}
      </div>

      {/* Expandable content */}
      {expanded && hasContent && (
        <div className="mt-4 pt-4 border-t border-border prose prose-sm prose-invert max-w-none">
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
      reading: [],
      life: [],
      movies: [],
    }
    filteredGoals.forEach(goal => grouped[goal.category].push(goal))
    return grouped
  }, [filteredGoals])

  // Count goals per category (from all goals, not filtered)
  const categoryCounts = useMemo(() => {
    const counts: Record<GoalCategory, number> = {
      focus: 0,
      career: 0,
      reading: 0,
      life: 0,
      movies: 0,
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
            Tracking what I am working towards - career, reading, personal milestones, and more.
          </p>
        </div>

        {/* Status Filter */}
        <div className="mb-6">
          <div className="flex flex-wrap justify-center gap-3">
            {(Object.keys(statusConfig) as GoalStatus[]).map((status) => (
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
