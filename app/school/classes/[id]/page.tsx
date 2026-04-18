import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SectionHero } from '@/components/team/SectionHero'
import { MetricCard } from '@/components/team/MetricCard'
import { DataCard } from '@/components/team/DataCard'
import { StatusBadge } from '@/components/team/StatusBadge'
import { Button } from '@/components/ui/Button'
import { findClass, schoolMock } from '@/lib/mock/schools'
import { formatPercent } from '@/lib/format'

export const metadata: Metadata = {
  title: 'Class · School Console · Versani',
  description: 'Class detail with enrolled students.',
  robots: { index: false, follow: false },
}

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function ClassDetailPage({ params }: PageProps) {
  const { id } = await params
  const cls = findClass(id)
  if (!cls) notFound()

  const enrolled = schoolMock.students.filter((s) => s.classIds.includes(cls.id))

  return (
    <div className="space-y-10">
      <div>
        <Link
          href="/school/classes"
          className="inline-block text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground mb-4"
        >
          ← Back to classes
        </Link>
        <SectionHero
          eyebrow={cls.instructor}
          title={cls.name}
          subtitle={cls.description}
          right={
            <Button variant="gold-outline" size="sm">
              Reassign instructor
            </Button>
          }
        />
      </div>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard
          label="Enrolled"
          value={cls.enrolled.toString()}
          sub="Active students"
        />
        <MetricCard
          label="Class avg"
          value={cls.avgScore.toFixed(1)}
          sub="Rolling score"
        />
        <MetricCard
          label="Completion"
          value={formatPercent(cls.completion)}
          sub="Through current module"
        />
        <MetricCard
          label="Instructor"
          value={cls.instructor}
          sub="Assigned lead"
        />
      </section>

      <DataCard title="Enrolled students" description={`${enrolled.length} in this class`}>
        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06] text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                <th className="text-left py-2 font-normal">Student</th>
                <th className="text-left py-2 font-normal">Year</th>
                <th className="text-left py-2 font-normal">Tier</th>
                <th className="text-right py-2 font-normal">Score</th>
                <th className="text-left py-2 font-normal">Status</th>
                <th className="text-right py-2 font-normal">Actions</th>
              </tr>
            </thead>
            <tbody>
              {enrolled.map((s) => (
                <tr
                  key={s.id}
                  className="border-b border-white/[0.04] last:border-b-0"
                >
                  <td className="py-3">
                    <Link
                      href={`/school/students/${s.id}`}
                      className="text-foreground hover:text-gold"
                    >
                      {s.name}
                    </Link>
                  </td>
                  <td className="py-3 text-muted-foreground">{s.year}</td>
                  <td className="py-3 text-[11px] uppercase tracking-[0.18em] text-gold/80">
                    {s.tier}
                  </td>
                  <td className="py-3 text-right tabular-nums">
                    {s.scoreAvg.toFixed(1)}
                  </td>
                  <td className="py-3">
                    <StatusBadge
                      status={
                        s.trajectory === 'at-risk' ? 'at-risk' : s.status
                      }
                    />
                  </td>
                  <td className="py-3 text-right">
                    <Link
                      href={`/school/students/${s.id}`}
                      className="text-xs uppercase tracking-[0.18em] text-gold hover:text-gold-light"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DataCard>
    </div>
  )
}
