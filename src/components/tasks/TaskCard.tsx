import React, { useState, useRef, useEffect } from 'react'
import type { Task, Milestone, TaskStatus } from '../../types'
import { PRIORITY_CONFIG, STATUS_COLUMNS } from '../../utils/constants'
import { isTaskOverdue, getSubtaskProgress } from '../../utils/filterSort'
import { Calendar, CheckSquare, Clock, MoreVertical, Edit2, Trash2, ArrowRight } from 'lucide-react'

interface TaskCardProps {
  task: Task
  milestone?: Milestone
  onEdit: (task: Task) => void
  onDelete: (taskId: string) => void
  onStatusChange: (taskId: string, newStatus: TaskStatus) => void
  onViewDetails: (task: Task) => void
  onToggleSubtask?: (taskId: string, subtaskId: string) => void
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  milestone,
  onEdit,
  onDelete,
  onStatusChange,
  onViewDetails,
}) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const isOverdue = isTaskOverdue(task.dueDate, task.status)
  const { completed, total, percent } = getSubtaskProgress(task.subtasks)
  const priorityInfo = PRIORITY_CONFIG[task.priority]

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [menuOpen])

  return (
    <div className="group relative bg-white dark:bg-slate-900 rounded-xl border border-slate-200/90 dark:border-slate-800 p-3 shadow-2xs hover:shadow-md transition-all duration-150 flex flex-col justify-between hover:border-indigo-300 dark:hover:border-indigo-600/70 select-none">
      <div>
        {/* Top Header: ID, Priority, and Quick Menu */}
        <div className="flex items-center justify-between gap-1.5 mb-1.5">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500">
              {task.id}
            </span>
            <span
              className={`text-[10px] font-semibold px-1.5 py-0.2 rounded border ${priorityInfo.borderClass} ${priorityInfo.colorClass}`}
            >
              {priorityInfo.label}
            </span>
          </div>

          {/* Action Menu */}
          <div className="relative" ref={menuRef}>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setMenuOpen(!menuOpen)
              }}
              className="p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Task options"
            >
              <MoreVertical className="w-3.5 h-3.5" />
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-6 w-44 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-1.5 z-30 animate-in fade-in zoom-in-95">
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false)
                    onViewDetails(task)
                  }}
                  className="w-full text-left px-3 py-1.5 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center gap-2"
                >
                  <span>View Details</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false)
                    onEdit(task)
                  }}
                  className="w-full text-left px-3 py-1.5 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center gap-2"
                >
                  <Edit2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>Edit Deliverable</span>
                </button>

                <div className="my-1 border-t border-slate-100 dark:border-slate-700" />

                <div className="px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Move Stage
                </div>
                {STATUS_COLUMNS.map((col) => (
                  <button
                    key={col.id}
                    type="button"
                    disabled={task.status === col.id}
                    onClick={() => {
                      setMenuOpen(false)
                      onStatusChange(task.id, col.id)
                    }}
                    className={`w-full text-left px-3 py-1 text-xs flex items-center justify-between ${
                      task.status === col.id
                        ? 'text-indigo-600 dark:text-indigo-400 font-semibold bg-indigo-50/50 dark:bg-indigo-950/30'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                    }`}
                  >
                    <span>{col.label}</span>
                    {task.status !== col.id && <ArrowRight className="w-3 h-3 text-slate-300" />}
                  </button>
                ))}

                <div className="my-1 border-t border-slate-100 dark:border-slate-700" />

                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false)
                    onDelete(task.id)
                  }}
                  className="w-full text-left px-3 py-1.5 text-xs text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center gap-2"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Task</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Title */}
        <div
          onClick={() => onViewDetails(task)}
          className="cursor-pointer mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors"
        >
          <h4 className="text-xs font-semibold text-slate-800 dark:text-slate-100 line-clamp-2 leading-snug">
            {task.title}
          </h4>
        </div>

        {/* Milestone & Tags Row */}
        <div className="flex flex-wrap items-center gap-1 mb-2">
          {milestone && (
            <span
              className="text-[9px] font-semibold px-1.5 py-0.5 rounded text-white shadow-2xs truncate max-w-[140px]"
              style={{ backgroundColor: milestone.color || '#4f46e5' }}
              title={milestone.title}
            >
              {milestone.title}
            </span>
          )}
          {task.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
            >
              #{tag}
            </span>
          ))}
          {task.tags.length > 2 && (
            <span className="text-[9px] text-slate-400">+{task.tags.length - 2}</span>
          )}
        </div>
      </div>

      {/* Footer Info: Subtask count, Due date, Assignee */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-2.5">
          {/* Due date */}
          {task.dueDate && (
            <span
              className={`flex items-center gap-1 font-medium ${
                isOverdue
                  ? 'text-rose-600 dark:text-rose-400 font-bold'
                  : 'text-slate-500 dark:text-slate-400'
              }`}
              title={isOverdue ? 'Task is past due date!' : 'Due date'}
            >
              <Calendar className="w-3 h-3 text-slate-400 shrink-0" />
              <span>{task.dueDate.slice(5)}</span>
              {isOverdue && <span className="text-[9px] font-extrabold">!</span>}
            </span>
          )}

          {/* Subtasks Progress */}
          {total > 0 && (
            <span
              className="flex items-center gap-1 text-[10px] font-medium"
              title={`Checklist: ${completed}/${total} completed (${percent}%)`}
            >
              <CheckSquare className="w-3 h-3 text-slate-400 shrink-0" />
              <span className={percent === 100 ? 'text-emerald-600 dark:text-emerald-400 font-bold' : ''}>
                {completed}/{total} ({percent}%)
              </span>
            </span>
          )}

          {/* Hours logged */}
          {(task.estimatedHours > 0 || task.loggedHours > 0) && (
            <span
              className="hidden sm:flex items-center gap-0.5 text-[10px] text-slate-400"
              title={`Logged: ${task.loggedHours}h / Est: ${task.estimatedHours}h`}
            >
              <Clock className="w-3 h-3 text-slate-400" />
              <span>{task.loggedHours}/{task.estimatedHours}h</span>
            </span>
          )}
        </div>

        {/* Assignee Avatar */}
        {task.assignee && (
          <div
            className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-[9px] font-bold shadow-2xs shrink-0 ${task.assignee.avatarBg || 'bg-indigo-600'}`}
            title={`${task.assignee.name} (${task.assignee.role})`}
          >
            {task.assignee.name
              .split(' ')
              .map((n) => n[0])
              .join('')
              .slice(0, 2)
              .toUpperCase()}
          </div>
        )}
      </div>
    </div>
  )
}
