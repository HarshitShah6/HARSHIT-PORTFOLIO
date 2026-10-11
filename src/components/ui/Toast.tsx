import { AnimatePresence, motion } from 'framer-motion'
import { useToast } from '@/hooks/useToast'

export function Toast() {
  const { message } = useToast()

  return (
    <div className="pointer-events-none fixed bottom-6 left-1/2 z-[70] -translate-x-1/2">
      <AnimatePresence>
        {message ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="glass pointer-events-auto rounded-full px-4 py-2 font-mono text-xs tracking-wide"
            role="status"
          >
            {message}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
