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
  findStylist,
  salonMock,
  serviceMixByStylist,
} from '@/lib/mock/salons'
import { formatPercent, formatDate } from '@/lib/format'

export const metadata: Metadata = {
  title: 'Stylist · Salon Console · Versani',
  description: 'Individual stylist performance and actions.',
  robots: { index: false, follow: false },
}

interface PageProps {
  params: Promise<{ stylistId: string }>
}

export default async function StylistDrilldownPage({ params }: PageProps) {
  const { stylistId } = await params
  const stylist = findStylist(stylistId)
  if (!stylist) notFound()

  const teamRank =
    [...salonMock.stylists]
      .sort((a, b) => b.scoreAvg - a.scoreAvg)
      .findIndex((s) => s.id === stylist.id) + 1

  const trendData = stylist.scoreTrend.map((value, i) => ({
    label: `D${i - stylist.scoreTrend.length + 1}`,
    value,
  }))
  const serviceMix = serviceMixByStylist[stylist.id] ?? []

  return (
    <div className="space-y-10">
      <div>
        <Link
          href="/salon/team"
          className="inline-block text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground mb-4"
        >
          ← Back to team
        </Link>
        <SectionHero
          eyebrow={stylist.specialty ?? 'Stylist'}
          title={stylist.name}
          subtitle={`Joined ${formatDate(stylist.joinedAt)} · Last active ${stylist.lastActive}`}
          right={
            <div className="flex items-center gap-2">
              <RoleBadge role={stylist.role} />
              <StatusBadge status={stylist.status} />
              <span className="text-[10px] uppercase tracking-[0.18em] px-2 py-0.5 rounded-full border border-gold/40 bg-gold/10 text-gold">
                {stylist.tier}
              </span>
            </div>
          }
        />
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <MetricCard
          label="Score average"
          value={stylist.scoreAvg.toFixed(1)}
          sub="Across all consultations (30 days)"
          trend="up"
          trendLabel="+0.3"
        />
        <MetricCard
          label="Consultations (MTD)"
          value={stylist.consultationsThisMonth.toString()}
          sub="This month"
        />
        <MetricCard
          label="Client retention"
          value={formatPercent(stylist.retentionRate)}
          sub="Returning clients, 90 days"
        />
        <MetricCard
          label="Top specialty"
          value={stylist.specialty ?? '—'}
          sub="By consultation volume"
        />
        <MetricCard
          label="Team rank"
          value={`#${teamRank}`}
          sub={`Of ${salonMock.stylists.length} on the team`}
        />
        <MetricCard
          label="Revenue attribution"
          value="$6,248"
          sub="Estimated LTM from this stylist's book"
        />
      </section>

      <DataCard title="Score trend" description="Last 30 days of consultation scoring.">
        <TrendChart
          data={trendData}
          ariaLabel={`${stylist.name} score trend`}
          yMin={Math.min(...stylist.scoreTrend) - 0.2}
          yMax={Math.max(...stylist.scoreTrend) + 0.2}
          yFormatter={(v) => v.toFixed(1)}
        />
      </DataCard>

      <DataCard
        title="Service mix"
        description="Where this stylist's consultations are landing."
      >
        {serviceMix.length > 0 ? (
          <SimpleBarChart
            data={serviceMix.map((s) => ({ label: s.service, value: s.pct }))}
            max={100}
            formatter={(v) => `${v}%`}
          />
        ) : (
          <p className="text-sm text-muted-foreground">
            Service-mix data will appear once consultations are logged.
          </p>
        )}
      </DataCard>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DataCard title="Recent activity" description="Latest work from this stylist.">
            <ul className="divide-y divide-white/[0.04]">
              {salonMock.recentActivity
                .filter((a) => a.actor === stylist.name)
                .slice(0, 6)
                .map((a) => (
                  <li key={a.id} className="py-3">
                    <div className="text-sm text-foreground">{a.summary}</div>
                    <div className="text-[11px] text-muted-foreground mt-1">
                      {formatDate(a.timestamp)} · {a.type}
                    </div>
                  </li>
                ))}
              {salonMock.recentActivity.filter((a) => a.actor === stylist.name)
                .length === 0 && (
                <li className="py-6 text-center text-sm text-muted-foreground">
                  No recent activity in the selected window.
                </li>
              )}
            </ul>
          </DataCard>
        </div>
        <DataCard title="Actions">
          <div className="space-y-3">
            <Button variant="gold-outline" size="sm" className="w-full">
              Edit role
            </Button>
            <Button variant="gold-outline" size="sm" className="w-full">
              Change tier
            </Button>
            <Button variant="ghost" size="sm" className="w-full">
              Pause access
            </Button>
            <Button variant="ghost" size="sm" className="w-full">
              Remove from team
            </Button>
          </div>
          <p className="text-[11px] text-muted-foreground mt-4">
            Tier changes flow through billing and take effect on next renewal.
          </p>
        </DataCard>
      </section>

      <PrivacyNotice>
        You're viewing this stylist's craft performance data as granted by salon
        owner permissions. Individual stylist accounts see the same information
        in their own Versani app.
      </PrivacyNotice>
    </div>
  )
}
