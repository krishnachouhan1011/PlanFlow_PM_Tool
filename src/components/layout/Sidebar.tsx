import React from 'react'
import type { ViewMode, FilterState, Milestone, Task } from '../../types'
import { isTaskOverdue } from '../../utils/filterSort'
import {
  Kanban,
  List,
  Layers,
  BarChart3,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Flame,
  X,
  Target,
  ChevronRight,
} from 'lucide-react'

interface SidebarProps {
  currentView: ViewMode
  onViewChange: (view: ViewMode) => void
  filters: FilterState
  onFilterChange: (filters: FilterState) => void
  tasks: Task[]
  milestones: Milestone[]
  isOpenMobile: boolean
  onCloseMobile: () => void
  isDesktopOpen: boolean
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onViewChange,
  filters,
  onFilterChange,
  tasks,
  milestones,
  isOpenMobile,
  onCloseMobile,
  isDesktopOpen,
}) => {
  const overdueCount = tasks.filter((t) => isTaskOverdue(t.dueDate, t.status)).length
  const urgentCount = tasks.filter((t) => t.priority === 'urgent' || t.priority === 'high').length
  const inProgressCount = tasks.filter((t) => t.status === 'in_progress').length
  const doneCount = tasks.filter((t) => t.status === 'done').length

  const handleQuickFilter = (type: 'all' | 'in_progress' | 'urgent' | 'overdue' | 'done') => {
    switch (type) {
      case 'in_progress':
        onFilterChange({ ...filters, status: 'in_progress', priority: 'all', search: '' })
        break
      case 'urgent':
        onFilterChange({ ...filters, priority: 'urgent', status: 'all', search: '' })
        break
      case 'overdue':
        onFilterChange({ ...filters, status: 'all', priority: 'all', search: '' })
        break
      case 'done':
        onFilterChange({ ...filters, status: 'done', priority: 'all', search: '' })
        break
      case 'all':
      default:
        onFilterChange({ ...filters, status: 'all', priority: 'all', tag: 'all', milestoneId: 'all', search: '' })
        break
    }
    if (isOpenMobile) onCloseMobile()
  }

  const content = (
    <div className="flex flex-col h-full py-4 px-3.5 select-none">
      {/* Mobile close button */}
      <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-200 dark:border-slate-800 lg:hidden">
        <span className="font-bold text-slate-800 dark:text-slate-100 text-sm">Navigation Menu</span>
        <button
          type="button"
          onClick={onCloseMobile}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile Views Switcher */}
      <div className="md:hidden mb-4">
        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-2 mb-1.5">
          Workspace Views
        </div>
        <div className="space-y-1">
          <button
            type="button"
            onClick={() => {
              onViewChange('kanban')
              onCloseMobile()
            }}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold ${
              currentView === 'kanban'
                ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <Kanban className="w-4 h-4" />
            <span>Kanban Board</span>
          </button>
          <button
            type="button"
            onClick={() => {
              onViewChange('list')
              onCloseMobile()
            }}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold ${
              currentView === 'list'
                ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <List className="w-4 h-4" />
            <span>List Table</span>
          </button>
          <button
            type="button"
            onClick={() => {
              onViewChange('milestones')
              onCloseMobile()
            }}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold ${
              currentView === 'milestones'
                ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Milestones &amp; Sprints</span>
          </button>
          <button
            type="button"
            onClick={() => {
              onViewChange('analytics')
              onCloseMobile()
            }}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold ${
              currentView === 'analytics'
                ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Analytics Dashboard</span>
          </button>
          <button
            type="button"
            onClick={() => {
              onViewChange('about')
              onCloseMobile()
            }}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold ${
              currentView === 'about'
                ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <div className="w-4 h-4 rounded bg-indigo-600 text-white text-[9px] font-bold flex items-center justify-center">
              KC
            </div>
            <span>About Krishna Chouhan</span>
          </button>
        </div>
      </div>

      {/* Quick Filters */}
      <div className="mb-5">
        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-2 mb-2">
          Deliverable Status
        </div>
        <div className="space-y-1">
          <button
            type="button"
            onClick={() => handleQuickFilter('all')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
              filters.status === 'all' && filters.priority === 'all' && filters.milestoneId === 'all'
                ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 font-semibold border border-indigo-200 dark:border-indigo-800'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
            }`}
          >
            <span className="flex items-center gap-2">
              <Target className="w-3.5 h-3.5 text-indigo-500" /> All Deliverables
            </span>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-200/60 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              {tasks.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleQuickFilter('in_progress')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
              filters.status === 'in_progress'
                ? 'bg-amber-50 text-amber-800 dark:bg-amber-950/50 dark:text-amber-200 font-semibold border border-amber-200 dark:border-amber-800'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
            }`}
          >
            <span className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-amber-500" /> In Development
            </span>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300">
              {inProgressCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleQuickFilter('urgent')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
              filters.priority === 'urgent'
                ? 'bg-rose-50 text-rose-800 dark:bg-rose-950/50 dark:text-rose-200 font-semibold border border-rose-200 dark:border-rose-800'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
            }`}
          >
            <span className="flex items-center gap-2">
              <Flame className="w-3.5 h-3.5 text-rose-500" /> High &amp; Urgent
            </span>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300">
              {urgentCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleQuickFilter('done')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
              filters.status === 'done'
                ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-200 font-semibold border border-emerald-200 dark:border-emerald-800'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
            }`}
          >
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Completed
            </span>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300">
              {doneCount}
            </span>
          </button>

          {overdueCount > 0 && (
            <button
              type="button"
              onClick={() => handleQuickFilter('overdue')}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/50 transition-colors border border-rose-200 dark:border-rose-800"
            >
              <span className="flex items-center gap-2 font-semibold">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600" /> Overdue Attention
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-600 text-white">
                {overdueCount}
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Sprints / Milestones */}
      <div className="mb-5 flex-1 overflow-y-auto">
        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-2 mb-2">
          Sprint Iterations
        </div>
        <div className="space-y-1">
          {milestones.map((m) => {
            const count = tasks.filter((t) => t.milestoneId === m.id).length
            const isSelected = filters.milestoneId === m.id

            return (
              <button
                key={m.id}
                type="button"
                onClick={() => {
                  onFilterChange({
                    ...filters,
                    milestoneId: isSelected ? 'all' : m.id,
                  })
                  if (isOpenMobile) onCloseMobile()
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                  isSelected
                    ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 font-semibold border border-indigo-200 dark:border-indigo-800 shadow-2xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0 shadow-2xs" style={{ backgroundColor: m.color }} />
                  <span className="truncate">{m.title}</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-slate-400 shrink-0">
                  <span className="font-semibold">{count}</span>
                  <ChevronRight className="w-3 h-3 text-slate-400" />
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Project Status Card */}
      <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 shadow-2xs">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
            Sprint Velocity
          </span>
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
            {tasks.length > 0 ? Math.round((doneCount / tasks.length) * 100) : 0}%
          </span>
        </div>
        <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mb-2">
          <div
            className="h-full bg-indigo-600 rounded-full transition-all duration-300"
            style={{ width: `${tasks.length > 0 ? Math.round((doneCount / tasks.length) * 100) : 0}%` }}
          />
        </div>
        <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
          {doneCount} of {tasks.length} total deliverables shipped
        </p>
      </div>

      {/* Creator Profile Link Card */}
      <button
        type="button"
        onClick={() => {
          onViewChange('about')
          if (isOpenMobile) onCloseMobile()
        }}
        className="mt-3 p-3 rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 hover:border-indigo-400 dark:hover:border-indigo-600 transition-all flex items-center gap-3 text-left shadow-2xs group"
      >
        <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-black text-xs flex items-center justify-center shrink-0 shadow-xs">
          KC
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
            Krishna Chouhan
          </p>
          <p className="text-[10px] text-slate-400 truncate">Project Manager &amp; Lead</p>
        </div>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 shrink-0" />
      </button>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar (collapsible) */}
      <aside
        className={`hidden lg:block shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-all duration-200 ${
          isDesktopOpen ? 'w-64' : 'w-0 overflow-hidden border-none'
        }`}
      >
        <div className="w-64 h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto">
          {content}
        </div>
      </aside>

      {/* Mobile Drawer */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="relative w-72 max-w-[85vw] bg-white dark:bg-slate-900 h-full shadow-2xl z-10">
            {content}
          </div>
        </div>
      )}
    </>
  )
}
