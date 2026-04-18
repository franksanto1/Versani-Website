import type { Metadata } from 'next'
import { SectionHero } from '@/components/team/SectionHero'
import { MetricCard } from '@/components/team/MetricCard'
import { DataCard } from '@/components/team/DataCard'
import { TrendChart } from '@/components/team/TrendChart'
import { SimpleBarChart } from '@/components/team/SimpleBarChart'
import { schoolMock, findStudent } from '@/lib/mock/schools'
import { upgradeRateByClass } from '@/lib/mock/charts'
import { formatCurrency, formatPercent, formatMonthShort } from '@/lib/format'

export const metadata: Metadata = {
  title: 'Operations · School Console · Versani',
  description: 'School billing, enrollment, and upgrade metrics.',
  robots: { index: false, follow: false },
}

export default function SchoolOperationsPage() {
  const { profile, enrollmentHistory, graduatingThisTerm } = schoolMock

  const upgradeConversion = profile.proUpgrades / profile.activeStudents

  const enrollmentTrend = enrollmentHistory.map((p) => ({
    label: formatMonthShort(p.month),
    value: p.count,
  }))

  return (
    <div className="space-y-10">
      <SectionHero
        eyebrow={`${profile.term} · Operations`}
        title="Operational reports"
        subtitle="Enrollment, upgrade conversion, and billing context for your school."
      />

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <MetricCard
          label="Active students"
          value={profile.activeStudents.toString()}
          sub={`Of ${profile.maxStudents} max`}
        />
        <MetricCard
          label="Total instructors"
          value={profile.activeInstructors.toString()}
          sub="Included in base plan"
        />
        <MetricCard
          label="MRR — base"
          value={formatCurrency(profile.mrrFromBase)}
          sub={`${profile.activeStudents} × $8.99`}
        />
        <MetricCard
          label="MRR — upgrades"
          value={formatCurrency(profile.mrrFromUpgrades)}
          sub={`${profile.proUpgrades} × $9.99 student-paid`}
        />
        <MetricCard
          label="Total MRR"
          value={formatCurrency(profile.totalMRR)}
          sub="School-visible revenue contribution"
        />
        <MetricCard
          label="Upgrade conversion"
          value={formatPercent(upgradeConversion)}
          sub="Students who upgraded themselves"
          trend="up"
          trendLabel="+5pts"
        />
      </section>

      <DataCard
        title="Student enrollment trend"
        description="Total active students by month."
      >
        <TrendChart
          data={enrollmentTrend}
          yFormatter={(v) => `${Math.round(v)}`}
          yMin={0}
        />
      </DataCard>

      <DataCard
        title="Upgrade rate by class"
        description="Share of students in each class that have self-upgraded to Pro."
      >
        <SimpleBarChart
          data={upgradeRateByClass.map((r) => ({
            label: r.label,
            value: Math.round(r.rate * 100),
          }))}
          max={100}
          formatter={(v) => `${v}%`}
        />
      </DataCard>

      <DataCard
        title={`Graduation pipeline — ${profile.term}`}
        description="Students currently on track to graduate this term."
      >
        {graduatingThisTerm.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Nobody is flagged for graduation this term.
          </p>
        ) : (
          <ul className="divide-y divide-white/[0.04]">
            {graduatingThisTerm.map((sid) => {
              const st = findStudent(sid)
              if (!st) return null
              return (
                <li
                  key={sid}
                  className="py-3 flex items-center justify-between"
                >
                  <div>
                    <div className="text-sm text-foreground">{st.name}</div>
                    <div className="text-[11px] text-muted-foreground">
                      {st.year} · {st.tier} · Score {st.scoreAvg.toFixed(1)}
                    </div>
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.18em] px-2 py-0.5 rounded-full border border-gold/40 bg-gold/10 text-gold">
                    Graduating
                  </span>
                </li>
              )
            })}
          </ul>
        )}
      </DataCard>
    </div>
  )
}
