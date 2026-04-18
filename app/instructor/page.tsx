import type { Metadata } from 'next'
import Link from 'next/link'
import { SectionHero } from '@/components/team/SectionHero'
import { MetricCard } from '@/components/team/MetricCard'
import { MemberCard } from '@/components/team/MemberCard'
import { DataCard } from '@/components/team/DataCard'
import { PrivacyNotice } from '@/components/team/PrivacyNotice'
import { LinkButton } from '@/components/ui/Button'
import {
  getCurrentInstructor,
  getInstructorMetrics,
  getGrantedPendingSubmissions,
  getGrantedClasses,
} from '@/lib/mock/instructor-view'
import { formatDate } from '@/lib/format'

export const metadata: Metadata = {
  title: 'Instructor Dashboard · Versani',
  description: 'Scoped overview of your granted classes.',
  robots: { index: false, follow: false },
}

export default function InstructorDashboardPage() {
  const instructor = getCurrentInstructor()
  const metrics = getInstructorMetrics()
  const pending = getGrantedPendingSubmissions().slice(0, 5)
  const classes = getGrantedClasses()

  return (
    <div className="space-y-10">
      <SectionHero
        eyebrow="Instructor View"
        title={`Welcome back, ${instructor.name.split(' ')[0]}`}
        subtitle="Your classes this term — the students, grading queue, and what needs attention today."
        right={
          <div className="flex items-center gap-2">
            <LinkButton href="/instructor/grading" variant="gold-outline" size="sm">
              Open grading
            </LinkButton>
            <LinkButton href="/instructor/students" variant="gold-solid" size="sm">
              View my students
            </LinkButton>
          </div>
        }
      />

      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard
          label="Students"
          value={metrics.studentCount.toString()}
          sub="Across granted classes"
        />
        <MetricCard
          label="Coursework pending"
          value={metrics.pendingReviewCount.toString()}
          sub="Awaiting your grade"
        />
        <MetricCard
          label="My classes"
          value={metrics.classCount.toString()}
          sub={classes.map((c) => c.name).join(', ')}
        />
        <MetricCard
          label="Class average"
          value={metrics.classAverage.toFixed(1)}
          sub="Across my students"
        />
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-2xl text-foreground">
            Students needing attention
          </h2>
          {metrics.atRiskCount > 0 && (
            <span className="text-xs uppercase tracking-[0.2em] text-rose-300">
              {metrics.atRiskCount} flagged
            </span>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {metrics.atRiskStudents.length === 0 ? (
            <DataCard>
              <p className="text-sm text-muted-foreground">
                Nobody in your classes is currently flagged at-risk.
              </p>
            </DataCard>
          ) : (
            metrics.atRiskStudents.slice(0, 3).map((s) => (
              <MemberCard
                key={s.id}
                name={s.name}
                role="student"
                status="at-risk"
                tier={s.tier}
                scoreAvg={s.scoreAvg}
                subLabel="Score avg"
                trend={s.scoreTrend}
                href={`/instructor/students/${s.id}`}
              />
            ))
          )}
        </div>
      </section>

      <DataCard
        title="Recent submissions"
        description="Coursework waiting for your review."
      >
        {pending.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Your queue is clear. Nice.
          </p>
        ) : (
          <ul className="divide-y divide-white/[0.04]">
            {pending.map((sub) => (
              <li
                key={sub.id}
                className="py-3 flex items-center justify-between gap-4"
              >
                <div className="min-w-0">
                  <div className="text-sm text-foreground">
                    {sub.studentName} · {sub.assignment}
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">
                    {sub.className} · Submitted {formatDate(sub.submittedAt)}
                  </div>
                </div>
                <Link
                  href="/instructor/grading"
                  className="shrink-0 text-xs uppercase tracking-[0.2em] text-gold hover:text-gold-light"
                >
                  Grade
                </Link>
              </li>
            ))}
          </ul>
        )}
      </DataCard>

      <PrivacyNotice>
        You see students in your granted classes only. Contact your school
        admin to request scope changes.
      </PrivacyNotice>
    </div>
  )
}
