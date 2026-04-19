import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteNav } from '@/components/nav/SiteNav'
import { SiteFooter } from '@/components/nav/SiteFooter'
import {
  PricingClient,
  SalonCalculator,
  FAQItem,
  TopUpPacks,
} from '@/components/pricing/PricingClient'

export const metadata: Metadata = {
  title: 'Pricing — Five tiers, zero compromise',
  description:
    'Pricing that respects your craft. Five Versani tiers — Free Trial, Pro, Studio, Studio Plus, and Salon — with per-seat salon pricing, top-up consultation packs that never expire, and a 14-day trial with 7 days of unlimited access.',
  alternates: { canonical: '/pricing' },
  openGraph: {
    title: 'Versani Pricing — Five tiers, zero compromise',
    description:
      'Five tiers designed around how professionals actually work. 14-day trial with 7 days of unlimited access. Top up anytime — consultations never expire.',
    url: '/pricing',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Versani Pricing',
    description:
      'Five tiers designed around how professionals actually work.',
  },
}

const upgradeHighlights = [
  {
    title: '60% more full consultations (50 → 80)',
    body: 'Real headroom for heavy new-client weeks. Client updates rise with you.',
  },
  {
    title: 'Industry benchmarks (Studio-exclusive)',
    body: 'See how your scores stack against top-tier colorists. Not available at any other tier.',
  },
  {
    title: 'CSV export (Studio-exclusive)',
    body: 'Bring your data anywhere — your scoring trends, formulas, and client patterns.',
  },
  {
    title: 'Unlimited virtual try-ons',
    body: 'Show every client their future color — no counting, no add-on needed.',
  },
  {
    title: 'Everything the Pro Premium Add-On unlocks',
    body: 'Full 90-day dashboard, at-risk client alerts, weekly digest, Academy library, priority research — all included.',
  },
  {
    title: 'More of everything else',
    body: 'Renderings, voice narration, post-treatment scoring all scale up with Studio.',
  },
]

const comparisonRows = [
  { feature: 'Free-trial length', versani: '14-day (full 7 days + reduced 7 days)', blendsor: '7 days' },
  { feature: 'Pro tier full consultations / month', versani: '50 (full AI flow) + overage packs', blendsor: '50 formulas only' },
  { feature: 'Overage packs available', versani: 'Top-ups never expire', blendsor: '—' },
  { feature: 'Client updates for returning clients', versani: '120–220 / month by tier', blendsor: 'Count against cap' },
  { feature: 'Pro tier price', versani: '$19.99', blendsor: '€19 (~$21)' },
  { feature: 'Optional Premium add-on (Pro)', versani: '$4.99/mo', blendsor: '—' },
  { feature: 'Unlimited client profiles (Pro)', versani: 'Yes', blendsor: 'Capped at 100' },
  { feature: 'Virtual try-ons (Pro)', versani: '25/mo (unlimited with $4.99 add-on)', blendsor: '20 / month' },
  { feature: 'Virtual try-ons (Studio)', versani: 'Unlimited', blendsor: 'Capped' },
  { feature: 'AI preview rendering', versani: 'Bundled with consult', blendsor: '—' },
  { feature: 'Post-treatment AI scoring', versani: '50 Pro / 120 Studio / 160 Studio Plus', blendsor: '—' },
  { feature: 'Performance dashboard & trends', versani: 'Yes (Studio — 90-day add-on on Pro)', blendsor: '—' },
  { feature: 'Personal RAG data ownership', versani: 'Yes', blendsor: '—' },
  { feature: 'Your actual inventory drives every formula', versani: 'Yes', blendsor: '—' },
  { feature: 'Voice formula narration', versani: 'Yes (Studio)', blendsor: '—' },
  { feature: 'Ask Versani messages / month', versani: '75/125/200 + top-up packs ($1.99+)', blendsor: 'Limited' },
  { feature: 'Specialist tier for high-volume pros', versani: 'Studio Plus (120/mo)', blendsor: '—' },
  { feature: 'Multi-seat salon tier (shared DB)', versani: 'Yes', blendsor: '—' },
]

const faqs = [
  {
    q: 'What counts as a full consultation vs a refresh?',
    a: 'A full consultation fires when you\u2019re working with a new client or making a major change — photo analysis, fresh formula generation, and situational AI support all run. A refresh is a client update for an existing client (root touch-up, toner swap, gloss refresh). Client updates have their own separate monthly cap. Caps only apply to these buckets — past work stays accessible regardless.',
  },
  {
    q: 'What happens when I reach my consultation cap?',
    a: 'You can add a top-up pack at any time — 5 consultations for $5.99, 10 for $9.99, or 25 for $19.99. Top-up consultations never expire and roll over indefinitely. You can also upgrade to Studio for more volume and exclusive features. Client updates for returning clients keep working in their own bucket.',
  },
  {
    q: 'What is the Pro Premium Add-On?',
    a: 'A $4.99/month option for Pro subscribers ($24.98 total). It unlocks unlimited virtual try-ons, the full 90-day performance dashboard, at-risk client alerts, the weekly performance digest email, and Versani Academy Library access. Industry benchmarks and CSV export remain Studio-exclusive — those are a real reason to upgrade.',
  },
  {
    q: 'How does the free trial work?',
    a: 'Fourteen days in two phases. Days 1–7: full Studio access with no limits. Days 8–14: AI renderings and voice narration pause, but full consultations, client updates, and Ask Versani keep working. On Day 14, upgrade to any paid tier to keep your momentum, or your account enters read-only. No credit card required to start.',
  },
  {
    q: 'Do my top-up consultations expire?',
    a: 'No. Consultations from top-up packs never expire and roll over indefinitely. Use them when you need them.',
  },
  {
    q: 'What if I hit my Ask Versani limit?',
    a: 'You can add Top-Up 25 ($1.99), Top-Up 50 ($2.99), or Top-Up 100 ($4.99) anytime. Ask Versani messages never expire — use them whenever you need them. If you\u2019re consistently hitting your monthly limit, upgrading a tier may be more economical. Pro includes 75/month, Studio 125/month, and Studio Plus 200/month.',
  },
  {
    q: 'Can I switch between tiers anytime?',
    a: 'Yes. Upgrades take effect immediately and you\u2019re prorated. Downgrades apply at your next billing cycle so you don\u2019t lose anything mid-month. No long-term commitments.',
  },
  {
    q: 'How does post-treatment AI scoring actually work?',
    a: 'After completing a color service, take a quick "after" photo. Versani compares it against your target formula and returns scores on tone accuracy, evenness, and hair integrity — along with a short written note on what worked and what could improve. About 30 seconds end-to-end.',
  },
  {
    q: 'When should I upgrade from Pro to Studio?',
    a: 'When you want the Studio-exclusives — industry benchmarks and CSV export — or when you\u2019re regularly adding top-ups to cover volume above 50 consultations. Studio also brings 80 consultations baseline, unlimited try-ons by default, and everything the Premium Add-On unlocks.',
  },
  {
    q: 'When does Studio Plus make sense?',
    a: 'When you\u2019re consistently pushing past 80 full consultations in a month. Typical for color correction specialists, celebrity colorists, and stylists with heavy new-client acquisition. Studio Plus gives you 120 full consultations, priority AI processing, advanced correction tooling, and client-facing branded reports.',
  },
  {
    q: 'Is my data really mine?',
    a: 'Yes. Your personal RAG — your shade charts, formulas, client history, photos — belongs to you. We don\u2019t sell data, we don\u2019t centralize anyone\u2019s library. You can export everything anytime, and canceling puts your account into read-only mode instead of deleting anything.',
  },
]

export default function PricingPage() {
  return (
    <>
      <SiteNav />
      <main id="main" className="relative">
        {/* Hero */}
        <section
          aria-labelledby="pricing-hero-heading"
          className="relative isolate overflow-hidden pt-32 md:pt-40 pb-8 md:pb-12"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 gold-radial pointer-events-none"
          />
          <div className="relative container text-center">
            <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--gold)] mb-5">
              Membership
            </p>
            <h1
              id="pricing-hero-heading"
              className="font-serif font-light text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] tracking-tight text-[color:var(--foreground)]"
            >
              Pricing that respects{' '}
              <em className="italic font-normal text-[color:var(--gold)]">
                your craft
              </em>
            </h1>
            <p className="mt-7 max-w-2xl mx-auto text-base md:text-lg text-[color:var(--muted-foreground)] leading-relaxed">
              Five tiers designed around how professionals actually work. Top up
              anytime — consultations never expire. 14-day trial with 7 days of
              unlimited access, then billing or reduced features.
            </p>
          </div>
        </section>

        {/* Toggle + tier cards (client) */}
        <section
          aria-label="Pricing tiers"
          className="container pt-8 pb-20 md:pb-24"
        >
          <PricingClient />
        </section>

        {/* Top-Up Packs — unified tabbed surface (mobile-friendly) */}
        <section
          aria-labelledby="topup-heading"
          className="container pb-24 md:pb-28 max-w-5xl"
        >
          <div className="text-center mb-8 md:mb-10">
            <div className="text-[10px] font-bold uppercase tracking-[0.25em] mb-3 text-[color:var(--gold)]">
              Need more?
            </div>
            <h2
              id="topup-heading"
              className="font-serif text-3xl md:text-4xl font-light tracking-tight"
            >
              Top up{' '}
              <em className="italic font-normal text-[color:var(--gold)]">
                anytime
              </em>
            </h2>
            <p className="text-sm text-white/55 mt-3 max-w-lg mx-auto">
              Add consultations or Ask Versani messages instantly. Nothing
              expires.
            </p>
          </div>

          <div className="flex justify-center md:justify-start mb-2">
            <TopUpPacks />
          </div>
        </section>

        {/* Upgrade reasons */}
        <section
          aria-labelledby="upgrade-heading"
          className="container pb-24 md:pb-28 max-w-5xl"
        >
          <div className="text-center mb-12">
            <div className="text-[10px] font-bold uppercase tracking-[0.25em] mb-3 text-[color:var(--gold)]">
              Choosing a tier
            </div>
            <h2
              id="upgrade-heading"
              className="font-serif text-3xl md:text-4xl font-light tracking-tight"
            >
              Moving from Pro to{' '}
              <em className="italic font-normal text-[color:var(--gold)]">
                Studio
              </em>{' '}
              means…
            </h2>
            <p className="text-sm text-white/55 mt-3 max-w-lg mx-auto">
              More volume, the exclusive intelligence features, and everything
              the Premium Add-On unlocks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {upgradeHighlights.map((item, i) => (
              <div
                key={i}
                className="rounded-2xl p-4 bg-white/[0.04] border border-white/[0.08]"
              >
                <div className="font-medium text-base mb-1 text-[color:var(--foreground)]">
                  {item.title}
                </div>
                <div className="text-sm text-white/60 leading-relaxed">
                  {item.body}
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-white/40 text-center mt-10 italic">
            Not ready for Studio yet? Add the Pro Premium Add-On for $4.99/mo,
            or grab a top-up pack.
          </p>
        </section>

        {/* Studio Plus callout */}
        <section className="container pb-24 md:pb-28 max-w-4xl">
          <div className="rounded-2xl p-8 md:p-12 bg-gradient-to-b from-[color:var(--gold)]/[0.06] to-[color:var(--gold)]/[0.01] border border-[color:var(--gold)]/[0.18]">
            <div className="text-[10px] font-bold uppercase tracking-[0.25em] mb-3 text-[color:var(--gold)]">
              When Studio isn&apos;t quite enough
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-light tracking-tight mb-5">
              Studio{' '}
              <em className="italic font-normal text-[color:var(--gold)]">
                Plus
              </em>{' '}
              is for the specialists
            </h2>
            <p className="text-base text-white/75 leading-relaxed mb-4">
              Color correction pros, celebrity colorists, and high-volume
              specialists often push past 80 full consultations in a strong
              month. Studio Plus brings you to 120 consultations with the best
              per-consult ratio in the lineup, plus priority AI processing,
              advanced correction tooling, and client-facing branded reports.
            </p>
            <p className="text-base text-white/65 leading-relaxed">
              If your book skews heavily toward new clients, major changes, or
              corrections — this is the tier that keeps up. For teams of 3+
              stylists sharing a practice, move up to Salon for per-seat
              economics.
            </p>
          </div>
        </section>

        {/* Salon calculator */}
        <section
          aria-labelledby="salon-heading"
          className="container pb-24 md:pb-28 max-w-4xl"
        >
          <div className="rounded-2xl p-8 md:p-12 bg-white/[0.04] border border-white/[0.08] text-center">
            <h2
              id="salon-heading"
              className="font-serif text-3xl md:text-4xl font-light tracking-tight mb-3"
            >
              Salon{' '}
              <em className="italic font-normal text-[color:var(--gold)]">
                Pricing
              </em>
            </h2>
            <p className="text-sm text-white/60 mb-10 max-w-md mx-auto">
              Every seat gets the full Studio-level experience. Pay per-seat —
              the rate decreases as your team grows.
            </p>

            <SalonCalculator />

            <p className="text-xs text-white/40 mt-8">
              50+ seats, multi-location groups, or beauty education brands? See
              our{' '}
              <span className="text-[color:var(--gold)]">Custom</span> tier
              above — let&rsquo;s talk. · Beauty schools: see dedicated{' '}
              <Link
                href="/schools"
                className="text-[color:var(--gold)] hover:underline"
              >
                school pricing
              </Link>
              .
            </p>
          </div>
        </section>

        {/* Versani vs Blendsor */}
        <section
          aria-labelledby="comparison-heading"
          className="container pb-24 md:pb-28 max-w-5xl"
        >
          <div className="text-center mb-10">
            <h2
              id="comparison-heading"
              className="font-serif text-3xl md:text-4xl font-light tracking-tight"
            >
              Versani{' '}
              <em className="italic font-normal text-[color:var(--gold)]">
                vs
              </em>{' '}
              Blendsor
            </h2>
            <p className="text-sm text-white/55 mt-2">
              How we compare across what matters.
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden bg-white/[0.04] border border-white/[0.08]">
            <div className="grid grid-cols-[1.5fr_1fr_1fr] bg-white/[0.04] px-5 py-3 border-b border-white/[0.06]">
              <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/50">
                Feature
              </div>
              <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-center text-[color:var(--gold)]">
                Versani
              </div>
              <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-center text-white/40">
                Blendsor
              </div>
            </div>
            {comparisonRows.map((row, i) => (
              <div
                key={i}
                className={
                  'grid grid-cols-[1.5fr_1fr_1fr] px-5 py-3.5 items-center' +
                  (i < comparisonRows.length - 1
                    ? ' border-b border-white/[0.04]'
                    : '')
                }
              >
                <div className="text-sm text-white/80 font-medium">
                  {row.feature}
                </div>
                <div className="text-sm text-center text-[color:var(--gold)]">
                  {row.versani}
                </div>
                <div className="text-sm text-center text-white/40">
                  {row.blendsor}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section
          aria-labelledby="faq-heading"
          className="container pb-24 md:pb-28 max-w-3xl"
        >
          <div className="text-center mb-10">
            <div className="text-[10px] font-bold uppercase tracking-[0.25em] mb-3 text-[color:var(--gold)]">
              Common Questions
            </div>
            <h2
              id="faq-heading"
              className="font-serif text-3xl md:text-4xl font-light tracking-tight"
            >
              Answers to what you&apos;re{' '}
              <em className="italic font-normal text-[color:var(--gold)]">
                wondering
              </em>
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((item, i) => (
              <FAQItem key={i} question={item.q} answer={item.a} />
            ))}
          </div>
        </section>

        {/* Footer note */}
        <section className="container pb-24 max-w-3xl text-center">
          <p className="text-xs text-white/40 leading-relaxed">
            All prices in USD. No setup fees, no contracts. Cancel anytime. The
            trial runs 7 days of full Studio access, then 7 days of reduced
            features before billing or read-only. Top-up consultations never
            expire.
          </p>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
