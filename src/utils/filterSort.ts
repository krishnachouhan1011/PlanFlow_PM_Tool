import type { Task, FilterState } from '../types'
import { PRIORITY_CONFIG } from './constants'

export function filterAndSortTasks(tasks: Task[], filters: FilterState): Task[] {
  return tasks
    .filter((task) => {
      // Search term
      if (filters.search.trim()) {
        const query = filters.search.toLowerCase()
        const matchesTitle = task.title.toLowerCase().includes(query)
        const matchesDesc = task.description.toLowerCase().includes(query)
        const matchesId = task.id.toLowerCase().includes(query)
        const matchesAssignee = task.assignee?.name.toLowerCase().includes(query)
        const matchesTag = task.tags.some((tag) => tag.toLowerCase().includes(query))
        if (!matchesTitle && !matchesDesc && !matchesId && !matchesAssignee && !matchesTag) {
          return false
        }
      }

      // Status filter
      if (filters.status !== 'all' && task.status !== filters.status) {
        return false
      }

      // Priority filter
      if (filters.priority !== 'all' && task.priority !== filters.priority) {
        return false
      }

      // Milestone filter
      if (filters.milestoneId !== 'all' && task.milestoneId !== filters.milestoneId) {
        return false
      }

      // Tag filter
      if (filters.tag !== 'all' && !task.tags.includes(filters.tag)) {
        return false
      }

      return true
    })
    .sort((a, b) => {
      let comparison = 0

      switch (filters.sortBy) {
        case 'priority': {
          const rankA = PRIORITY_CONFIG[a.priority]?.rank || 0
          const rankB = PRIORITY_CONFIG[b.priority]?.rank || 0
          comparison = rankB - rankA // default highest priority first
          break
        }
        case 'dueDate': {
          if (!a.dueDate) return 1
          if (!b.dueDate) return -1
          comparison = a.dueDate.localeCompare(b.dueDate)
          break
        }
        case 'title': {
          comparison = a.title.localeCompare(b.title)
          break
        }
        case 'estimatedHours': {
          comparison = a.estimatedHours - b.estimatedHours
          break
        }
        case 'createdAt':
        default: {
          comparison = new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          break
        }
      }

      return filters.sortOrder === 'desc' ? -comparison : comparison
    })
}

export function isTaskOverdue(dueDate: string, status: string): boolean {
  if (status === 'done' || !dueDate) return false
  const today = new Date().toISOString().split('T')[0]
  return dueDate < today
}

export function getSubtaskProgress(subtasks: { completed: boolean }[]): {
  completed: number
  total: number
  percent: number
} {
  const total = subtasks.length
  if (total === 0) return { completed: 0, total: 0, percent: 100 }
  const completed = subtasks.filter((s) => s.completed).length
  const percent = Math.round((completed / total) * 100)
  return { completed, total, percent }
}
