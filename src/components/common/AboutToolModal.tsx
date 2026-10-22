import React from 'react'
import { Modal } from './Modal'
import { Button } from './Button'
import {
  Kanban,
  Clock,
  Layers,
  BarChart3,
  Download,
  Copy,
  ExternalLink,
  Sparkles,
} from 'lucide-react'

interface AboutToolModalProps {
  isOpen: boolean
  onClose: () => void
  onNavigateToAboutMe: () => void
}

export const AboutToolModal: React.FC<AboutToolModalProps> = ({
  isOpen,
  onClose,
  onNavigateToAboutMe,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white flex items-center justify-center font-black text-xs shadow-md shadow-indigo-500/25">
            PF
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base text-slate-900 dark:text-slate-100">
                PlanFlow
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                v1.0
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-normal">
              Agile Project Management Utility by Krishna Chouhan
            </p>
          </div>
        </div>
      }
      maxWidth="xl"
    >
      <div className="space-y-4 text-slate-700 dark:text-slate-300 text-xs">
        {/* Purpose / Problem Solved */}
        <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50">
          <div className="flex items-center gap-1.5 font-bold text-indigo-900 dark:text-indigo-200 text-sm mb-1.5">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            Purpose &amp; Problem Solved
          </div>
          <p className="leading-relaxed text-indigo-950/80 dark:text-indigo-200/80">
            Enterprise project management platforms like Jira or Monday often suffer from slow load times, bloated menus, and forced paid tiers.
            <strong> PlanFlow</strong> was designed by <strong>Krishna Chouhan</strong> as an ultra-fast, beginner-friendly agile workspace that boots instantly in any browser without mandatory accounts or configuration friction.
          </p>
        </div>

        {/* Core Capabilities */}
        <div>
          <h4 className="font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-[10px] mb-2.5">
            Core Features &amp; Architecture
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div className="p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-800/40">
              <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-slate-100 mb-1">
                <Kanban className="w-3.5 h-3.5 text-indigo-600" />
                <span>5-Stage Kanban Board</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                Drag-and-drop or single-click status transitions across Backlog, To Do, In Progress, Review, and Done.
              </p>
            </div>

            <div className="p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-800/40">
              <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-slate-100 mb-1">
                <Layers className="w-3.5 h-3.5 text-emerald-600" />
                <span>Sprint &amp; Milestone Engine</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                Group deliverables into sprints with live deliverable ratios, deadline countdowns, and progress bars.
              </p>
            </div>

            <div className="p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-800/40">
              <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-slate-100 mb-1">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                <span>Checklists &amp; Time Logging</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                Break work into subtasks with automatic completion math and instant +0.5h / +1.0h time logging.
              </p>
            </div>

            <div className="p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-800/40">
              <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-slate-100 mb-1">
                <BarChart3 className="w-3.5 h-3.5 text-purple-600" />
                <span>Live Analytics Dashboard</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                Live KPI gauges for completion rate %, stage balance, team workload hours, and overdue attention lists.
              </p>
            </div>

            <div className="p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-800/40">
              <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-slate-100 mb-1">
                <Copy className="w-3.5 h-3.5 text-blue-600" />
                <span>1-Click Standup Reports</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                Formats status updates into clean Markdown ready to copy directly into Slack, Teams, or Discord.
              </p>
            </div>

            <div className="p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-800/40">
              <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-slate-100 mb-1">
                <Download className="w-3.5 h-3.5 text-rose-600" />
                <span>Data Ownership &amp; Backups</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                Private localStorage persistence with RFC 4180 CSV export and full JSON backup &amp; restore.
              </p>
            </div>
          </div>
        </div>

        {/* Creator Attribution */}
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
              KC
            </div>
            <div>
              <p className="font-bold text-slate-800 dark:text-slate-200 text-xs">
                Designed &amp; Architected by Krishna Chouhan
              </p>
              <p className="text-[10px] text-slate-400">
                Project Manager &bull; Ahmedabad, Gujarat, India
              </p>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            size="xs"
            rightIcon={<ExternalLink className="w-3 h-3" />}
            onClick={() => {
              onClose()
              onNavigateToAboutMe()
            }}
          >
            View Full Profile
          </Button>
        </div>

        {/* Technical Stack Pills */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-[10px] text-slate-400">
          <div className="flex flex-wrap gap-1.5">
            <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono">React 19</span>
            <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono">TypeScript</span>
            <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono">Vite</span>
            <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono">Tailwind CSS v4</span>
            <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono">Vitest</span>
          </div>

          <Button type="button" variant="primary" size="xs" onClick={onClose}>
            Got it
          </Button>
        </div>
      </div>
    </Modal>
  )
}
