import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { easeOut } from '@/lib/motion'
import { cn } from '@/lib/cn'

type Props = {
  children: ReactNode
  className?: string
  delay?: number
}

export function Reveal({ children, className, delay = 0 }: Props) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.7, delay, ease: easeOut }}
    >
      {children}
    </motion.div>
  )
}

export function SectionHeading({
  kicker,
  title,
  className,
}: {
  kicker: string
  title: string
  className?: string
}) {
  return (
    <Reveal className={cn('mb-10 md:mb-14', className)}>
      <p className="font-mono text-xs tracking-[0.22em] uppercase text-[var(--muted)]">
        {kicker}
      </p>
      <h2 className="mt-3 font-display text-3xl leading-tight tracking-tight md:text-5xl">
        {title}
      </h2>
    </Reveal>
  )
}
