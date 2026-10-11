import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { ToastContext } from './toast-context'

export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<string | null>(null)

  const toast = useCallback((next: string) => {
    setMessage(next)
    window.setTimeout(() => setMessage(null), 2200)
  }, [])

  const value = useMemo(() => ({ message, toast }), [message, toast])

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
}
