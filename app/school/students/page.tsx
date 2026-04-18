import type { Metadata } from 'next'
import Link from 'next/link'
import { SectionHero } from '@/components/team/SectionHero'
import { StatusBadge } from '@/components/team/StatusBadge'
import { MiniSparkline } from '@/components/team/MiniSparkline'
import { LinkButton } from '@/components/ui/Button'
import { schoolMock } from '@/lib/mock/schools'

export const metadata: Metadata = {
  title: 'Students · School Console · Versani',
  description: 'Student roster for the current term.',
  robots: { index: false, follow: false },
}

export default function SchoolStudentsPage() {
  const { students, profile } = schoolMock

  return (
    <div className="space-y-8">
      <SectionHero
        eyebrow={`${profile.term} · Students`}
        title={`${students.length} students visible`}
        subtitle={`${profile.activeStudents} active in this term. Bulk CSV upload supported on the invite page.`}
        right={
          <LinkButton href="/school/students/invite" variant="gold-solid" size="sm">
            Invite students
          </LinkButton>
        }
      />

      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-4 flex flex-wrap items-center gap-3">
        <select className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs text-foreground">
          <option className="bg-background">All years</option>
          <option className="bg-background">Year 1</option>
          <option className="bg-background">Year 2</option>
        </select>
        <select className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs text-foreground">
          <option className="bg-background">All tiers</option>
          <option className="bg-background">Base</option>
          <option className="bg-background">Pro Upgraded</option>
        </select>
        <select className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs text-foreground">
          <option className="bg-background">All classes</option>
          {schoolMock.classes.map((c) => (
            <option key={c.id} className="bg-background">
              {c.name}
            </option>
          ))}
        </select>
        <select className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs text-foreground">
          <option className="bg-background">Active</option>
          <option className="bg-background">All statuses</option>
        </select>
        <input
          type="search"
          placeholder="Search students"
          className="flex-1 min-w-[200px] px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold/50"
        />
      </div>

      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.06] text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              <th className="text-left px-5 py-3 font-normal">Student</th>
              <th className="text-left px-5 py-3 font-normal">Year</th>
              <th className="text-left px-5 py-3 font-normal">Tier</th>
              <th className="text-right px-5 py-3 font-normal">Score</th>
              <th className="text-right px-5 py-3 font-normal">Courses</th>
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
                    href={`/school/students/${s.id}`}
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
                <td className="px-5 py-3 text-right text-muted-foreground">
                  {s.coursesCompleted}/{s.coursesEnrolled + s.coursesCompleted}
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
                    href={`/school/students/${s.id}`}
                    className="text-xs uppercase tracking-[0.18em] text-gold hover:text-gold-light"
                  >
                    View
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
