'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import Link from 'next/link'
import { cn } from '@/lib/cn'

/* ========================================================================
   Versani Pricing — client-side interactive surface
   - Billing toggle (monthly / yearly)
   - 5 tier cards
   - Salon calculator
   - FAQ accordion
   Server-rendered wrappers in app/pricing/page.tsx handle metadata + static
   sections (philosophy copy, comparison, callouts).
   ======================================================================== */

type Billing = 'monthly' | 'yearly'

interface TierFeature {
  label: string
  /** true = check, false = X (not included), string = detail line under label */
  included: boolean | string
}

interface Tier {
  id: string
  name: string
  tagline: string
  priceMonthly: number | null
  priceYearly: number | null
  priceLabel?: string
  ctaLabel: string
  ctaHref: string
  featured?: boolean
  annualAvailable?: boolean
  features: TierFeature[]
}

const proPremiumAddOn = {
  price: 4.99,
  features: [
    { label: 'Unlimited virtual try-ons', detail: 'overrides the 25/mo cap on base Pro' },
    { label: 'Full performance dashboard', detail: '90-day history — not just 30 days' },
    { label: 'At-risk client alerts', detail: 'surface clients who haven\u2019t booked recently' },
    { label: 'Weekly performance digest email', detail: 'a Sunday-morning read on your week' },
    { label: 'Versani Academy Library', detail: 'access the full library of masterclasses and technique walkthroughs' },
  ],
}

const tiers: Tier[] = [
  {
    id: 'trial',
    name: 'Free Trial',
    tagline: 'Experience the full app for 14 days — no card required.',
    priceMonthly: 0,
    priceYearly: 0,
    priceLabel: '14 days',
    ctaLabel: 'Start Free Trial',
    ctaHref: '/auth?mode=signup',
    features: [
      { label: 'Your actual product lines used in every formula', included: true },
      { label: 'Full Studio access — Days 1–7', included: 'everything unlocked, no limits' },
      { label: 'Limited access — Days 8–14', included: 'AI renderings and voice narration pause; consultations and chat stay on' },
      { label: 'Unlimited Ask Versani throughout', included: true },
      { label: 'Unlimited clients', included: true },
      { label: 'Day 14', included: 'Upgrade anytime to keep your momentum, or account enters read-only' },
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    tagline: 'For professional colorists who want every formula elevated.',
    priceMonthly: 19.99,
    priceYearly: null,
    annualAvailable: false,
    ctaLabel: 'Choose Pro',
    ctaHref: '/auth?mode=signup',
    features: [
      { label: 'Your actual product lines used in every formula', included: true },
      { label: '50 full consultations per month', included: 'new client or major change — formula + photo analysis + AI rendering' },
      { label: '120 client updates per month', included: 'quick formula tweaks for returning clients' },
      { label: '25 virtual try-ons per month', included: 'real-time color previews on your client\u2019s photo' },
      { label: '40 AI final-look renderings per month', included: 'photorealistic preview of finished color' },
      { label: '50 post-treatment AI scores', included: 'score every service to feed your dashboard' },
      { label: '40 voice formula narrations', included: true },
      { label: '75 Ask Versani messages per month', included: 'quick questions — chat with the AI for knowledge and technique. Top-up packs available if you need more.' },
      { label: 'Basic performance dashboard', included: 'last 30 days, score trend & service breakdown' },
      { label: 'Export client reports as PDF', included: true },
      { label: 'Unlimited client profiles', included: true },
      { label: 'Formula history & reports', included: true },
      { label: 'Top-up consultation packs available', included: 'add 5, 10, or 25 more anytime — never expire' },
      { label: 'Industry benchmarks & CSV export', included: false },
      { label: 'Shared team database', included: false },
    ],
  },
  {
    id: 'studio',
    name: 'Studio',
    tagline: 'For colorists ready to see their craft compound — patterns, trends, and industry benchmarks.',
    priceMonthly: 34.99,
    priceYearly: 357,
    ctaLabel: 'Choose Studio',
    ctaHref: '/auth?mode=signup',
    featured: true,
    features: [
      { label: 'Everything in Pro, plus the full intelligence layer:', included: true },
      { label: '80 full consultations per month', included: 'more headroom for busy weeks' },
      { label: '160 client updates per month', included: 'generous cap for established books' },
      { label: '80 AI final-look renderings per month', included: true },
      { label: '80 voice formula narrations', included: true },
      { label: '120 post-treatment AI scores', included: true },
      { label: 'Unlimited virtual try-ons', included: true },
      { label: '125 Ask Versani messages per month', included: 'quick questions — more headroom than Pro. Top-up packs available.' },
      { label: 'Full performance dashboard', included: 'pattern insights, full history' },
      { label: 'Everything in Pro Premium Add-On', included: 'at-risk alerts, digests, Academy, priority research' },
      { label: 'Industry benchmarks', included: 'Studio-exclusive — compare your scores to top-tier stylists' },
      { label: 'CSV export', included: 'Studio-exclusive — bring your data anywhere' },
      { label: 'Shared team database', included: false },
    ],
  },
  {
    id: 'studio-plus',
    name: 'Studio Plus',
    tagline: 'For dedicated color specialists — colorists who focus exclusively on color services.',
    priceMonthly: 49.99,
    priceYearly: 499,
    ctaLabel: 'Choose Studio Plus',
    ctaHref: '/auth?mode=signup',
    features: [
      { label: 'Everything in Studio, scaled for specialists:', included: true },
      { label: '120 full consultations per month', included: 'built for high new-client volume' },
      { label: '220 client updates per month', included: true },
      { label: '120 AI final-look renderings per month', included: true },
      { label: '160 voice formula narrations', included: true },
      { label: '160 post-treatment AI scores', included: true },
      { label: '200 Ask Versani messages per month', included: 'the most generous cap — for specialists who query often. Top-up packs available.' },
      { label: 'Priority AI processing', included: 'your consultations run first at peak times' },
      { label: 'Advanced correction tooling', included: 'deeper support for color correction cases' },
      { label: 'Custom formula templates', included: 'save your signature formulas for one-tap reuse' },
      { label: 'Extended formula history', included: 'unlimited lookback across all your work' },
      { label: 'Client-facing branded reports', included: 'export professional PDFs with your logo' },
      { label: 'Dedicated email support', included: true },
      { label: 'Shared team database', included: false },
    ],
  },
  {
    id: 'salon',
    name: 'Salon',
    tagline: 'For multi-chair salons — every seat gets the full Studio experience, per-seat pricing with shared team tools.',
    priceMonthly: null,
    priceYearly: null,
    priceLabel: 'Per-seat',
    ctaLabel: 'Request Salon Pricing',
    ctaHref: 'mailto:frank@versani.ai?subject=Salon%20Versani%20pricing%20inquiry',
    features: [
      { label: 'Two options — Option A or Option B:', included: true },
      { label: 'Option A — 50 full consults per seat', included: 'from $27/seat · maintenance-heavy salons' },
      { label: 'Option B — 100 full consults per seat', included: 'from $38/seat · high-volume salons' },
      { label: 'Full Studio feature experience for every seat', included: 'no dilution — every stylist gets the complete tool' },
      { label: 'Your salon\u2019s product lines used in every formula', included: true },
      { label: 'Shared salon inventory across all stylists', included: true },
      { label: 'Shared AI preview cache across the team', included: 'faster, cheaper over time' },
      { label: 'Shared client database', included: true },
      { label: 'Per-stylist usage tracking', included: true },
      { label: 'Role-based permissions', included: true },
      { label: 'Salon owner dashboard', included: 'team performance at a glance' },
      { label: 'Volume discounts (3 / 5 / 10 / 25+ seats)', included: true },
    ],
  },
  {
    id: 'custom',
    name: 'Custom',
    tagline: 'For 50+ seats, multi-location salon groups, beauty schools, and color education brands.',
    priceMonthly: null,
    priceYearly: null,
    priceLabel: 'By conversation',
    ctaLabel: "Let\u2019s talk",
    ctaHref: 'mailto:frank@versani.ai?subject=Custom%20%2F%20Multi-location%20Versani%20pricing%20inquiry',
    features: [
      { label: 'Custom volume economics', included: 'per-seat rate continues to decrease above 50 seats' },
      { label: 'Dedicated onboarding', included: 'we migrate your team and train every stylist' },
      { label: 'Direct access to the founder', included: 'account management from Frank himself' },
      { label: 'Shared database across all locations', included: true },
      { label: 'Multi-location team dashboards', included: true },
      { label: 'Custom contract terms', included: true },
      { label: 'Priority support', included: true },
    ],
  },
]

/* ── Salon per-seat pricing tiers ── */
const salonBreakpoints = {
  optionA: [
    { min: 1, max: 4, perSeat: 29.99 },
    { min: 5, max: 9, perSeat: 28.99 },
    { min: 10, max: 40, perSeat: 27.99 },
    { min: 41, max: 50, perSeat: 26.99 },
  ],
  optionB: [
    { min: 1, max: 4, perSeat: 42.99 },
    { min: 5, max: 9, perSeat: 40.99 },
    { min: 10, max: 24, perSeat: 39.99 },
    { min: 25, max: 50, perSeat: 37.99 },
  ],
} as const

function getSalonPerSeatRate(
  seats: number,
  option: 'optionA' | 'optionB',
): number {
  const brackets = salonBreakpoints[option]
  const bracket =
    brackets.find((b) => seats >= b.min && seats <= b.max) ??
    brackets[brackets.length - 1]
  return bracket.perSeat
}

const salonExamples = [3, 5, 10, 25]

/* ================================================================
   Root client component
   ================================================================ */

export const overagePacks = [
  { size: 5, price: 5.99, label: 'Top-Up 5', description: '5 extra consultations', tag: null as null | 'popular' | 'best' },
  { size: 10, price: 9.99, label: 'Top-Up 10', description: '10 extra consultations', tag: 'popular' as const },
  { size: 25, price: 19.99, label: 'Top-Up 25', description: '25 extra consultations', tag: 'best' as const },
]

export const askVersaniPacks = [
  {
    id: 'ask-25',
    size: 25,
    price: 1.99,
    label: 'Top-Up 25 Ask',
    description: '25 extra Ask Versani messages. Never expires.',
    badge: null as string | null,
  },
  {
    id: 'ask-50',
    size: 50,
    price: 2.99,
    label: 'Top-Up 50 Ask',
    description: '50 extra Ask Versani messages. Never expires.',
    badge: 'POPULAR',
  },
  {
    id: 'ask-100',
    size: 100,
    price: 4.99,
    label: 'Top-Up 100 Ask',
    description: '100 extra Ask Versani messages. Never expires.',
    badge: 'BEST VALUE',
  },
]

export const proAddOn = proPremiumAddOn

export function PricingClient() {
  const [billing, setBilling] = useState<Billing>('monthly')
  const [proAddOnEnabled, setProAddOnEnabled] = useState<boolean>(false)

  const formatPrice = (tier: Tier) => {
    if (tier.priceMonthly === 0) return 'Free'
    if (tier.priceMonthly === null) return tier.priceLabel ?? 'Custom'
    const useYearly =
      billing === 'yearly' &&
      tier.annualAvailable !== false &&
      tier.priceYearly !== null
    const price = useYearly ? tier.priceYearly! / 12 : tier.priceMonthly
    return `$${price.toFixed(2)}`
  }

  const formatCadence = (tier: Tier) => {
    if (tier.priceMonthly === 0) return tier.priceLabel
    if (tier.priceMonthly === null) return ''
    const useYearly =
      billing === 'yearly' &&
      tier.annualAvailable !== false &&
      tier.priceYearly !== null
    return useYearly ? '/month, billed yearly' : '/month'
  }

  return (
    <>
      {/* Billing toggle */}
      <div className="flex justify-center mb-14">
        <div className="inline-flex items-center gap-1 p-1 rounded-full bg-white/[0.04] border border-white/[0.08]">
          <button
            type="button"
            onClick={() => setBilling('monthly')}
            className={cn(
              'px-5 py-2 rounded-full text-sm font-semibold tracking-wide transition-colors',
              billing === 'monthly'
                ? 'bg-[color:var(--gold)] text-black'
                : 'text-white/60 hover:text-white/90',
            )}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setBilling('yearly')}
            className={cn(
              'px-5 py-2 rounded-full text-sm font-semibold tracking-wide transition-colors flex items-center gap-2',
              billing === 'yearly'
                ? 'bg-[color:var(--gold)] text-black'
                : 'text-white/60 hover:text-white/90',
            )}
          >
            Yearly
            <span
              className={cn(
                'text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full',
                billing === 'yearly'
                  ? 'bg-black/15 text-black'
                  : 'bg-[color:var(--gold)]/15 text-[color:var(--gold)]',
              )}
            >
              Save up to 17%
            </span>
          </button>
        </div>
      </div>

      {/* Tier cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {tiers.map((tier, i) => (
          <motion.div
            key={tier.id}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{
              duration: 0.6,
              delay: 0.05 + i * 0.06,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className={cn(
              'relative rounded-2xl p-7 flex flex-col',
              tier.featured
                ? 'bg-gradient-to-b from-[color:var(--gold)]/[0.08] to-[color:var(--gold)]/[0.01] border-2 border-[color:var(--gold)]'
                : 'bg-white/[0.04] border border-white/[0.08]',
            )}
            style={
              tier.featured
                ? {
                    boxShadow:
                      '0 8px 32px rgba(0,0,0,0.6), 0 0 40px oklch(0.76 0.15 85 / 0.08), inset 0 1px 0 rgba(255,255,255,0.06)',
                  }
                : {
                    boxShadow:
                      '0 4px 20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)',
                  }
            }
          >
            {tier.featured && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.18em] whitespace-nowrap bg-[color:var(--gold)] text-black">
                Most Popular
              </div>
            )}

            <div className="mb-1">
              <h3 className="font-serif text-2xl tracking-tight text-[color:var(--foreground)]">
                {tier.name}
              </h3>
            </div>
            <p className="text-sm text-white/55 leading-relaxed mb-6">
              {tier.tagline}
            </p>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline gap-1.5">
                <span className="font-serif text-4xl tracking-tight text-[color:var(--foreground)]">
                  {formatPrice(tier)}
                </span>
                {tier.priceMonthly !== null && tier.priceMonthly > 0 && (
                  <span className="text-sm text-white/50 font-medium">
                    {formatCadence(tier)}
                  </span>
                )}
                {tier.priceMonthly === 0 && (
                  <span className="text-sm text-white/50 font-medium ml-1">
                    {tier.priceLabel}
                  </span>
                )}
              </div>
              {billing === 'yearly' &&
                tier.annualAvailable !== false &&
                tier.priceYearly &&
                tier.priceMonthly && (
                  <p className="text-xs text-white/40 mt-1 font-medium">
                    ${tier.priceYearly}/year — $
                    {(tier.priceMonthly * 12 - tier.priceYearly).toFixed(0)}{' '}
                    savings
                  </p>
                )}
              {billing === 'yearly' && tier.annualAvailable === false && (
                <p className="text-xs mt-1 font-medium text-[color:var(--gold)]">
                  Monthly only · annual billing starts at Studio
                </p>
              )}
              {tier.id === 'pro' && proAddOnEnabled && (
                <p className="text-xs text-[color:var(--gold)] mt-1 font-medium">
                  ${(19.99 + proPremiumAddOn.price).toFixed(2)}/month with Premium Add-On
                </p>
              )}
            </div>

            <Link
              href={tier.ctaHref}
              className={cn(
                'inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full text-sm font-medium tracking-wide transition-all duration-300 ease-luxury w-full mb-6',
                tier.featured
                  ? 'bg-[color:var(--gold)] text-black border border-[color:var(--gold-light)] hover:bg-[color:var(--gold-light)]'
                  : 'bg-transparent text-[color:var(--gold)] border border-[color:var(--gold)] hover:bg-[color:var(--gold)] hover:text-black',
              )}
            >
              {tier.ctaLabel}
            </Link>

            {tier.id === 'pro' && (
              <div className="mb-5 rounded-xl p-3 bg-[color:var(--gold)]/[0.05] border border-[color:var(--gold)]/[0.22]">
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <button
                    type="button"
                    onClick={() => setProAddOnEnabled((v) => !v)}
                    aria-pressed={proAddOnEnabled}
                    aria-label="Toggle Pro Premium Add-On"
                    className={cn(
                      'relative mt-0.5 shrink-0 w-9 h-5 rounded-full transition-colors',
                      proAddOnEnabled
                        ? 'bg-[color:var(--gold)]'
                        : 'bg-white/[0.12]',
                    )}
                  >
                    <span
                      className={cn(
                        'absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform',
                        proAddOnEnabled
                          ? 'translate-x-[18px]'
                          : 'translate-x-0.5',
                      )}
                    />
                  </button>
                  <span
                    onClick={() => setProAddOnEnabled((v) => !v)}
                    className="text-xs leading-snug text-white/80"
                  >
                    <span className="font-semibold text-[color:var(--gold)]">
                      + Pro Premium Add-On $4.99/mo
                    </span>
                    <span className="block text-[11px] text-white/50 mt-0.5">
                      Adds unlimited try-ons, 90-day dashboard, alerts & more
                    </span>
                  </span>
                </label>
                {proAddOnEnabled && (
                  <ul className="mt-3 space-y-2 text-xs">
                    {proPremiumAddOn.features.map((f, k) => (
                      <li key={k} className="flex items-start gap-2 text-white/80">
                        <CheckIcon />
                        <span>
                          {f.label}
                          <span className="block text-[11px] text-white/45 mt-0.5">
                            {f.detail}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            <ul className="space-y-3 text-sm">
              {tier.features.map((feature, j) => (
                <li key={j} className="flex items-start gap-2.5">
                  {feature.included === true ? (
                    <CheckIcon />
                  ) : feature.included === false ? (
                    <XIcon />
                  ) : (
                    <DotIcon />
                  )}
                  <span
                    className={cn(
                      feature.included === false
                        ? 'text-white/30 line-through'
                        : 'text-white/80',
                    )}
                  >
                    {feature.label}
                    {typeof feature.included === 'string' && (
                      <span className="block text-xs text-white/45 mt-0.5 font-normal no-underline">
                        {feature.included}
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </>
  )
}

/* ================================================================
   Overage Packs — always-visible top-up cards
   ================================================================ */

/**
 * Compact tile used inside the TopUpPacks grid.
 * Designed for 2-column mobile / 3-column desktop layouts — no vertical wasted space.
 */
function TopUpTile({
  label,
  price,
  description,
  badge,
  unit,
}: {
  label: string
  price: number
  description: string
  badge?: string | null
  unit: string
}) {
  return (
    <Link
      href="/auth?mode=signup"
      className={cn(
        'group relative rounded-2xl p-4 md:p-5 flex flex-col justify-between min-h-[150px]',
        'transition-all duration-300 ease-luxury',
        'hover:border-[color:var(--gold)]/[0.55]',
        badge
          ? 'bg-gradient-to-b from-[color:var(--gold)]/[0.08] to-[color:var(--gold)]/[0.01] border border-[color:var(--gold)]/[0.35]'
          : 'bg-white/[0.04] border border-white/[0.08]',
      )}
    >
      {badge && (
        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-[0.18em] whitespace-nowrap bg-[color:var(--gold)] text-black">
          {badge}
        </div>
      )}
      <div>
        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[color:var(--gold)] mb-1.5">
          {label}
        </div>
        <div className="flex items-baseline gap-1 mb-1">
          <span className="font-serif text-2xl md:text-3xl tracking-tight text-[color:var(--foreground)]">
            ${price.toFixed(2)}
          </span>
        </div>
        <p className="text-xs text-white/55 leading-snug">{description}</p>
      </div>
      <div className="mt-3 text-[11px] font-medium text-[color:var(--gold)] group-hover:text-[color:var(--foreground)] transition-colors">
        Add {unit} →
      </div>
    </Link>
  )
}

/**
 * Legacy OveragePacks — kept for backwards compatibility if referenced elsewhere.
 * New default is <TopUpPacks /> (segmented tabs + compact tile grid).
 */
export function OveragePacks() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
      {overagePacks.map((pack) => (
        <TopUpTile
          key={pack.size}
          label={pack.label}
          price={pack.price}
          description={pack.description}
          badge={
            pack.tag === 'popular' ? 'Popular' : pack.tag === 'best' ? 'Best Value' : null
          }
          unit="consults"
        />
      ))}
    </div>
  )
}

/**
 * TopUpPacks — unified mobile-first top-up surface.
 *
 * Shows BOTH Consultation packs AND Ask Versani packs in two clearly
 * labeled sections. No tabs — users see everything at once.
 * Each section uses a compact 2-col (mobile) / 3-col (desktop) tile grid.
 */
export function TopUpPacks() {
  const consultPacks = overagePacks.map((p) => ({
    id: `c-${p.size}`,
    label: p.label,
    price: p.price,
    description: `${p.size} extra consultations. Never expires.`,
    badge:
      p.tag === 'popular' ? 'Popular' : p.tag === 'best' ? 'Best Value' : null,
  }))

  const askPacks = askVersaniPacks.map((p) => ({
    id: p.id,
    label: p.label,
    price: p.price,
    description: p.description,
    badge:
      p.badge === 'POPULAR'
        ? 'Popular'
        : p.badge === 'BEST VALUE'
          ? 'Best Value'
          : null,
  }))

  return (
    <div className="space-y-10 md:space-y-12">
      {/* Consultation packs */}
      <div>
        <div className="flex items-baseline justify-between mb-4 md:mb-5">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-[color:var(--gold)] mb-1">
              Consultations
            </div>
            <h3 className="font-serif text-xl md:text-2xl tracking-tight text-[color:var(--foreground)]">
              Extra consultations
            </h3>
          </div>
          <span className="hidden md:inline text-xs text-white/45">
            Never expires
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {consultPacks.map((pack) => (
            <TopUpTile
              key={pack.id}
              label={pack.label}
              price={pack.price}
              description={pack.description}
              badge={pack.badge}
              unit="consults"
            />
          ))}
        </div>
      </div>

      {/* Ask Versani packs */}
      <div>
        <div className="flex items-baseline justify-between mb-4 md:mb-5">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-[color:var(--gold)] mb-1">
              Ask Versani
            </div>
            <h3 className="font-serif text-xl md:text-2xl tracking-tight text-[color:var(--foreground)]">
              Extra Ask Versani messages
            </h3>
          </div>
          <span className="hidden md:inline text-xs text-white/45">
            Never expires
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {askPacks.map((pack) => (
            <TopUpTile
              key={pack.id}
              label={pack.label}
              price={pack.price}
              description={pack.description}
              badge={pack.badge}
              unit="messages"
            />
          ))}
        </div>
      </div>

      <p className="text-xs text-white/45 text-center md:text-left">
        Packs work across Pro, Studio, and Studio Plus. Nothing expires.
      </p>
    </div>
  )
}

/* ================================================================
   Ask Versani Packs — always-visible Ask Versani top-up cards
   ================================================================ */

export function AskVersaniPacks() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {askVersaniPacks.map((pack) => (
        <div
          key={pack.id}
          className={cn(
            'relative rounded-2xl p-6 flex flex-col',
            pack.badge
              ? 'bg-gradient-to-b from-[color:var(--gold)]/[0.08] to-[color:var(--gold)]/[0.01] border border-[color:var(--gold)]/[0.35]'
              : 'bg-white/[0.04] border border-white/[0.08]',
          )}
        >
          {pack.badge && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.18em] whitespace-nowrap bg-[color:var(--gold)] text-black">
              {pack.badge}
            </div>
          )}
          <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[color:var(--gold)] mb-2">
            {pack.label}
          </div>
          <div className="flex items-baseline gap-1.5 mb-2">
            <span className="font-serif text-3xl tracking-tight text-[color:var(--foreground)]">
              ${pack.price.toFixed(2)}
            </span>
          </div>
          <p className="text-sm text-white/60 leading-relaxed mb-4">
            {pack.description}
          </p>
          <Link
            href="/auth?mode=signup"
            className={cn(
              'inline-flex items-center justify-center gap-2 h-11 px-6 rounded-full text-sm font-medium tracking-wide transition-all duration-300 ease-luxury w-full mt-auto',
              'bg-transparent text-[color:var(--gold)] border border-[color:var(--gold)] hover:bg-[color:var(--gold)] hover:text-black',
            )}
          >
            Add to plan
          </Link>
        </div>
      ))}
    </div>
  )
}

/* ================================================================
   Salon Calculator — standalone client component
   ================================================================ */

export function SalonCalculator() {
  const [option, setOption] = useState<'optionA' | 'optionB'>('optionA')
  const [seats, setSeats] = useState<number>(10)

  const clampSeats = (n: number) => Math.max(1, Math.min(50, Math.round(n)))
  const perSeat = getSalonPerSeatRate(seats, option)
  const total = seats * perSeat
  const brackets = salonBreakpoints[option]

  const optionLabel =
    option === 'optionA'
      ? 'Option A · 50 consults per seat'
      : 'Option B · 100 consults per seat'
  const optionDescription =
    option === 'optionA'
      ? 'For maintenance-heavy salons and employee stylists.'
      : 'For high-volume salons and booth-rental teams.'

  return (
    <div className="text-left">
      {/* Option toggle */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex items-center gap-1 p-1 rounded-full bg-white/[0.04] border border-white/[0.08]">
          <button
            type="button"
            onClick={() => setOption('optionA')}
            className={cn(
              'px-5 py-2 rounded-full text-sm font-semibold tracking-wide transition-colors',
              option === 'optionA'
                ? 'bg-[color:var(--gold)] text-black'
                : 'text-white/60 hover:text-white/90',
            )}
          >
            Option A
          </button>
          <button
            type="button"
            onClick={() => setOption('optionB')}
            className={cn(
              'px-5 py-2 rounded-full text-sm font-semibold tracking-wide transition-colors',
              option === 'optionB'
                ? 'bg-[color:var(--gold)] text-black'
                : 'text-white/60 hover:text-white/90',
            )}
          >
            Option B
          </button>
        </div>
      </div>

      <div className="text-center mb-6">
        <div className="text-[11px] font-bold uppercase tracking-[0.25em] mb-2 text-[color:var(--gold)]">
          {optionLabel}
        </div>
        <p className="text-xs text-white/55 max-w-sm mx-auto">
          {optionDescription}
        </p>
      </div>

      {/* Calculator */}
      <div
        className="rounded-2xl p-6 md:p-8 mb-6 bg-gradient-to-b from-[color:var(--gold)]/[0.06] to-[color:var(--gold)]/[0.01] border border-[color:var(--gold)]/[0.18]"
      >
        <div className="text-center">
          <div className="text-xs text-white/60 font-medium mb-3">
            How many seats does your salon need?
          </div>

          <div className="flex items-center justify-center gap-3 mb-4">
            <button
              type="button"
              onClick={() => setSeats(clampSeats(seats - 1))}
              className="w-10 h-10 rounded-full bg-white/[0.06] hover:bg-white/[0.1] text-white/80 text-xl font-bold transition-colors"
              aria-label="Decrease seats"
            >
              −
            </button>
            <input
              type="number"
              min={1}
              max={50}
              value={seats}
              onChange={(e) =>
                setSeats(clampSeats(Number(e.target.value) || 1))
              }
              className="w-20 text-center font-serif text-3xl bg-transparent border-b border-white/[0.15] focus:border-[color:var(--gold)] focus:outline-none text-[color:var(--foreground)]"
            />
            <button
              type="button"
              onClick={() => setSeats(clampSeats(seats + 1))}
              className="w-10 h-10 rounded-full bg-white/[0.06] hover:bg-white/[0.1] text-white/80 text-xl font-bold transition-colors"
              aria-label="Increase seats"
            >
              +
            </button>
          </div>

          <div className="font-serif text-4xl md:text-5xl tracking-tight mb-1 text-[color:var(--foreground)]">
            ${total.toFixed(2)}
          </div>
          <div className="text-sm text-white/60 mb-1">/month</div>
          <div className="text-xs text-white/50">
            ${perSeat.toFixed(2)} per seat
          </div>
        </div>
      </div>

      {/* Rate breakpoints */}
      <div className="mb-6">
        <div className="text-[10px] font-bold uppercase tracking-[0.18em] mb-2 text-white/60 text-center">
          Your per-seat rate
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center">
          {brackets.map((b, i) => {
            const isCurrent = seats >= b.min && seats <= b.max
            const rangeLabel =
              b.max === 50 ? `${b.min}+ seats` : `${b.min}–${b.max} seats`
            return (
              <div
                key={i}
                className={cn(
                  'rounded-lg p-3 transition-all border',
                  isCurrent
                    ? 'bg-[color:var(--gold)]/[0.12] border-[color:var(--gold)]'
                    : 'bg-white/[0.03] border-white/[0.06]',
                )}
              >
                <div className="text-[10px] text-white/60 uppercase tracking-wider mb-1">
                  {rangeLabel}
                </div>
                <div
                  className={cn(
                    'font-serif text-base',
                    isCurrent
                      ? 'text-[color:var(--gold)]'
                      : 'text-[color:var(--foreground)]',
                  )}
                >
                  ${b.perSeat.toFixed(2)}/seat
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Quick sizes */}
      <div>
        <div className="text-[10px] font-bold uppercase tracking-[0.18em] mb-3 text-white/60 text-center">
          Pricing at common salon sizes
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
          {salonExamples.map((n) => {
            const rate = getSalonPerSeatRate(n, option)
            const monthlyTotal = n * rate
            return (
              <button
                type="button"
                key={n}
                onClick={() => setSeats(n)}
                className="rounded-lg p-3 hover:bg-white/[0.04] transition-colors bg-white/[0.02] border border-white/[0.06]"
              >
                <div className="text-[10px] text-white/50 uppercase tracking-wider mb-1">
                  {n} seats
                </div>
                <div className="font-serif text-xl text-[color:var(--foreground)]">
                  ${monthlyTotal.toFixed(0)}
                </div>
                <div className="text-[10px] text-white/40">/month</div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

/* ================================================================
   FAQ accordion — client component
   ================================================================ */

interface FAQItemProps {
  question: string
  answer: string
}

export function FAQItem({ question, answer }: FAQItemProps) {
  const [open, setOpen] = useState(false)
  return (
    <div className="rounded-xl overflow-hidden bg-white/[0.03] border border-white/[0.06]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="text-sm font-semibold text-white/90">{question}</span>
        <span
          className="shrink-0 text-xl leading-none transition-transform duration-200 text-[color:var(--gold)]"
          style={{ transform: open ? 'rotate(45deg)' : 'rotate(0)' }}
          aria-hidden="true"
        >
          +
        </span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
        className="overflow-hidden"
      >
        <p className="px-5 pb-4 text-sm text-white/65 leading-relaxed">
          {answer}
        </p>
      </motion.div>
    </div>
  )
}

/* ── Icons ── */

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mt-0.5 shrink-0 text-[color:var(--gold)]"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mt-0.5 shrink-0 text-white/20"
      aria-hidden="true"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

function DotIcon() {
  return (
    <div
      className="w-4 h-4 mt-0.5 shrink-0 rounded-full flex items-center justify-center bg-[color:var(--gold)]/15"
      aria-hidden="true"
    >
      <div className="w-1.5 h-1.5 rounded-full bg-[color:var(--gold)]" />
    </div>
  )
}
