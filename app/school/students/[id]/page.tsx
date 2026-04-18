import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SectionHero } from '@/components/team/SectionHero'
import { MetricCard } from '@/components/team/MetricCard'
import { DataCard } from '@/components/team/DataCard'
import { TrendChart } from '@/components/team/TrendChart'
import { SimpleBarChart } from '@/components/team/SimpleBarChart'
import { PrivacyNotice } from '@/components/team/PrivacyNotice'
import { RoleBadge } from '@/components/team/RoleBadge'
import { StatusBadge } from '@/components/team/StatusBadge'
import { Button } from '@/components/ui/Button'
import {
  findStudent,
  schoolMock,
  serviceMixByStudent,
  instructorFeedbackByStudent,
  findClass,
} from '@/lib/mock/schools'
import { formatDate } from '@/lib/format'

export const metadata: Metadata = {
  title: 'Student · School Console · Versani',
  description: 'Individual student profile.',
  robots: { index: false, follow: false },
}

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function StudentDrilldownPage({ params }: PageProps) {
  const { id } = await params
  const student = findStudent(id)
  if (!student) notFound()

  const trendData = student.scoreTrend.map((value, i) => ({
    label: `D${i - student.scoreTrend.length + 1}`,
    value,
  }))
  const serviceMix = serviceMixByStudent[student.id] ?? []
  const feedback = instructorFeedbackByStudent[student.id] ?? []

  const enrolledClasses = student.classIds
    .map((cid) => findClass(cid))
    .filter((c): c is NonNullable<ReturnType<typeof findClass>> => !!c)

  return (
    <div className="space-y-10">
      <div>
        <Link
          href="/school/students"
          className="inline-block text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground mb-4"
        >
          ← Back to students
        </Link>
        <SectionHero
          eyebrow={`${student.year} · ${student.tier}`}
          title={student.name}
          subtitle={`Joined ${formatDate(student.joinedAt)} · Last active ${student.lastActive}`}
          right={
            <div className="flex items-center gap-2">
              <RoleBadge role="student" />
              <StatusBadge
                status={
                  student.trajectory === 'at-risk' ? 'at-risk' : student.status
                }
              />
              <span className="text-[10px] uppercase tracking-[0.18em] px-2 py-0.5 rounded-full border border-gold/40 bg-gold/10 text-gold">
                {student.tier}
              </span>
            </div>
          }
        />
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <MetricCard
          label="Score average"
          value={student.scoreAvg.toFixed(1)}
          sub="Rolling 30 days"
        />
        <MetricCard
          label="Consultations (MTD)"
          value="18"
          sub="Practice work this month"
        />
        <MetricCard
          label="Courses completed"
          value={`${student.coursesCompleted}/${student.coursesCompleted + student.coursesEnrolled}`}
          sub="Completed / enrolled"
        />
        <MetricCard
          label="Active instructors"
          value={enrolledClasses.length.toString()}
          sub="Across enrolled classes"
        />
        <MetricCard
          label="Pro upgrade"
          value={student.tier === 'Pro Upgraded' ? 'Upgraded' : 'Eligible'}
          sub={
            student.tier === 'Pro Upgraded'
              ? 'Student-paid monthly'
              : 'Recommend to encourage growth'
          }
        />
        <MetricCard
          label="Days enrolled"
          value={Math.floor(
            (new Date('2026-04-18').getTime() -
              new Date(student.joinedAt).getTime()) /
              (1000 * 60 * 60 * 24)
          ).toString()}
          sub="Since first signed in"
        />
      </section>

      <DataCard title="Score trend" description="Last 30 days of assessment scoring.">
        <TrendChart
          data={trendData}
          ariaLabel={`${student.name} score trend`}
          yMin={Math.min(...student.scoreTrend) - 0.2}
          yMax={Math.max(...student.scoreTrend) + 0.2}
          yFormatter={(v) => v.toFixed(1)}
        />
      </DataCard>

      <DataCard
        title="Practice service mix"
        description="Where this student's coursework is focused."
      >
        {serviceMix.length > 0 ? (
          <SimpleBarChart
            data={serviceMix.map((s) => ({ label: s.service, value: s.pct }))}
            max={100}
            formatter={(v) => `${v}%`}
          />
        ) : (
          <p className="text-sm text-muted-foreground">
            Service mix will appear after coursework submissions accumulate.
          </p>
        )}
      </DataCard>

      <DataCard title="Class enrollments">
        <ul className="divide-y divide-white/[0.04]">
          {enrolledClasses.map((c) => (
            <li
              key={c.id}
              className="py-3 flex items-center justify-between gap-4"
            >
              <div className="min-w-0">
                <div className="text-sm text-foreground">{c.name}</div>
                <div className="text-[11px] text-muted-foreground mt-0.5">
                  Taught by {c.instructor} · Avg class score{' '}
                  {c.avgScore.toFixed(1)}
                </div>
              </div>
              <div className="shrink-0 flex items-center gap-3">
                <div className="h-2 w-32 rounded-full bg-white/[0.06] overflow-hidden">
                  <div
                    className="h-full bg-gold/70"
                    style={{ width: `${Math.round(c.completion * 100)}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground tabular-nums w-10 text-right">
                  {Math.round(c.completion * 100)}%
                </span>
              </div>
            </li>
          ))}
        </ul>
      </DataCard>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DataCard
            title="Instructor feedback"
            description="Notes from this student's instructors."
          >
            {feedback.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No instructor notes yet.
              </p>
            ) : (
              <ul className="space-y-4">
                {feedback.map((f, i) => (
                  <li
                    key={i}
                    className="rounded-xl border border-white/[0.06] p-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">
                        {f.instructor}
                      </span>
                      <span className="text-[11px] text-muted-foreground">
                        {formatDate(f.date)}
                      </span>
                    </div>
                    <p className="text-sm text-foreground/80">{f.note}</p>
                  </li>
                ))}
              </ul>
            )}
          </DataCard>
        </div>
        <DataCard title="Actions">
          <div className="space-y-3">
            <Button variant="gold-outline" size="sm" className="w-full">
              Change tier
            </Button>
            <Button variant="gold-outline" size="sm" className="w-full">
              Assign to class
            </Button>
            <Button variant="ghost" size="sm" className="w-full">
              Pause access
            </Button>
            <Button variant="gold-solid" size="sm" className="w-full">
              Mark graduating
            </Button>
          </div>
        </DataCard>
      </div>

      <PrivacyNotice>
        As school admin, you see this student's full craft performance record.
        Instructors see only students in classes you grant them. Students see
        their own performance in the Versani app.
      </PrivacyNotice>
    </div>
  )
}
