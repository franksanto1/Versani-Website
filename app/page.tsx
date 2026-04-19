import Link from 'next/link'
import { SiteNav } from '@/components/nav/SiteNav'
import { SiteFooter } from '@/components/nav/SiteFooter'
import { Hero } from '@/components/sections/Hero'
import { LinkButton } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'

const platformFeatures = [
  {
    title: 'Adaptive AI consultation',
    body: 'Versani reads the situation — new client, refresh, correction, editorial — and adjusts how loudly it participates. The right amount of AI, at the right moment.',
  },
  {
    title: 'Personal RAG per stylist',
    body: 'Your shade charts, formulas, client history, and photos form a library only you see. Every suggestion draws from your craft, not a generic pool.',
  },
  {
    title: 'Post-treatment scoring',
    body: 'After every service, rate the result. Versani compares target to outcome and builds a scoring dashboard that turns each appointment into usable insight.',
  },
  {
    title: 'Industry intelligence',
    body: 'Benchmarks against top-tier colorists, pattern insights across your book, and weekly digest emails. The craft compounds when you can see it.',
  },
]

const segments = [
  {
    title: 'Solo colorists',
    body: 'Pro tier. 50 full consultations per month plus client-update cap, top-up packs that never expire. Industry benchmarks, Formula A/B memory, and custom templates included.',
    href: '/pricing',
    cta: 'See Pro tier',
  },
  {
    title: 'Business operators',
    body: 'Studio tier. 70 full consultations, unlimited virtual try-ons, AI client insights, CSV export, revenue-per-client tracking, branded reports, and the full performance dashboard.',
    href: '/pricing',
    cta: 'See Studio tier',
  },
  {
    title: 'Multi-chair salons',
    body: 'Salon tier. Per-seat pricing with shared inventory, shared client database, and per-stylist usage tracking. Scales from three seats to fifty.',
    href: '/pricing',
    cta: 'See Salon tier',
  },
  {
    title: 'Beauty schools',
    body: 'Institutional licensing for accredited programs. Cohort seats, curriculum alignment, and supervised student libraries.',
    href: '/schools',
    cta: 'See school program',
  },
]

const testimonials = [
  {
    quote:
      'Finally a tool that treats my formulas like craft, not data. The inventory integration alone saved us a subscription to three other apps.',
    name: 'Anya M.',
    role: 'Color correction specialist · Los Angeles',
  },
  {
    quote:
      'Post-treatment scoring changed how I see my own work. A week of data did more than a year of self-critique.',
    name: 'Patrick W.',
    role: 'Balayage stylist · Austin',
  },
  {
    quote:
      'We moved our whole team onto Salon tier and the shared inventory is what sold the owner. No more duplicate stock, no more guesswork.',
    name: 'Liana R.',
    role: 'Salon director · Brooklyn',
  },
]

export default function HomePage() {
  return (
    <>
      <SiteNav />
      <main id="main" className="relative">
        <Hero />

        {/* The Platform */}
        <section
          id="features"
          aria-labelledby="platform-heading"
          className="container py-24 md:py-32"
        >
          <Reveal>
            <div className="text-center mb-14">
              <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--gold)] mb-5">
                The Platform
              </p>
              <h2
                id="platform-heading"
                className="font-serif font-light text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.1] tracking-tight max-w-3xl mx-auto text-[color:var(--foreground)]"
              >
                Consultation, formula lab, and on-demand advisor —{' '}
                <em className="italic font-normal text-[color:var(--gold)]">
                  in one place.
                </em>
              </h2>
              <p className="mt-6 max-w-2xl mx-auto text-base md:text-lg text-[color:var(--muted-foreground)] leading-relaxed">
                Versani is a complete workspace for the modern colorist. The
                tools work together because they were built together.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
            {platformFeatures.map((f, i) => (
              <Reveal key={f.title} delay={0.05 * i}>
                <div className="rounded-2xl p-7 bg-white/[0.04] border border-white/[0.08] h-full">
                  <h3 className="font-serif text-xl mb-3 text-[color:var(--foreground)]">
                    {f.title}
                  </h3>
                  <p className="text-sm text-white/65 leading-relaxed">
                    {f.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* For every professional */}
        <section
          aria-labelledby="segments-heading"
          className="container py-24 md:py-32 border-t border-[color:var(--border)]/50"
        >
          <Reveal>
            <div className="text-center mb-14">
              <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--gold)] mb-5">
                For every professional
              </p>
              <h2
                id="segments-heading"
                className="font-serif font-light text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.1] tracking-tight max-w-3xl mx-auto text-[color:var(--foreground)]"
              >
                Four tiers, one{' '}
                <em className="italic font-normal text-[color:var(--gold)]">
                  standard of craft
                </em>
              </h2>
              <p className="mt-6 max-w-2xl mx-auto text-base md:text-lg text-[color:var(--muted-foreground)] leading-relaxed">
                From the first chair to a full salon floor — Versani scales
                with the way you actually work.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {segments.map((s, i) => (
              <Reveal key={s.title} delay={0.04 * i}>
                <div className="rounded-2xl p-7 bg-white/[0.04] border border-white/[0.08] h-full flex flex-col">
                  <h3 className="font-serif text-xl mb-3 text-[color:var(--foreground)]">
                    {s.title}
                  </h3>
                  <p className="text-sm text-white/65 leading-relaxed mb-5 flex-1">
                    {s.body}
                  </p>
                  <Link
                    href={s.href}
                    className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--gold)] hover:underline"
                  >
                    {s.cta} →
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Built by professionals */}
        <section
          aria-labelledby="founder-heading"
          className="container py-24 md:py-32 border-t border-[color:var(--border)]/50 max-w-4xl"
        >
          <Reveal>
            <div className="rounded-2xl p-8 md:p-14 bg-gradient-to-b from-[color:var(--gold)]/[0.06] to-[color:var(--gold)]/[0.01] border border-[color:var(--gold)]/[0.18]">
              <div className="text-[10px] font-bold uppercase tracking-[0.25em] mb-4 text-[color:var(--gold)]">
                Built by professionals
              </div>
              <h2
                id="founder-heading"
                className="font-serif font-light text-2xl md:text-3xl leading-snug text-[color:var(--foreground)] mb-6"
              >
                &ldquo;I built Versani because I kept watching colorists —
                brilliant, experienced colorists — try to do multi-brand
                chemistry on the back of a receipt. The tools we had assumed we
                were beginners. The tool I wanted assumed we weren&apos;t.&rdquo;
              </h2>
              <div className="text-sm text-white/60">
                <span className="text-[color:var(--gold)] font-medium">
                  The Versani Founder
                </span>{' '}
                · Licensed colorist, Los Angeles
              </div>
              <div className="mt-8">
                <LinkButton
                  href="/philosophy"
                  variant="gold-outline"
                  size="md"
                >
                  Read the philosophy
                </LinkButton>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Testimonials */}
        <section
          aria-labelledby="testimonials-heading"
          className="container py-24 md:py-32 border-t border-[color:var(--border)]/50"
        >
          <Reveal>
            <div className="text-center mb-14">
              <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--gold)] mb-5">
                The Chair
              </p>
              <h2
                id="testimonials-heading"
                className="font-serif font-light text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.1] tracking-tight max-w-3xl mx-auto text-[color:var(--foreground)]"
              >
                What colorists are{' '}
                <em className="italic font-normal text-[color:var(--gold)]">
                  saying
                </em>
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={0.06 * i}>
                <figure className="rounded-2xl p-7 bg-white/[0.04] border border-white/[0.08] h-full flex flex-col">
                  <blockquote className="text-sm md:text-base text-white/80 leading-relaxed flex-1">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-6 pt-5 border-t border-white/[0.06]">
                    <div className="text-sm font-medium text-[color:var(--foreground)]">
                      {t.name}
                    </div>
                    <div className="text-xs text-white/55 mt-0.5">
                      {t.role}
                    </div>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section
          id="pricing"
          aria-labelledby="cta-heading"
          className="container py-24 md:py-32 border-t border-[color:var(--border)]/50 max-w-4xl"
        >
          <Reveal>
            <div className="rounded-2xl p-10 md:p-16 bg-gradient-to-b from-[color:var(--gold)]/[0.08] to-[color:var(--gold)]/[0.01] border border-[color:var(--gold)]/[0.25] text-center">
              <div className="text-[10px] font-bold uppercase tracking-[0.25em] mb-4 text-[color:var(--gold)]">
                No card required
              </div>
              <h2
                id="cta-heading"
                className="font-serif font-light text-[clamp(2rem,5vw,3.75rem)] leading-[1.05] tracking-tight text-[color:var(--foreground)] mb-5"
              >
                Start your{' '}
                <em className="italic font-normal text-[color:var(--gold)]">
                  7-day free trial
                </em>
              </h2>
              <p className="text-base md:text-lg text-white/70 leading-relaxed max-w-xl mx-auto mb-10">
                Full Studio access for 7 days. Keep everything you create;
                Versani automatically drops to read-only when the trial ends so
                nothing is lost.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <LinkButton href="/pricing" variant="gold-solid" size="lg">
                  Start Free Trial
                </LinkButton>
                <LinkButton href="/pricing" variant="gold-outline" size="lg">
                  Compare tiers
                </LinkButton>
              </div>
            </div>
          </Reveal>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
