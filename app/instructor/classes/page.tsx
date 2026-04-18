import type { Metadata } from 'next'
import Link from 'next/link'
import { SectionHero } from '@/components/team/SectionHero'
import { PrivacyNotice } from '@/components/team/PrivacyNotice'
import { getGrantedClasses } from '@/lib/mock/instructor-view'
import { formatPercent } from '@/lib/format'

export const metadata: Metadata = {
  title: 'My classes · Instructor View · Versani',
  description: 'Classes in your granted scope.',
  robots: { index: false, follow: false },
}

export default function InstructorClassesPage() {
  const classes = getGrantedClasses()

  return (
    <div className="space-y-8">
      <SectionHero
        eyebrow="My classes"
        title={`${classes.length} classes in your scope`}
        subtitle="Your school admin has granted you access to these courses."
      />

      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {classes.map((c) => (
          <Link
            key={c.id}
            href={`/instructor/classes/${c.id}`}
            className="block rounded-2xl border border-white/[0.08] bg-white/[0.04] p-6 transition-colors hover:border-white/[0.15]"
          >
            <div className="text-xs uppercase tracking-[0.2em] text-gold mb-2">
              {c.instructor === 'Rachel Kim' ? 'You teach this' : c.instructor}
            </div>
            <h3 className="font-serif text-xl text-foreground">{c.name}</h3>
            <p className="text-xs text-muted-foreground mt-2">{c.description}</p>
            <div className="grid grid-cols-3 gap-3 mt-6 text-center">
              <div>
                <div className="font-serif text-lg text-foreground">
                  {c.enrolled}
                </div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground mt-1">
                  Enrolled
                </div>
              </div>
              <div>
                <div className="font-serif text-lg text-foreground">
                  {c.avgScore.toFixed(1)}
                </div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground mt-1">
                  Avg score
                </div>
              </div>
              <div>
                <div className="font-serif text-lg text-foreground">
                  {formatPercent(c.completion)}
                </div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground mt-1">
                  Completion
                </div>
              </div>
            </div>
          </Link>
        ))}
      </section>

      <PrivacyNotice>
        Classes outside your scope are not visible. Request additional access
        from your school admin.
      </PrivacyNotice>
    </div>
  )
}
