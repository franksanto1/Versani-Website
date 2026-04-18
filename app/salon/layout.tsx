import type { Metadata } from 'next'
import { TeamTopBar } from '@/components/team/TeamTopBar'
import { TeamSidebar } from '@/components/team/TeamSidebar'
import { PreviewBanner } from '@/components/team/PreviewBanner'
import { salonMock } from '@/lib/mock/salons'
import { isPreviewMode } from '@/lib/previewMode'

export const metadata: Metadata = {
  title: 'Salon Console · Versani',
  description: 'Oversight dashboard for salon owners and managers.',
  robots: { index: false, follow: false },
}

const navItems = [
  { href: '/salon', label: 'Dashboard', exact: true },
  { href: '/salon/team', label: 'Team' },
  { href: '/salon/compare', label: 'Compare' },
  { href: '/salon/operations', label: 'Operations' },
  { href: '/salon/inventory', label: 'Inventory' },
  { href: '/salon/clients', label: 'Clients' },
  { href: '/salon/permissions', label: 'Permissions' },
  { href: '/salon/billing', label: 'Billing' },
  { href: '/salon/settings', label: 'Settings' },
]

export default function SalonLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const preview = isPreviewMode()

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TeamTopBar
        consoleLabel="Salon Console"
        contextLabel={salonMock.profile.name}
        userName={salonMock.profile.ownerName}
        previewMode={preview}
      />
      <PreviewBanner show={preview} />

      <div className="container flex-1 flex gap-8 py-8">
        <aside className="w-56 shrink-0 hidden md:block">
          <TeamSidebar items={navItems} ariaLabel="Salon navigation" />
        </aside>

        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  )
}
