import React from 'react'
import type { FilterState, Milestone, SortField } from '../../types'
import { STATUS_COLUMNS, PRIORITY_CONFIG } from '../../utils/constants'
import { Search, X, SlidersHorizontal, ArrowUpDown } from 'lucide-react'

interface TaskFilterBarProps {
  filters: FilterState
  onFilterChange: (filters: FilterState) => void
  onResetFilters: () => void
  milestones: Milestone[]
  availableTags: string[]
  totalTasksCount: number
  filteredTasksCount: number
}

export const TaskFilterBar: React.FC<TaskFilterBarProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  milestones,
  availableTags,
  totalTasksCount,
  filteredTasksCount,
}) => {
  const hasActiveFilters =
    filters.search !== '' ||
    filters.status !== 'all' ||
    filters.priority !== 'all' ||
    filters.milestoneId !== 'all' ||
    filters.tag !== 'all' ||
    filters.sortBy !== 'createdAt' ||
    filters.sortOrder !== 'desc'

  const toggleSortOrder = () => {
    onFilterChange({
      ...filters,
      sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc',
    })
  }

  const activeMilestone = milestones.find((m) => m.id === filters.milestoneId)

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-2xs mb-6 space-y-3.5 transition-colors">
      {/* Top search & sort bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
            placeholder="Search deliverables by title, tags, ID, or assignee..."
            className="w-full pl-9 pr-9 py-2 rounded-xl text-sm border border-slate-200 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
          />
          {filters.search && (
            <button
              type="button"
              onClick={() => onFilterChange({ ...filters, search: '' })}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-md"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs">
            <span className="text-slate-400 font-medium">Sort:</span>
            <select
              value={filters.sortBy}
              onChange={(e) => onFilterChange({ ...filters, sortBy: e.target.value as SortField })}
              className="bg-transparent font-semibold text-slate-700 dark:text-slate-200 outline-none cursor-pointer"
            >
              <option value="createdAt">Date Created</option>
              <option value="dueDate">Due Date</option>
              <option value="priority">Priority</option>
              <option value="title">Title (A-Z)</option>
              <option value="estimatedHours">Estimated Hours</option>
            </select>
          </div>

          <button
            type="button"
            onClick={toggleSortOrder}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700/60 text-slate-600 dark:text-slate-300 transition-colors flex items-center gap-1 text-xs font-semibold"
            title={`Sort order: ${filters.sortOrder === 'asc' ? 'Ascending' : 'Descending'}`}
          >
            <ArrowUpDown className="w-3.5 h-3.5" />
            <span className="hidden sm:inline capitalize">{filters.sortOrder}</span>
          </button>
        </div>
      </div>

      {/* Filter Selectors */}
      <div className="flex flex-wrap items-center gap-2 pt-2.5 border-t border-slate-100 dark:border-slate-800/80 text-xs">
        <span className="text-slate-400 font-medium flex items-center gap-1 mr-1">
          <SlidersHorizontal className="w-3.5 h-3.5" /> Filters:
        </span>

        {/* Status */}
        <select
          value={filters.status}
          onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
          className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium outline-none cursor-pointer shadow-2xs"
        >
          <option value="all">All Stages</option>
          {STATUS_COLUMNS.map((col) => (
            <option key={col.id} value={col.id}>
              {col.label}
            </option>
          ))}
        </select>

        {/* Priority */}
        <select
          value={filters.priority}
          onChange={(e) => onFilterChange({ ...filters, priority: e.target.value })}
          className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium outline-none cursor-pointer shadow-2xs"
        >
          <option value="all">All Priorities</option>
          {Object.entries(PRIORITY_CONFIG).map(([key, conf]) => (
            <option key={key} value={key}>
              {conf.label} Priority
            </option>
          ))}
        </select>

        {/* Milestone */}
        <select
          value={filters.milestoneId}
          onChange={(e) => onFilterChange({ ...filters, milestoneId: e.target.value })}
          className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium outline-none cursor-pointer shadow-2xs"
        >
          <option value="all">All Sprints</option>
          {milestones.map((m) => (
            <option key={m.id} value={m.id}>
              {m.title}
            </option>
          ))}
        </select>

        {/* Tag */}
        {availableTags.length > 0 && (
          <select
            value={filters.tag}
            onChange={(e) => onFilterChange({ ...filters, tag: e.target.value })}
            className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium outline-none cursor-pointer shadow-2xs"
          >
            <option value="all">All Tags</option>
            {availableTags.map((tag) => (
              <option key={tag} value={tag}>
                #{tag}
              </option>
            ))}
          </select>
        )}

        {/* Counter and Reset */}
        <div className="ml-auto flex items-center gap-2.5">
          <span className="text-slate-500 dark:text-slate-400 text-xs">
            Showing <strong className="text-slate-900 dark:text-slate-100 font-bold">{filteredTasksCount}</strong> of{' '}
            {totalTasksCount} tasks
          </span>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={onResetFilters}
              className="text-xs text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 font-semibold hover:underline flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" /> Reset filters
            </button>
          )}
        </div>
      </div>

      {/* Active Filter Chips Pill Row */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-[11px] font-semibold text-slate-400">Active filters:</span>
          {filters.status !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 text-[11px] font-semibold">
              Status: {STATUS_COLUMNS.find((s) => s.id === filters.status)?.label}
              <button
                type="button"
                onClick={() => onFilterChange({ ...filters, status: 'all' })}
                className="hover:text-rose-600 font-bold"
              >
                ×
              </button>
            </span>
          )}
          {filters.priority !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 text-[11px] font-semibold">
              Priority: {PRIORITY_CONFIG[filters.priority as keyof typeof PRIORITY_CONFIG]?.label}
              <button
                type="button"
                onClick={() => onFilterChange({ ...filters, priority: 'all' })}
                className="hover:text-rose-600 font-bold"
              >
                ×
              </button>
            </span>
          )}
          {filters.milestoneId !== 'all' && activeMilestone && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 text-[11px] font-semibold">
              Sprint: {activeMilestone.title}
              <button
                type="button"
                onClick={() => onFilterChange({ ...filters, milestoneId: 'all' })}
                className="hover:text-rose-600 font-bold"
              >
                ×
              </button>
            </span>
          )}
          {filters.tag !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 text-[11px] font-semibold">
              Tag: #{filters.tag}
              <button
                type="button"
                onClick={() => onFilterChange({ ...filters, tag: 'all' })}
                className="hover:text-rose-600 font-bold"
              >
                ×
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  )
}
