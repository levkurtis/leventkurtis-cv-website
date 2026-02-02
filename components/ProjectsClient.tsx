'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { statusConfig, statusOrder, type ProjectStatus, type Project } from '@/lib/project-types'

function StatusBadge({ status, interactive = false, active = false, onClick }: {
  status: ProjectStatus
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

function TagBadge({ tag, active = false, onClick }: {
  tag: string
  active?: boolean
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      className={`text-xs px-2.5 py-1 rounded-full border transition-all duration-200 cursor-pointer
        ${active
          ? 'bg-accent/20 border-accent text-accent ring-2 ring-offset-2 ring-offset-background ring-accent'
          : 'bg-card border-border text-muted opacity-60 hover:opacity-100'
        }`}
      onClick={onClick}
    >
      {tag}
    </button>
  )
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block bg-card hover:bg-card-hover border border-border rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-accent/5 hover:-translate-y-1"
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <h2 className="text-xl font-semibold text-foreground group-hover:text-accent transition-colors">
          {project.title}
        </h2>
        <StatusBadge status={project.status} />
      </div>

      <p className="text-muted mb-4 line-clamp-2">{project.description}</p>

      <div className="flex items-center justify-between">
        <time className="text-sm text-muted/70">{project.date}</time>

        {project.tags && project.tags.length > 0 && (
          <div className="flex gap-2">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs text-muted bg-background px-2 py-0.5 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}

export default function ProjectsClient({ projects }: { projects: Project[] }) {
  const [activeStatus, setActiveStatus] = useState<ProjectStatus | null>(null)
  const [activeTag, setActiveTag] = useState<string | null>(null)

  // Get all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>()
    projects.forEach(project => {
      project.tags?.forEach(tag => tags.add(tag))
    })
    return Array.from(tags).sort()
  }, [projects])

  // Filter projects
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      if (activeStatus && project.status !== activeStatus) return false
      if (activeTag && !project.tags?.includes(activeTag)) return false
      return true
    })
  }, [projects, activeStatus, activeTag])

  const handleStatusClick = (status: ProjectStatus) => {
    setActiveStatus(activeStatus === status ? null : status)
  }

  const handleTagClick = (tag: string) => {
    setActiveTag(activeTag === tag ? null : tag)
  }

  const clearFilters = () => {
    setActiveStatus(null)
    setActiveTag(null)
  }

  const hasActiveFilters = activeStatus !== null || activeTag !== null

  return (
    <section className="py-12 sm:py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Projects
          </h1>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            A collection of projects, experiments, and writings. Some completed, some in progress, some just ideas.
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

        {/* Tag Filter */}
        {allTags.length > 0 && (
          <div className="mb-8">
            <div className="flex flex-wrap justify-center gap-2">
              {allTags.map((tag) => (
                <TagBadge
                  key={tag}
                  tag={tag}
                  active={activeTag === tag}
                  onClick={() => handleTagClick(tag)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Active Filters & Clear */}
        {hasActiveFilters && (
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="text-sm text-muted">
              Showing {filteredProjects.length} of {projects.length} projects
            </span>
            <button
              onClick={clearFilters}
              className="text-sm text-accent hover:text-accent-dark transition-colors"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-muted">
            <p>No projects match the selected filters.</p>
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
