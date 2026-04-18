import type { Metadata } from 'next'
import { SectionHero } from '@/components/team/SectionHero'
import { MetricCard } from '@/components/team/MetricCard'
import { DataCard } from '@/components/team/DataCard'
import { TrendChart } from '@/components/team/TrendChart'
import { SimpleBarChart } from '@/components/team/SimpleBarChart'
import { salonMock } from '@/lib/mock/salons'
import { formatCurrency, formatDate, formatMonthShort } from '@/lib/format'

export const metadata: Metadata = {
  title: 'Operations · Salon Console · Versani',
  description: 'Billing, seats, and operational health for your salon.',
  robots: { index: false, follow: false },
}

export default function SalonOperationsPage() {
  const { profile, aggregateMetrics, mrrHistory, stylists, invitations } =
    salonMock

  const seatsByTier = stylists.reduce<Record<string, number>>((acc, s) => {
    acc[s.tier] = (acc[s.tier] ?? 0) + 1
    return acc
  }, {})

  const mrrTrendData = mrrHistory.map((p) => ({
    label: formatMonthShort(p.month),
    value: p.mrr,
  }))

  return (
    <div className="space-y-10">
      <SectionHero
        eyebrow="Operations"
        title="Operational reports"
        subtitle="How the business side of your salon is performing on Versani."
      />

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <MetricCard
          label="MRR contribution"
          value={formatCurrency(profile.mrrContribution)}
          sub={`${profile.activeSeats} active seats on ${profile.tier}`}
        />
        <MetricCard
          label="Active seats"
          value={`${profile.activeSeats}`}
          sub="Provisioned for your stylists"
        />
        <MetricCard
          label="Available seats"
          value={`${profile.maxSeats - profile.activeSeats}`}
          sub="Room to add without a plan change"
        />
        <MetricCard
          label="Pending invitations"
          value={`${invitations.length}`}
          sub="Waiting to be accepted"
        />
        <MetricCard
          label="Team health score"
          value={`${aggregateMetrics.teamHealthScore}`}
          sub="Composite across scores, retention, activity"
          trend="up"
          trendLabel="+4"
        />
        <MetricCard
          label="Next renewal"
          value={formatDate(profile.nextRenewal)}
          sub="Charged to your saved card"
        />
      </section>

      <DataCard
        title="MRR trend"
        description="Your salon's contribution to Versani MRR across the last 12 months."
      >
        <TrendChart
          data={mrrTrendData}
          yFormatter={(v) => `$${Math.round(v)}`}
          yMin={0}
        />
      </DataCard>

      <DataCard
        title="Seat utilization by tier"
        description="Where your seats are allocated today."
      >
        <SimpleBarChart
          data={Object.entries(seatsByTier).map(([label, value]) => ({
            label,
            value,
          }))}
          max={profile.activeSeats}
          formatter={(v) => `${v} seat${v === 1 ? '' : 's'}`}
        />
      </DataCard>

      <DataCard title="Plan guidance">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-white/[0.06] p-4">
            <div className="text-xs uppercase tracking-[0.2em] text-gold mb-2">
              Considering more seats?
            </div>
            <p className="text-sm text-foreground/80">
              Adding seats is prorated to your next invoice. There's no minimum
              commitment change for growth within Option B.
            </p>
          </div>
          <div className="rounded-xl border border-white/[0.06] p-4">
            <div className="text-xs uppercase tracking-[0.2em] text-gold mb-2">
              Fewer seats next month?
            </div>
            <p className="text-sm text-foreground/80">
              Remove a stylist's seat and the billing change applies at the start
              of the next cycle. Their historical data remains in your reports.
            </p>
          </div>
        </div>
      </DataCard>
    </div>
  )
}
