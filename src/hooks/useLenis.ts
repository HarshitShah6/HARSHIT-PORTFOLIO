import Lenis from 'lenis'
import { useEffect } from 'react'
import { usePrefersReducedMotion } from './useMedia'

export function useLenis() {
  const reduce = usePrefersReducedMotion()

  useEffect(() => {
    if (reduce) return

    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.1,
      smoothWheel: true,
    })

    return () => {
      lenis.destroy()
    }
  }, [reduce])
}
