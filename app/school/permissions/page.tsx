import type { Metadata } from 'next'
import Link from 'next/link'
import { SectionHero } from '@/components/team/SectionHero'
import { DataCard } from '@/components/team/DataCard'
import { PrivacyNotice } from '@/components/team/PrivacyNotice'
import { schoolMock, grantedClassesForInstructor } from '@/lib/mock/schools'

export const metadata: Metadata = {
  title: 'Permissions · School Console · Versani',
  description: 'Scope-based class grants for instructors.',
  robots: { index: false, follow: false },
}

export default function SchoolPermissionsPage() {
  const { instructors, classes } = schoolMock

  return (
    <div className="space-y-8">
      <SectionHero
        eyebrow="Permissions"
        title="Instructor permissions"
        subtitle="Instructors see only students enrolled in classes you grant them. The default for new instructors is no access."
      />

      <PrivacyNotice>
        Zero-trust by default. Instructors and students never have overlap they
        shouldn't. Students see only their own work inside the Versani app.
      </PrivacyNotice>

      <DataCard title="Grant map">
        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06] text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                <th className="text-left py-2 font-normal">Instructor</th>
                <th className="text-left py-2 font-normal">Specialty</th>
                <th className="text-left py-2 font-normal">Granted classes</th>
                <th className="text-right py-2 font-normal">Actions</th>
              </tr>
            </thead>
            <tbody>
              {instructors.map((i) => {
                const grantedIds = grantedClassesForInstructor(i.id)
                const chips = classes.filter((c) => grantedIds.includes(c.id))
                return (
                  <tr
                    key={i.id}
                    className="border-b border-white/[0.04] last:border-b-0 align-top"
                  >
                    <td className="py-3 text-foreground">{i.name}</td>
                    <td className="py-3 text-muted-foreground">
                      {i.specialty}
                    </td>
                    <td className="py-3">
                      {chips.length === 0 ? (
                        <span className="text-xs text-rose-300">
                          No grants
                        </span>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {chips.map((c) => (
                            <span
                              key={c.id}
                              className="text-[10px] uppercase tracking-[0.18em] px-2 py-0.5 rounded-full border border-gold/40 bg-gold/10 text-gold"
                            >
                              {c.name}
                            </span>
                          ))}
                        </div>
                      )}
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
