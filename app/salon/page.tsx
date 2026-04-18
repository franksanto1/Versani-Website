import type { Metadata } from 'next'
import Link from 'next/link'
import { SectionHero } from '@/components/team/SectionHero'
import { MetricCard } from '@/components/team/MetricCard'
import { MemberCard } from '@/components/team/MemberCard'
import { DataCard } from '@/components/team/DataCard'
import { MiniSparkline } from '@/components/team/MiniSparkline'
import { LinkButton } from '@/components/ui/Button'
import { salonMock } from '@/lib/mock/salons'
import { formatCurrency, formatPercent, formatDate } from '@/lib/format'

export const metadata: Metadata = {
  title: 'Salon Dashboard · Versani',
  description: 'Team performance and operational snapshot.',
  robots: { index: false, follow: false },
}

export default function SalonDashboardPage() {
  const { profile, aggregateMetrics, stylists, invitations, recentActivity } =
    salonMock
  const lowPerformers = stylists
    .filter((s) => s.scoreAvg < 8)
    .sort((a, b) => a.scoreAvg - b.scoreAvg)

  return (
    <div className="space-y-10">
      <SectionHero
        eyebrow="Dashboard"
        title={profile.name}
        subtitle={`${profile.city} \u00B7 ${profile.tier} \u00B7 Joined ${formatDate(profile.joinedAt)}`}
        right={
          <div className="flex items-center gap-2">
            <LinkButton href="/salon/team/invite" variant="gold-outline" size="sm">
              Invite stylist
            </LinkButton>
            <LinkButton href="/salon/compare" variant="gold-solid" size="sm">
              Compare team
            </LinkButton>
          </div>
        }
      />

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <MetricCard
          label="Active seats"
          value={`${profile.activeSeats}/${profile.maxSeats}`}
          sub="Stylists currently provisioned"
        />
        <MetricCard
          label="Team score average"
          value={aggregateMetrics.teamScoreAvg.toFixed(1)}
          sub="Across the last 30 days"
          trend="up"
          trendLabel="+0.2"
        />
        <MetricCard
          label="Consultations (MTD)"
          value={aggregateMetrics.totalConsultationsThisMonth.toLocaleString()}
          sub="Across the full team"
        />
        <MetricCard
          label="Client retention"
          value={formatPercent(aggregateMetrics.clientRetentionRate)}
          sub="Returning clients, last 90 days"
          trend="up"
          trendLabel="+3pts"
        />
        <MetricCard
          label="Top performer"
          value={aggregateMetrics.topPerformer}
          sub="Highest composite score this month"
        />
        <MetricCard
          label="MRR contribution"
          value={formatCurrency(profile.mrrContribution)}
          sub={`Next renewal ${formatDate(profile.nextRenewal)}`}
        />
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-2xl text-foreground">
            This week\u2019s team
          </h2>
          <Link
            href="/salon/team"
            className="text-xs uppercase tracking-[0.2em] text-gold hover:text-gold-light"
          >
            See all
          </Link>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 -mx-2 px-2">
          {stylists.map((s) => (
            <MemberCard
              key={s.id}
              name={s.name}
              role={s.role}
              status={s.status}
              tier={s.tier}
              scoreAvg={s.scoreAvg}
              subLabel="Score avg"
              trend={s.scoreTrend}
              href={`/salon/team/${s.id}`}
            />
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <DataCard title="Upcoming billing">
          <div className="font-serif text-2xl text-foreground">
            {formatCurrency(profile.mrrContribution)}
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Scheduled for {formatDate(profile.nextRenewal)} on your saved card.
          </p>
          <Link
            href="/salon/billing"
            className="inline-block mt-4 text-xs uppercase tracking-[0.2em] text-gold hover:text-gold-light"
          >
            Manage billing
          </Link>
        </DataCard>
        <DataCard title="Pending invitations">
          {invitations.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No pending invitations.
            </p>
          ) : (
            <ul className="space-y-3">
              {invitations.map((inv) => (
                <li
                  key={inv.email}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-foreground truncate">{inv.email}</span>
                  <span className="text-[10px] uppercase tracking-[0.18em] text-amber-200">
                    Pending
                  </span>
                </li>
              ))}
            </ul>
          )}
          <Link
            href="/salon/team/invite"
            className="inline-block mt-4 text-xs uppercase tracking-[0.2em] text-gold hover:text-gold-light"
          >
            Send another
          </Link>
        </DataCard>
        <DataCard title="Low-performer alerts">
          {lowPerformers.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Everyone is tracking above threshold.
            </p>
          ) : (
            <ul className="space-y-3">
              {lowPerformers.map((s) => (
                <li
                  key={s.id}
                  className="flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <Link
                      href={`/salon/team/${s.id}`}
                      className="text-sm text-foreground hover:text-gold truncate block"
                    >
                      {s.name}
                    </Link>
                    <div className="text-[11px] text-muted-foreground">
                      Score {s.scoreAvg.toFixed(1)} · Retention{' '}
                      {formatPercent(s.retentionRate)}
                    </div>
                  </div>
                  <MiniSparkline data={s.scoreTrend} width={64} height={20} />
                </li>
              ))}
            </ul>
          )}
        </DataCard>
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
