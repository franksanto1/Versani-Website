import type { Metadata } from 'next'
import { SectionHero } from '@/components/team/SectionHero'
import { ComparableBuilder } from '@/components/team/ComparableBuilder'
import { PrivacyNotice } from '@/components/team/PrivacyNotice'
import { getGrantedStudents } from '@/lib/mock/instructor-view'

export const metadata: Metadata = {
  title: 'Compare students · Instructor View · Versani',
  description: 'Compare students within your granted classes.',
  robots: { index: false, follow: false },
}

export default function InstructorComparePage() {
  const students = getGrantedStudents()
  const members = students.map((s) => ({
    id: s.id,
    name: s.name,
    tier: s.tier,
    year: s.year,
    scoreAvg: s.scoreAvg,
    coursesCompleted: s.coursesCompleted,
    lastActive: s.lastActive,
  }))

  return (
    <div className="space-y-8">
      <SectionHero
        eyebrow="Compare"
        title="Compare students"
        subtitle="Side-by-side comparison across students in your granted classes."
      />

      <PrivacyNotice>
        Compare is scoped to your granted classes. Students outside your scope
        will not appear in the picker.
      </PrivacyNotice>

      <ComparableBuilder
        members={members}
        metrics={[
          { key: 'scoreAvg', label: 'Score average', format: 'decimal1' },
          { key: 'coursesCompleted', label: 'Courses completed', format: 'number' },
          { key: 'tier', label: 'Tier' },
          { key: 'year', label: 'Year' },
          { key: 'lastActive', label: 'Last active' },
        ]}
      />
    </div>
  )
}
