import { Mail, Phone } from 'lucide-react'
import { GitHubIcon, LinkedInIcon } from '@/components/ui/SocialIcons'
import { useState, type FormEvent } from 'react'
import { RippleButton } from '@/components/ui/RippleButton'
import { SectionHeading } from '@/components/ui/Reveal'
import { useToast } from '@/hooks/useToast'
import { site } from '@/data/site'

export function Contact() {
  const { toast } = useToast()
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const copyEmail = async () => {
    await navigator.clipboard.writeText(site.email)
    toast('Email copied')
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    setStatus('sending')
    try {
      // TODO: replace form endpoint in src/data/site.ts
      const response = await fetch(site.formEndpoint, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (!response.ok) throw new Error('Failed')
      setStatus('sent')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="dot-bg scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto grid w-[min(1200px,calc(100%-2rem))] gap-10 md:grid-cols-12">
        <div className="md:col-span-6">
          <SectionHeading kicker="Contact" title="Let's build something fast." />
          <div className="grid gap-3">
            <button
              type="button"
              onClick={() => void copyEmail()}
              className="glass flex items-center gap-3 rounded-2xl px-4 py-3 text-left"
            >
              <Mail size={16} />
              <span>{site.email}</span>
              <span className="ml-auto font-mono text-[11px] text-[var(--muted)]">Copy</span>
            </button>
            <a href={site.phoneHref} className="glass flex items-center gap-3 rounded-2xl px-4 py-3">
              <Phone size={16} />
              {site.phone}
            </a>
            <div className="flex gap-3">
              <a
                href={site.github}
                className="glass inline-flex items-center gap-2 rounded-full px-4 py-2"
              >
                {/* TODO: replace GitHub URL in src/data/site.ts */}
                <GitHubIcon size={16} /> GitHub
              </a>
              <a
                href={site.linkedin}
                className="glass inline-flex items-center gap-2 rounded-full px-4 py-2"
              >
                {/* TODO: replace LinkedIn URL in src/data/site.ts */}
                <LinkedInIcon size={16} /> LinkedIn
              </a>
            </div>
          </div>
        </div>
        <form onSubmit={(e) => void onSubmit(e)} className="glass md:col-span-6 rounded-3xl p-6">
          <label className="grid gap-2 text-sm">
            Name
            <input
              required
              name="name"
              autoComplete="name"
              className="rounded-xl border border-[var(--border)] bg-transparent px-3 py-2"
            />
          </label>
          <label className="mt-4 grid gap-2 text-sm">
            Email
            <input
              required
              type="email"
              name="email"
              autoComplete="email"
              className="rounded-xl border border-[var(--border)] bg-transparent px-3 py-2"
            />
          </label>
          <label className="mt-4 grid gap-2 text-sm">
            Message
            <textarea
              required
              name="message"
              rows={5}
              className="resize-y rounded-xl border border-[var(--border)] bg-transparent px-3 py-2"
            />
          </label>
          <RippleButton
            type="submit"
            disabled={status === 'sending'}
            className="mt-5 w-full bg-[var(--fg)] text-[var(--bg)] disabled:opacity-60"
          >
            {status === 'sending' ? 'Sending…' : status === 'sent' ? 'Sent' : 'Send message'}
          </RippleButton>
          {status === 'sent' ? (
            <p className="mt-3 font-mono text-xs text-[var(--color-live)]" role="status">
              Message sent. I will get back to you.
            </p>
          ) : null}
          {status === 'error' ? (
            <p className="mt-3 font-mono text-xs text-red-400" role="status">
              Form endpoint is a placeholder. Email me directly for now.
            </p>
          ) : null}
        </form>
      </div>
    </section>
  )
}
