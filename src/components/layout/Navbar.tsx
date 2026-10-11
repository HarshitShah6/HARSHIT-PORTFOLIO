import { Menu, Moon, Sun, X } from 'lucide-react'
import { useState } from 'react'
import { navLinks } from '@/data/nav'
import { site } from '@/data/site'
import { useActiveSection } from '@/hooks/useActiveSection'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import { useTheme } from '@/hooks/useTheme'
import { cn } from '@/lib/cn'

export function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const progress = useScrollProgress()
  const active = useActiveSection()
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className="h-[2px] origin-left bg-[linear-gradient(90deg,var(--color-violet),var(--color-cyan))]"
        style={{ transform: `scaleX(${progress})` }}
        aria-hidden
      />
      <nav
        className="glass mx-auto mt-3 flex w-[min(1200px,calc(100%-1.5rem))] items-center justify-between rounded-full px-4 py-2.5"
        aria-label="Primary"
      >
        <a href="#top" className="font-display text-lg tracking-tight" aria-label="Home">
          {site.monogram}
        </a>
        <ul className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={link.href}
                className={cn(
                  'link-underline font-mono text-[11px] tracking-[0.16em] uppercase text-[var(--muted)]',
                  active === link.id && 'text-[var(--fg)]',
                )}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="grid h-10 w-10 place-items-center rounded-full border border-[var(--border)]"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <a
            href="#contact"
            className="hidden rounded-full bg-[var(--fg)] px-4 py-2 font-display text-sm text-[var(--bg)] sm:inline-flex"
          >
            Let&apos;s talk
          </a>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-[var(--border)] lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative h-4 w-4">
              {open ? <X size={16} /> : <Menu size={16} className={open ? 'rotate-90' : ''} />}
            </span>
          </button>
        </div>
      </nav>
      <div
        id="mobile-nav"
        hidden={!open}
        className="glass mx-auto mt-2 w-[min(1200px,calc(100%-1.5rem))] rounded-3xl p-4 lg:hidden"
      >
        <ul className="grid gap-2">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={link.href}
                className="block rounded-2xl px-3 py-3 font-display"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
