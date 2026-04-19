import type { Metadata } from 'next'
import { SiteNav } from '@/components/nav/SiteNav'
import { SiteFooter } from '@/components/nav/SiteFooter'
import { Reveal } from '@/components/ui/Reveal'
import { LeadForm } from '@/components/forms/LeadForm'
import { FAQItem } from '@/components/pricing/PricingClient'

export const metadata: Metadata = {
  title: 'Ambassadors — Founding Circle for master colorists',
  description:
    'Join the Versani Founding Ambassador circle. Five to eight lifetime Studio Plus seats, 20% lifetime affiliate revenue share, and permanent Founding status.',
  alternates: { canonical: '/ambassadors' },
  openGraph: {
    title: 'Versani Founding Ambassador Circle',
    description:
      'Five to eight slots. Lifetime Studio Plus. 20% affiliate share. Founding status, permanently.',
    url: '/ambassadors',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Versani Founding Ambassadors',
    description:
      'Five to eight slots. Lifetime Studio Plus. Founding status, permanently.',
  },
}

const youReceive = [
  {
    title: 'Lifetime Studio Plus membership',
    subtitle: '$600/year value, permanently',
    body: 'Full Studio Plus tier — 150 consultations, 250 client updates, priority AI, correction tooling, custom templates, branded reports — for as long as Versani exists. No recurring fee, no renegotiation.',
  },
  {
    title: '20% lifetime affiliate revenue share',
    subtitle: 'On every colorist you refer',
    body: 'A permanent 20% share of every referred colorist\u2019s subscription revenue, for the lifetime of that account. No expiration, no tier demotion when the program matures.',
  },
  {
    title: 'Featured Versani Academy section',
    subtitle: 'Your name, your section',
    body: 'A dedicated section inside the Versani Academy Library — your technique, your perspective, your category. Versani handles production, editing, and hosting. You teach.',
  },
  {
    title: 'Co-marketing at launch',
    subtitle: 'Billboards, socials, press',
    body: 'Founding Ambassadors are named and featured in Versani launch assets across paid, earned, and owned channels. Your story becomes part of how the platform is introduced to the industry.',
  },
  {
    title: 'Founding Ambassador status permanently',
    subtitle: 'A distinction, not a campaign',
    body: 'The badge, the credit, the distinction — permanent. Ambassadors added in later years enter Platinum / Gold / Silver tiers. Founding status cannot be promoted into.',
  },
  {
    title: 'Category ownership in Academy',
    subtitle: 'First dibs on your specialty',
    body: 'Balayage, vivids, correction, gray blending, consultation technique — Founding Ambassadors lock their category in the Academy library before additional educators are added.',
  },
]

const youDo = [
  {
    label: '3 Academy articles',
    body: 'Long-form written pieces on your technique and perspective. Versani provides editorial support and photography.',
  },
  {
    label: '3 video tutorials',
    body: 'Short, focused masterclasses on a specific technique or workflow. We handle production, you bring the craft.',
  },
  {
    label: '6 Instagram posts + 2 stories/month',
    body: 'Minimum monthly cadence showing Versani in your real workflow. No script, no mandated language — just authentic use.',
  },
  {
    label: 'Testimonial + usage rights',
    body: 'A filmed testimonial and permission to use your name, likeness, and work in appropriate launch and marketing assets.',
  },
]

const yearTwoTiers = [
  {
    label: 'Platinum',
    body: 'Annual commitment at the highest tier. 15% affiliate share, featured masterclass placement, co-marketing on select campaigns.',
  },
  {
    label: 'Gold',
    body: 'Annual commitment. 10% affiliate share, Academy inclusion, seasonal co-marketing.',
  },
  {
    label: 'Silver',
    body: 'Quarterly commitment. 7% affiliate share, Academy inclusion. Entry point into the ambassador program.',
  },
]

const faqs = [
  {
    q: 'How many Founding Ambassador slots are there?',
    a: 'Between five and eight. The number is deliberately small to protect the meaning of the credential and the individual value of each slot. We would rather leave the program under-filled than dilute it.',
  },
  {
    q: 'Who are you looking for?',
    a: 'Working colorists with recognized craft — in color correction, balayage, vivid work, consultation technique, or gray-blending mastery. Audience size matters less than the quality of the work and the ability to articulate it. We select for taste, discipline, and temperament.',
  },
  {
    q: 'What is the time commitment?',
    a: 'Manageable. Three articles and three video tutorials are distributed across the Founding year on a schedule that respects your real life. Monthly social output is six posts plus two stories — roughly what an active colorist already produces.',
  },
  {
    q: 'How does the 20% affiliate share actually work?',
    a: 'Every colorist who signs up through your link receives standard subscription pricing. You receive 20% of their subscription revenue, every month, for as long as they remain a customer. There is no expiration, no cliff, and no renegotiation when the program expands.',
  },
  {
    q: 'Is this exclusive? Can I represent other brands?',
    a: 'Non-exclusive on products — you can still partner with color lines, tools, and care brands. We ask that you not represent a competing AI consultation platform during your Founding year. That\u2019s the only exclusivity ask.',
  },
  {
    q: 'What happens if the program underperforms?',
    a: 'Your Founding Ambassador status is permanent regardless of program growth. Lifetime Studio Plus and the 20% affiliate share on already-referred accounts both persist. You are not tied to our upside.',
  },
]

export default function AmbassadorsPage() {
  return (
    <>
      <SiteNav />
      <main id="main" className="relative">
        {/* Hero */}
        <section
          aria-labelledby="amb-hero-heading"
          className="relative isolate overflow-hidden pt-32 md:pt-40 pb-20 md:pb-28"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 gold-radial pointer-events-none"
          />
          <div className="relative container text-center max-w-4xl">
            <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--gold)] mb-5">
              For Master Colorists
            </p>
            <Reveal>
              <h1
                id="amb-hero-heading"
                className="font-serif font-light text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] tracking-tight"
              >
                Join the Versani{' '}
                <em className="italic font-normal text-[color:var(--gold)]">
                  Founding Ambassador
                </em>{' '}
                circle
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-8 text-base md:text-lg text-[color:var(--muted-foreground)] leading-relaxed">
                Five to eight slots. Lifetime Studio Plus. A permanent seat at
                the table for the colorists who help us define what
                professional AI should sound like.
              </p>
            </Reveal>
          </div>
        </section>

        {/* What you receive */}
        <section
          aria-labelledby="receive-heading"
          className="container pb-24 md:pb-28 max-w-6xl"
        >
          <Reveal>
            <div className="text-center mb-12">
              <div className="text-[10px] font-bold uppercase tracking-[0.25em] mb-3 text-[color:var(--gold)]">
                What you receive
              </div>
              <h2
                id="receive-heading"
                className="font-serif text-3xl md:text-4xl font-light tracking-tight"
              >
                Six founding{' '}
                <em className="italic font-normal text-[color:var(--gold)]">
                  benefits
                </em>
              </h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {youReceive.map((item, i) => (
              <Reveal key={item.title} delay={(i % 3) * 0.05}>
                <div className="rounded-2xl p-7 bg-gradient-to-b from-[color:var(--gold)]/[0.05] to-[color:var(--gold)]/[0.01] border border-[color:var(--gold)]/[0.18] h-full">
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] mb-3 text-[color:var(--gold)]">
                    {item.subtitle}
                  </div>
                  <h3 className="font-serif text-xl md:text-2xl tracking-tight mb-3 text-[color:var(--foreground)]">
                    {item.title}
                  </h3>
                  <p className="text-sm text-white/65 leading-relaxed">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* What we ask */}
        <section
          aria-labelledby="ask-heading"
          className="container pb-24 md:pb-28 max-w-5xl"
        >
          <Reveal>
            <div className="text-center mb-12">
              <div className="text-[10px] font-bold uppercase tracking-[0.25em] mb-3 text-[color:var(--gold)]">
                What we ask of you
              </div>
              <h2
                id="ask-heading"
                className="font-serif text-3xl md:text-4xl font-light tracking-tight"
              >
                A{' '}
                <em className="italic font-normal text-[color:var(--gold)]">
                  measured
                </em>{' '}
                commitment
              </h2>
              <p className="text-sm text-white/55 mt-3 max-w-xl mx-auto">
                Respect for your time is part of the program. These are the
                only asks.
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {youDo.map((item, i) => (
              <Reveal key={item.label} delay={(i % 2) * 0.05}>
                <div className="rounded-2xl p-7 bg-white/[0.04] border border-white/[0.08] h-full">
                  <h3 className="font-serif text-xl md:text-2xl tracking-tight mb-3 text-[color:var(--foreground)]">
                    {item.label}
                  </h3>
                  <p className="text-sm text-white/65 leading-relaxed">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Year 2+ tiers */}
        <section
          aria-labelledby="y2-heading"
          className="container pb-24 md:pb-28 max-w-6xl"
        >
          <Reveal>
            <div className="text-center mb-12">
              <div className="text-[10px] font-bold uppercase tracking-[0.25em] mb-3 text-[color:var(--gold)]">
                After the Founding Year
              </div>
              <h2
                id="y2-heading"
                className="font-serif text-3xl md:text-4xl font-light tracking-tight"
              >
                Year 2+{' '}
                <em className="italic font-normal text-[color:var(--gold)]">
                  Ambassador
                </em>{' '}
                tiers
              </h2>
              <p className="text-sm text-white/55 mt-3 max-w-xl mx-auto">
                Founding status is permanent. These tiers open to later
                ambassadors — never to replace Founding members.
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {yearTwoTiers.map((t, i) => (
              <Reveal key={t.label} delay={i * 0.05}>
                <div className="rounded-2xl p-7 bg-white/[0.04] border border-white/[0.08] h-full">
                  <h3 className="font-serif text-2xl tracking-tight mb-3 text-[color:var(--foreground)]">
                    {t.label}
                  </h3>
                  <p className="text-sm text-white/65 leading-relaxed">
                    {t.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Apply form */}
        <section
          aria-labelledby="apply-heading"
          className="container pb-24 md:pb-28 max-w-3xl"
        >
          <Reveal>
            <div className="text-center mb-10">
              <h2
                id="apply-heading"
                className="font-serif text-3xl md:text-4xl font-light tracking-tight"
              >
                Apply to the{' '}
                <em className="italic font-normal text-[color:var(--gold)]">
                  Founding Circle
                </em>
              </h2>
              <p className="text-sm text-white/55 mt-3">
                We read every application personally. Expect a response within
                two business days.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <LeadForm
              id="ambassador-form"
              submitLabel="Submit Application"
              intro="Share where we can see your work. Instagram, Behind The Chair, and a personal site are all welcome."
              fields={[
                { name: 'name', label: 'Your name', required: true, placeholder: 'Full name' },
                { name: 'email', label: 'Email', type: 'email', required: true, placeholder: 'you@domain.com' },
                { name: 'instagram', label: 'Instagram handle', placeholder: '@yourhandle' },
                { name: 'specialty', label: 'Primary specialty', placeholder: 'Balayage, correction, vivids, consultation…' },
                { name: 'yearsLicensed', label: 'Years licensed', placeholder: 'e.g. 12' },
                { name: 'notes', label: 'Why Versani', type: 'textarea', placeholder: 'Tell us what resonates about the program — and the work you want to do inside it.' },
              ]}
            />
          </Reveal>
        </section>

        {/* FAQ */}
        <section
          aria-labelledby="amb-faq-heading"
          className="container pb-32 max-w-3xl"
        >
          <Reveal>
            <div className="text-center mb-10">
              <div className="text-[10px] font-bold uppercase tracking-[0.25em] mb-3 text-[color:var(--gold)]">
                Ambassador FAQ
              </div>
              <h2
                id="amb-faq-heading"
                className="font-serif text-3xl md:text-4xl font-light tracking-tight"
              >
                Direct answers to{' '}
                <em className="italic font-normal text-[color:var(--gold)]">
                  real questions
                </em>
              </h2>
            </div>
          </Reveal>
          <div className="space-y-3">
            {faqs.map((item, i) => (
              <FAQItem key={i} question={item.q} answer={item.a} />
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
