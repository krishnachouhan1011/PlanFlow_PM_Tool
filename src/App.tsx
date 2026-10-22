import { useState, useMemo, useCallback, useEffect } from 'react'
import confetti from 'canvas-confetti'
import type { Task, Milestone, ViewMode, FilterState, TaskStatus, ToastMessage } from './types'
import { SAMPLE_TASKS, SAMPLE_MILESTONES } from './utils/sampleData'
import { useLocalStorage } from './hooks/useLocalStorage'
import { filterAndSortTasks } from './utils/filterSort'
import {
  exportTasksToCSV,
  exportProjectToJSON,
  parseAndValidateBackup,
  generateMarkdownSummary,
  copyToClipboard,
} from './utils/export'

// Components
import { Navbar } from './components/layout/Navbar'
import { Sidebar } from './components/layout/Sidebar'
import { TaskKanban } from './components/tasks/TaskKanban'
import { TaskListView } from './components/tasks/TaskListView'
import { TaskFilterBar } from './components/tasks/TaskFilterBar'
import { TaskModal } from './components/tasks/TaskModal'
import { TaskDetailModal } from './components/tasks/TaskDetailModal'
import { MilestoneManager } from './components/milestones/MilestoneManager'
import { AnalyticsView } from './components/analytics/AnalyticsView'
import { AboutView } from './components/about/AboutView'
import { AboutToolModal } from './components/common/AboutToolModal'
import { ConfirmDialog } from './components/common/ConfirmDialog'
import { ToastContainer } from './components/common/Toast'
import { EmptyState } from './components/common/EmptyState'
import { ListTodo } from 'lucide-react'

const DEFAULT_FILTERS: FilterState = {
  search: '',
  status: 'all',
  priority: 'all',
  milestoneId: 'all',
  tag: 'all',
  sortBy: 'createdAt',
  sortOrder: 'desc',
}

export function App() {
  // Persistent State
  const [tasks, setTasks, resetTasks] = useLocalStorage<Task[]>('planflow_tasks_v1', SAMPLE_TASKS)
  const [milestones, setMilestones, resetMilestones] = useLocalStorage<Milestone[]>(
    'planflow_milestones_v1',
    SAMPLE_MILESTONES
  )
  const [currentView, setCurrentView] = useLocalStorage<ViewMode>('planflow_view_v1', 'kanban')
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('planflow_theme', 'light')

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  // UI State
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] = useState(true)
  const [copiedSummary, setCopiedSummary] = useState(false)

  // Modals & Drawers
  const [taskModalOpen, setTaskModalOpen] = useState(false)
  const [aboutToolModalOpen, setAboutToolModalOpen] = useState(false)
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null)
  const [inspectTask, setInspectTask] = useState<Task | null>(null)

  // Confirmations
  const [confirmResetOpen, setConfirmResetOpen] = useState(false)
  const [confirmClearOpen, setConfirmClearOpen] = useState(false)
  const [taskToDeleteId, setTaskToDeleteId] = useState<string | null>(null)

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  const addToast = useCallback(
    (type: ToastMessage['type'], title: string, message?: string) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`
      setToasts((prev) => [...prev, { id, type, title, message }])
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
      }, 4000)
    },
    []
  )

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  // Trigger celebration confetti
  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#4f46e5', '#10b981', '#f59e0b', '#3b82f6'],
      })
    } catch {
      // safe fallback
    }
  }

  // Distinct tags collected from tasks
  const availableTags = useMemo(() => {
    const set = new Set<string>()
    tasks.forEach((t) => t.tags.forEach((tag) => set.add(tag)))
    return Array.from(set).sort()
  }, [tasks])

  // Filtered and sorted tasks
  const filteredTasks = useMemo(() => {
    return filterAndSortTasks(tasks, filters)
  }, [tasks, filters])

  // Handlers for Tasks
  const handleSaveTask = (taskData: Omit<Task, 'createdAt' | 'updatedAt'> | Task) => {
    if ('createdAt' in taskData) {
      // Editing existing task
      setTasks((prev) => prev.map((t) => (t.id === taskData.id ? (taskData as Task) : t)))
      addToast('success', 'Task Updated', `Task ${taskData.id} has been saved successfully.`)
    } else {
      // Creating new task
      const newTask: Task = {
        ...(taskData as Task),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      setTasks((prev) => [newTask, ...prev])
      addToast('success', 'Task Created', `New task ${newTask.id} added to the board.`)
    }
  }

  const handleDeleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId))
    if (inspectTask?.id === taskId) {
      setInspectTask(null)
    }
    addToast('info', 'Task Deleted', `Task ${taskId} was permanently removed.`)
  }

  const handleStatusChange = (taskId: string, newStatus: TaskStatus) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          if (newStatus === 'done' && t.status !== 'done') {
            triggerCelebration()
          }
          return { ...t, status: newStatus, updatedAt: new Date().toISOString() }
        }
        return t
      })
    )

    if (inspectTask && inspectTask.id === taskId) {
      setInspectTask((prev) => (prev ? { ...prev, status: newStatus } : null))
    }
  }

  const handleToggleSubtask = (taskId: string, subtaskId: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const updatedSubtasks = t.subtasks.map((st) =>
            st.id === subtaskId ? { ...st, completed: !st.completed } : st
          )
          const allDone = updatedSubtasks.length > 0 && updatedSubtasks.every((st) => st.completed)
          if (allDone && t.status !== 'done') {
            triggerCelebration()
          }
          return { ...t, subtasks: updatedSubtasks, updatedAt: new Date().toISOString() }
        }
        return t
      })
    )

    if (inspectTask && inspectTask.id === taskId) {
      setInspectTask((prev) => {
        if (!prev) return null
        return {
          ...prev,
          subtasks: prev.subtasks.map((st) =>
            st.id === subtaskId ? { ...st, completed: !st.completed } : st
          ),
        }
      })
    }
  }

  const handleAddHours = (taskId: string, hoursToAdd: number) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const newHours = Math.round(((t.loggedHours || 0) + hoursToAdd) * 10) / 10
          return { ...t, loggedHours: newHours, updatedAt: new Date().toISOString() }
        }
        return t
      })
    )

    if (inspectTask && inspectTask.id === taskId) {
      setInspectTask((prev) => {
        if (!prev) return null
        return {
          ...prev,
          loggedHours: Math.round(((prev.loggedHours || 0) + hoursToAdd) * 10) / 10,
        }
      })
    }

    addToast('info', 'Time Logged', `Logged +${hoursToAdd}h to task ${taskId}.`)
  }

  const handleOpenCreateModal = (initialStatus?: TaskStatus) => {
    setTaskToEdit(null)
    if (initialStatus) {
      // Temporarily stash default status
    }
    setTaskModalOpen(true)
  }

  const handleOpenEditModal = (task: Task) => {
    setTaskToEdit(task)
    setTaskModalOpen(true)
  }

  // Milestones handlers
  const handleSaveMilestone = (milestone: Milestone) => {
    setMilestones((prev) => {
      const exists = prev.some((m) => m.id === milestone.id)
      if (exists) {
        return prev.map((m) => (m.id === milestone.id ? milestone : m))
      }
      return [...prev, milestone]
    })
    addToast('success', 'Milestone Saved', `Milestone "${milestone.title}" updated.`)
  }

  const handleDeleteMilestone = (milestoneId: string) => {
    const toDelete = milestones.find((m) => m.id === milestoneId)
    setMilestones((prev) => prev.filter((m) => m.id !== milestoneId))
    // unassign tasks
    setTasks((prev) =>
      prev.map((t) => (t.milestoneId === milestoneId ? { ...t, milestoneId: '' } : t))
    )
    addToast('info', 'Milestone Removed', `Milestone "${toDelete?.title || milestoneId}" was deleted.`)
  }

  // Export & Share Handlers
  const handleExportCSV = () => {
    try {
      exportTasksToCSV(tasks, milestones)
      addToast('success', 'CSV Exported', `Downloaded tasks CSV with ${tasks.length} items.`)
    } catch {
      addToast('error', 'Export Failed', 'An error occurred while generating CSV.')
    }
  }

  const handleExportJSON = () => {
    try {
      exportProjectToJSON(tasks, milestones)
      addToast('success', 'Backup Exported', 'Full project JSON backup saved.')
    } catch {
      addToast('error', 'Export Failed', 'An error occurred while exporting JSON.')
    }
  }

  const handleImportJSON = async (file: File) => {
    try {
      const text = await file.text()
      const { tasks: importedTasks, milestones: importedMilestones } = parseAndValidateBackup(text)
      setTasks(importedTasks)
      setMilestones(importedMilestones)
      addToast(
        'success',
        'Project Restored',
        `Successfully imported ${importedTasks.length} tasks and ${importedMilestones.length} milestones.`
      )
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Invalid backup file structure.'
      addToast('error', 'Import Failed', message)
    }
  }

  const handleCopySummary = async () => {
    const summary = generateMarkdownSummary(tasks, milestones)
    const ok = await copyToClipboard(summary)
    if (ok) {
      setCopiedSummary(true)
      setTimeout(() => setCopiedSummary(false), 2500)
      addToast('success', 'Standup Summary Copied', 'Markdown status report copied to clipboard!')
    } else {
      addToast('error', 'Copy Failed', 'Could not access clipboard.')
    }
  }

  // Sample data reset & clear
  const handleConfirmResetSample = () => {
    resetTasks()
    resetMilestones()
    setFilters(DEFAULT_FILTERS)
    setInspectTask(null)
    addToast('success', 'Sample Data Restored', 'Reset project back to default demo state.')
  }

  const handleConfirmClearAll = () => {
    setTasks([])
    setMilestones([])
    setFilters(DEFAULT_FILTERS)
    setInspectTask(null)
    addToast('info', 'Workspace Cleared', 'All tasks and milestones have been wiped.')
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans">
      {/* Top Navbar */}
      <Navbar
        currentView={currentView}
        onViewChange={setCurrentView}
        onOpenCreateTask={() => handleOpenCreateModal()}
        onOpenAboutToolModal={() => setAboutToolModalOpen(true)}
        onExportCSV={handleExportCSV}
        onExportJSON={handleExportJSON}
        onImportJSON={handleImportJSON}
        onCopySummary={handleCopySummary}
        onResetSampleData={() => setConfirmResetOpen(true)}
        onClearAllData={() => setConfirmClearOpen(true)}
        onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        onToggleDesktopSidebar={() => setIsDesktopSidebarOpen(!isDesktopSidebarOpen)}
        isDesktopSidebarOpen={isDesktopSidebarOpen}
        copiedSummary={copiedSummary}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main Body with Sidebar + Content */}
      <div className="flex-1 flex w-full">
        <Sidebar
          currentView={currentView}
          onViewChange={setCurrentView}
          filters={filters}
          onFilterChange={setFilters}
          tasks={tasks}
          milestones={milestones}
          isOpenMobile={mobileSidebarOpen}
          onCloseMobile={() => setMobileSidebarOpen(false)}
          isDesktopOpen={isDesktopSidebarOpen}
        />

        {/* Viewport Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-7 min-w-0">
          {/* If on Kanban or List view, show Filter & Sort bar */}
          {(currentView === 'kanban' || currentView === 'list') && (
            <>
              <TaskFilterBar
                filters={filters}
                onFilterChange={setFilters}
                onResetFilters={() => setFilters(DEFAULT_FILTERS)}
                milestones={milestones}
                availableTags={availableTags}
                totalTasksCount={tasks.length}
                filteredTasksCount={filteredTasks.length}
              />

              {tasks.length === 0 ? (
                <EmptyState
                  title="No Tasks in Workspace"
                  description="Your project queue is clean. Create your first task or load realistic sample sprint data to explore."
                  actionLabel="Create First Task"
                  onAction={() => handleOpenCreateModal()}
                  secondaryActionLabel="Load Sample Data"
                  onSecondaryAction={handleConfirmResetSample}
                  icon={<ListTodo className="w-7 h-7" />}
                />
              ) : currentView === 'kanban' ? (
                <TaskKanban
                  tasks={filteredTasks}
                  milestones={milestones}
                  onEditTask={handleOpenEditModal}
                  onDeleteTask={(id) => setTaskToDeleteId(id)}
                  onStatusChange={handleStatusChange}
                  onViewDetails={(task) => setInspectTask(task)}
                  onOpenCreateModalWithStatus={(status) => handleOpenCreateModal(status)}
                />
              ) : (
                <TaskListView
                  tasks={filteredTasks}
                  milestones={milestones}
                  onEditTask={handleOpenEditModal}
                  onDeleteTask={(id) => setTaskToDeleteId(id)}
                  onStatusChange={handleStatusChange}
                  onViewDetails={(task) => setInspectTask(task)}
                />
              )}
            </>
          )}

          {/* Milestones View */}
          {currentView === 'milestones' && (
            <MilestoneManager
              milestones={milestones}
              tasks={tasks}
              onSaveMilestone={handleSaveMilestone}
              onDeleteMilestone={handleDeleteMilestone}
              onSelectMilestoneFilter={(mId) => {
                setFilters({ ...filters, milestoneId: mId })
                setCurrentView('kanban')
              }}
            />
          )}

          {/* Analytics View */}
          {currentView === 'analytics' && (
            <AnalyticsView
              tasks={tasks}
              milestones={milestones}
              onViewTaskDetails={(task) => setInspectTask(task)}
            />
          )}

          {/* About Krishna Profile View */}
          {currentView === 'about' && <AboutView />}
        </main>
      </div>

      {/* Task Create / Edit Modal */}
      {taskModalOpen && (
        <TaskModal
          key={taskToEdit ? taskToEdit.id : 'new-task'}
          isOpen={taskModalOpen}
          onClose={() => setTaskModalOpen(false)}
          onSave={handleSaveTask}
          taskToEdit={taskToEdit}
          milestones={milestones}
          existingTasks={tasks}
        />
      )}

      {/* Task Full Details Modal */}
      <TaskDetailModal
        isOpen={Boolean(inspectTask)}
        onClose={() => setInspectTask(null)}
        task={inspectTask}
        milestone={milestones.find((m) => m.id === inspectTask?.milestoneId)}
        onEdit={(task) => {
          setInspectTask(null)
          handleOpenEditModal(task)
        }}
        onDelete={(id) => {
          setInspectTask(null)
          setTaskToDeleteId(id)
        }}
        onStatusChange={handleStatusChange}
        onToggleSubtask={handleToggleSubtask}
        onAddHours={handleAddHours}
      />

      {/* Confirm Task Deletion */}
      <ConfirmDialog
        isOpen={Boolean(taskToDeleteId)}
        onClose={() => setTaskToDeleteId(null)}
        onConfirm={() => {
          if (taskToDeleteId) handleDeleteTask(taskToDeleteId)
        }}
        title="Delete Deliverable Task?"
        message={`Are you sure you want to delete ${taskToDeleteId}? This action cannot be undone.`}
        confirmText="Delete Task"
        isDestructive={true}
      />

      {/* Confirm Reset Sample Data */}
      <ConfirmDialog
        isOpen={confirmResetOpen}
        onClose={() => setConfirmResetOpen(false)}
        onConfirm={handleConfirmResetSample}
        title="Reset to Sample Sprint Data?"
        message="This will replace current project data with the default sample milestones, sprint deliverables, and team assignments."
        confirmText="Reset Workspace"
        isDestructive={false}
      />

      {/* Confirm Clear All Data */}
      <ConfirmDialog
        isOpen={confirmClearOpen}
        onClose={() => setConfirmClearOpen(false)}
        onConfirm={handleConfirmClearAll}
        title="Clear All Project Data?"
        message="This will permanently delete all tasks, milestones, checklists, and time logs from local storage."
        confirmText="Clear All Data"
        isDestructive={true}
      />

      {/* About PlanFlow Tool Modal */}
      <AboutToolModal
        isOpen={aboutToolModalOpen}
        onClose={() => setAboutToolModalOpen(false)}
        onNavigateToAboutMe={() => setCurrentView('about')}
      />

      {/* Floating Toast Notification Stack */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  )
}
export default App
