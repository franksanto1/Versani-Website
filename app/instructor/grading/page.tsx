import type { Metadata } from 'next'
import Link from 'next/link'
import { SectionHero } from '@/components/team/SectionHero'
import { DataCard } from '@/components/team/DataCard'
import { PrivacyNotice } from '@/components/team/PrivacyNotice'
import { getGrantedPendingSubmissions } from '@/lib/mock/instructor-view'
import { formatDate } from '@/lib/format'

export const metadata: Metadata = {
  title: 'Grading · Instructor View · Versani',
  description: 'Coursework pending review.',
  robots: { index: false, follow: false },
}

export default function InstructorGradingPage() {
  const pending = getGrantedPendingSubmissions()

  return (
    <div className="space-y-8">
      <SectionHero
        eyebrow="Grading"
        title={`${pending.length} submissions pending`}
        subtitle="Coursework from your classes, waiting for your grade."
      />

      <DataCard title="Review queue">
        {pending.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            All caught up. Nothing to grade right now.
          </p>
        ) : (
          <div className="overflow-x-auto -mx-6 px-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.06] text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  <th className="text-left py-2 font-normal">Assignment</th>
                  <th className="text-left py-2 font-normal">Student</th>
                  <th className="text-left py-2 font-normal">Course</th>
                  <th className="text-left py-2 font-normal">Submitted</th>
                  <th className="text-right py-2 font-normal">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pending.map((sub) => (
                  <tr
                    key={sub.id}
                    className="border-b border-white/[0.04] last:border-b-0"
                  >
                    <td className="py-3 text-foreground">{sub.assignment}</td>
                    <td className="py-3 text-muted-foreground">
                      <Link
                        href={`/instructor/students/${sub.studentId}`}
                        className="hover:text-gold"
                      >
                        {sub.studentName}
                      </Link>
                    </td>
                    <td className="py-3 text-muted-foreground">
                      {sub.className}
                    </td>
                    <td className="py-3 text-muted-foreground">
                      {formatDate(sub.submittedAt)}
                    </td>
                    <td className="py-3 text-right">
                      <Link
                        href={`/instructor/students/${sub.studentId}`}
                        className="text-xs uppercase tracking-[0.18em] text-gold hover:text-gold-light"
                      >
                        Open & grade
                      </Link>
                      <span className="mx-2 text-muted-foreground/40">·</span>
                      <button className="text-xs uppercase tracking-[0.18em] text-emerald-300 hover:text-emerald-200">
                        Mark complete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </DataCard>

      <PrivacyNotice>
        The queue shows only submissions from classes in your granted scope.
      </PrivacyNotice>
    </div>
  )
}
