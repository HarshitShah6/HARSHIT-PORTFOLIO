import { useState, type MouseEvent, type ReactNode } from 'react'
import { cn } from '@/lib/cn'

type Props = {
  children: ReactNode
  className?: string
  type?: 'button' | 'submit'
  onClick?: () => void
  disabled?: boolean
}

type Ripple = { x: number; y: number; id: number }

export function RippleButton({
  children,
  className,
  type = 'button',
  onClick,
  disabled,
}: Props) {
  const [ripples, setRipples] = useState<Ripple[]>([])

  const spawn = (event: MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const next = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      id: Date.now(),
    }
    setRipples((prev) => [...prev, next])
    window.setTimeout(() => {
      setRipples((prev) => prev.filter((item) => item.id !== next.id))
    }, 600)
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={(event) => {
        spawn(event)
        onClick?.()
      }}
      className={cn(
        'relative overflow-hidden rounded-full px-6 py-3 font-display text-sm tracking-wide',
        className,
      )}
    >
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="pointer-events-none absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-white/50"
          style={{ left: ripple.x, top: ripple.y }}
        />
      ))}
      <span className="relative z-10">{children}</span>
    </button>
  )
}
