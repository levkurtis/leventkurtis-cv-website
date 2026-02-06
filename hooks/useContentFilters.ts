'use client'

import { useState, useMemo } from 'react'

export function useContentFilters<S extends string, I>(
  items: I[],
  getStatus: (item: I) => S,
  matchFn: (item: I, activeStatus: S | null, activeSecondary: string | null) => boolean,
) {
  const [activeStatus, setActiveStatus] = useState<S | null>(null)
  const [activeSecondary, setActiveSecondary] = useState<string | null>(null)

  const filteredItems = useMemo(() => {
    return items.filter((item) => matchFn(item, activeStatus, activeSecondary))
  }, [items, activeStatus, activeSecondary, matchFn])

  const toggleStatus = (status: S) => {
    setActiveStatus(activeStatus === status ? null : status)
  }

  const toggleSecondary = (value: string) => {
    setActiveSecondary(activeSecondary === value ? null : value)
  }

  const clearFilters = () => {
    setActiveStatus(null)
    setActiveSecondary(null)
  }

  const hasActiveFilters = activeStatus !== null || activeSecondary !== null

  return {
    activeStatus,
    setActiveStatus,
    activeSecondary,
    setActiveSecondary,
    filteredItems,
    hasActiveFilters,
    clearFilters,
    toggleStatus,
    toggleSecondary,
  }
}
