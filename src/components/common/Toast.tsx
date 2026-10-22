import React from 'react'
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react'
import type { ToastMessage } from '../../types'

interface ToastContainerProps {
  toasts: ToastMessage[]
  onDismiss: (id: string) => void
}

const toastTypeStyles = {
  success: {
    icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
    border: 'border-emerald-200 dark:border-emerald-800',
    bg: 'bg-emerald-50/90 dark:bg-emerald-950/80',
  },
  error: {
    icon: <AlertCircle className="w-5 h-5 text-rose-500" />,
    border: 'border-rose-200 dark:border-rose-800',
    bg: 'bg-rose-50/90 dark:bg-rose-950/80',
  },
  warning: {
    icon: <AlertTriangle className="w-5 h-5 text-amber-500" />,
    border: 'border-amber-200 dark:border-amber-800',
    bg: 'bg-amber-50/90 dark:bg-amber-950/80',
  },
  info: {
    icon: <Info className="w-5 h-5 text-indigo-500" />,
    border: 'border-indigo-200 dark:border-indigo-800',
    bg: 'bg-indigo-50/90 dark:bg-indigo-950/80',
  },
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null

  return (
    <div
      aria-live="polite"
      className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none"
    >
      {toasts.map((toast) => {
        const style = toastTypeStyles[toast.type] || toastTypeStyles.info
        return (
          <div
            key={toast.id}
            role="status"
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl border shadow-lg backdrop-blur-md transition-all duration-200 animate-in slide-in-from-bottom-3 ${style.bg} ${style.border}`}
          >
            <div className="shrink-0 mt-0.5">{style.icon}</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 leading-tight">
                {toast.title}
              </p>
              {toast.message && (
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 leading-snug">
                  {toast.message}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={() => onDismiss(toast.id)}
              className="shrink-0 p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-black/5 transition-colors"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )
      })}
    </div>
  )
}
