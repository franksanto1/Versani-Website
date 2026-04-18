import type { Metadata } from 'next'
import Link from 'next/link'
import { SectionHero } from '@/components/team/SectionHero'
import { RoleBadge } from '@/components/team/RoleBadge'
import { StatusBadge } from '@/components/team/StatusBadge'
import { MiniSparkline } from '@/components/team/MiniSparkline'
import { LinkButton } from '@/components/ui/Button'
import { salonMock } from '@/lib/mock/salons'
import { formatPercent } from '@/lib/format'

export const metadata: Metadata = {
  title: 'Team · Salon Console · Versani',
  description: 'Manage your salon team roster.',
  robots: { index: false, follow: false },
}

export default function SalonTeamPage() {
  const { stylists } = salonMock

  return (
    <div className="space-y-8">
      <SectionHero
        eyebrow="Team"
        title="Your team"
        subtitle="Every active stylist, their tier, and how they're tracking."
        right={
          <LinkButton href="/salon/team/invite" variant="gold-solid" size="sm">
            Invite stylist
          </LinkButton>
        }
      />

      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-4 flex flex-wrap items-center gap-3">
        <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Filter
        </label>
        <select className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs text-foreground focus:outline-none focus:border-gold/50">
          <option className="bg-background">All roles</option>
          <option className="bg-background">Owner</option>
          <option className="bg-background">Manager</option>
          <option className="bg-background">Stylist</option>
        </select>
        <select className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs text-foreground focus:outline-none focus:border-gold/50">
          <option className="bg-background">All tiers</option>
          <option className="bg-background">Pro</option>
          <option className="bg-background">Studio</option>
          <option className="bg-background">Studio Plus</option>
        </select>
        <select className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs text-foreground focus:outline-none focus:border-gold/50">
          <option className="bg-background">Active</option>
          <option className="bg-background">All statuses</option>
        </select>
        <input
          type="search"
          placeholder="Search stylist"
          className="flex-1 min-w-[200px] px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold/50"
        />
      </div>

      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.06] text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              <th className="text-left px-5 py-3 font-normal">Stylist</th>
              <th className="text-left px-5 py-3 font-normal">Role</th>
              <th className="text-left px-5 py-3 font-normal">Tier</th>
              <th className="text-right px-5 py-3 font-normal">Score</th>
              <th className="text-right px-5 py-3 font-normal">Consults MTD</th>
              <th className="text-right px-5 py-3 font-normal">Retention</th>
              <th className="text-left px-5 py-3 font-normal">Last active</th>
              <th className="text-left px-5 py-3 font-normal">Status</th>
              <th className="text-right px-5 py-3 font-normal">Trend</th>
              <th className="text-right px-5 py-3 font-normal">Actions</th>
            </tr>
          </thead>
          <tbody>
            {stylists.map((s) => (
              <tr
                key={s.id}
                className="border-b border-white/[0.04] last:border-b-0 hover:bg-white/[0.02]"
              >
                <td className="px-5 py-3">
                  <Link
                    href={`/salon/team/${s.id}`}
                    className="text-foreground hover:text-gold"
                  >
                    {s.name}
                  </Link>
                </td>
                <td className="px-5 py-3">
                  <RoleBadge role={s.role} />
                </td>
                <td className="px-5 py-3 text-[11px] uppercase tracking-[0.18em] text-gold/80">
                  {s.tier}
                </td>
                <td className="px-5 py-3 text-right tabular-nums">
                  {s.scoreAvg.toFixed(1)}
                </td>
                <td className="px-5 py-3 text-right tabular-nums">
                  {s.consultationsThisMonth}
                </td>
                <td className="px-5 py-3 text-right tabular-nums">
                  {formatPercent(s.retentionRate)}
                </td>
                <td className="px-5 py-3 text-muted-foreground">
                  {s.lastActive}
                </td>
                <td className="px-5 py-3">
                  <StatusBadge status={s.status} />
                </td>
                <td className="px-5 py-3">
                  <div className="flex justify-end">
                    <MiniSparkline data={s.scoreTrend} width={80} height={22} />
                  </div>
                </td>
                <td className="px-5 py-3 text-right">
                  <Link
                    href={`/salon/team/${s.id}`}
                    className="text-xs uppercase tracking-[0.18em] text-gold hover:text-gold-light"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
