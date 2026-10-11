import { ArrowUp } from 'lucide-react'
import { site } from '@/data/site'

export function Footer() {
  const year = 2026

  return (
    <footer className="border-t border-[var(--border)]">
      <div className="mx-auto flex w-[min(1200px,calc(100%-2rem))] flex-col items-start justify-between gap-4 py-8 sm:flex-row sm:items-center">
        <p className="font-mono text-xs text-[var(--muted)]">
          © {year} {site.copyrightName}. Designed & built by Harshit Shah.
        </p>
        <a
          href="#top"
          className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-3 py-2 text-sm"
        >
          Back to top
          <ArrowUp size={14} />
        </a>
      </div>
    </footer>
  )
}
