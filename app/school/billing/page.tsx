import type { Metadata } from 'next'
import { SectionHero } from '@/components/team/SectionHero'
import { MetricCard } from '@/components/team/MetricCard'
import { DataCard } from '@/components/team/DataCard'
import { PrivacyNotice } from '@/components/team/PrivacyNotice'
import { Button } from '@/components/ui/Button'
import { schoolMock } from '@/lib/mock/schools'
import { formatCurrency, formatDate } from '@/lib/format'

export const metadata: Metadata = {
  title: 'Billing · School Console · Versani',
  description: 'School billing and invoices.',
  robots: { index: false, follow: false },
}

export default function SchoolBillingPage() {
  const { profile, invoiceHistory } = schoolMock

  return (
    <div className="space-y-8">
      <SectionHero
        eyebrow="Billing"
        title="Billing"
        subtitle="Base seats, upgrade revenue transparency, and invoices."
      />

      <DataCard
        title="Current plan"
        description={`${profile.activeStudents} base seats · ${profile.proUpgrades} student upgrades`}
        action={
          <Button variant="gold-outline" size="sm">
            Change plan
          </Button>
        }
      >
        <div className="flex items-baseline gap-3">
          <div className="font-serif text-4xl text-foreground">
            {formatCurrency(profile.totalMRR)}
          </div>
          <div className="text-sm text-muted-foreground">/ month</div>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          {formatCurrency(profile.mrrFromBase)} base +{' '}
          {formatCurrency(profile.mrrFromUpgrades)} upgrades · Next charge{' '}
          {formatDate(profile.nextRenewal)}.
        </p>
      </DataCard>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          label="Students"
          value={`${profile.activeStudents}/${profile.maxStudents}`}
          sub="Active / allowed"
        />
        <MetricCard
          label="Per-student base"
          value={formatCurrency(8.99)}
          sub="Billed monthly to school"
        />
        <MetricCard
          label="Per-student upgrade"
          value={formatCurrency(9.99)}
          sub="Billed directly to student"
        />
      </section>

      <PrivacyNotice>
        Student Pro upgrades are billed directly by Versani to the student's
        card — they are shown here for your transparency. Your school's
        invoices do not include upgrade revenue.
      </PrivacyNotice>

      <DataCard
        title="Payment method"
        action={
          <Button variant="gold-outline" size="sm">
            Update card
          </Button>
        }
      >
        <div className="text-sm text-foreground">Mastercard ending in ••7782</div>
        <div className="text-xs text-muted-foreground mt-1">
          Expires 11/2027 · Primary card on file
        </div>
      </DataCard>

      <DataCard title="Invoice history">
        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06] text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                <th className="text-left py-2 font-normal">Invoice</th>
                <th className="text-left py-2 font-normal">Date</th>
                <th className="text-right py-2 font-normal">Amount</th>
                <th className="text-left py-2 font-normal">Status</th>
                <th className="text-right py-2 font-normal"></th>
              </tr>
            </thead>
            <tbody>
              {invoiceHistory.map((inv) => (
                <tr
                  key={inv.id}
                  className="border-b border-white/[0.04] last:border-b-0"
                >
                  <td className="py-3 text-foreground font-mono text-xs">
                    {inv.id}
                  </td>
                  <td className="py-3 text-muted-foreground">
                    {formatDate(inv.date)}
                  </td>
                  <td className="py-3 text-right tabular-nums">
                    {formatCurrency(inv.amount)}
                  </td>
                  <td className="py-3">
                    <span className="text-[10px] uppercase tracking-[0.18em] px-2 py-0.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 text-emerald-200">
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <button className="text-xs uppercase tracking-[0.18em] text-gold hover:text-gold-light">
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DataCard>
    </div>
  )
}
