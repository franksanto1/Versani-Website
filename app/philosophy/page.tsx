import type { Metadata } from 'next'
import { SiteNav } from '@/components/nav/SiteNav'
import { SiteFooter } from '@/components/nav/SiteFooter'
import { LinkButton } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'

export const metadata: Metadata = {
  title: 'Philosophy — AI that respects your craft',
  description:
    'Why Versani exists — built by a licensed colorist for colorists. Seven guiding principles and five AI engagement modes that shape how the platform behaves.',
  alternates: { canonical: '/philosophy' },
  openGraph: {
    title: 'Versani Philosophy — AI that respects your craft',
    description:
      'Seven principles and five engagement modes. How Versani was designed to behave like a colleague, not a consumer toy.',
    url: '/philosophy',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Versani Philosophy',
    description: 'AI that respects your craft — the seven principles.',
  },
}

const principles = [
  {
    number: '01',
    title: 'Luxury, not consumer',
    body: 'Every surface, every interaction, every recommendation is built for a professional who charges $200 a service. No gamified badges. No emojis shouting at you. Serif type, generous whitespace, and the restraint of a brand worth wearing on your chair.',
  },
  {
    number: '02',
    title: 'AI as colleague, not oracle',
    body: 'Versani never overrides the colorist. It suggests, explains, and defers. You make the call. When the AI is uncertain, it says so — and shows its reasoning. The goal is a second opinion you trust, not a verdict you have to argue with.',
  },
  {
    number: '03',
    title: 'Data ownership is inviolable',
    body: 'Your shade charts, formulas, client history, and photos belong to you. Always. Versani does not centralize, does not sell, does not train on your library. Export everything, anytime. Canceling leaves your account in read-only — nothing is deleted.',
  },
  {
    number: '04',
    title: 'Behavior beats claims',
    body: 'We do not tell you the product is smart. We let it act smart. The platform\u2019s intelligence shows up in small moments — a suggestion at the right level of confidence, a photo reading that flagged porosity without being asked. Claims are cheap. Behavior compounds.',
  },
  {
    number: '05',
    title: 'Situational awareness over scripted behavior',
    body: 'A root touch-up is not a corrective. A brand-new client is not a refresh. Versani reads the situation — tenure, complexity, risk, the level of previous work — and adjusts how loudly it participates. The right amount of AI, at the right moment.',
  },
  {
    number: '06',
    title: 'Premium craft respect',
    body: 'This platform is built for the people who spend years developing taste. Master colorists, correction specialists, salon owners. Every decision — from the language we use to the features we prioritize — assumes you already know what you are doing.',
  },
  {
    number: '07',
    title: 'Margins matter (for the business, not the user)',
    body: 'We run the numbers so you do not have to. Caps exist because AI costs real money — but they land where real professionals rarely touch them. We would rather price fairly and grow slowly than subsidize volume with ads, data resale, or quality compromises.',
  },
]

const modes = [
  {
    label: 'Silent',
    description:
      'When the colorist knows exactly what they want. Versani stays out of the way — surfaces only what is asked for and logs the work.',
  },
  {
    label: 'Advisor',
    description:
      'The default. Gentle suggestions, context from the client\u2019s history, a note on integrity or tone. Offered, not imposed.',
  },
  {
    label: 'Strong Opinion',
    description:
      'For real risk — a formula that will burn the hair, a color goal inconsistent with the photo, a missed allergy note. Versani speaks up plainly and explains why.',
  },
  {
    label: 'Redirect',
    description:
      'When the direction is wrong. Versani suggests an alternative path, shows the tradeoff, and waits for the colorist to choose.',
  },
  {
    label: 'Creative Expansion',
    description:
      'For open briefs. Versani offers three to five directions you may not have considered, each with reasoning. Inspiration, not instruction.',
  },
]

export default function PhilosophyPage() {
  return (
    <>
      <SiteNav />
      <main id="main" className="relative">
        {/* Hero */}
        <section
          aria-labelledby="philosophy-hero-heading"
          className="relative isolate overflow-hidden pt-32 md:pt-40 pb-20 md:pb-28"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 gold-radial pointer-events-none"
          />
          <div className="relative container text-center max-w-4xl">
            <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--gold)] mb-5">
              Philosophy
            </p>
            <Reveal>
              <h1
                id="philosophy-hero-heading"
                className="font-serif font-light text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] tracking-tight"
              >
                AI that respects{' '}
                <em className="italic font-normal text-[color:var(--gold)]">
                  your craft
                </em>
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-8 text-base md:text-lg text-[color:var(--muted-foreground)] leading-relaxed">
                Versani was built by a licensed colorist for colorists. The
                platform is a working theory about what professional software
                for a craft-driven industry should feel like — disciplined,
                considered, and worthy of the people who use it.
              </p>
            </Reveal>
          </div>
        </section>

        {/* 7 Principles */}
        <section
          aria-labelledby="principles-heading"
          className="container pb-24 md:pb-32 max-w-6xl"
        >
          <Reveal>
            <div className="text-center mb-14">
              <div className="text-[10px] font-bold uppercase tracking-[0.25em] mb-3 text-[color:var(--gold)]">
                The Foundation
              </div>
              <h2
                id="principles-heading"
                className="font-serif text-3xl md:text-4xl font-light tracking-tight"
              >
                The seven{' '}
                <em className="italic font-normal text-[color:var(--gold)]">
                  guiding principles
                </em>
              </h2>
              <p className="text-sm text-white/55 mt-3 max-w-xl mx-auto">
                These are not marketing values. They are the trade-offs we make
                when every other choice would be easier.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {principles.map((p, i) => (
              <Reveal key={p.number} delay={(i % 2) * 0.05}>
                <article className="rounded-2xl p-7 bg-white/[0.04] border border-white/[0.08] h-full">
                  <div className="flex items-baseline gap-4 mb-3">
                    <span className="font-serif text-2xl text-[color:var(--gold)]">
                      {p.number}
                    </span>
                    <h3 className="font-serif text-2xl text-[color:var(--foreground)] tracking-tight">
                      {p.title}
                    </h3>
                  </div>
                  <p className="text-sm md:text-base text-white/70 leading-relaxed">
                    {p.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* 5 Engagement Modes */}
        <section
          aria-labelledby="modes-heading"
          className="container pb-24 md:pb-32 max-w-5xl"
        >
          <Reveal>
            <div className="text-center mb-14">
              <div className="text-[10px] font-bold uppercase tracking-[0.25em] mb-3 text-[color:var(--gold)]">
                How Versani Participates
              </div>
              <h2
                id="modes-heading"
                className="font-serif text-3xl md:text-4xl font-light tracking-tight"
              >
                The five{' '}
                <em className="italic font-normal text-[color:var(--gold)]">
                  engagement modes
                </em>
              </h2>
              <p className="text-sm text-white/55 mt-3 max-w-xl mx-auto">
                Not every consultation needs the same amount of AI. The
                platform reads the room.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {modes.map((m, i) => (
              <Reveal key={m.label} delay={i * 0.05}>
                <div className="rounded-2xl p-7 bg-white/[0.04] border border-white/[0.08] h-full">
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] mb-3 text-[color:var(--gold)]">
                    Mode
                  </div>
                  <h3 className="font-serif text-2xl tracking-tight mb-3 text-[color:var(--foreground)]">
                    {m.label}
                  </h3>
                  <p className="text-sm text-white/65 leading-relaxed">
                    {m.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Founder quote */}
        <section className="container pb-24 md:pb-32 max-w-4xl">
          <Reveal>
            <div className="rounded-2xl p-10 md:p-14 bg-gradient-to-b from-[color:var(--gold)]/[0.06] to-[color:var(--gold)]/[0.01] border border-[color:var(--gold)]/[0.18] text-center">
              <div className="text-[10px] font-bold uppercase tracking-[0.25em] mb-5 text-[color:var(--gold)]">
                Built by a licensed colorist
              </div>
              <blockquote className="font-serif text-2xl md:text-3xl font-light leading-snug tracking-tight text-[color:var(--foreground)]">
                &ldquo;I built Versani because every AI tool I tried was either
                talking down to me or trying to replace me. Colorists deserve
                software that behaves the way a great mentor behaves —
                attentive, disciplined, and confident enough to disagree when
                it matters.&rdquo;
              </blockquote>
              <div className="mt-7 text-sm text-white/60">
                — Founder, Versani
              </div>
            </div>
          </Reveal>
        </section>

        {/* CTA */}
        <section className="container pb-32 max-w-3xl text-center">
          <Reveal>
            <h2 className="font-serif text-3xl md:text-4xl font-light tracking-tight mb-6">
              Experience the{' '}
              <em className="italic font-normal text-[color:var(--gold)]">
                philosophy
              </em>{' '}
              in practice
            </h2>
            <p className="text-base text-[color:var(--muted-foreground)] mb-10 leading-relaxed">
              Principles are easy to publish. The proof is in the workflow.
              Start a free 7-day trial — no card required.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <LinkButton href="/auth?mode=signup" size="lg">
                Start Free Trial
              </LinkButton>
              <LinkButton href="/pricing" variant="gold-outline" size="lg">
                See Pricing
              </LinkButton>
            </div>
          </Reveal>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
