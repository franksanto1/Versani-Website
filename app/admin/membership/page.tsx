'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/cn'
import { CapReachedModal } from '@/components/billing/CapReachedModal'

/* ================================================================
   Membership — Settings → Membership
   Always-visible plan status, overage packs, and add-on controls.
   Mock data only — Stripe wiring ships with the backend.
   ================================================================ */

// Mock current-user plan. Replace with real org/user data once
// OpenServ's subscription API is live.
const mockPlan = {
  name: 'Pro',
  price: 24.99,
  cadence: 'month',
  nextBilling: 'May 12, 2026',
  consultsUsed: 47,
  consultsTotal: 50,
  updatesUsed: 84,
  updatesTotal: 120,
  renderingsUsed: 31,
  renderingsTotal: 40,
  askVersaniUsed: 35,
  askVersaniTotal: 75,
  capHitCountThisQuarter: 3,
  topUpsPurchasedThisQuarter: 3,
  topUpSpendThisQuarter: 29.97,
}

const topUpPacks: Array<{
  size: 5 | 10 | 25
  price: number
  description: string
  tag: 'popular' | 'best' | null
}> = [
  { size: 5, price: 5.99, description: '5 extra consultations', tag: null },
  { size: 10, price: 9.99, description: '10 extra consultations', tag: 'popular' },
  { size: 25, price: 19.99, description: '25 extra consultations', tag: 'best' },
]

const askVersaniTopUpPacks: Array<{
  size: 25 | 50 | 100
  price: number
  description: string
  tag: 'popular' | 'best' | null
}> = [
  { size: 25, price: 1.99, description: '25 extra Ask Versani messages', tag: null },
  { size: 50, price: 2.99, description: '50 extra Ask Versani messages', tag: 'popular' },
  { size: 100, price: 4.99, description: '100 extra Ask Versani messages', tag: 'best' },
]

const billingHistory = [
  { date: 'Apr 12, 2026', description: 'Pro — monthly', amount: 24.99 },
  { date: 'Apr 3, 2026', description: 'Top-Up 10', amount: 9.99 },
  { date: 'Mar 24, 2026', description: 'Top-Up 10', amount: 9.99 },
  { date: 'Mar 12, 2026', description: 'Pro — monthly', amount: 24.99 },
  { date: 'Mar 8, 2026', description: 'Top-Up 10', amount: 9.99 },
]

function ProgressBar({ used, total }: { used: number; total: number }) {
  const pct = Math.min(100, (used / total) * 100)
  const atCap = used >= total
  return (
    <div className="w-full h-2 rounded-full bg-white/[0.06] overflow-hidden">
      <div
        className={cn(
          'h-full rounded-full transition-all',
          atCap ? 'bg-[color:var(--gold)]' : 'bg-[color:var(--gold)]/70',
        )}
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}

export default function MembershipPage() {
  const [loadingAction, setLoadingAction] = useState<string | null>(null)
  const [capModalOpen, setCapModalOpen] = useState<
    null | 'consultations' | 'ask-versani'
  >(null)

  const onPendingAction = (key: string) => {
    setLoadingAction(key)
    // Fake delay to illustrate loading states. Real Stripe wiring lands later.
    setTimeout(() => setLoadingAction(null), 1200)
  }

  const studioTotalIfUpgraded = 39.99 * 3 // quarter
  const currentProSpendIncludingTopUps =
    mockPlan.price * 3 + mockPlan.topUpSpendThisQuarter
  const showStudioNudge = mockPlan.capHitCountThisQuarter >= 2

  const consultsRemaining = Math.max(0, mockPlan.consultsTotal - mockPlan.consultsUsed)
  const daysUntilReset = 18

  return (
    <section className="max-w-4xl">
      <p className="text-xs uppercase tracking-[0.24em] text-gold mb-2">
        Settings → Membership
      </p>
      <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-8">
        Membership
      </h1>

      {/* Your Plan */}
      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-8 mb-6">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold mb-1.5">
              Your plan
            </div>
            <div className="flex items-baseline gap-2">
              <h2 className="font-serif text-2xl text-foreground">
                {mockPlan.name}
              </h2>
              <span className="text-sm text-white/60">
                · ${mockPlan.price.toFixed(2)}/{mockPlan.cadence}
              </span>
            </div>
            <div className="text-xs text-white/50 mt-1">
              Next billing date: {mockPlan.nextBilling}
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => onPendingAction('manage-billing')}
              disabled={loadingAction === 'manage-billing'}
              className="inline-flex items-center justify-center gap-2 h-10 px-5 rounded-full text-xs font-medium tracking-wide transition-colors bg-white/[0.04] border border-white/[0.1] text-white/80 hover:bg-white/[0.08] disabled:opacity-50"
            >
              {loadingAction === 'manage-billing' ? 'Opening…' : 'Manage billing'}
            </button>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 h-10 px-5 rounded-full text-xs font-medium tracking-wide transition-colors bg-transparent border border-gold/60 text-gold hover:bg-gold hover:text-black"
            >
              Compare plans
            </Link>
          </div>
        </div>

        {/* Usage this month */}
        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 mb-4">
          Usage this month
        </div>
        <div className="space-y-4">
          <UsageRow
            label="Full consultations"
            used={mockPlan.consultsUsed}
            total={mockPlan.consultsTotal}
          />
          <UsageRow
            label="Client updates"
            used={mockPlan.updatesUsed}
            total={mockPlan.updatesTotal}
          />
          <UsageRow
            label="AI renderings"
            used={mockPlan.renderingsUsed}
            total={mockPlan.renderingsTotal}
          />
          <UsageRow
            label="Ask Versani"
            used={mockPlan.askVersaniUsed}
            total={mockPlan.askVersaniTotal}
          />
        </div>

        <p className="text-xs text-white/40 mt-4">
          {consultsRemaining} consultations remaining. Cap resets in{' '}
          {daysUntilReset} days.
        </p>
      </div>

      {/* Need More Consultations */}
      <div className="mb-8">
        <div className="flex items-baseline justify-between gap-4 mb-4">
          <h2 className="font-serif text-xl md:text-2xl text-foreground">
            Need more consultations?
          </h2>
          <button
            type="button"
            onClick={() => setCapModalOpen('consultations')}
            className="text-xs text-gold hover:underline"
          >
            Preview consultation cap-reached modal
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {topUpPacks.map((pack) => (
            <div
              key={pack.size}
              className={cn(
                'relative rounded-2xl p-5 flex flex-col',
                pack.tag
                  ? 'bg-gradient-to-b from-gold/[0.08] to-gold/[0.01] border border-gold/[0.3]'
                  : 'bg-white/[0.04] border border-white/[0.08]',
              )}
            >
              {pack.tag === 'popular' && (
                <div className="absolute -top-2.5 left-5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-[0.18em] bg-gold text-black">
                  Popular
                </div>
              )}
              {pack.tag === 'best' && (
                <div className="absolute -top-2.5 left-5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-[0.18em] bg-gold text-black">
                  Best Value
                </div>
              )}
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold mb-1.5">
                Top-Up {pack.size}
              </div>
              <div className="flex items-baseline gap-1.5 mb-2">
                <span className="font-serif text-2xl text-foreground">
                  ${pack.price.toFixed(2)}
                </span>
              </div>
              <p className="text-xs text-white/55 mb-4">{pack.description}</p>
              <button
                type="button"
                disabled={loadingAction === `top-up-${pack.size}`}
                onClick={() => onPendingAction(`top-up-${pack.size}`)}
                className="inline-flex items-center justify-center gap-2 h-10 px-5 rounded-full text-xs font-medium transition-colors bg-transparent text-gold border border-gold hover:bg-gold hover:text-black disabled:opacity-60 mt-auto"
              >
                {loadingAction === `top-up-${pack.size}` ? 'Adding…' : 'Add'}
              </button>
            </div>
          ))}
        </div>
        <p className="text-xs text-white/40 mt-4">
          Consultations never expire. Use them when you need them.
        </p>
      </div>

      {/* Need More Ask Versani */}
      <div className="mb-8">
        <div className="flex items-baseline justify-between gap-4 mb-4">
          <h2 className="font-serif text-xl md:text-2xl text-foreground">
            Need more Ask Versani?
          </h2>
          <button
            type="button"
            onClick={() => setCapModalOpen('ask-versani')}
            className="text-xs text-gold hover:underline"
          >
            Preview Ask Versani cap-reached modal
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {askVersaniTopUpPacks.map((pack) => (
            <div
              key={pack.size}
              className={cn(
                'relative rounded-2xl p-5 flex flex-col',
                pack.tag
                  ? 'bg-gradient-to-b from-gold/[0.08] to-gold/[0.01] border border-gold/[0.3]'
                  : 'bg-white/[0.04] border border-white/[0.08]',
              )}
            >
              {pack.tag === 'popular' && (
                <div className="absolute -top-2.5 left-5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-[0.18em] bg-gold text-black">
                  Popular
                </div>
              )}
              {pack.tag === 'best' && (
                <div className="absolute -top-2.5 left-5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-[0.18em] bg-gold text-black">
                  Best Value
                </div>
              )}
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold mb-1.5">
                Top-Up {pack.size} Ask
              </div>
              <div className="flex items-baseline gap-1.5 mb-2">
                <span className="font-serif text-2xl text-foreground">
                  ${pack.price.toFixed(2)}
                </span>
              </div>
              <p className="text-xs text-white/55 mb-4">{pack.description}</p>
              <button
                type="button"
                disabled={loadingAction === `ask-top-up-${pack.size}`}
                onClick={() => onPendingAction(`ask-top-up-${pack.size}`)}
                className="inline-flex items-center justify-center gap-2 h-10 px-5 rounded-full text-xs font-medium transition-colors bg-transparent text-gold border border-gold hover:bg-gold hover:text-black disabled:opacity-60 mt-auto"
              >
                {loadingAction === `ask-top-up-${pack.size}` ? 'Adding…' : 'Add'}
              </button>
            </div>
          ))}
        </div>
        <p className="text-xs text-white/40 mt-4">
          Ask Versani messages never expire. Use them when you need them.
        </p>
      </div>

      {/* Studio Upgrade nudge (shown conditionally) */}
      {showStudioNudge && (
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-8 mb-6">
          <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold mb-1.5">
            Consider Studio
          </div>
          <h2 className="font-serif text-xl md:text-2xl text-foreground mb-3">
            The math has shifted
          </h2>
          <p className="text-sm text-white/70 leading-relaxed mb-4">
            This quarter you&apos;ve added {mockPlan.topUpsPurchasedThisQuarter}{' '}
            packs for $
            {mockPlan.topUpSpendThisQuarter.toFixed(2)} on top of Pro. Moving to
            Studio would have been about $
            {(studioTotalIfUpgraded - currentProSpendIncludingTopUps).toFixed(2)}{' '}
            more over the same period — with 80 consultations baseline and the
            Studio-exclusive intelligence features.
          </p>
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-full text-sm font-medium tracking-wide bg-gold text-black border border-gold hover:bg-gold-light"
          >
            Compare plans
          </Link>
        </div>
      )}

      {/* Billing history */}
      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-8">
        <h2 className="font-serif text-xl text-foreground mb-4">
          Billing history
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-[10px] uppercase tracking-[0.18em] text-white/50 border-b border-white/[0.06]">
                <th className="pb-3 font-bold">Date</th>
                <th className="pb-3 font-bold">Description</th>
                <th className="pb-3 font-bold text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {billingHistory.map((row, i) => (
                <tr
                  key={i}
                  className={cn(
                    'text-white/80',
                    i < billingHistory.length - 1 &&
                      'border-b border-white/[0.04]',
                  )}
                >
                  <td className="py-3 text-white/55">{row.date}</td>
                  <td className="py-3">{row.description}</td>
                  <td className="py-3 text-right tabular-nums">
                    ${row.amount.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <CapReachedModal
        open={capModalOpen !== null}
        onClose={() => setCapModalOpen(null)}
        capType={capModalOpen ?? 'consultations'}
        currentPlan={mockPlan.name}
        used={
          capModalOpen === 'ask-versani'
            ? mockPlan.askVersaniTotal
            : mockPlan.consultsTotal
        }
        total={
          capModalOpen === 'ask-versani'
            ? mockPlan.askVersaniTotal
            : mockPlan.consultsTotal
        }
        daysUntilReset={daysUntilReset}
        onPurchaseTopUp={(size) => {
          const prefix =
            capModalOpen === 'ask-versani' ? 'modal-ask-top-up' : 'modal-top-up'
          onPendingAction(`${prefix}-${size}`)
          setCapModalOpen(null)
        }}
        onUpgrade={() => {
          onPendingAction('modal-upgrade')
          setCapModalOpen(null)
        }}
      />
    </section>
  )
}

function UsageRow({
  label,
  used,
  total,
}: {
  label: string
  used: number
  total: number
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-1.5">
        <span className="text-sm text-white/80">{label}</span>
        <span className="text-xs text-white/50 tabular-nums">
          {used} / {total}
        </span>
      </div>
      <ProgressBar used={used} total={total} />
    </div>
  )
}

