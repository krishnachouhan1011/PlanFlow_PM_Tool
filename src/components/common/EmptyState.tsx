import React from 'react'
import { FolderSearch } from 'lucide-react'
import { Button } from './Button'

interface EmptyStateProps {
  title: string
  description: string
  icon?: React.ReactNode
  actionLabel?: string
  onAction?: () => void
  secondaryActionLabel?: string
  onSecondaryAction?: () => void
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  actionLabel,
  onAction,
  secondaryActionLabel,
  onSecondaryAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 bg-white/50 dark:bg-slate-900/40">
      <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4 shadow-xs">
        {icon || <FolderSearch className="w-7 h-7" />}
      </div>
      <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100 mb-1">
        {title}
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mb-6">
        {description}
      </p>
      <div className="flex items-center gap-3">
        {secondaryActionLabel && onSecondaryAction && (
          <Button variant="secondary" size="sm" onClick={onSecondaryAction}>
            {secondaryActionLabel}
          </Button>
        )}
        {actionLabel && onAction && (
          <Button variant="primary" size="sm" onClick={onAction}>
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  )
}

