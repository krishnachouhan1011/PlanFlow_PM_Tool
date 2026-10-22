import '@testing-library/jest-dom/vitest'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '../components/common/Button'
import { Badge } from '../components/common/Badge'
import { EmptyState } from '../components/common/EmptyState'
import { TaskCard } from '../components/tasks/TaskCard'
import type { Task, Milestone } from '../types'

describe('Button component', () => {
  it('renders children correctly and triggers onClick', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click Me</Button>)

    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toBeInTheDocument()
    fireEvent.click(button)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('is disabled and prevents click when disabled or loading', () => {
    const handleClick = vi.fn()
    render(<Button disabled onClick={handleClick}>Disabled Button</Button>)

    const button = screen.getByRole('button', { name: /disabled button/i })
    expect(button).toBeDisabled()
    fireEvent.click(button)
    expect(handleClick).not.toHaveBeenCalled()
  })
})

describe('Badge component', () => {
  it('renders with label and dot', () => {
    render(<Badge variant="emerald" dot>Active</Badge>)
    expect(screen.getByText('Active')).toBeInTheDocument()
  })
})

describe('EmptyState component', () => {
  it('renders title, description and calls action button', () => {
    const handleAction = vi.fn()
    render(
      <EmptyState
        title="No Deliverables Found"
        description="Try adjusting your filter settings."
        actionLabel="Create Deliverable"
        onAction={handleAction}
      />
    )

    expect(screen.getByText('No Deliverables Found')).toBeInTheDocument()
    expect(screen.getByText('Try adjusting your filter settings.')).toBeInTheDocument()

    const actionBtn = screen.getByRole('button', { name: /create deliverable/i })
    fireEvent.click(actionBtn)
    expect(handleAction).toHaveBeenCalledTimes(1)
  })
})

describe('TaskCard component', () => {
  const mockTask: Task = {
    id: 'TASK-99',
    title: 'Implement Dark Mode Theme Support',
    description: 'Provide persistent color contrast toggle',
    status: 'in_progress',
    priority: 'urgent',
    milestoneId: 'm-1',
    dueDate: '2026-11-10',
    estimatedHours: 6,
    loggedHours: 2,
    tags: ['Frontend', 'Theme'],
    assignee: { name: 'Taylor Swift', role: 'Designer', avatarBg: 'bg-rose-600' },
    subtasks: [
      { id: 'st1', title: 'Setup CSS classes', completed: true },
      { id: 'st2', title: 'Test contrast', completed: false },
    ],
    createdAt: '2026-10-01T10:00:00.000Z',
    updatedAt: '2026-10-01T10:00:00.000Z',
  }

  const mockMilestone: Milestone = {
    id: 'm-1',
    title: 'Sprint Alpha',
    description: 'Initial iteration',
    targetDate: '2026-11-15',
    status: 'active',
    color: '#4f46e5',
  }

  it('renders task details, tags, subtasks progress and milestone', () => {
    const handleEdit = vi.fn()
    const handleDelete = vi.fn()
    const handleStatusChange = vi.fn()
    const handleViewDetails = vi.fn()

    render(
      <TaskCard
        task={mockTask}
        milestone={mockMilestone}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onStatusChange={handleStatusChange}
        onViewDetails={handleViewDetails}
      />
    )

    expect(screen.getByText('TASK-99')).toBeInTheDocument()
    expect(screen.getByText('Implement Dark Mode Theme Support')).toBeInTheDocument()
    expect(screen.getByText('Urgent')).toBeInTheDocument()
    expect(screen.getByText('Sprint Alpha')).toBeInTheDocument()
    expect(screen.getByText('#Frontend')).toBeInTheDocument()
    expect(screen.getByText('1/2 (50%)')).toBeInTheDocument()

    // Clicking title should trigger onViewDetails
    fireEvent.click(screen.getByText('Implement Dark Mode Theme Support'))
    expect(handleViewDetails).toHaveBeenCalledWith(mockTask)
  })
})
