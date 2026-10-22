import type { Task, Milestone } from '../types'

/**
 * Escapes a single CSV value according to RFC 4180
 */
function escapeCSV(val: unknown): string {
  if (val === null || val === undefined) return '""'
  const str = String(val).replace(/"/g, '""')
  return `"${str}"`
}

/**
 * Triggers a browser download of a generated blob
 */
function downloadBlob(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', filename)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

/**
 * Generates and downloads a CSV export of all tasks
 */
export function exportTasksToCSV(tasks: Task[], milestones: Milestone[]): void {
  const milestoneMap = new Map(milestones.map((m) => [m.id, m.title]))

  const headers = [
    'Task ID',
    'Title',
    'Status',
    'Priority',
    'Milestone',
    'Due Date',
    'Estimated Hours',
    'Logged Hours',
    'Assignee',
    'Tags',
    'Subtasks Total',
    'Subtasks Done',
    'Created At',
  ]

  const rows = tasks.map((task) => [
    escapeCSV(task.id),
    escapeCSV(task.title),
    escapeCSV(task.status),
    escapeCSV(task.priority),
    escapeCSV(milestoneMap.get(task.milestoneId) || 'Unassigned'),
    escapeCSV(task.dueDate),
    escapeCSV(task.estimatedHours),
    escapeCSV(task.loggedHours),
    escapeCSV(task.assignee?.name || 'Unassigned'),
    escapeCSV(task.tags.join('; ')),
    escapeCSV(task.subtasks.length),
    escapeCSV(task.subtasks.filter((s) => s.completed).length),
    escapeCSV(task.createdAt),
  ])

  const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\r\n')
  const dateStr = new Date().toISOString().split('T')[0]
  downloadBlob(csvContent, `planflow-tasks-${dateStr}.csv`, 'text/csv;charset=utf-8;')
}

/**
 * Generates and downloads a complete JSON project backup
 */
export function exportProjectToJSON(tasks: Task[], milestones: Milestone[]): void {
  const backup = {
    version: '1.0',
    exportedAt: new Date().toISOString(),
    tool: 'PlanFlow Project Management Utility',
    milestones,
    tasks,
  }

  const jsonContent = JSON.stringify(backup, null, 2)
  const dateStr = new Date().toISOString().split('T')[0]
  downloadBlob(jsonContent, `planflow-backup-${dateStr}.json`, 'application/json;charset=utf-8;')
}

/**
 * Parses and validates an imported JSON backup
 */
export function parseAndValidateBackup(jsonString: string): { tasks: Task[]; milestones: Milestone[] } {
  const data = JSON.parse(jsonString)

  if (!data || typeof data !== 'object') {
    throw new Error('Invalid JSON file format.')
  }

  if (!Array.isArray(data.tasks) || !Array.isArray(data.milestones)) {
    throw new Error('Backup must contain both "tasks" and "milestones" arrays.')
  }

  // Validate tasks have required fields
  for (let i = 0; i < data.tasks.length; i++) {
    const t = data.tasks[i]
    if (!t.id || !t.title || !t.status || !t.priority) {
      throw new Error(`Task at index ${i} is missing required fields (id, title, status, or priority).`)
    }
  }

  // Validate milestones have required fields
  for (let i = 0; i < data.milestones.length; i++) {
    const m = data.milestones[i]
    if (!m.id || !m.title) {
      throw new Error(`Milestone at index ${i} is missing id or title.`)
    }
  }

  return {
    tasks: data.tasks as Task[],
    milestones: data.milestones as Milestone[],
  }
}

/**
 * Generates a clean markdown summary of the current project for Slack/Teams standups
 */
export function generateMarkdownSummary(tasks: Task[], milestones: Milestone[]): string {
  const total = tasks.length
  const done = tasks.filter((t) => t.status === 'done').length
  const inProgress = tasks.filter((t) => t.status === 'in_progress').length
  const review = tasks.filter((t) => t.status === 'review').length
  const todo = tasks.filter((t) => t.status === 'todo').length
  const backlog = tasks.filter((t) => t.status === 'backlog').length
  const completionRate = total > 0 ? Math.round((done / total) * 100) : 0

  const todayStr = new Date().toISOString().split('T')[0]
  const overdueTasks = tasks.filter((t) => t.status !== 'done' && t.dueDate && t.dueDate < todayStr)

  let summary = `# 📋 PlanFlow Project Status Update (${todayStr})\n\n`
  summary += `**Overall Progress:** ${completionRate}% (${done}/${total} tasks completed)\n`
  summary += `- 🚀 **In Progress:** ${inProgress}\n`
  summary += `- 🔍 **In Review:** ${review}\n`
  summary += `- 📝 **To Do:** ${todo}\n`
  summary += `- 📦 **Backlog:** ${backlog}\n`
  summary += `- ✅ **Done:** ${done}\n\n`

  if (overdueTasks.length > 0) {
    summary += `### ⚠️ Overdue Attention (${overdueTasks.length})\n`
    overdueTasks.forEach((t) => {
      summary += `- **[${t.id}]** ${t.title} (Due: ${t.dueDate}, Assignee: ${t.assignee?.name || 'Unassigned'})\n`
    })
    summary += `\n`
  }

  summary += `### 🎯 Milestones\n`
  milestones.forEach((m) => {
    const mTasks = tasks.filter((t) => t.milestoneId === m.id)
    const mDone = mTasks.filter((t) => t.status === 'done').length
    const mProgress = mTasks.length > 0 ? Math.round((mDone / mTasks.length) * 100) : 0
    summary += `- **${m.title}**: ${mProgress}% (${mDone}/${mTasks.length} tasks) - Target: ${m.targetDate}\n`
  })

  return summary
}

/**
 * Copies text to user clipboard with safety fallback
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch {
      // Fallback below
    }
  }

  // Fallback for non-https or older APIs
  try {
    const textArea = document.createElement('textarea')
    textArea.value = text
    textArea.style.position = 'fixed'
    textArea.style.left = '-999999px'
    textArea.style.top = '-999999px'
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    const successful = document.execCommand('copy')
    document.body.removeChild(textArea)
    return successful
  } catch {
    return false
  }
}
