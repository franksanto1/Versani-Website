import type { Metadata } from 'next'
import Link from 'next/link'
import { SectionHero } from '@/components/team/SectionHero'
import { Button } from '@/components/ui/Button'
import { schoolMock } from '@/lib/mock/schools'
import { formatPercent } from '@/lib/format'

export const metadata: Metadata = {
  title: 'Classes · School Console · Versani',
  description: 'All active classes this term.',
  robots: { index: false, follow: false },
}

export default function SchoolClassesPage() {
  const { classes, profile } = schoolMock

  return (
    <div className="space-y-8">
      <SectionHero
        eyebrow={`${profile.term} · Classes`}
        title={`${classes.length} classes active`}
        subtitle="Courses in session for the current term."
        right={
          <Button variant="gold-solid" size="sm">
            Create class
          </Button>
        }
      />

      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {classes.map((c) => (
          <div
            key={c.id}
            className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-6 flex flex-col"
          >
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-gold mb-2">
                {c.instructor}
              </div>
              <h3 className="font-serif text-xl text-foreground">{c.name}</h3>
              <p className="text-xs text-muted-foreground mt-2">
                {c.description}
              </p>
            </div>
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
            <div className="mt-6 flex items-center justify-between">
              <Link
                href={`/school/classes/${c.id}`}
                className="text-xs uppercase tracking-[0.2em] text-gold hover:text-gold-light"
              >
                Open class
              </Link>
              <button className="text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground">
                Archive
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}
