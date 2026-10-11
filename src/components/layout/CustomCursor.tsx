import { useEffect, useRef } from 'react'
import { useIsCoarsePointer, usePrefersReducedMotion } from '@/hooks/useMedia'

export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const coarse = useIsCoarsePointer()
  const reduce = usePrefersReducedMotion()

  useEffect(() => {
    if (coarse || reduce) return
    const onMove = (event: MouseEvent) => {
      const { clientX: x, clientY: y } = event
      if (dot.current) {
        dot.current.style.transform = `translate3d(${x}px, ${y}px, 0)`
      }
      if (ring.current) {
        ring.current.style.transform = `translate3d(${x}px, ${y}px, 0)`
      }
    }
    const onOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null
      const interactive = Boolean(
        target?.closest('a, button, input, textarea, [data-cursor="grow"]'),
      )
      if (ring.current) {
        ring.current.style.width = interactive ? '52px' : '28px'
        ring.current.style.height = interactive ? '52px' : '28px'
        ring.current.style.opacity = interactive ? '0.9' : '0.55'
      }
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerover', onOver)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerover', onOver)
    }
  }, [coarse, reduce])

  if (coarse || reduce) return null

  return (
    <>
      <div
        ref={dot}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[80] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--cursor)] mix-blend-difference will-change-transform"
      />
      <div
        ref={ring}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[80] h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--cursor)] opacity-55 mix-blend-difference will-change-transform"
        style={{ transition: 'width 180ms ease, height 180ms ease, opacity 180ms ease' }}
      />
    </>
  )
}
