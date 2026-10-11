import { motion, useInView, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { SectionHeading } from '@/components/ui/Reveal'
import { impactStats } from '@/data/impact'

export function Impact() {
  return (
    <section id="impact" className="scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto w-[min(1200px,calc(100%-2rem))]">
        <SectionHeading kicker="Impact" title="Measured, not guessed." />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {impactStats.map((stat, i) => (
            <StatCard key={stat.id} index={i} {...stat} />
          ))}
        </div>
        <PerformanceShowcase />
      </div>
    </section>
  )
}

function StatCard({
  label,
  from,
  to,
  suffix,
  decimals,
  detail,
  index,
}: {
  id: string
  label: string
  from: number
  to: number
  suffix: string
  decimals: number
  detail?: string
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-20%' })
  const reduce = useReducedMotion()

  return (
    <div ref={ref} className="glass rounded-3xl p-5">
      <p className="font-mono text-[11px] tracking-wide text-[var(--muted)]">{label}</p>
      <p className="mt-4 font-display text-4xl tracking-tight">
        <span className="text-[var(--muted)]">
          <Count value={inView || reduce ? from : from} decimals={decimals} play={false} />
          {suffix}
        </span>
        <span className="mx-2 text-gradient">→</span>
        <Count value={to} decimals={decimals} play={inView} />
        {suffix}
      </p>
      {detail ? <p className="mt-3 text-sm text-[var(--muted)]">{detail}</p> : null}
      <span className="sr-only">
        Stat {index + 1}: {label} from {from}
        {suffix} to {to}
        {suffix}
      </span>
    </div>
  )
}

function Count({
  value,
  decimals,
  play,
}: {
  value: number
  decimals: number
  play: boolean
}) {
  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, { stiffness: 60, damping: 18 })
  const ref = useRef<HTMLSpanElement>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce || !play) {
      if (ref.current) ref.current.textContent = value.toFixed(decimals)
      return
    }
    motionValue.set(0)
    spring.set(value)
    const unsub = spring.on('change', (latest) => {
      if (ref.current) ref.current.textContent = Number(latest).toFixed(decimals)
    })
    return () => unsub()
  }, [decimals, motionValue, play, reduce, spring, value])

  return <span ref={ref}>{value.toFixed(decimals)}</span>
}

function PerformanceShowcase() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-15%' })
  const reduce = useReducedMotion()
  const score = inView || reduce ? 93 : 0

  return (
    <div ref={ref} className="glass mt-6 grid gap-8 rounded-3xl p-6 md:grid-cols-12 md:p-10">
      <div className="md:col-span-5">
        <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-[var(--muted)]">
          Performance showcase
        </p>
        <h3 className="mt-3 font-display text-2xl">Lighthouse 30 → 93</h3>
        <p className="mt-3 text-[var(--muted)]">
          Code splitting, lazy loading, WebP, deferred assets, build optimization and PWA
          improvements on production surfaces.
        </p>
      </div>
      <div className="grid place-items-center md:col-span-3">
        <svg viewBox="0 0 120 120" className="h-36 w-36" aria-hidden>
          <circle cx="60" cy="60" r="48" stroke="var(--border)" strokeWidth="8" fill="none" />
          <motion.circle
            cx="60"
            cy="60"
            r="48"
            fill="none"
            stroke="url(#gauge)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 48}
            initial={{ strokeDashoffset: 2 * Math.PI * 48 }}
            animate={{
              strokeDashoffset: 2 * Math.PI * 48 * (1 - score / 100),
            }}
            transform="rotate(-90 60 60)"
            transition={{ duration: 1.4, ease: 'easeOut' }}
          />
          <defs>
            <linearGradient id="gauge" x1="0" y1="0" x2="120" y2="120">
              <stop stopColor="#7C5CFF" />
              <stop offset="1" stopColor="#22D3EE" />
            </linearGradient>
          </defs>
          <text
            x="60"
            y="66"
            textAnchor="middle"
            className="fill-[var(--fg)]"
            fontSize="22"
            fontFamily="Space Grotesk, sans-serif"
          >
            {score}
          </text>
        </svg>
      </div>
      <div className="grid gap-5 md:col-span-4">
        <Bar label="First Contentful Paint" from="1.8s" to="0.6s" width={inView ? '82%' : '18%'} />
        <Bar label="Speed Index" from="8.5s" to="1.4s" width={inView ? '88%' : '22%'} />
      </div>
    </div>
  )
}

function Bar({
  label,
  from,
  to,
  width,
}: {
  label: string
  from: string
  to: string
  width: string
}) {
  return (
    <div>
      <div className="mb-2 flex justify-between font-mono text-[11px] text-[var(--muted)]">
        <span>{label}</span>
        <span>
          {from} → {to}
        </span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-[var(--border)]">
        <motion.div
          className="h-full rounded-full bg-[linear-gradient(90deg,var(--color-violet),var(--color-cyan))]"
          animate={{ width }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}
