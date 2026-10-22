import { describe, it, expect } from 'vitest'
import { parseAndValidateBackup, generateMarkdownSummary } from '../utils/export'
import type { Task, Milestone } from '../types'

const sampleTasks: Task[] = [
  {
    id: 'TASK-1',
    title: 'Authentication module',
    description: 'Implement JWT tokens',
    status: 'done',
    priority: 'high',
    milestoneId: 'm-1',
    dueDate: '2026-11-01',
    estimatedHours: 10,
    loggedHours: 10,
    tags: ['Security'],
    assignee: { name: 'Sam Chen', role: 'Dev', avatarBg: 'bg-emerald-500' },
    subtasks: [{ id: 's1', title: 'Token generation', completed: true }],
    createdAt: '2026-10-01T10:00:00.000Z',
    updatedAt: '2026-10-01T10:00:00.000Z',
  },
]

const sampleMilestones: Milestone[] = [
  {
    id: 'm-1',
    title: 'Sprint 1 Launch',
    description: 'Initial deployment',
    targetDate: '2026-11-15',
    status: 'active',
    color: '#4f46e5',
  },
]

describe('parseAndValidateBackup', () => {
  it('successfully validates a structured backup', () => {
    const validJson = JSON.stringify({
      version: '1.0',
      tasks: sampleTasks,
      milestones: sampleMilestones,
    })

    const parsed = parseAndValidateBackup(validJson)
    expect(parsed.tasks).toHaveLength(1)
    expect(parsed.tasks[0].id).toBe('TASK-1')
    expect(parsed.milestones).toHaveLength(1)
    expect(parsed.milestones[0].id).toBe('m-1')
  })

  it('rejects JSON missing tasks or milestones array', () => {
    const invalidJson = JSON.stringify({
      version: '1.0',
      tasks: [],
    })

    expect(() => parseAndValidateBackup(invalidJson)).toThrow(
      'Backup must contain both "tasks" and "milestones" arrays.'
    )
  })

  it('rejects tasks with missing required fields', () => {
    const invalidJson = JSON.stringify({
      version: '1.0',
      tasks: [{ id: 'TASK-1', title: 'Missing status' }],
      milestones: sampleMilestones,
    })

    expect(() => parseAndValidateBackup(invalidJson)).toThrow(
      'missing required fields'
    )
  })
})

describe('generateMarkdownSummary', () => {
  it('generates a formatted markdown summary with counts', () => {
    const summary = generateMarkdownSummary(sampleTasks, sampleMilestones)

    expect(summary).toContain('# 📋 PlanFlow Project Status Update')
    expect(summary).toContain('100% (1/1 tasks completed)')
    expect(summary).toContain('Sprint 1 Launch')
    expect(summary).toContain('100% (1/1 tasks)')
  })
})

