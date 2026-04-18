import type { Metadata } from 'next'
import { TeamTopBar } from '@/components/team/TeamTopBar'
import { TeamSidebar } from '@/components/team/TeamSidebar'
import { PreviewBanner } from '@/components/team/PreviewBanner'
import { schoolMock } from '@/lib/mock/schools'
import { isPreviewMode } from '@/lib/previewMode'

export const metadata: Metadata = {
  title: 'School Console · Versani',
  description: 'Oversight dashboard for beauty school admins and owners.',
  robots: { index: false, follow: false },
}

const navItems = [
  { href: '/school', label: 'Dashboard', exact: true },
  { href: '/school/students', label: 'Students' },
  { href: '/school/instructors', label: 'Instructors' },
  { href: '/school/classes', label: 'Classes' },
  { href: '/school/compare', label: 'Compare' },
  { href: '/school/operations', label: 'Operations' },
  { href: '/school/permissions', label: 'Permissions' },
  { href: '/school/billing', label: 'Billing' },
  { href: '/school/settings', label: 'Settings' },
]

export default function SchoolLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const preview = isPreviewMode()

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TeamTopBar
        consoleLabel="School Console"
        contextLabel={schoolMock.profile.name}
        userName={schoolMock.profile.adminName}
        previewMode={preview}
      />
      <PreviewBanner show={preview} />

      <div className="container flex-1 flex gap-8 py-8">
        <aside className="w-56 shrink-0 hidden md:block">
          <TeamSidebar items={navItems} ariaLabel="School navigation" />
        </aside>

        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  )
}
