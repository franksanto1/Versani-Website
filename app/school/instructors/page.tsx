import type { Metadata } from 'next'
import Link from 'next/link'
import { SectionHero } from '@/components/team/SectionHero'
import { DataCard } from '@/components/team/DataCard'
import { StatusBadge } from '@/components/team/StatusBadge'
import { LinkButton } from '@/components/ui/Button'
import { schoolMock } from '@/lib/mock/schools'

export const metadata: Metadata = {
  title: 'Instructors · School Console · Versani',
  description: 'Your faculty and their class assignments.',
  robots: { index: false, follow: false },
}

export default function SchoolInstructorsPage() {
  const { instructors, classes } = schoolMock

  return (
    <div className="space-y-8">
      <SectionHero
        eyebrow="Instructors"
        title="Faculty"
        subtitle={`${instructors.length} active instructors. Adjust scope-based permissions to control which classes each instructor can see.`}
        right={
          <LinkButton
            href="/school/instructors/invite"
            variant="gold-solid"
            size="sm"
          >
            Invite instructor
          </LinkButton>
        }
      />

      <DataCard title="All instructors">
        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06] text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                <th className="text-left py-2 font-normal">Instructor</th>
                <th className="text-left py-2 font-normal">Specialty</th>
                <th className="text-right py-2 font-normal">Students</th>
                <th className="text-left py-2 font-normal">Classes</th>
                <th className="text-left py-2 font-normal">Status</th>
                <th className="text-right py-2 font-normal">Actions</th>
              </tr>
            </thead>
            <tbody>
              {instructors.map((i) => {
                const classNames = i.classesAssigned
                  .map((cid) => classes.find((c) => c.id === cid)?.name)
                  .filter(Boolean)
                return (
                  <tr
                    key={i.id}
                    className="border-b border-white/[0.04] last:border-b-0"
                  >
                    <td className="py-3">
                      <Link
                        href={`/school/instructors/${i.id}`}
                        className="text-foreground hover:text-gold"
                      >
                        {i.name}
                      </Link>
                    </td>
                    <td className="py-3 text-muted-foreground">
                      {i.specialty}
                    </td>
                    <td className="py-3 text-right tabular-nums">
                      {i.studentsAssigned}
                    </td>
                    <td className="py-3 text-muted-foreground">
                      {classNames.join(', ') || '—'}
                    </td>
                    <td className="py-3">
                      <StatusBadge status={i.status === 'active' ? 'active' : 'paused'} />
                    </td>
                    <td className="py-3 text-right">
                      <Link
                        href={`/school/instructors/${i.id}`}
                        className="text-xs uppercase tracking-[0.18em] text-gold hover:text-gold-light"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </DataCard>
    </div>
  )
}
