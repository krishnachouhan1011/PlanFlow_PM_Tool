import React from 'react'
import type { Task, Milestone, TaskStatus } from '../../types'
import { Modal } from '../common/Modal'
import { Button } from '../common/Button'
import { PRIORITY_CONFIG, STATUS_COLUMNS } from '../../utils/constants'
import { isTaskOverdue, getSubtaskProgress } from '../../utils/filterSort'
import {
  Calendar,
  Clock,
  Edit2,
  Trash2,
  CheckCircle2,
  Circle,
  Tag,
  User,
  Flag,
  Layers,
  Plus,
} from 'lucide-react'

interface TaskDetailModalProps {
  isOpen: boolean
  onClose: () => void
  task: Task | null
  milestone?: Milestone
  onEdit: (task: Task) => void
  onDelete: (taskId: string) => void
  onStatusChange: (taskId: string, newStatus: TaskStatus) => void
  onToggleSubtask: (taskId: string, subtaskId: string) => void
  onAddHours: (taskId: string, hoursToAdd: number) => void
}

export const TaskDetailModal: React.FC<TaskDetailModalProps> = ({
  isOpen,
  onClose,
  task,
  milestone,
  onEdit,
  onDelete,
  onStatusChange,
  onToggleSubtask,
  onAddHours,
}) => {
  if (!task) return null

  const isOverdue = isTaskOverdue(task.dueDate, task.status)
  const priorityInfo = PRIORITY_CONFIG[task.priority]
  const { completed, total, percent } = getSubtaskProgress(task.subtasks)

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            {task.id}
          </span>
          <span
            className={`text-xs font-semibold px-2 py-0.5 rounded border ${priorityInfo.borderClass} ${priorityInfo.colorClass}`}
          >
            {priorityInfo.label} Priority
          </span>
        </div>
      }
      maxWidth="xl"
    >
      <div className="space-y-5">
        {/* Title */}
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 leading-snug">
            {task.title}
          </h2>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            {milestone && (
              <span
                className="text-xs font-medium px-2.5 py-0.5 rounded-full text-white flex items-center gap-1.5"
                style={{ backgroundColor: milestone.color }}
              >
                <Layers className="w-3.5 h-3.5" />
                {milestone.title}
              </span>
            )}
            {task.tags.map((t) => (
              <span
                key={t}
                className="text-xs font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center gap-1"
              >
                <Tag className="w-3 h-3 text-slate-400" />
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Status pipeline selector */}
        <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200/60 dark:border-slate-800">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
            <Flag className="w-3.5 h-3.5" /> Stage & Workflow Status
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
            {STATUS_COLUMNS.map((col) => {
              const isActive = task.status === col.id
              return (
                <button
                  key={col.id}
                  type="button"
                  onClick={() => onStatusChange(task.id, col.id)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all text-center border ${
                    isActive
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs font-semibold'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {col.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Description */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
            Overview
          </h4>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap bg-slate-50 dark:bg-slate-800/40 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800">
            {task.description || 'No detailed description provided for this task.'}
          </p>
        </div>

        {/* Subtask checklist */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Subtasks ({completed}/{total})
            </h4>
            {total > 0 && (
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {percent}% Done
              </span>
            )}
          </div>
          {total > 0 && (
            <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mb-3">
              <div
                className={`h-full transition-all duration-300 ${
                  percent === 100 ? 'bg-emerald-500' : 'bg-indigo-500'
                }`}
                style={{ width: `${percent}%` }}
              />
            </div>
          )}

          {task.subtasks.length === 0 ? (
            <p className="text-xs text-slate-400 italic">No subtasks defined. Edit task to add checklist items.</p>
          ) : (
            <div className="space-y-2">
              {task.subtasks.map((st) => (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => onToggleSubtask(task.id, st.id)}
                  className="w-full flex items-center gap-3 p-2.5 rounded-xl text-left bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-indigo-400 transition-colors"
                >
                  {st.completed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  ) : (
                    <Circle className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                  <span
                    className={`text-sm ${
                      st.completed
                        ? 'line-through text-slate-400 dark:text-slate-500'
                        : 'text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    {st.title}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Meta details: Assignee, Due Date, Hours */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          {/* Assignee */}
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
              <User className="w-3.5 h-3.5" /> Assignee
            </div>
            <div className="flex items-center gap-2 mt-1">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold ${task.assignee?.avatarBg || 'bg-indigo-600'}`}
              >
                {task.assignee?.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .slice(0, 2)
                  .toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                  {task.assignee?.name || 'Unassigned'}
                </p>
                <p className="text-[10px] text-slate-400 truncate">{task.assignee?.role}</p>
              </div>
            </div>
          </div>

          {/* Due Date */}
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> Deadline
            </div>
            <p
              className={`text-xs font-semibold mt-2 ${
                isOverdue ? 'text-rose-600 dark:text-rose-400' : 'text-slate-800 dark:text-slate-200'
              }`}
            >
              {task.dueDate} {isOverdue && '(Overdue!)'}
            </p>
          </div>

          {/* Time Logging */}
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> Time Tracking
            </div>
            <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
              {task.loggedHours}h / {task.estimatedHours}h
            </p>
            <div className="flex items-center gap-1.5 mt-2">
              <button
                type="button"
                onClick={() => onAddHours(task.id, 0.5)}
                className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-100 flex items-center gap-0.5"
                title="Quick log 30 minutes"
              >
                <Plus className="w-2.5 h-2.5" /> 0.5h
              </button>
              <button
                type="button"
                onClick={() => onAddHours(task.id, 1)}
                className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-100 flex items-center gap-0.5"
                title="Quick log 1 hour"
              >
                <Plus className="w-2.5 h-2.5" /> 1.0h
              </button>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
          <Button
            type="button"
            variant="danger"
            size="sm"
            leftIcon={<Trash2 className="w-4 h-4" />}
            onClick={() => {
              onClose()
              onDelete(task.id)
            }}
          >
            Delete Task
          </Button>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              leftIcon={<Edit2 className="w-4 h-4" />}
              onClick={() => {
                onClose()
                onEdit(task)
              }}
            >
              Edit Task
            </Button>
            <Button type="button" variant="primary" size="sm" onClick={onClose}>
              Done
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
