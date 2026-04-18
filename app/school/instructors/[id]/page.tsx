import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SectionHero } from '@/components/team/SectionHero'
import { MetricCard } from '@/components/team/MetricCard'
import { PermissionGrantTable } from '@/components/team/PermissionGrantTable'
import { RoleBadge } from '@/components/team/RoleBadge'
import { StatusBadge } from '@/components/team/StatusBadge'
import {
  findInstructor,
  grantedClassesForInstructor,
  schoolMock,
} from '@/lib/mock/schools'
import { formatDate } from '@/lib/format'

export const metadata: Metadata = {
  title: 'Instructor · School Console · Versani',
  description: 'Instructor profile and class permissions.',
  robots: { index: false, follow: false },
}

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function InstructorDetailPage({ params }: PageProps) {
  const { id } = await params
  const instructor = findInstructor(id)
  if (!instructor) notFound()

  const grantedClassIds = grantedClassesForInstructor(instructor.id)
  const initialGrants = schoolMock.classes.reduce<Record<string, boolean>>(
    (acc, c) => {
      acc[c.id] = grantedClassIds.includes(c.id)
      return acc
    },
    {}
  )

  const classRows = schoolMock.classes.map((c) => ({
    key: c.id,
    label: c.name,
    description: `Taught by ${c.instructor} · ${c.enrolled} enrolled · Avg ${c.avgScore.toFixed(1)}`,
  }))

  return (
    <div className="space-y-10">
      <div>
        <Link
          href="/school/instructors"
          className="inline-block text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground mb-4"
        >
          ← Back to instructors
        </Link>
        <SectionHero
          eyebrow={instructor.specialty}
          title={instructor.name}
          subtitle={`Joined ${formatDate(instructor.joinedAt)}`}
          right={
            <div className="flex items-center gap-2">
              <RoleBadge role="instructor" />
              <StatusBadge status={instructor.status === 'active' ? 'active' : 'paused'} />
            </div>
          }
        />
      </div>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          label="Students assigned"
          value={instructor.studentsAssigned.toString()}
          sub="Across granted classes"
        />
        <MetricCard
          label="Classes granted"
          value={grantedClassIds.length.toString()}
          sub="Scope the instructor can see"
        />
        <MetricCard
          label="Specialty"
          value={instructor.specialty}
          sub="Focus area on the faculty roster"
        />
      </section>

      <PermissionGrantTable
        subject={{
          id: instructor.id,
          name: instructor.name,
          context: 'Classes granted to',
        }}
        rows={classRows}
        initialGrants={initialGrants}
      />
    </div>
  )
}
