import { MotionConfig } from 'framer-motion'
import { lazy, Suspense, useEffect } from 'react'
import { CommandPalette } from '@/components/layout/CommandPalette'
import { CustomCursor } from '@/components/layout/CustomCursor'
import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { Preloader } from '@/components/layout/Preloader'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Toast } from '@/components/ui/Toast'
import { ToastProvider } from '@/context/ToastContext'
import { useLenis } from '@/hooks/useLenis'

const Impact = lazy(() => import('@/components/sections/Impact').then((m) => ({ default: m.Impact })))
const Experience = lazy(() =>
  import('@/components/sections/Experience').then((m) => ({ default: m.Experience })),
)
const Projects = lazy(() =>
  import('@/components/sections/Projects').then((m) => ({ default: m.Projects })),
)
const Skills = lazy(() => import('@/components/sections/Skills').then((m) => ({ default: m.Skills })))
const Education = lazy(() =>
  import('@/components/sections/Education').then((m) => ({ default: m.Education })),
)
const Contact = lazy(() =>
  import('@/components/sections/Contact').then((m) => ({ default: m.Contact })),
)

function Shell() {
  useLenis()

  useEffect(() => {
    document.documentElement.classList.add('lenis')
  }, [])

  return (
    <>
      <a
        href="#about"
        className="absolute left-4 top-2 z-[100] -translate-y-16 rounded bg-[var(--fg)] px-3 py-2 text-[var(--bg)] focus:translate-y-0"
      >
        Skip to content
      </a>
      <div className="grain" aria-hidden />
      <Preloader />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Suspense fallback={null}>
          <Impact />
          <Experience />
          <Projects />
          <Skills />
          <Education />
          <Contact />
        </Suspense>
      </main>
      <Footer />
      <CommandPalette />
      <Toast />
    </>
  )
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ToastProvider>
        <Shell />
      </ToastProvider>
    </MotionConfig>
  )
}
