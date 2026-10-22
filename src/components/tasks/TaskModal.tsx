import React, { useState } from 'react'
import type { Task, Milestone, TaskPriority, TaskStatus, Subtask, Assignee } from '../../types'
import { Modal } from '../common/Modal'
import { Button } from '../common/Button'
import { STATUS_COLUMNS, PRIORITY_CONFIG, DEFAULT_ASSIGNEES, PRESET_TAGS } from '../../utils/constants'
import { Plus, Trash2, CheckCircle2, Circle } from 'lucide-react'

interface TaskModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (taskData: Omit<Task, 'createdAt' | 'updatedAt'> | Task) => void
  taskToEdit?: Task | null
  milestones: Milestone[]
  existingTasks: Task[]
}

export const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  onSave,
  taskToEdit,
  milestones,
  existingTasks,
}) => {
  const isEditing = Boolean(taskToEdit)

  const defaultDueDate = () => {
    const d = new Date()
    d.setDate(d.getDate() + 7)
    return d.toISOString().split('T')[0]
  }

  // Form State initialized from taskToEdit (or defaults for new task)
  const [title, setTitle] = useState(() => taskToEdit?.title || '')
  const [description, setDescription] = useState(() => taskToEdit?.description || '')
  const [status, setStatus] = useState<TaskStatus>(() => taskToEdit?.status || 'todo')
  const [priority, setPriority] = useState<TaskPriority>(() => taskToEdit?.priority || 'medium')
  const [milestoneId, setMilestoneId] = useState(() => taskToEdit?.milestoneId || (milestones[0]?.id ?? ''))
  const [dueDate, setDueDate] = useState(() => taskToEdit?.dueDate || defaultDueDate())
  const [estimatedHours, setEstimatedHours] = useState<number>(() => taskToEdit?.estimatedHours ?? 4)
  const [loggedHours, setLoggedHours] = useState<number>(() => taskToEdit?.loggedHours ?? 0)
  const [assignee, setAssignee] = useState<Assignee>(() => taskToEdit?.assignee || DEFAULT_ASSIGNEES[0])
  const [tags, setTags] = useState<string[]>(() => taskToEdit?.tags || ['Frontend'])
  const [tagInput, setTagInput] = useState('')
  const [subtasks, setSubtasks] = useState<Subtask[]>(() => taskToEdit?.subtasks || [])
  const [newSubtaskTitle, setNewSubtaskTitle] = useState('')

  // Validation errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const validate = () => {
    const errs: { [key: string]: string } = {}
    if (!title.trim()) {
      errs.title = 'Title is required'
    } else if (title.trim().length < 3) {
      errs.title = 'Title must be at least 3 characters'
    } else if (title.trim().length > 120) {
      errs.title = 'Title cannot exceed 120 characters'
    }

    if (!dueDate) {
      errs.dueDate = 'Due date is required'
    }

    if (estimatedHours < 0) {
      errs.estimatedHours = 'Estimated hours cannot be negative'
    }

    if (loggedHours < 0) {
      errs.loggedHours = 'Logged hours cannot be negative'
    }

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    if (isEditing && taskToEdit) {
      onSave({
        ...taskToEdit,
        title: title.trim(),
        description: description.trim(),
        status,
        priority,
        milestoneId,
        dueDate,
        estimatedHours: Number(estimatedHours) || 0,
        loggedHours: Number(loggedHours) || 0,
        assignee,
        tags,
        subtasks,
        updatedAt: new Date().toISOString(),
      })
    } else {
      // Generate ID
      const highestNum = existingTasks.reduce((max, t) => {
        const match = t.id.match(/\d+/)
        const num = match ? parseInt(match[0], 10) : 100
        return num > max ? num : max
      }, 100)
      const newId = `TASK-${highestNum + 1}`

      onSave({
        id: newId,
        title: title.trim(),
        description: description.trim(),
        status,
        priority,
        milestoneId,
        dueDate,
        estimatedHours: Number(estimatedHours) || 0,
        loggedHours: Number(loggedHours) || 0,
        assignee,
        tags,
        subtasks,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
    }
    onClose()
  }

  const handleAddTag = (tagToAdd: string) => {
    const clean = tagToAdd.trim().replace(/^#/, '')
    if (clean && !tags.includes(clean)) {
      setTags([...tags, clean])
    }
    setTagInput('')
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove))
  }

  const handleAddSubtask = () => {
    if (!newSubtaskTitle.trim()) return
    const newSub: Subtask = {
      id: `sub-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      title: newSubtaskTitle.trim(),
      completed: false,
    }
    setSubtasks([...subtasks, newSub])
    setNewSubtaskTitle('')
  }

  const handleToggleSubtask = (id: string) => {
    setSubtasks(
      subtasks.map((s) => (s.id === id ? { ...s, completed: !s.completed } : s))
    )
  }

  const handleDeleteSubtask = (id: string) => {
    setSubtasks(subtasks.filter((s) => s.id !== id))
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? `Edit Task (${taskToEdit?.id})` : 'Create New Task'}
      description={
        isEditing
          ? 'Update task specifications, estimates, checklist or status.'
          : 'Define a new project deliverable, assign ownership and deadlines.'
      }
      maxWidth="xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-slate-800 dark:text-slate-200">
        {/* Title */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Task Title <span className="text-rose-500">*</span>
            </label>
            <span className="text-[11px] text-slate-400">{title.length}/120</span>
          </div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Implement secure token refresh mechanism"
            className={`w-full px-3.5 py-2 rounded-xl border text-sm outline-none transition-all dark:bg-slate-800 ${
              errors.title
                ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                : 'border-slate-300 dark:border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
            }`}
          />
          {errors.title && <p className="text-xs text-rose-500 mt-1">{errors.title}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            placeholder="Detail context, acceptance criteria, or relevant links..."
            className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-sm outline-none transition-all dark:bg-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 resize-none"
          />
        </div>

        {/* Status & Priority Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as TaskStatus)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-sm outline-none dark:bg-slate-800"
            >
              {STATUS_COLUMNS.map((col) => (
                <option key={col.id} value={col.id}>
                  {col.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
              Priority
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {(['low', 'medium', 'high', 'urgent'] as TaskPriority[]).map((p) => {
                const conf = PRIORITY_CONFIG[p]
                const isSelected = priority === p
                return (
                  <button
                    type="button"
                    key={p}
                    onClick={() => setPriority(p)}
                    className={`px-2 py-1.5 text-xs font-medium rounded-lg border transition-all text-center ${
                      isSelected
                        ? `${conf.colorClass} ${conf.borderClass} ring-2 ring-indigo-500/30 font-semibold shadow-xs`
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    {conf.label}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Milestone & Assignee Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
              Milestone / Sprint
            </label>
            <select
              value={milestoneId}
              onChange={(e) => setMilestoneId(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-sm outline-none dark:bg-slate-800"
            >
              <option value="">No Milestone</option>
              {milestones.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.title} ({m.targetDate})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
              Assignee
            </label>
            <select
              value={assignee.name}
              onChange={(e) => {
                const found = DEFAULT_ASSIGNEES.find((a) => a.name === e.target.value)
                if (found) setAssignee(found)
              }}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-sm outline-none dark:bg-slate-800"
            >
              {DEFAULT_ASSIGNEES.map((a) => (
                <option key={a.name} value={a.name}>
                  {a.name} — {a.role}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Due Date & Hours Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
              Due Date <span className="text-rose-500">*</span>
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className={`w-full px-3 py-2 rounded-xl border text-sm outline-none dark:bg-slate-800 ${
                errors.dueDate ? 'border-rose-500' : 'border-slate-300 dark:border-slate-700'
              }`}
            />
            {errors.dueDate && <p className="text-xs text-rose-500 mt-1">{errors.dueDate}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
              Estimated (Hours)
            </label>
            <input
              type="number"
              min="0"
              step="0.5"
              value={estimatedHours}
              onChange={(e) => setEstimatedHours(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-sm outline-none dark:bg-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
              Logged (Hours)
            </label>
            <input
              type="number"
              min="0"
              step="0.5"
              value={loggedHours}
              onChange={(e) => setLoggedHours(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-sm outline-none dark:bg-slate-800"
            />
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
            Tags & Labels
          </label>
          <div className="flex flex-wrap gap-1.5 mb-2">
            {tags.map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800"
              >
                #{t}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(t)}
                  className="hover:text-rose-600 font-bold ml-0.5"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  handleAddTag(tagInput)
                }
              }}
              placeholder="Type tag and press enter, or click preset below..."
              className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 outline-none dark:bg-slate-800"
            />
            <Button
              type="button"
              variant="secondary"
              size="xs"
              onClick={() => handleAddTag(tagInput)}
            >
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {PRESET_TAGS.filter((pt) => !tags.includes(pt)).map((pt) => (
              <button
                key={pt}
                type="button"
                onClick={() => handleAddTag(pt)}
                className="text-[11px] px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                + {pt}
              </button>
            ))}
          </div>
        </div>

        {/* Subtasks Checklist */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
            Subtasks Checklist ({subtasks.filter((s) => s.completed).length}/{subtasks.length})
          </label>
          <div className="space-y-1.5 mb-2 max-h-36 overflow-y-auto">
            {subtasks.map((st) => (
              <div
                key={st.id}
                className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700 text-xs"
              >
                <button
                  type="button"
                  onClick={() => handleToggleSubtask(st.id)}
                  className="flex items-center gap-2 text-left flex-1"
                >
                  {st.completed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  ) : (
                    <Circle className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                  <span className={st.completed ? 'line-through text-slate-400' : 'text-slate-700 dark:text-slate-200'}>
                    {st.title}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteSubtask(st.id)}
                  className="p-1 text-slate-400 hover:text-rose-500 transition-colors"
                  aria-label="Remove subtask"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={newSubtaskTitle}
              onChange={(e) => setNewSubtaskTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  handleAddSubtask()
                }
              }}
              placeholder="Add actionable subtask and press enter..."
              className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 outline-none dark:bg-slate-800"
            />
            <Button
              type="button"
              variant="secondary"
              size="xs"
              leftIcon={<Plus className="w-3 h-3" />}
              onClick={handleAddSubtask}
            >
              Add Subtask
            </Button>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            {isEditing ? 'Save Changes' : 'Create Task'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}

