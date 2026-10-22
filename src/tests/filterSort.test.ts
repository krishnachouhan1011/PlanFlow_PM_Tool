import { describe, it, expect } from 'vitest'
import { filterAndSortTasks, isTaskOverdue, getSubtaskProgress } from '../utils/filterSort'
import type { Task, FilterState } from '../types'

const mockTasks: Task[] = [
  {
    id: 'TASK-1',
    title: 'Alpha task for frontend',
    description: 'Build UI components',
    status: 'in_progress',
    priority: 'urgent',
    milestoneId: 'm-1',
    dueDate: '2026-11-01',
    estimatedHours: 8,
    loggedHours: 4,
    tags: ['Frontend', 'UI'],
    assignee: { name: 'Alice Smith', role: 'Dev', avatarBg: 'bg-blue-500' },
    subtasks: [
      { id: 's1', title: 'Step 1', completed: true },
      { id: 's2', title: 'Step 2', completed: false },
    ],
    createdAt: '2026-10-01T10:00:00.000Z',
    updatedAt: '2026-10-01T10:00:00.000Z',
  },
  {
    id: 'TASK-2',
    title: 'Beta task for backend',
    description: 'Database schema migration',
    status: 'done',
    priority: 'low',
    milestoneId: 'm-2',
    dueDate: '2026-10-15',
    estimatedHours: 4,
    loggedHours: 4,
    tags: ['Backend', 'DB'],
    assignee: { name: 'Bob Jones', role: 'DevOps', avatarBg: 'bg-green-500' },
    subtasks: [{ id: 's3', title: 'Migration script', completed: true }],
    createdAt: '2026-10-02T10:00:00.000Z',
    updatedAt: '2026-10-02T10:00:00.000Z',
  },
  {
    id: 'TASK-3',
    title: 'Gamma urgent security review',
    description: 'OAuth2 verification',
    status: 'todo',
    priority: 'high',
    milestoneId: 'm-1',
    dueDate: '2026-11-20',
    estimatedHours: 12,
    loggedHours: 0,
    tags: ['Security'],
    assignee: { name: 'Alice Smith', role: 'Dev', avatarBg: 'bg-blue-500' },
    subtasks: [],
    createdAt: '2026-10-03T10:00:00.000Z',
    updatedAt: '2026-10-03T10:00:00.000Z',
  },
]

describe('Task Filter and Sort utilities', () => {
  const baseFilter: FilterState = {
    search: '',
    status: 'all',
    priority: 'all',
    milestoneId: 'all',
    tag: 'all',
    sortBy: 'createdAt',
    sortOrder: 'desc',
  }

  it('filters by search keyword matching title', () => {
    const results = filterAndSortTasks(mockTasks, { ...baseFilter, search: 'Alpha' })
    expect(results).toHaveLength(1)
    expect(results[0].id).toBe('TASK-1')
  })

  it('filters by search keyword matching tag', () => {
    const results = filterAndSortTasks(mockTasks, { ...baseFilter, search: 'Security' })
    expect(results).toHaveLength(1)
    expect(results[0].id).toBe('TASK-3')
  })

  it('filters by status correctly', () => {
    const results = filterAndSortTasks(mockTasks, { ...baseFilter, status: 'done' })
    expect(results).toHaveLength(1)
    expect(results[0].id).toBe('TASK-2')
  })

  it('filters by priority correctly', () => {
    const results = filterAndSortTasks(mockTasks, { ...baseFilter, priority: 'urgent' })
    expect(results).toHaveLength(1)
    expect(results[0].id).toBe('TASK-1')
  })

  it('sorts by priority with urgent first', () => {
    const results = filterAndSortTasks(mockTasks, { ...baseFilter, sortBy: 'priority', sortOrder: 'asc' })
    expect(results[0].priority).toBe('urgent')
    expect(results[1].priority).toBe('high')
    expect(results[2].priority).toBe('low')
  })

  it('sorts alphabetically by title', () => {
    const results = filterAndSortTasks(mockTasks, { ...baseFilter, sortBy: 'title', sortOrder: 'asc' })
    expect(results[0].title).toContain('Alpha')
    expect(results[1].title).toContain('Beta')
    expect(results[2].title).toContain('Gamma')
  })
})

describe('isTaskOverdue', () => {
  it('returns false for tasks that are done regardless of date', () => {
    expect(isTaskOverdue('2020-01-01', 'done')).toBe(false)
  })

  it('returns true for past due dates when status is not done', () => {
    expect(isTaskOverdue('2020-01-01', 'todo')).toBe(true)
  })

  it('returns false for far future dates', () => {
    expect(isTaskOverdue('2099-12-31', 'todo')).toBe(false)
  })
})

describe('getSubtaskProgress', () => {
  it('handles empty subtasks gracefully', () => {
    const { completed, total, percent } = getSubtaskProgress([])
    expect(total).toBe(0)
    expect(completed).toBe(0)
    expect(percent).toBe(100)
  })

  it('calculates correct completion percentage', () => {
    const subtasks = [
      { completed: true },
      { completed: false },
      { completed: true },
      { completed: false },
    ]
    const { completed, total, percent } = getSubtaskProgress(subtasks)
    expect(total).toBe(4)
    expect(completed).toBe(2)
    expect(percent).toBe(50)
  })
})

