import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

export function Preloader() {
  const reduce = useReducedMotion()
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timeout = window.setTimeout(() => setVisible(false), reduce ? 200 : 1100)
    return () => window.clearTimeout(timeout)
  }, [reduce])

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-[#07070A]"
          exit={{
            clipPath: 'inset(0 0 100% 0)',
            transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
          }}
          role="status"
          aria-label="Loading"
        >
          <svg viewBox="0 0 120 72" className="h-16 w-28" fill="none">
            <motion.path
              d="M8 64V8h14v22h24V8h14v56H46V40H22v24H8z"
              stroke="url(#hs)"
              strokeWidth="2.2"
              fill="none"
              initial={{ pathLength: 0, opacity: 0.4 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.7, ease: 'easeInOut' }}
            />
            <motion.path
              d="M90 8h14v56H90V8z"
              stroke="url(#hs)"
              strokeWidth="2.2"
              fill="none"
              initial={{ pathLength: 0, opacity: 0.4 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.12, ease: 'easeInOut' }}
            />
            <defs>
              <linearGradient id="hs" x1="8" y1="8" x2="104" y2="64">
                <stop stopColor="#7C5CFF" />
                <stop offset="1" stopColor="#22D3EE" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
