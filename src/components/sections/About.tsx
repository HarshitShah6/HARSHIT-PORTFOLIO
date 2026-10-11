import { SectionHeading } from '@/components/ui/Reveal'
import { about } from '@/data/site'

export function About() {
  return (
    <section id="about" className="scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto grid w-[min(1200px,calc(100%-2rem))] gap-10 md:grid-cols-12">
        <div className="md:col-span-7">
          <SectionHeading kicker="About" title="Systems, product, production." />
          <p className="max-w-xl text-lg leading-relaxed text-[var(--muted)]">{about.body}</p>
        </div>
        <aside className="glass md:col-span-5 rounded-3xl p-6">
          <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-[var(--muted)]">
            Quick facts
          </p>
          <dl className="mt-5 grid gap-5">
            {about.facts.map((fact) => (
              <div key={fact.label}>
                <dt className="font-mono text-[11px] text-[var(--muted)]">{fact.label}</dt>
                <dd className="mt-1 font-display text-lg">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </section>
  )
}
