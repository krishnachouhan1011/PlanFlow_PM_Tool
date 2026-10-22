import React from 'react'
import { Loader2 } from 'lucide-react'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const variantStyles = {
  primary:
    'bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white shadow-sm focus-visible:ring-2 focus-visible:ring-indigo-500/50',
  secondary:
    'bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 shadow-sm dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 dark:border-slate-600 focus-visible:ring-2 focus-visible:ring-slate-400',
  outline:
    'bg-transparent hover:bg-indigo-50 text-indigo-600 border border-indigo-300 dark:text-indigo-400 dark:border-indigo-600 dark:hover:bg-indigo-950/40 focus-visible:ring-2 focus-visible:ring-indigo-500',
  danger:
    'bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white shadow-sm focus-visible:ring-2 focus-visible:ring-rose-500/50',
  ghost:
    'bg-transparent hover:bg-slate-100 text-slate-600 dark:text-slate-300 dark:hover:bg-slate-800 focus-visible:ring-2 focus-visible:ring-slate-400',
}

const sizeStyles = {
  xs: 'px-2 py-1 text-xs font-medium rounded-md gap-1',
  sm: 'px-3 py-1.5 text-xs font-medium rounded-lg gap-1.5',
  md: 'px-4 py-2 text-sm font-medium rounded-lg gap-2',
  lg: 'px-5 py-2.5 text-base font-medium rounded-xl gap-2.5',
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  disabled,
  className = '',
  ...props
}) => {
  return (
    <button
      disabled={disabled || isLoading}
      className={`inline-flex items-center justify-center font-medium transition-all duration-150 outline-none select-none disabled:opacity-50 disabled:cursor-not-allowed ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : (
        leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>
      )}
      <span>{children}</span>
      {!isLoading && rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
    </button>
  )
}

