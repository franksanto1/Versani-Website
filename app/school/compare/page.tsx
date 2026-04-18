import type { Metadata } from 'next'
import { SectionHero } from '@/components/team/SectionHero'
import { ComparableBuilder } from '@/components/team/ComparableBuilder'
import { schoolMock } from '@/lib/mock/schools'

export const metadata: Metadata = {
  title: 'Compare students · School Console · Versani',
  description: 'Cross-class student comparison.',
  robots: { index: false, follow: false },
}

export default function SchoolComparePage() {
  const members = schoolMock.students.map((s) => ({
    id: s.id,
    name: s.name,
    tier: s.tier,
    year: s.year,
    scoreAvg: s.scoreAvg,
    coursesCompleted: s.coursesCompleted,
    coursesEnrolled: s.coursesEnrolled,
  }))

  return (
    <div className="space-y-8">
      <SectionHero
        eyebrow="Comparable reports"
        title="Compare students"
        subtitle="Line up students across classes and years to spot patterns worth acting on."
      />

      <ComparableBuilder
        members={members}
        metrics={[
          { key: 'scoreAvg', label: 'Score average', format: 'decimal1' },
          { key: 'coursesCompleted', label: 'Courses completed', format: 'number' },
          { key: 'coursesEnrolled', label: 'Courses enrolled', format: 'number' },
          { key: 'tier', label: 'Tier' },
          { key: 'year', label: 'Year' },
        ]}
      />
    </div>
  )
}
