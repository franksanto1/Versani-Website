import type { Metadata } from 'next'
import Link from 'next/link'
import { SectionHero } from '@/components/team/SectionHero'
import { MetricCard } from '@/components/team/MetricCard'
import { MemberCard } from '@/components/team/MemberCard'
import { DataCard } from '@/components/team/DataCard'
import { LinkButton } from '@/components/ui/Button'
import { schoolMock } from '@/lib/mock/schools'
import { formatCurrency, formatPercent, formatDate } from '@/lib/format'

export const metadata: Metadata = {
  title: 'School Dashboard · Versani',
  description: 'Oversight snapshot for beauty school admins.',
  robots: { index: false, follow: false },
}

export default function SchoolDashboardPage() {
  const { profile, students, recentActivity } = schoolMock

  const upgradeRate = profile.proUpgrades / profile.activeStudents
  const classAverage =
    students.reduce((acc, s) => acc + s.scoreAvg, 0) / (students.length || 1)

  const trendingUp = students
    .filter((s) => s.trajectory === 'up')
    .sort((a, b) => b.scoreAvg - a.scoreAvg)
    .slice(0, 3)
  const atRisk = students.filter((s) => s.trajectory === 'at-risk').slice(0, 3)

  return (
    <div className="space-y-10">
      <SectionHero
        eyebrow={`${profile.term} · Dashboard`}
        title={profile.name}
        subtitle={`${profile.city} · Joined ${formatDate(profile.joinedAt)}`}
        right={
          <div className="flex items-center gap-2">
            <LinkButton href="/school/students/invite" variant="gold-outline" size="sm">
              Invite students
            </LinkButton>
            <LinkButton href="/school/classes" variant="gold-solid" size="sm">
              Manage classes
            </LinkButton>
          </div>
        }
      />

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <MetricCard
          label="Active students"
          value={profile.activeStudents.toString()}
          sub={`Of ${profile.maxStudents} max on current plan`}
        />
        <MetricCard
          label="Pro upgrade rate"
          value={formatPercent(upgradeRate)}
          sub={`${profile.proUpgrades} of ${profile.activeStudents} students`}
          trend="up"
          trendLabel="+6pts"
        />
        <MetricCard
          label="Active instructors"
          value={profile.activeInstructors.toString()}
          sub={`Teaching ${profile.courses} courses`}
        />
        <MetricCard
          label="Class average"
          value={classAverage.toFixed(1)}
          sub="Rolling 30-day score"
        />
        <MetricCard
          label="Graduation pipeline"
          value={schoolMock.graduatingThisTerm.length.toString()}
          sub="On track for this term"
        />
        <MetricCard
          label="Total MRR"
          value={formatCurrency(profile.totalMRR)}
          sub={`${formatCurrency(profile.mrrFromBase)} base + ${formatCurrency(profile.mrrFromUpgrades)} upgrades`}
        />
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-2xl text-foreground">
            Students trending up
          </h2>
          <Link
            href="/school/students"
            className="text-xs uppercase tracking-[0.2em] text-gold hover:text-gold-light"
          >
            See all
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {trendingUp.map((s) => (
            <MemberCard
              key={s.id}
              name={s.name}
              role="student"
              status={s.status === 'graduated' ? 'graduated' : 'active'}
              tier={s.tier}
              scoreAvg={s.scoreAvg}
              subLabel="Score avg"
              trend={s.scoreTrend}
              href={`/school/students/${s.id}`}
            />
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-2xl text-foreground">
            Students at risk
          </h2>
          <span className="text-xs uppercase tracking-[0.2em] text-rose-300">
            Needs attention
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {atRisk.length === 0 ? (
            <DataCard>
              <p className="text-sm text-muted-foreground">
                Nobody is currently flagged.
              </p>
            </DataCard>
          ) : (
            atRisk.map((s) => (
              <MemberCard
                key={s.id}
                name={s.name}
                role="student"
                status="at-risk"
                tier={s.tier}
                scoreAvg={s.scoreAvg}
                subLabel="Score avg"
                trend={s.scoreTrend}
                href={`/school/students/${s.id}`}
              />
            ))
          )}
        </div>
      </section>

      <section>
        <h2 className="font-serif text-2xl text-foreground mb-4">
          Recent activity
        </h2>
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04]">
          <ul className="divide-y divide-white/[0.04]">
            {recentActivity.map((a) => (
              <li
                key={a.id}
                className="px-6 py-4 flex items-start justify-between gap-4"
              >
                <div className="min-w-0">
                  <div className="text-sm text-foreground">{a.summary}</div>
                  <div className="text-[11px] text-muted-foreground mt-1">
                    {a.actor} · {formatDate(a.timestamp)}
                  </div>
                </div>
                <span className="text-[10px] uppercase tracking-[0.18em] text-gold/80 shrink-0">
                  {a.type}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}
