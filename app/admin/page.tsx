import { createClient } from '@/lib/supabase/server'

// Tier pricing for MRR calculation
const TIER_PRICE: Record<string, number> = {
  pro: 24.99,
  studio: 39.99,
}

async function fetchMetrics() {
  const supabase = await createClient()
  const metrics = {
    mrr: 0,
    activeSubscribers: 0,
    tierBreakdown: {} as Record<string, number>,
    newThisMonth: 0,
    trialActive: 0,
    churnLast30: 0,
    hasData: false,
  }

  try {
    // Subscribers by tier (best-effort — schema dependent)
    const { data: profiles } = await supabase
      .from('profiles')
      .select('id, subscription_tier, subscription_status, created_at')

    if (profiles && profiles.length > 0) {
      metrics.hasData = true

      for (const p of profiles) {
        if (p.subscription_status === 'active' && p.subscription_tier) {
          metrics.activeSubscribers++
          metrics.tierBreakdown[p.subscription_tier] =
            (metrics.tierBreakdown[p.subscription_tier] || 0) + 1
          metrics.mrr += TIER_PRICE[p.subscription_tier] || 0
        }
        if (p.subscription_status === 'trialing') {
          metrics.trialActive++
        }
        if (p.subscription_status === 'canceled') {
          metrics.churnLast30++ // simplified — real impl would use 30-day window
        }

        const created = new Date(p.created_at)
        const now = new Date()
        if (
          created.getMonth() === now.getMonth() &&
          created.getFullYear() === now.getFullYear()
        ) {
          metrics.newThisMonth++
        }
      }
    }
  } catch (err) {
    console.error('Admin metrics query failed:', err)
  }

  return metrics
}

function Metric({
  label,
  value,
  sub,
}: {
  label: string
  value: string
  sub?: string
}) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-6">
      <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
        {label}
      </div>
      <div className="font-serif text-3xl text-foreground">{value}</div>
      {sub && <div className="text-xs text-muted-foreground mt-2">{sub}</div>}
    </div>
  )
}

export default async function AdminDashboardPage() {
  const m = await fetchMetrics()

  return (
    <section className="max-w-5xl">
      <div className="flex items-baseline justify-between mb-8">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-gold mb-2">Dashboard</p>
          <h1 className="font-serif text-3xl md:text-4xl text-foreground">
            Business at a glance
          </h1>
        </div>
        {!m.hasData && (
          <span className="text-xs px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300">
            No live data — connect Supabase
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        <Metric
          label="Monthly Recurring Revenue"
          value={`$${m.mrr.toFixed(2)}`}
          sub="Active subscriptions"
        />
        <Metric
          label="Active Subscribers"
          value={m.activeSubscribers.toString()}
          sub="Total paying users"
        />
        <Metric
          label="Trial Active"
          value={m.trialActive.toString()}
          sub="In 7-day window"
        />
        <Metric
          label="New This Month"
          value={m.newThisMonth.toString()}
          sub="Signups"
        />
        <Metric
          label="Churn (30d)"
          value={m.churnLast30.toString()}
          sub="Canceled subscriptions"
        />
        <Metric
          label="Estimated ARR"
          value={`$${(m.mrr * 12).toFixed(0)}`}
          sub="MRR × 12"
        />
      </div>

      <h2 className="font-serif text-2xl text-foreground mb-4">Tier breakdown</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {['pro', 'studio'].map((tier) => (
          <div
            key={tier}
            className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-6"
          >
            <div className="text-xs uppercase tracking-[0.2em] text-gold mb-3">
              {tier.replace('-', ' ')}
            </div>
            <div className="font-serif text-3xl text-foreground">
              {m.tierBreakdown[tier] || 0}
            </div>
            <div className="text-xs text-muted-foreground mt-2">subscribers</div>
          </div>
        ))}
      </div>
    </section>
  )
}
