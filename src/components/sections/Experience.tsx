import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { SectionHeading } from '@/components/ui/Reveal'
import { experience } from '@/data/experience'
import { cn } from '@/lib/cn'

export function Experience() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 70%', 'end 55%'],
  })
  const line = useSpring(scrollYProgress, { stiffness: 80, damping: 24 })
  const scaleY = useTransform(line, [0, 1], [0, 1])

  return (
    <section id="experience" className="scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto w-[min(1200px,calc(100%-2rem))]">
        <SectionHeading kicker="Experience" title="Zypp Electric, in production." />
        <div ref={ref} className="relative">
          <div className="absolute top-0 left-4 h-full w-px bg-[var(--border)] md:left-1/2" />
          <motion.div
            className="absolute top-0 left-4 w-px origin-top bg-[linear-gradient(var(--color-violet),var(--color-cyan))] md:left-1/2"
            style={{ scaleY, height: '100%' }}
          />
          <ol className="grid gap-10">
            {experience.map((item, index) => (
              <li
                key={`${item.title}-${item.period}`}
                className={cn(
                  'relative grid gap-4 md:grid-cols-2',
                  index % 2 === 0 ? 'md:text-right' : '',
                )}
              >
                <motion.article
                  className={cn(
                    'glass rounded-3xl p-6 md:max-w-xl',
                    index % 2 === 0 ? 'md:col-start-1 md:ml-auto' : 'md:col-start-2',
                  )}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-10%' }}
                  transition={{ duration: 0.6 }}
                >
                  <p className="font-mono text-[11px] tracking-wide text-[var(--muted)]">
                    {item.period} · {item.location}
                  </p>
                  <h3 className="mt-2 font-display text-2xl">{item.title}</h3>
                  <p className="text-gradient mt-1 font-medium">{item.company}</p>
                  <ul className={cn('mt-4 grid gap-2 text-sm text-[var(--muted)]', index % 2 === 0 && 'md:text-right')}>
                    {item.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </motion.article>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
