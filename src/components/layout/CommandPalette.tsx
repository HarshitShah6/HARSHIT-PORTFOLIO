import { useEffect, useMemo, useState } from 'react'
import { navLinks } from '@/data/nav'
import { site } from '@/data/site'
import { useTheme } from '@/hooks/useTheme'
import { useToast } from '@/hooks/useToast'

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const { toggleTheme } = useTheme()
  const { toast } = useToast()

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setOpen((v) => !v)
      }
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const actions = useMemo(
    () => [
      ...navLinks.map((link) => ({
        id: link.id,
        label: `Go to ${link.label}`,
        run: () => {
          document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' })
        },
      })),
      {
        id: 'email',
        label: 'Copy email',
        run: async () => {
          await navigator.clipboard.writeText(site.email)
          toast('Email copied')
        },
      },
      {
        id: 'github',
        label: 'Open GitHub',
        run: () => window.open(site.github, '_blank', 'noreferrer'),
      },
      {
        id: 'linkedin',
        label: 'Open LinkedIn',
        run: () => window.open(site.linkedin, '_blank', 'noreferrer'),
      },
      {
        id: 'theme',
        label: 'Toggle theme',
        run: () => toggleTheme(),
      },
    ],
    [toast, toggleTheme],
  )

  const filtered = actions.filter((action) =>
    action.label.toLowerCase().includes(query.toLowerCase()),
  )

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[85] grid place-items-start bg-black/45 px-4 pt-[18vh]"
      onClick={() => setOpen(false)}
    >
      <div
        className="glass mx-auto w-full max-w-lg overflow-hidden rounded-2xl"
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        onClick={(event) => event.stopPropagation()}
      >
        <input
          autoFocus
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Jump, copy, open, toggle…"
          className="w-full border-b border-[var(--border)] bg-transparent px-4 py-3 font-mono text-sm outline-none"
        />
        <ul className="max-h-72 overflow-auto p-2">
          {filtered.map((action) => (
            <li key={action.id}>
              <button
                type="button"
                className="w-full rounded-xl px-3 py-2 text-left text-sm hover:bg-[var(--card)]"
                onClick={() => {
                  void action.run()
                  setOpen(false)
                  setQuery('')
                }}
              >
                {action.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
