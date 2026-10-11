import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from 'framer-motion'
import { type MouseEvent, type ReactNode, useRef } from 'react'
import { SectionHeading } from '@/components/ui/Reveal'
import { productionWork, tiffinProject } from '@/data/projects'
import { useIsCoarsePointer } from '@/hooks/useMedia'

export function Projects() {
  return (
    <section id="projects" className="scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto w-[min(1200px,calc(100%-2rem))]">
        <SectionHeading kicker="Projects" title="Featured and production." />
        <TiltCard>
          <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-[var(--muted)]">
            Featured
          </p>
          <h3 className="mt-3 font-display text-3xl md:text-4xl">{tiffinProject.title}</h3>
          <p className="mt-2 font-mono text-xs text-[var(--muted)]">
            {tiffinProject.stack.join(' · ')}
          </p>
          <p className="mt-4 max-w-2xl text-[var(--muted)]">{tiffinProject.summary}</p>
          <ul className="mt-6 grid gap-2 text-sm md:grid-cols-2">
            {tiffinProject.highlights.map((item) => (
              <li key={item} className="border-l border-[var(--border)] pl-3">
                {item}
              </li>
            ))}
          </ul>
          <Architecture />
        </TiltCard>
        <h3 className="mt-14 font-display text-2xl">Production work at Zypp</h3>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {productionWork.map((card) => (
            <TiltCard key={card.title} compact>
              <h4 className="font-display text-xl">{card.title}</h4>
              <p className="mt-2 text-sm text-[var(--muted)]">{card.line}</p>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}

function TiltCard({
  children,
  compact,
}: {
  children: ReactNode
  compact?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(50)
  const y = useMotionValue(50)
  const glow = useMotionTemplate`radial-gradient(420px circle at ${x}% ${y}%, rgba(124,92,255,0.22), transparent 40%)`
  const coarse = useIsCoarsePointer()
  const reduce = useReducedMotion()

  const onMove = (event: MouseEvent<HTMLDivElement>) => {
    if (coarse || reduce || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const px = ((event.clientX - rect.left) / rect.width) * 100
    const py = ((event.clientY - rect.top) / rect.height) * 100
    x.set(px)
    y.set(py)
    const rx = ((event.clientY - rect.top) / rect.height - 0.5) * -8
    const ry = ((event.clientX - rect.left) / rect.width - 0.5) * 8
    ref.current.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => {
        if (ref.current) ref.current.style.transform = 'perspective(900px) rotateX(0) rotateY(0)'
      }}
      className={`glass relative overflow-hidden rounded-3xl will-change-transform ${compact ? 'p-5' : 'p-6 md:p-8'}`}
      data-cursor="grow"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{ background: glow }}
      />
      <div className="relative">{children}</div>
    </div>
  )
}

function Architecture() {
  const nodes = tiffinProject.architecture
  const reduce = useReducedMotion()

  return (
    <div className="mt-10 overflow-x-auto">
      <p className="mb-4 font-mono text-[11px] tracking-[0.18em] uppercase text-[var(--muted)]">
        Architecture
      </p>
      <svg viewBox="0 0 980 160" className="h-auto min-w-[720px] w-full" role="img" aria-label="Tiffin platform architecture">
        {nodes.slice(0, -1).map((_, i) => (
          <motion.line
            key={nodes[i]}
            x1={40 + i * 120 + 88}
            y1={80}
            x2={40 + (i + 1) * 120}
            y2={80}
            stroke="url(#arch)"
            strokeWidth="1.5"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: reduce ? 0 : 0.5, delay: i * 0.12 }}
          />
        ))}
        {nodes.map((node, i) => (
          <g key={node} transform={`translate(${40 + i * 120}, 48)`}>
            <rect
              width="88"
              height="64"
              rx="12"
              fill="var(--bg-elevated)"
              stroke="var(--border)"
            />
            <text
              x="44"
              y="38"
              textAnchor="middle"
              fontSize="10"
              fill="var(--fg)"
              fontFamily="JetBrains Mono, monospace"
            >
              {node}
            </text>
          </g>
        ))}
        <defs>
          <linearGradient id="arch" x1="0" y1="0" x2="980" y2="0">
            <stop stopColor="#7C5CFF" />
            <stop offset="1" stopColor="#22D3EE" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}
