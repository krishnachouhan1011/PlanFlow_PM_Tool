import React, { useState } from 'react'
import type { Task, Milestone, TaskStatus } from '../../types'
import { STATUS_COLUMNS } from '../../utils/constants'
import { TaskCard } from './TaskCard'
import { Plus } from 'lucide-react'

interface TaskKanbanProps {
  tasks: Task[]
  milestones: Milestone[]
  onEditTask: (task: Task) => void
  onDeleteTask: (taskId: string) => void
  onStatusChange: (taskId: string, newStatus: TaskStatus) => void
  onViewDetails: (task: Task) => void
  onOpenCreateModalWithStatus: (status: TaskStatus) => void
}

export const TaskKanban: React.FC<TaskKanbanProps> = ({
  tasks,
  milestones,
  onEditTask,
  onDeleteTask,
  onStatusChange,
  onViewDetails,
  onOpenCreateModalWithStatus,
}) => {
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null)
  const [dragOverColumn, setDragOverColumn] = useState<TaskStatus | null>(null)

  const milestoneMap = new Map(milestones.map((m) => [m.id, m]))

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData('text/plain', taskId)
    setDraggedTaskId(taskId)
  }

  const handleDragOver = (e: React.DragEvent, status: TaskStatus) => {
    e.preventDefault()
    setDragOverColumn(status)
  }

  const handleDragLeave = () => {
    setDragOverColumn(null)
  }

  const handleDrop = (e: React.DragEvent, targetStatus: TaskStatus) => {
    e.preventDefault()
    const taskId = e.dataTransfer.getData('text/plain') || draggedTaskId
    if (taskId) {
      onStatusChange(taskId, targetStatus)
    }
    setDraggedTaskId(null)
    setDragOverColumn(null)
  }

  return (
    <div className="w-full overflow-x-auto pb-6">
      <div className="flex gap-4 min-w-[1050px] items-start">
        {STATUS_COLUMNS.map((column) => {
          const columnTasks = tasks.filter((t) => t.status === column.id)
          const isOver = dragOverColumn === column.id

          return (
            <div
              key={column.id}
              onDragOver={(e) => handleDragOver(e, column.id)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, column.id)}
              className={`flex-1 min-w-[210px] max-w-[320px] flex flex-col rounded-2xl bg-slate-100/70 dark:bg-slate-900/40 p-2.5 sm:p-3 border transition-all duration-200 min-h-[450px] ${
                isOver
                  ? 'border-indigo-500 ring-2 ring-indigo-500/20 bg-indigo-50/40 dark:bg-indigo-950/30'
                  : 'border-slate-200/90 dark:border-slate-800'
              }`}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-slate-200 dark:border-slate-800/80">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0 shadow-2xs"
                    style={{ backgroundColor: column.color }}
                  />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                    {column.label}
                  </h3>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shadow-2xs">
                    {columnTasks.length}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenCreateModalWithStatus(column.id)}
                  className="p-1 rounded-lg text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-white dark:hover:bg-slate-800 transition-colors"
                  title={`Add deliverable to ${column.label}`}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Tasks List */}
              <div className="space-y-2.5 flex-1">
                {columnTasks.length === 0 ? (
                  <div className="h-36 flex flex-col items-center justify-center border border-dashed border-slate-300 dark:border-slate-800 rounded-xl text-center p-3 text-slate-400 text-xs bg-white/40 dark:bg-slate-900/20">
                    <p className="font-medium">No tasks in {column.label.toLowerCase()}</p>
                    <button
                      type="button"
                      onClick={() => onOpenCreateModalWithStatus(column.id)}
                      className="mt-2 text-indigo-600 dark:text-indigo-400 font-semibold hover:underline flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" /> Add a task
                    </button>
                  </div>
                ) : (
                  columnTasks.map((task) => (
                    <div
                      key={task.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, task.id)}
                      className="cursor-grab active:cursor-grabbing transition-transform duration-150"
                    >
                      <TaskCard
                        task={task}
                        milestone={milestoneMap.get(task.milestoneId)}
                        onEdit={onEditTask}
                        onDelete={onDeleteTask}
                        onStatusChange={onStatusChange}
                        onViewDetails={onViewDetails}
                      />
                    </div>
                  ))
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
