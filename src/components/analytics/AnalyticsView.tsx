import React from 'react'
import type { Task, Milestone } from '../../types'
import { STATUS_COLUMNS, PRIORITY_CONFIG } from '../../utils/constants'
import { isTaskOverdue } from '../../utils/filterSort'
import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  BarChart3,
  Users,
  Target,
  TrendingUp,
  Layers,
} from 'lucide-react'

interface AnalyticsViewProps {
  tasks: Task[]
  milestones: Milestone[]
  onViewTaskDetails: (task: Task) => void
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({
  tasks,
  milestones,
  onViewTaskDetails,
}) => {
  const totalTasks = tasks.length
  const completedTasks = tasks.filter((t) => t.status === 'done').length
  const inProgressTasks = tasks.filter((t) => t.status === 'in_progress').length
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  const totalEstHours = tasks.reduce((sum, t) => sum + (t.estimatedHours || 0), 0)
  const totalLoggedHours = tasks.reduce((sum, t) => sum + (t.loggedHours || 0), 0)

  const overdueTasks = tasks.filter((t) => isTaskOverdue(t.dueDate, t.status))

  // Assignee distribution
  const assigneeStats = tasks.reduce((acc, t) => {
    const name = t.assignee?.name || 'Unassigned'
    if (!acc[name]) {
      acc[name] = {
        name,
        avatarBg: t.assignee?.avatarBg || 'bg-slate-500',
        role: t.assignee?.role || 'Contributor',
        count: 0,
        doneCount: 0,
        loggedHours: 0,
      }
    }
    acc[name].count += 1
    if (t.status === 'done') acc[name].doneCount += 1
    acc[name].loggedHours += t.loggedHours || 0
    return acc
  }, {} as Record<string, { name: string; avatarBg: string; role: string; count: number; doneCount: number; loggedHours: number }>)

  return (
    <div className="space-y-6">
      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Completion Rate */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Completion Rate</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 dark:text-slate-100">{completionRate}%</span>
            <span className="text-xs text-slate-500">
              ({completedTasks}/{totalTasks} done)
            </span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full mt-3 overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${completionRate}%` }}
            />
          </div>
        </div>

        {/* Active In-Progress */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Active Workload</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 dark:text-slate-100">{inProgressTasks}</span>
            <span className="text-xs text-slate-500">tasks in progress</span>
          </div>
          <p className="text-xs text-slate-400 mt-3">
            {tasks.filter((t) => t.status === 'review').length} awaiting QA / review
          </p>
        </div>

        {/* Hours Logged vs Estimated */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Hours Burned</span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 dark:text-slate-100">{totalLoggedHours}h</span>
            <span className="text-xs text-slate-500">of {totalEstHours}h est.</span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full mt-3 overflow-hidden">
            <div
              className="h-full bg-indigo-500 rounded-full transition-all duration-500"
              style={{
                width: `${totalEstHours > 0 ? Math.min(100, Math.round((totalLoggedHours / totalEstHours) * 100)) : 0}%`,
              }}
            />
          </div>
        </div>

        {/* Overdue Attention */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Overdue Tasks</span>
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                overdueTasks.length > 0
                  ? 'bg-rose-50 dark:bg-rose-950/50 text-rose-600'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-400'
              }`}
            >
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span
              className={`text-2xl font-bold ${
                overdueTasks.length > 0 ? 'text-rose-600 dark:text-rose-400' : 'text-slate-900 dark:text-slate-100'
              }`}
            >
              {overdueTasks.length}
            </span>
            <span className="text-xs text-slate-500">require immediate focus</span>
          </div>
          <p className="text-xs text-slate-400 mt-3">
            {overdueTasks.length === 0 ? 'All deadlines are on track!' : 'Click list below to resolve'}
          </p>
        </div>
      </div>

      {/* Grid: Status Distribution & Priority Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Workflow Stage Breakdown */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200 mb-4 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-indigo-600" />
            Workflow Stage Distribution
          </h3>
          <div className="space-y-3">
            {STATUS_COLUMNS.map((col) => {
              const count = tasks.filter((t) => t.status === col.id).length
              const pct = totalTasks > 0 ? Math.round((count / totalTasks) * 100) : 0
              return (
                <div key={col.id}>
                  <div className="flex items-center justify-between text-xs font-semibold mb-1">
                    <span className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: col.color }} />
                      {col.label}
                    </span>
                    <span className="text-slate-500">
                      {count} ({pct}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{ width: `${pct}%`, backgroundColor: col.color }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Priority Matrix */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200 mb-4 flex items-center gap-2">
            <Target className="w-4 h-4 text-indigo-600" />
            Priority Breakdown
          </h3>
          <div className="space-y-3">
            {(['urgent', 'high', 'medium', 'low'] as const).map((p) => {
              const conf = PRIORITY_CONFIG[p]
              const count = tasks.filter((t) => t.priority === p).length
              const pct = totalTasks > 0 ? Math.round((count / totalTasks) * 100) : 0
              return (
                <div key={p}>
                  <div className="flex items-center justify-between text-xs font-semibold mb-1">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${conf.colorClass}`}>
                      {conf.label}
                    </span>
                    <span className="text-slate-500">
                      {count} tasks ({pct}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-slate-500 transition-all duration-300"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Team Distribution & Overdue Attention List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Team Workload */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200 mb-4 flex items-center gap-2">
            <Users className="w-4 h-4 text-indigo-600" />
            Team Workload & Hours
          </h3>
          <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
            {Object.values(assigneeStats).map((member) => (
              <div key={member.name} className="py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold ${member.avatarBg}`}
                  >
                    {member.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .slice(0, 2)
                      .toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">{member.name}</p>
                    <p className="text-[10px] text-slate-400">{member.role}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    {member.count} tasks ({member.doneCount} done)
                  </span>
                  <p className="text-[10px] text-slate-400">{member.loggedHours}h logged</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Overdue Attention Card */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col">
          <h3 className="text-sm font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Overdue Deliverables ({overdueTasks.length})
          </h3>

          {overdueTasks.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center text-slate-400 text-xs">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mb-2" />
              <p className="font-medium text-slate-700 dark:text-slate-300">Clean bill of health!</p>
              <p className="text-[11px] mt-0.5">No tasks are currently past their due date.</p>
            </div>
          ) : (
            <div className="space-y-2 overflow-y-auto max-h-64">
              {overdueTasks.map((t) => (
                <div
                  key={t.id}
                  onClick={() => onViewTaskDetails(t)}
                  className="p-3 rounded-xl border border-rose-200 dark:border-rose-900/50 bg-rose-50/50 dark:bg-rose-950/20 hover:border-rose-300 cursor-pointer transition-all flex items-center justify-between"
                >
                  <div className="min-w-0 pr-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-rose-600 dark:text-rose-400">
                        {t.id}
                      </span>
                      <span className="text-xs font-semibold text-slate-800 dark:text-slate-100 truncate">
                        {t.title}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Target was: <strong>{t.dueDate}</strong> • Assigned: {t.assignee?.name}
                    </p>
                  </div>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300 shrink-0">
                    Fix Now
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Milestones Health Card */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200 mb-4 flex items-center gap-2">
          <Layers className="w-4 h-4 text-indigo-600" />
          Milestone Delivery Status ({milestones.length})
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {milestones.map((m) => {
              const mTasks = tasks.filter((t) => t.milestoneId === m.id)
              const mDone = mTasks.filter((t) => t.status === 'done').length
              const pct = mTasks.length > 0 ? Math.round((mDone / mTasks.length) * 100) : 0
              return (
                <div
                  key={m.id}
                  className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: m.color }} />
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                      {m.title}
                    </h4>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-500 mb-1">
                    <span>{pct}% Done</span>
                    <span>
                      {mDone}/{mTasks.length} tasks
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{ width: `${pct}%`, backgroundColor: m.color }}
                    />
                  </div>
                  <p className="text-[10px] text-slate-400 mt-2">Target: {m.targetDate}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
