import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SectionHero } from '@/components/team/SectionHero'
import { MetricCard } from '@/components/team/MetricCard'
import { DataCard } from '@/components/team/DataCard'
import { StatusBadge } from '@/components/team/StatusBadge'
import { PrivacyNotice } from '@/components/team/PrivacyNotice'
import {
  getGrantedClass,
  getGrantedPendingSubmissions,
} from '@/lib/mock/instructor-view'
import { schoolMock } from '@/lib/mock/schools'
import { formatDate, formatPercent } from '@/lib/format'

export const metadata: Metadata = {
  title: 'Class · Instructor View · Versani',
  description: 'Class detail scoped to your granted access.',
  robots: { index: false, follow: false },
}

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function InstructorClassDetail({ params }: PageProps) {
  const { id } = await params
  const cls = getGrantedClass(id)
  if (!cls) notFound()

  const enrolled = schoolMock.students.filter((s) =>
    s.classIds.includes(cls.id)
  )
  const pending = getGrantedPendingSubmissions().filter(
    (s) => s.classId === cls.id
  )

  return (
    <div className="space-y-10">
      <div>
        <Link
          href="/instructor/classes"
          className="inline-block text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground mb-4"
        >
          ← Back to my classes
        </Link>
        <SectionHero
          eyebrow={cls.instructor}
          title={cls.name}
          subtitle={cls.description}
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
          sub="Rolling 30 days"
        />
        <MetricCard
          label="Completion"
          value={formatPercent(cls.completion)}
          sub="Through current module"
        />
        <MetricCard
          label="Pending grades"
          value={pending.length.toString()}
          sub="Awaiting your review"
        />
      </section>

      <DataCard title="Students">
        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06] text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                <th className="text-left py-2 font-normal">Student</th>
                <th className="text-left py-2 font-normal">Year</th>
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
                      href={`/instructor/students/${s.id}`}
                      className="text-foreground hover:text-gold"
                    >
                      {s.name}
                    </Link>
                  </td>
                  <td className="py-3 text-muted-foreground">{s.year}</td>
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
                      href={`/instructor/students/${s.id}`}
                      className="text-xs uppercase tracking-[0.18em] text-gold hover:text-gold-light"
                    >
                      Review
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DataCard>

      <DataCard title="Submission queue">
        {pending.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No submissions waiting for this class.
          </p>
        ) : (
          <ul className="divide-y divide-white/[0.04]">
            {pending.map((sub) => (
              <li key={sub.id} className="py-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">
                    {sub.studentName} · {sub.assignment}
                  </span>
                  <Link
                    href={`/instructor/students/${sub.studentId}`}
                    className="text-xs uppercase tracking-[0.2em] text-gold hover:text-gold-light"
                  >
                    Grade
                  </Link>
                </div>
                <div className="text-[11px] text-muted-foreground mt-1">
                  Submitted {formatDate(sub.submittedAt)}
                </div>
              </li>
            ))}
          </ul>
        )}
      </DataCard>

      <PrivacyNotice>
        This class is in your granted scope. Students enrolled are visible only
        because you teach or oversee this course.
      </PrivacyNotice>
    </div>
  )
}
