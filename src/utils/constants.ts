import type { TaskStatus, TaskPriority } from '../types'

export const STATUS_COLUMNS: { id: TaskStatus; label: string; description: string; color: string; badgeClass: string }[] = [
  {
    id: 'backlog',
    label: 'Backlog',
    description: 'Ideas and future scope',
    color: '#64748b',
    badgeClass: 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300',
  },
  {
    id: 'todo',
    label: 'To Do',
    description: 'Ready to be worked on',
    color: '#3b82f6',
    badgeClass: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300',
  },
  {
    id: 'in_progress',
    label: 'In Progress',
    description: 'Actively in development',
    color: '#eab308',
    badgeClass: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300',
  },
  {
    id: 'review',
    label: 'In Review',
    description: 'Testing, QA, and code review',
    color: '#a855f7',
    badgeClass: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300',
  },
  {
    id: 'done',
    label: 'Done',
    description: 'Completed and verified',
    color: '#10b981',
    badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300',
  },
]

export const PRIORITY_CONFIG: Record<TaskPriority, { label: string; colorClass: string; borderClass: string; rank: number }> = {
  low: {
    label: 'Low',
    colorClass: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
    borderClass: 'border-slate-300',
    rank: 1,
  },
  medium: {
    label: 'Medium',
    colorClass: 'bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300',
    borderClass: 'border-blue-300',
    rank: 2,
  },
  high: {
    label: 'High',
    colorClass: 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300',
    borderClass: 'border-amber-400',
    rank: 3,
  },
  urgent: {
    label: 'Urgent',
    colorClass: 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300',
    borderClass: 'border-rose-500',
    rank: 4,
  },
}

export const PRESET_TAGS = [
  'Frontend',
  'Backend',
  'Design',
  'API',
  'DevOps',
  'Security',
  'Testing',
  'Bug',
  'Feature',
  'Docs',
]

export const DEFAULT_ASSIGNEES = [
  { name: 'Krishna Chouhan', role: 'Project Manager & Lead', avatarBg: 'bg-indigo-600' },
  { name: 'Sam Chen', role: 'Frontend Engineer', avatarBg: 'bg-emerald-600' },
  { name: 'Taylor Swift', role: 'Product Designer', avatarBg: 'bg-rose-600' },
  { name: 'Jordan Patel', role: 'DevOps & Cloud', avatarBg: 'bg-amber-600' },
  { name: 'Morgan Kim', role: 'QA & Compliance', avatarBg: 'bg-purple-600' },
]
