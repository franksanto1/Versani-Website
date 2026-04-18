import type { Metadata } from 'next'
import Link from 'next/link'
import { SectionHero } from '@/components/team/SectionHero'
import { StatusBadge } from '@/components/team/StatusBadge'
import { PrivacyNotice } from '@/components/team/PrivacyNotice'
import { MiniSparkline } from '@/components/team/MiniSparkline'
import {
  getGrantedStudents,
  getGrantedClasses,
} from '@/lib/mock/instructor-view'

export const metadata: Metadata = {
  title: 'My students · Instructor View · Versani',
  description: 'Students in your granted classes.',
  robots: { index: false, follow: false },
}

export default function InstructorStudentsPage() {
  const students = getGrantedStudents()
  const classes = getGrantedClasses()

  return (
    <div className="space-y-8">
      <SectionHero
        eyebrow="My students"
        title={`${students.length} students in your classes`}
        subtitle={`Scope: ${classes.map((c) => c.name).join(', ')}`}
      />

      <PrivacyNotice>
        You're viewing students enrolled in classes your school admin has
        granted to you. Contact the admin to request additional access.
      </PrivacyNotice>

      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.06] text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              <th className="text-left px-5 py-3 font-normal">Student</th>
              <th className="text-left px-5 py-3 font-normal">Year</th>
              <th className="text-left px-5 py-3 font-normal">Tier</th>
              <th className="text-right px-5 py-3 font-normal">Score</th>
              <th className="text-left px-5 py-3 font-normal">Last active</th>
              <th className="text-left px-5 py-3 font-normal">Status</th>
              <th className="text-right px-5 py-3 font-normal">Trend</th>
              <th className="text-right px-5 py-3 font-normal">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr
                key={s.id}
                className="border-b border-white/[0.04] last:border-b-0 hover:bg-white/[0.02]"
              >
                <td className="px-5 py-3">
                  <Link
                    href={`/instructor/students/${s.id}`}
                    className="text-foreground hover:text-gold"
                  >
                    {s.name}
                  </Link>
                </td>
                <td className="px-5 py-3 text-muted-foreground">{s.year}</td>
                <td className="px-5 py-3 text-[11px] uppercase tracking-[0.18em] text-gold/80">
                  {s.tier}
                </td>
                <td className="px-5 py-3 text-right tabular-nums">
                  {s.scoreAvg.toFixed(1)}
                </td>
                <td className="px-5 py-3 text-muted-foreground">
                  {s.lastActive}
                </td>
                <td className="px-5 py-3">
                  <StatusBadge
                    status={
                      s.trajectory === 'at-risk' ? 'at-risk' : s.status
                    }
                  />
                </td>
                <td className="px-5 py-3">
                  <div className="flex justify-end">
                    <MiniSparkline data={s.scoreTrend} width={80} height={22} />
                  </div>
                </td>
                <td className="px-5 py-3 text-right">
                  <Link
                    href={`/instructor/students/${s.id}`}
                    className="text-xs uppercase tracking-[0.18em] text-gold hover:text-gold-light"
                  >
                    Review
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
