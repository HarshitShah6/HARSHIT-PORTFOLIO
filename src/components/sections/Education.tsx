import { education } from '@/data/education'
import { Reveal } from '@/components/ui/Reveal'

export function Education() {
  return (
    <section id="education" aria-labelledby="education-heading" className="pb-8">
      <div className="mx-auto w-[min(1200px,calc(100%-2rem))]">
        <Reveal>
          <h2 id="education-heading" className="font-display text-2xl md:text-3xl">
            Education
          </h2>
        </Reveal>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {education.map((item) => (
            <article key={item.school} className="glass rounded-3xl p-6">
              <p className="font-mono text-[11px] text-[var(--muted)]">{item.period}</p>
              <h3 className="mt-2 font-display text-xl">{item.school}</h3>
              <p className="mt-1 text-[var(--muted)]">
                {item.detail} · {item.result}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
