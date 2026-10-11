import { SectionHeading } from '@/components/ui/Reveal'
import { marqueeSkills, skillGroups } from '@/data/skills'
import { usePrefersReducedMotion } from '@/hooks/useMedia'

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto w-[min(1200px,calc(100%-2rem))]">
        <SectionHeading kicker="Skills" title="The stack I ship with." />
      </div>
      <Marquee row={marqueeSkills} reverse={false} />
      <Marquee row={[...marqueeSkills].reverse()} reverse />
      <div className="mx-auto mt-10 grid w-[min(1200px,calc(100%-2rem))] gap-4 sm:grid-cols-2 lg:grid-cols-12">
        {skillGroups.map((group, index) => (
          <article
            key={group.title}
            className={`glass group rounded-3xl p-5 transition duration-300 hover:-translate-y-1 ${
              index === 1 || index === 6 ? 'lg:col-span-6' : 'lg:col-span-4'
            } ${index === 0 ? 'sm:col-span-2 lg:col-span-4' : ''}`}
          >
            <h3 className="font-display text-xl">{group.title}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-[var(--border)] px-3 py-1 font-mono text-[11px] group-hover:border-[color-mix(in_srgb,var(--color-cyan)_40%,var(--border))]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}

function Marquee({
  row,
  reverse,
}: {
  row: readonly string[]
  reverse?: boolean
}) {
  const reduce = usePrefersReducedMotion()
  const doubled = [...row, ...row]

  return (
    <div className="mt-4 overflow-hidden border-y border-[var(--border)] py-3">
      <div
        className={`flex w-max gap-8 ${reduce ? '' : reverse ? 'animate-[marquee-rev_32s_linear_infinite]' : 'animate-[marquee_28s_linear_infinite]'}`}
      >
        {doubled.map((item, i) => (
          <span key={`${item}-${i}`} className="font-mono text-sm tracking-[0.18em] uppercase text-[var(--muted)]">
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
