export type TaskStatus = 'backlog' | 'todo' | 'in_progress' | 'review' | 'done'

export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent'

export interface Subtask {
  id: string
  title: string
  completed: boolean
}

export interface Assignee {
  name: string
  avatarBg: string
  role: string
}

export interface Task {
  id: string
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  milestoneId: string
  dueDate: string // YYYY-MM-DD
  estimatedHours: number
  loggedHours: number
  tags: string[]
  subtasks: Subtask[]
  assignee: Assignee
  createdAt: string
  updatedAt: string
}

export interface Milestone {
  id: string
  title: string
  description: string
  targetDate: string // YYYY-MM-DD
  status: 'planned' | 'active' | 'completed'
  color: string
}

export type ViewMode = 'kanban' | 'list' | 'milestones' | 'analytics' | 'about'

export type SortField = 'dueDate' | 'priority' | 'title' | 'createdAt' | 'estimatedHours'

export interface FilterState {
  search: string
  status: string
  priority: string
  milestoneId: string
  tag: string
  sortBy: SortField
  sortOrder: 'asc' | 'desc'
}

export interface ToastMessage {
  id: string
  type: 'success' | 'info' | 'warning' | 'error'
  title: string
  message?: string
}

