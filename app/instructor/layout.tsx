import type { Metadata } from 'next'
import { TeamTopBar } from '@/components/team/TeamTopBar'
import { TeamSidebar } from '@/components/team/TeamSidebar'
import { PreviewBanner } from '@/components/team/PreviewBanner'
import { getCurrentInstructor } from '@/lib/mock/instructor-view'
import { schoolMock } from '@/lib/mock/schools'
import { isPreviewMode } from '@/lib/previewMode'

export const metadata: Metadata = {
  title: 'Instructor View · Versani',
  description: 'Scoped oversight for instructors teaching at Versani schools.',
  robots: { index: false, follow: false },
}

const navItems = [
  { href: '/instructor', label: 'Dashboard', exact: true },
  { href: '/instructor/students', label: 'Students' },
  { href: '/instructor/grading', label: 'Grading' },
  { href: '/instructor/classes', label: 'My Classes' },
  { href: '/instructor/compare', label: 'Compare' },
]

export default function InstructorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const preview = isPreviewMode()
  const instructor = getCurrentInstructor()

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TeamTopBar
        consoleLabel="Instructor View"
        contextLabel={schoolMock.profile.name}
        userName={instructor.name}
        previewMode={preview}
      />
      <PreviewBanner show={preview} />

      <div className="container flex-1 flex gap-8 py-8">
        <aside className="w-56 shrink-0 hidden md:block">
          <TeamSidebar items={navItems} ariaLabel="Instructor navigation" />
        </aside>

        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  )
}
