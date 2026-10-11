import { useRef, type MouseEvent, type ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { useIsCoarsePointer, usePrefersReducedMotion } from '@/hooks/useMedia'

type Props = {
  href: string
  children: ReactNode
  className?: string
  download?: boolean
  onClick?: () => void
}

export function MagneticButton({ href, children, className, download, onClick }: Props) {
  const ref = useRef<HTMLAnchorElement>(null)
  const coarse = useIsCoarsePointer()
  const reduce = usePrefersReducedMotion()

  const onMove = (event: MouseEvent<HTMLAnchorElement>) => {
    if (coarse || reduce || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = event.clientX - rect.left - rect.width / 2
    const y = event.clientY - rect.top - rect.height / 2
    ref.current.style.transform = `translate3d(${x * 0.28}px, ${y * 0.28}px, 0)`
  }

  const reset = () => {
    if (ref.current) ref.current.style.transform = 'translate3d(0,0,0)'
  }

  return (
    <a
      ref={ref}
      href={href}
      download={download || undefined}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={cn(
        'group relative inline-flex items-center justify-center overflow-hidden rounded-full px-6 py-3 font-display text-sm tracking-wide transition-transform duration-200',
        'bg-[var(--fg)] text-[var(--bg)]',
        className,
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 origin-center scale-0 rounded-full bg-[linear-gradient(120deg,var(--color-violet),var(--color-cyan))] opacity-0 transition duration-500 group-hover:scale-150 group-hover:opacity-100"
      />
      <span className="relative z-10">{children}</span>
    </a>
  )
}
