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
  findClass,
  serviceMixByStudent,
} from '@/lib/mock/schools'
import {
  CURRENT_INSTRUCTOR_ID,
  getGrantedStudents,
  instructorGivenGrades,
} from '@/lib/mock/instructor-view'
import { formatDate } from '@/lib/format'

export const metadata: Metadata = {
  title: 'Student · Instructor View · Versani',
  description: 'Student review with grading interface.',
  robots: { index: false, follow: false },
}

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function InstructorStudentDetail({ params }: PageProps) {
  const { id } = await params

  const grantedStudents = getGrantedStudents()
  const student = findStudent(id)
  if (!student) notFound()
  if (!grantedStudents.some((s) => s.id === student.id)) {
    // Scope check — instructor must have at least one granted class overlap
    notFound()
  }

  const trendData = student.scoreTrend.map((value, i) => ({
    label: `D${i - student.scoreTrend.length + 1}`,
    value,
  }))
  const serviceMix = serviceMixByStudent[student.id] ?? []
  const enrolledClasses = student.classIds
    .map((cid) => findClass(cid))
    .filter((c): c is NonNullable<ReturnType<typeof findClass>> => !!c)

  const previousGrades =
    instructorGivenGrades[CURRENT_INSTRUCTOR_ID]?.filter(
      (g) => g.studentId === student.id
    ) ?? []

  return (
    <div className="space-y-10">
      <div>
        <Link
          href="/instructor/students"
          className="inline-block text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground mb-4"
        >
          ← Back to my students
        </Link>
        <SectionHero
          eyebrow={`${student.year} · ${student.tier}`}
          title={student.name}
          subtitle={`Last active ${student.lastActive}`}
          right={
            <div className="flex items-center gap-2">
              <RoleBadge role="student" />
              <StatusBadge
                status={
                  student.trajectory === 'at-risk' ? 'at-risk' : student.status
                }
              />
            </div>
          }
        />
      </div>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard
          label="Score average"
          value={student.scoreAvg.toFixed(1)}
          sub="Rolling 30 days"
        />
        <MetricCard
          label="Courses completed"
          value={student.coursesCompleted.toString()}
          sub="Finished"
        />
        <MetricCard
          label="Courses active"
          value={student.coursesEnrolled.toString()}
          sub="In progress"
        />
        <MetricCard
          label="Pro upgrade"
          value={student.tier === 'Pro Upgraded' ? 'Upgraded' : 'Base'}
          sub="Current tier"
        />
      </section>

      <DataCard title="Score trend" description="Last 30 days.">
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
        description="Where this student focuses their coursework."
      >
        {serviceMix.length > 0 ? (
          <SimpleBarChart
            data={serviceMix.map((s) => ({ label: s.service, value: s.pct }))}
            max={100}
            formatter={(v) => `${v}%`}
          />
        ) : (
          <p className="text-sm text-muted-foreground">
            Not enough practice submissions yet to show a mix.
          </p>
        )}
      </DataCard>

      <DataCard title="Enrolled classes">
        <ul className="divide-y divide-white/[0.04]">
          {enrolledClasses.map((c) => (
            <li key={c.id} className="py-3 flex items-center justify-between">
              <div>
                <div className="text-sm text-foreground">{c.name}</div>
                <div className="text-[11px] text-muted-foreground mt-0.5">
                  Taught by {c.instructor}
                </div>
              </div>
              <Link
                href={`/instructor/classes/${c.id}`}
                className="text-xs uppercase tracking-[0.18em] text-gold hover:text-gold-light"
              >
                Open class
              </Link>
            </li>
          ))}
        </ul>
      </DataCard>

      <DataCard
        title="Grade this student"
        description="Leave a new grade or feedback note."
      >
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1">
              <label
                htmlFor="grade-assignment"
                className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2"
              >
                Assignment
              </label>
              <input
                id="grade-assignment"
                type="text"
                placeholder="Module 5 — Developer Ratios"
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold/50"
              />
            </div>
            <div>
              <label
                htmlFor="grade-value"
                className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2"
              >
                Grade
              </label>
              <input
                id="grade-value"
                type="text"
                placeholder="8.5"
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold/50"
              />
            </div>
            <div>
              <label
                htmlFor="grade-date"
                className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2"
              >
                Date
              </label>
              <input
                id="grade-date"
                type="date"
                defaultValue="2026-04-18"
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-foreground focus:outline-none focus:border-gold/50"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="grade-feedback"
              className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2"
            >
              Feedback
            </label>
            <textarea
              id="grade-feedback"
              rows={4}
              placeholder="Note the what, the why, and the next practice step."
              className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold/50"
            />
          </div>
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" type="button">
              Recommend Pro upgrade
            </Button>
            <Button variant="gold-solid" size="sm" type="submit">
              Save grade
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <h3 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
            Your previous grades for this student
          </h3>
          {previousGrades.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              None yet.
            </p>
          ) : (
            <ul className="space-y-3">
              {previousGrades.map((g, i) => (
                <li
                  key={i}
                  className="rounded-xl border border-white/[0.06] p-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-foreground">{g.assignment}</div>
                    <div className="font-serif text-lg text-gold">{g.grade}</div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {g.feedback}
                  </p>
                  <div className="text-[11px] text-muted-foreground mt-2">
                    {formatDate(g.date)}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </DataCard>

      <div className="flex items-center gap-2">
        <Button variant="gold-outline" size="sm">
          Request permission change
        </Button>
        <Button variant="ghost" size="sm">
          Contact admin
        </Button>
      </div>

      <PrivacyNotice>
        You can review and grade this student because at least one of their
        classes is in your granted scope.
      </PrivacyNotice>
    </div>
  )
}
