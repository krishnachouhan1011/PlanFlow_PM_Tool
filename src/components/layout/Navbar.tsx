import React, { useState, useRef, useEffect } from 'react'
import type { ViewMode } from '../../types'
import { Button } from '../common/Button'
import {
  Kanban,
  List,
  Layers,
  BarChart3,
  Plus,
  Download,
  Copy,
  RotateCcw,
  Trash2,
  Menu,
  ChevronDown,
  Upload,
  Check,
  Sun,
  Moon,
  PanelLeft,
  User,
  Info,
} from 'lucide-react'

interface NavbarProps {
  currentView: ViewMode
  onViewChange: (view: ViewMode) => void
  onOpenCreateTask: () => void
  onOpenAboutToolModal: () => void
  onExportCSV: () => void
  onExportJSON: () => void
  onImportJSON: (file: File) => void
  onCopySummary: () => void
  onResetSampleData: () => void
  onClearAllData: () => void
  onToggleMobileSidebar: () => void
  onToggleDesktopSidebar: () => void
  isDesktopSidebarOpen: boolean
  copiedSummary: boolean
  theme: 'light' | 'dark'
  onToggleTheme: () => void
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onViewChange,
  onOpenCreateTask,
  onOpenAboutToolModal,
  onExportCSV,
  onExportJSON,
  onImportJSON,
  onCopySummary,
  onResetSampleData,
  onClearAllData,
  onToggleMobileSidebar,
  onToggleDesktopSidebar,
  isDesktopSidebarOpen,
  copiedSummary,
  theme,
  onToggleTheme,
}) => {
  const [dataMenuOpen, setDataMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setDataMenuOpen(false)
      }
    }
    if (dataMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dataMenuOpen])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onImportJSON(file)
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    setDataMenuOpen(false)
  }

  const views: { id: ViewMode; label: string; icon: React.ReactNode }[] = [
    { id: 'kanban', label: 'Kanban Board', icon: <Kanban className="w-3.5 h-3.5" /> },
    { id: 'list', label: 'List Table', icon: <List className="w-3.5 h-3.5" /> },
    { id: 'milestones', label: 'Milestones', icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-3.5 h-3.5" /> },
    { id: 'about', label: 'About Krishna', icon: <User className="w-3.5 h-3.5" /> },
  ]

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-2xs transition-colors">
      <div className="w-full px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand + Sidebar Toggles */}
        <div className="flex items-center gap-3">
          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={onToggleMobileSidebar}
            className="lg:hidden p-2 rounded-xl text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle navigation drawer"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Desktop sidebar toggle button */}
          <button
            type="button"
            onClick={onToggleDesktopSidebar}
            className="hidden lg:flex p-2 rounded-xl text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={isDesktopSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
            aria-label="Toggle sidebar"
          >
            <PanelLeft className="w-4 h-4" />
          </button>

          {/* Brand Logo */}
          <div className="flex items-center gap-2.5 select-none">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-indigo-400 text-white flex items-center justify-center font-black text-sm shadow-md shadow-indigo-500/25 tracking-tighter">
              PF
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-slate-900 dark:text-slate-100 text-base tracking-tight">
                  PlanFlow
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-sm bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                  v1.0
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
                Project &amp; Sprint Management
              </p>
            </div>

            <button
              type="button"
              onClick={onOpenAboutToolModal}
              className="p-1 rounded-lg text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ml-0.5"
              title="About PlanFlow &amp; Architecture"
              aria-label="About PlanFlow"
            >
              <Info className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Center: View Switcher (Desktop & Tablet) */}
        <nav className="hidden md:flex items-center p-1 bg-slate-100/90 dark:bg-slate-800/80 rounded-xl border border-slate-200/80 dark:border-slate-700/60 shadow-2xs">
          {views.map((v) => {
            const isActive = currentView === v.id
            return (
              <button
                key={v.id}
                type="button"
                onClick={() => onViewChange(v.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  isActive
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                {v.icon}
                <span>{v.label}</span>
              </button>
            )
          })}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Krishna Chouhan Profile Pill */}
          <button
            type="button"
            onClick={() => onViewChange('about')}
            className={`flex items-center gap-2 p-1 pl-1.5 pr-2.5 rounded-xl border transition-all ${
              currentView === 'about'
                ? 'border-indigo-500 ring-2 ring-indigo-500/20 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-indigo-400'
            }`}
            title="Krishna Chouhan Profile & Contact"
          >
            <div className="w-6 h-6 rounded-lg bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
              KC
            </div>
            <span className="hidden sm:inline text-xs font-semibold truncate max-w-[110px]">
              Krishna C.
            </span>
          </button>

          {/* Light / Dark Mode Toggle */}
          <button
            type="button"
            onClick={onToggleTheme}
            className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/60 transition-colors shadow-2xs"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-600" />
            )}
          </button>

          {/* Data Tools Menu */}
          <div className="relative" ref={menuRef}>
            <button
              type="button"
              onClick={() => setDataMenuOpen(!dataMenuOpen)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/60 transition-colors shadow-2xs"
            >
              <span>Data Actions</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {dataMenuOpen && (
              <div className="absolute right-0 top-11 w-56 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-1.5 z-50 animate-in fade-in zoom-in-95">
                <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Export &amp; Share
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setDataMenuOpen(false)
                    onExportCSV()
                  }}
                  className="w-full text-left px-3 py-1.5 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center gap-2"
                >
                  <Download className="w-3.5 h-3.5 text-slate-400" />
                  <span>Export to CSV (.csv)</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setDataMenuOpen(false)
                    onExportJSON()
                  }}
                  className="w-full text-left px-3 py-1.5 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center gap-2"
                >
                  <Download className="w-3.5 h-3.5 text-slate-400" />
                  <span>Export Backup (.json)</span>
                </button>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full text-left px-3 py-1.5 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center gap-2"
                >
                  <Upload className="w-3.5 h-3.5 text-slate-400" />
                  <span>Import Backup (.json)</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setDataMenuOpen(false)
                    onCopySummary()
                  }}
                  className="w-full text-left px-3 py-1.5 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center gap-2"
                >
                  {copiedSummary ? (
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                  )}
                  <span>Copy Standup Summary</span>
                </button>

                <div className="my-1.5 border-t border-slate-100 dark:border-slate-700" />

                <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Data Reset
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setDataMenuOpen(false)
                    onResetSampleData()
                  }}
                  className="w-full text-left px-3 py-1.5 text-xs text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/30 flex items-center gap-2"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset to Sample Data</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setDataMenuOpen(false)
                    onClearAllData()
                  }}
                  className="w-full text-left px-3 py-1.5 text-xs text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center gap-2"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear All Project Data</span>
                </button>
              </div>
            )}
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".json,application/json"
            className="hidden"
          />

          {/* Primary Action Button */}
          <Button
            type="button"
            variant="primary"
            size="sm"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={onOpenCreateTask}
            className="shadow-sm shadow-indigo-500/20"
          >
            <span className="hidden sm:inline">New Deliverable</span>
            <span className="sm:hidden">Task</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
