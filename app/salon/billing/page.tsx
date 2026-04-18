import type { Metadata } from 'next'
import { SectionHero } from '@/components/team/SectionHero'
import { MetricCard } from '@/components/team/MetricCard'
import { DataCard } from '@/components/team/DataCard'
import { Button } from '@/components/ui/Button'
import { salonMock } from '@/lib/mock/salons'
import { formatCurrency, formatDate } from '@/lib/format'

export const metadata: Metadata = {
  title: 'Billing · Salon Console · Versani',
  description: 'Manage your salon subscription and invoices.',
  robots: { index: false, follow: false },
}

export default function SalonBillingPage() {
  const { profile, invoiceHistory } = salonMock

  return (
    <div className="space-y-8">
      <SectionHero
        eyebrow="Billing"
        title="Billing"
        subtitle="Plan, payment method, and invoice history."
      />

      <DataCard
        title="Current plan"
        description={`${profile.tier} · ${profile.activeSeats} seats`}
        action={
          <Button variant="gold-outline" size="sm">
            Change plan
          </Button>
        }
      >
        <div className="flex items-baseline gap-3">
          <div className="font-serif text-4xl text-foreground">
            {formatCurrency(profile.mrrContribution)}
          </div>
          <div className="text-sm text-muted-foreground">/ month</div>
        </div>
        <div className="text-xs text-muted-foreground mt-2">
          Next charge on {formatDate(profile.nextRenewal)}.
        </div>
      </DataCard>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          label="Seats"
          value={`${profile.activeSeats}/${profile.maxSeats}`}
          sub="Active / provisioned"
        />
        <MetricCard
          label="Per-seat rate"
          value={formatCurrency(39.99)}
          sub="Billed monthly"
        />
        <MetricCard
          label="This month"
          value={formatCurrency(profile.mrrContribution)}
          sub={`${profile.activeSeats} × ${formatCurrency(39.99)}`}
        />
      </section>

      <DataCard
        title="Payment method"
        action={
          <Button variant="gold-outline" size="sm">
            Update card
          </Button>
        }
      >
        <div className="text-sm text-foreground">Visa ending in ••4921</div>
        <div className="text-xs text-muted-foreground mt-1">
          Expires 09/2028 · Primary card on file
        </div>
      </DataCard>

      <DataCard
        title="Seat management"
        description="Add or remove seats. Changes prorate to your next invoice."
        action={
          <div className="flex gap-2">
            <Button variant="gold-outline" size="sm">
              Add seats
            </Button>
            <Button variant="ghost" size="sm">
              Stripe portal
            </Button>
          </div>
        }
      >
        <p className="text-sm text-foreground/80">
          Current seat use is <strong>{profile.activeSeats}</strong> of{' '}
          <strong>{profile.maxSeats}</strong>. Each added seat adds{' '}
          {formatCurrency(39.99)} to your monthly plan.
        </p>
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
