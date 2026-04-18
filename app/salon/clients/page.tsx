import type { Metadata } from 'next'
import { SectionHero } from '@/components/team/SectionHero'
import { MetricCard } from '@/components/team/MetricCard'
import { DataCard } from '@/components/team/DataCard'
import { StatusBadge } from '@/components/team/StatusBadge'
import { PrivacyNotice } from '@/components/team/PrivacyNotice'
import { salonMock } from '@/lib/mock/salons'
import { formatCurrency, formatDate, formatPercent } from '@/lib/format'

export const metadata: Metadata = {
  title: 'Clients · Salon Console · Versani',
  description: 'Shared client database across your team.',
  robots: { index: false, follow: false },
}

export default function SalonClientsPage() {
  const { clients, aggregateMetrics, totalClientCount } = salonMock

  const activeMTD = clients.filter((c) => c.status === 'active').length
  const atRisk = clients.filter((c) => c.status === 'at-risk').length

  return (
    <div className="space-y-8">
      <SectionHero
        eyebrow="Clients"
        title="Shared clients"
        subtitle={`${totalClientCount.toLocaleString()} clients across your team. ${clients.length} shown below.`}
      />

      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard
          label="Total clients"
          value={totalClientCount.toLocaleString()}
          sub="All time"
        />
        <MetricCard
          label="Active (MTD)"
          value={activeMTD.toString()}
          sub="Booked this month"
        />
        <MetricCard
          label="At risk"
          value={atRisk.toString()}
          sub="Not booked in 60 days"
        />
        <MetricCard
          label="Avg retention"
          value={formatPercent(aggregateMetrics.clientRetentionRate)}
          sub="Returning clients"
        />
      </section>

      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-4 flex flex-wrap items-center gap-3">
        <select className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs text-foreground">
          <option className="bg-background">All stylists</option>
        </select>
        <select className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs text-foreground">
          <option className="bg-background">All statuses</option>
        </select>
        <input
          type="search"
          placeholder="Search clients"
          className="flex-1 min-w-[200px] px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold/50"
        />
      </div>

      <DataCard title={`Showing ${clients.length} of ${totalClientCount}`}>
        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06] text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                <th className="text-left py-2 font-normal">Client</th>
                <th className="text-left py-2 font-normal">Stylist</th>
                <th className="text-left py-2 font-normal">Last visit</th>
                <th className="text-right py-2 font-normal">LTV</th>
                <th className="text-right py-2 font-normal">Retention</th>
                <th className="text-left py-2 font-normal">Status</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((c) => (
                <tr
                  key={c.id}
                  className="border-b border-white/[0.04] last:border-b-0 hover:bg-white/[0.02]"
                >
                  <td className="py-3 text-foreground">{c.name}</td>
                  <td className="py-3 text-muted-foreground">
                    {c.assignedStylist}
                  </td>
                  <td className="py-3 text-muted-foreground">
                    {formatDate(c.lastVisit)}
                  </td>
                  <td className="py-3 text-right tabular-nums">
                    {formatCurrency(c.ltv, { minimal: true })}
                  </td>
                  <td className="py-3 text-right tabular-nums">
                    {formatPercent(c.retentionScore)}
                  </td>
                  <td className="py-3">
                    <StatusBadge status={c.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DataCard>

      <PrivacyNotice>
        Client records are shared across your team per your data-sharing
        defaults. See{' '}
        <a
          href="/salon/settings"
          className="text-gold hover:text-gold-light underline underline-offset-4"
        >
          Settings → Data sharing
        </a>{' '}
        to restrict visibility to assigned stylists only.
      </PrivacyNotice>
    </div>
  )
}
