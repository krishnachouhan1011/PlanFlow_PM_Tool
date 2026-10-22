import React, { useState } from 'react'
import type { Milestone, Task } from '../../types'
import { Button } from '../common/Button'
import { Modal } from '../common/Modal'
import { Plus, Calendar, CheckCircle2, Clock, Trash2, Edit2, Layers } from 'lucide-react'

interface MilestoneManagerProps {
  milestones: Milestone[]
  tasks: Task[]
  onSaveMilestone: (milestone: Milestone) => void
  onDeleteMilestone: (milestoneId: string) => void
  onSelectMilestoneFilter: (milestoneId: string) => void
}

const PRESET_COLORS = [
  '#4f46e5', // Indigo
  '#059669', // Emerald
  '#d97706', // Amber
  '#e11d48', // Rose
  '#7c3aed', // Purple
  '#0284c7', // Sky
  '#0d9488', // Teal
]

export const MilestoneManager: React.FC<MilestoneManagerProps> = ({
  milestones,
  tasks,
  onSaveMilestone,
  onDeleteMilestone,
  onSelectMilestoneFilter,
}) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [editingMilestone, setEditingMilestone] = useState<Milestone | null>(null)

  // Form State
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [targetDate, setTargetDate] = useState('')
  const [status, setStatus] = useState<'planned' | 'active' | 'completed'>('planned')
  const [color, setColor] = useState(PRESET_COLORS[0])
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const handleOpenAdd = () => {
    setEditingMilestone(null)
    setTitle('')
    setDescription('')
    const d = new Date()
    d.setDate(d.getDate() + 14)
    setTargetDate(d.toISOString().split('T')[0])
    setStatus('planned')
    setColor(PRESET_COLORS[milestones.length % PRESET_COLORS.length])
    setErrors({})
    setModalOpen(true)
  }

  const handleOpenEdit = (m: Milestone) => {
    setEditingMilestone(m)
    setTitle(m.title)
    setDescription(m.description)
    setTargetDate(m.targetDate)
    setStatus(m.status)
    setColor(m.color || PRESET_COLORS[0])
    setErrors({})
    setModalOpen(true)
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    const errs: { [key: string]: string } = {}
    if (!title.trim()) {
      errs.title = 'Milestone title is required'
    }
    if (!targetDate) {
      errs.targetDate = 'Target delivery date is required'
    }
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    if (editingMilestone) {
      onSaveMilestone({
        ...editingMilestone,
        title: title.trim(),
        description: description.trim(),
        targetDate,
        status,
        color,
      })
    } else {
      onSaveMilestone({
        id: `m-${Date.now()}`,
        title: title.trim(),
        description: description.trim(),
        targetDate,
        status,
        color,
      })
    }
    setModalOpen(false)
  }

  return (
    <div className="space-y-6">
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-600" />
            Milestones & Release Sprints
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Track macro progress, target deadlines, and deliverables across your project iterations.
          </p>
        </div>

        <Button
          type="button"
          variant="primary"
          size="sm"
          leftIcon={<Plus className="w-4 h-4" />}
          onClick={handleOpenAdd}
        >
          New Milestone
        </Button>
      </div>

      {/* Milestones Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {milestones.map((milestone) => {
          const mTasks = tasks.filter((t) => t.milestoneId === milestone.id)
          const completedTasks = mTasks.filter((t) => t.status === 'done')
          const percent = mTasks.length > 0 ? Math.round((completedTasks.length / mTasks.length) * 100) : 0
          const estHours = mTasks.reduce((acc, t) => acc + (t.estimatedHours || 0), 0)
          const loggedHours = mTasks.reduce((acc, t) => acc + (t.loggedHours || 0), 0)

          return (
            <div
              key={milestone.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header: Title, Color Accent, Status Pill */}
                <div className="flex items-start justify-between gap-3 mb-2.5">
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-3.5 h-3.5 rounded-full shrink-0 shadow-2xs"
                      style={{ backgroundColor: milestone.color }}
                    />
                    <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">
                      {milestone.title}
                    </h3>
                  </div>

                  <span
                    className={`text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                      milestone.status === 'completed'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300'
                        : milestone.status === 'active'
                        ? 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-300'
                        : 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400'
                    }`}
                  >
                    {milestone.status}
                  </span>
                </div>

                {/* Description */}
                {milestone.description && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 line-clamp-2">
                    {milestone.description}
                  </p>
                )}

                {/* Progress Bar */}
                <div className="mb-4 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between text-xs font-semibold mb-1.5 text-slate-700 dark:text-slate-200">
                    <span className="flex items-center gap-1.5 text-slate-500">
                      <CheckCircle2 className="w-3.5 h-3.5 text-slate-400" /> Deliverables
                    </span>
                    <span>
                      {completedTasks.length}/{mTasks.length} Done ({percent}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${percent}%`,
                        backgroundColor: milestone.color || '#4f46e5',
                      }}
                    />
                  </div>
                </div>

                {/* Stats: Hours and Target Date */}
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-500 dark:text-slate-400 pt-1">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>Target: {milestone.targetDate}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>
                      {loggedHours}h / {estHours}h
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <Button
                  type="button"
                  variant="outline"
                  size="xs"
                  onClick={() => onSelectMilestoneFilter(milestone.id)}
                >
                  View Tasks ({mTasks.length})
                </Button>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(milestone)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    title="Edit milestone"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onDeleteMilestone(milestone.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                    title="Delete milestone"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Add / Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingMilestone ? 'Edit Milestone' : 'New Milestone'}
        description="Milestones represent major deliverables, sprints, or releases."
        maxWidth="md"
      >
        <form onSubmit={handleSave} className="space-y-4 text-slate-800 dark:text-slate-200">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
              Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Sprint 2 - Core Beta"
              className={`w-full px-3 py-2 rounded-xl border text-sm outline-none dark:bg-slate-800 ${
                errors.title ? 'border-rose-500' : 'border-slate-300 dark:border-slate-700'
              }`}
            />
            {errors.title && <p className="text-xs text-rose-500 mt-1">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              placeholder="Scope and release targets..."
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-sm outline-none dark:bg-slate-800 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                Target Date <span className="text-rose-500">*</span>
              </label>
              <input
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className={`w-full px-3 py-2 rounded-xl border text-sm outline-none dark:bg-slate-800 ${
                  errors.targetDate ? 'border-rose-500' : 'border-slate-300 dark:border-slate-700'
                }`}
              />
              {errors.targetDate && <p className="text-xs text-rose-500 mt-1">{errors.targetDate}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as 'planned' | 'active' | 'completed')}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-sm outline-none dark:bg-slate-800"
              >
                <option value="planned">Planned</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
              Color Theme
            </label>
            <div className="flex items-center gap-2">
              {PRESET_COLORS.map((c) => (
                <button
                  type="button"
                  key={c}
                  onClick={() => setColor(c)}
                  className={`w-7 h-7 rounded-full transition-transform ${
                    color === c ? 'ring-2 ring-offset-2 ring-indigo-500 scale-110' : 'hover:scale-105'
                  }`}
                  style={{ backgroundColor: c }}
                  aria-label={`Select color ${c}`}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <Button type="button" variant="secondary" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {editingMilestone ? 'Update Milestone' : 'Create Milestone'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
