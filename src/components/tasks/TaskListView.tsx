import React from 'react'
import type { Task, Milestone, TaskStatus } from '../../types'
import { PRIORITY_CONFIG, STATUS_COLUMNS } from '../../utils/constants'
import { isTaskOverdue, getSubtaskProgress } from '../../utils/filterSort'
import { Edit2, Trash2, Calendar, Eye, CheckSquare, Clock } from 'lucide-react'

interface TaskListViewProps {
  tasks: Task[]
  milestones: Milestone[]
  onEditTask: (task: Task) => void
  onDeleteTask: (taskId: string) => void
  onStatusChange: (taskId: string, newStatus: TaskStatus) => void
  onViewDetails: (task: Task) => void
}

export const TaskListView: React.FC<TaskListViewProps> = ({
  tasks,
  milestones,
  onEditTask,
  onDeleteTask,
  onStatusChange,
  onViewDetails,
}) => {
  const milestoneMap = new Map(milestones.map((m) => [m.id, m]))

  if (tasks.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 text-center text-slate-500 text-sm">
        No tasks match the active filters.
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 min-w-[240px]">Task</th>
              <th className="py-3 px-4">Priority</th>
              <th className="py-3 px-4">Milestone</th>
              <th className="py-3 px-4">Assignee</th>
              <th className="py-3 px-4">Due Date</th>
              <th className="py-3 px-4">Subtasks</th>
              <th className="py-3 px-4">Hours</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
            {tasks.map((task) => {
              const priorityInfo = PRIORITY_CONFIG[task.priority]
              const isOverdue = isTaskOverdue(task.dueDate, task.status)
              const milestone = milestoneMap.get(task.milestoneId)
              const { completed, total } = getSubtaskProgress(task.subtasks)

              return (
                <tr
                  key={task.id}
                  className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors group"
                >
                  {/* Status Dropdown */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <select
                      value={task.status}
                      onChange={(e) => onStatusChange(task.id, e.target.value as TaskStatus)}
                      className="text-xs font-semibold px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 cursor-pointer shadow-2xs outline-none"
                    >
                      {STATUS_COLUMNS.map((col) => (
                        <option key={col.id} value={col.id}>
                          {col.label}
                        </option>
                      ))}
                    </select>
                  </td>

                  {/* ID & Title */}
                  <td className="py-3.5 px-4">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-semibold text-slate-400">
                          {task.id}
                        </span>
                        <button
                          type="button"
                          onClick={() => onViewDetails(task)}
                          className="font-semibold text-slate-800 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-400 text-left transition-colors line-clamp-1"
                        >
                          {task.title}
                        </button>
                      </div>
                      {task.tags.length > 0 && (
                        <div className="flex items-center gap-1 mt-1">
                          {task.tags.map((t) => (
                            <span
                              key={t}
                              className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-500"
                            >
                              #{t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Priority */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-md border ${priorityInfo.borderClass} ${priorityInfo.colorClass}`}
                    >
                      {priorityInfo.label}
                    </span>
                  </td>

                  {/* Milestone */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    {milestone ? (
                      <span
                        className="text-xs font-medium px-2 py-0.5 rounded-full text-white"
                        style={{ backgroundColor: milestone.color }}
                      >
                        {milestone.title}
                      </span>
                    ) : (
                      <span className="text-xs text-slate-400">—</span>
                    )}
                  </td>

                  {/* Assignee */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold ${task.assignee?.avatarBg || 'bg-indigo-600'}`}
                      >
                        {task.assignee?.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')
                          .slice(0, 2)
                          .toUpperCase()}
                      </div>
                      <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                        {task.assignee?.name}
                      </span>
                    </div>
                  </td>

                  {/* Due Date */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <div
                      className={`flex items-center gap-1.5 text-xs font-medium ${
                        isOverdue
                          ? 'text-rose-600 dark:text-rose-400 font-bold'
                          : 'text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{task.dueDate}</span>
                      {isOverdue && <span className="text-[10px] uppercase font-bold text-rose-500">Overdue</span>}
                    </div>
                  </td>

                  {/* Subtasks */}
                  <td className="py-3.5 px-4 whitespace-nowrap text-xs text-slate-600 dark:text-slate-400">
                    {total > 0 ? (
                      <span className="flex items-center gap-1">
                        <CheckSquare className="w-3.5 h-3.5 text-slate-400" />
                        {completed}/{total}
                      </span>
                    ) : (
                      <span className="text-slate-300 dark:text-slate-600">—</span>
                    )}
                  </td>

                  {/* Hours */}
                  <td className="py-3.5 px-4 whitespace-nowrap text-xs text-slate-600 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {task.loggedHours}/{task.estimatedHours}h
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => onViewDetails(task)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        title="View details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onEditTask(task)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-slate-800 transition-colors"
                        title="Edit task"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDeleteTask(task.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                        title="Delete task"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
