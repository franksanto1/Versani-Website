import type { Metadata } from 'next'
import { SectionHero } from '@/components/team/SectionHero'
import { ComparableBuilder } from '@/components/team/ComparableBuilder'
import { salonMock } from '@/lib/mock/salons'

export const metadata: Metadata = {
  title: 'Compare stylists · Salon Console · Versani',
  description: 'Side-by-side comparison builder for your team.',
  robots: { index: false, follow: false },
}

export default function SalonComparePage() {
  const members = salonMock.stylists.map((s) => ({
    id: s.id,
    name: s.name,
    tier: s.tier,
    role: s.role,
    scoreAvg: s.scoreAvg,
    consultationsThisMonth: s.consultationsThisMonth,
    retentionRate: s.retentionRate,
    specialty: s.specialty,
  }))

  return (
    <div className="space-y-8">
      <SectionHero
        eyebrow="Comparable reports"
        title="Compare stylists"
        subtitle="Pick up to five stylists and choose the metrics you want to line up."
      />

      <ComparableBuilder
        members={members}
        metrics={[
          { key: 'scoreAvg', label: 'Score average', format: 'decimal1' },
          { key: 'consultationsThisMonth', label: 'Consultations MTD', format: 'number' },
          { key: 'retentionRate', label: 'Retention', format: 'percent' },
          { key: 'tier', label: 'Tier' },
          { key: 'specialty', label: 'Top specialty' },
        ]}
      />
    </div>
  )
}
