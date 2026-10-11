import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { GitHubIcon, LinkedInIcon } from '@/components/ui/SocialIcons'
import { useEffect, useState } from 'react'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { site } from '@/data/site'
import { useIsCoarsePointer } from '@/hooks/useMedia'
import { easeOut } from '@/lib/motion'

export function Hero() {
  const reduce = useReducedMotion()
  const coarse = useIsCoarsePointer()
  const words = site.headline.split(' ')
  const [roleIndex, setRoleIndex] = useState(0)

  useEffect(() => {
    if (reduce) return
    const id = window.setInterval(() => {
      setRoleIndex((i) => (i + 1) % site.rotatingRoles.length)
    }, 2200)
    return () => window.clearInterval(id)
  }, [reduce])

  useEffect(() => {
    if (coarse || reduce) return
    const root = document.documentElement
    const onMove = (event: PointerEvent) => {
      root.style.setProperty('--mx', `${(event.clientX / window.innerWidth) * 100}%`)
      root.style.setProperty('--my', `${(event.clientY / window.innerHeight) * 100}%`)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [coarse, reduce])

  return (
    <section
      id="top"
      className="grid-bg relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-16"
    >
      {!coarse && !reduce ? <MeshField /> : null}
      <div className="relative mx-auto w-[min(1200px,calc(100%-2rem))]">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-3 py-1.5 font-mono text-[11px] tracking-wide">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-live)] opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-live)]" />
          </span>
          {site.current.label}
        </div>
        <h1 className="font-display text-[clamp(2.6rem,8vw,7.2rem)] leading-[0.92] tracking-tight">
          {words.map((word, i) => (
            <span key={word} className="mr-[0.28em] inline-block overflow-hidden">
              <motion.span
                className="inline-block"
                initial={reduce ? false : { y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.15 + i * 0.08, ease: easeOut }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-[var(--muted)] md:text-xl">{site.tagline}</p>
        <p className="mt-4 font-mono text-sm text-[var(--fg)]">
          <span className="text-[var(--muted)]">{site.subline.split(' · ')[0]} · </span>
          <span className="inline-flex min-h-[1.4em] items-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={site.rotatingRoles[roleIndex]}
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                className="text-gradient"
              >
                {site.rotatingRoles[roleIndex]}
              </motion.span>
            </AnimatePresence>
          </span>
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <MagneticButton href="#projects">View my work</MagneticButton>
          <a
            href={site.resumeHref}
            className="rounded-full border border-[var(--border)] px-6 py-3 font-display text-sm"
          >
            Download résumé
          </a>
          <a
            href={site.github}
            aria-label="GitHub"
            className="grid h-11 w-11 place-items-center rounded-full border border-[var(--border)]"
          >
            {/* TODO: replace GitHub URL in src/data/site.ts */}
            <GitHubIcon size={18} />
          </a>
          <a
            href={site.linkedin}
            aria-label="LinkedIn"
            className="grid h-11 w-11 place-items-center rounded-full border border-[var(--border)]"
          >
            {/* TODO: replace LinkedIn URL in src/data/site.ts */}
            <LinkedInIcon size={18} />
          </a>
        </div>
        <a
          href="#about"
          className="mt-16 inline-flex flex-col items-start gap-2 font-mono text-[11px] tracking-[0.2em] uppercase text-[var(--muted)]"
        >
          Scroll
          <span className="block h-10 w-px origin-top animate-pulse bg-[linear-gradient(var(--color-violet),var(--color-cyan))]" />
        </a>
      </div>
    </section>
  )
}

function MeshField() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-70"
      style={{
        background:
          'radial-gradient(28rem 18rem at var(--mx, 60%) var(--my, 30%), rgba(124,92,255,0.18), transparent 55%), radial-gradient(24rem 16rem at calc(var(--mx, 50%) + 12%) calc(var(--my, 40%) + 10%), rgba(34,211,238,0.12), transparent 50%)',
      }}
    />
  )
}
