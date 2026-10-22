import React from 'react'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'slate' | 'blue' | 'amber' | 'emerald' | 'purple' | 'rose'
  size?: 'sm' | 'md'
  dot?: boolean
  className?: string
}

const colorMap = {
  slate: 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700',
  blue: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800',
  amber: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800',
  emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800',
  purple: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800',
  rose: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800',
}

const dotColorMap = {
  slate: 'bg-slate-400',
  blue: 'bg-blue-500',
  amber: 'bg-amber-500',
  emerald: 'bg-emerald-500',
  purple: 'bg-purple-500',
  rose: 'bg-rose-500',
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'slate',
  size = 'md',
  dot = false,
  className = '',
}) => {
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs'

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full border ${colorMap[variant]} ${sizeClasses} ${className}`}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColorMap[variant]}`} />}
      {children}
    </span>
  )
}

